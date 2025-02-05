import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Base } from "../../api/Api";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { LoadingContext } from "../../context/LoadingContext";
import Input from "../../components/common/inputs/Input";
import GoogleButton from "../../components/common/button/GoogleButton";
import PrimerButton from "../../components/common/button/PrimerButton";
import AuthLayout from "../../components/layouts/AuthLayout";

const Masuk = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const { setIsLoading } = useContext(LoadingContext);

  const provider = new GoogleAuthProvider();

  const submitHandle = (e) => {
    e.preventDefault();

    setIsLoading(true);
    Base.post("/user/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("token", res.data.data.token);
        nav("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data.message);
        setPasswordErrorMessage(err.response.data.message);
        setEmailErrorMessage("none");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const googleHandle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const fullNameArray = user.displayName.split(" ");
        const firstName = fullNameArray[0];
        const lastName =
          fullNameArray.length > 1 ? fullNameArray.slice(1).join(" ") : "";

        SignUpGoogle(firstName, lastName, user.email, user.photoURL);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const SignUpGoogle = (firstName, lastName, email, photo) => {
    setIsLoading(true);
    Base.post("/user/auth/google", {
      firstname: firstName,
      lastname: lastName,
      email: email,
      photo: photo,
    })
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("token", res.data.data.token);
        nav("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout>
      <form
        onSubmit={submitHandle}
        className="flex flex-col items-start md:px-14 md:py-12 md:pr-32 justify-start md:gap-5"
      >
        <header className="flex flex-col gap-4">
          <h3 className="font-semibold text-nowrap">Masuk Akun</h3>
          <p className="b2 text-nowrap text-neutral-400">
            Masuk ke akun Flona dan lanjutkan aksi nyata Anda untuk lingkungan!
          </p>
        </header>

        <div className="flex flex-col gap-1.5 sm:gap-3 w-full">
          <Input
            type="email"
            id="email"
            textLabel={"Email"}
            holder="Masukkan Email"
            message={emailErrorMessage}
            messageType="error"
            handleChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <Input
            type="password"
            id="password"
            textLabel={"Kata Sandi"}
            holder="Masukkan Kata Sandi"
            message={passwordErrorMessage}
            messageType="error"
            handleChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
            <PrimerButton
              type={"submit"}
              name={"Masuk"}
              isDisabled={
                !email ||
                !password
              }
            />

            <div className="flex items-center gap-1 sm:gap-2 self-stretch">
              <div className="flex-grow h-0.5 bg-neutral-300 mx-2"></div>
              <div className="text-neutral-300 b3">Atau Masuk dengan</div>
              <div className="flex-grow h-0.5 bg-neutral-300 mx-2"></div>
            </div>

            <GoogleButton handle={googleHandle} />
          </div>
      </form>
    </AuthLayout>
  );
};

export default Masuk;
