import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { LoadingContext } from "../../context/LoadingContext";
import { Base } from "../../api/Api";
import Input from "../../components/common/inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import PrimerButton from "../../components/common/button/PrimerButton";
import GoogleButton from "../../components/common/button/GoogleButton";

const Daftar = () => {
  const nav = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [
    confirmationPasswordErrorMessage,
    setConfirmationPasswordErrorMessage,
  ] = useState("");

  const { setIsLoading } = useContext(LoadingContext);

  const provider = new GoogleAuthProvider();

  const submitHandle = (e) => {
    e.preventDefault();

    setIsLoading(true);
    Base.post("/user/register", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        nav("/masuk");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data.message);
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
          <h3 className="font-semibold text-nowrap">Daftar Akun</h3>
          <p className="b2 text-nowrap text-neutral-400">
            Daftar dan mulai aksi nyata untuk lingkungan bersama Flona!
          </p>
        </header>

        <div className="flex flex-col gap-1.5 sm:gap-3 w-full">
          <Input
            type="text"
            id="namaDepan"
            textLabel={"Nama Depan"}
            holder="Masukkan Nama Depan"
            handleChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            type="text"
            id="namaBelakang"
            textLabel={"Nama Belakang"}
            holder="Masukkan Nama Belakang"
            handleChange={(e) => setLastname(e.target.value)}
          />
          <Input
            type="email"
            id="email"
            textLabel={"Email"}
            holder="Masukkan Email"
            message={emailErrorMessage}
            messageType="warning"
            handleChange={(e) => {
              setEmail(e.target.value)
              setEmailErrorMessage(
                e.target.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                  ? "Format email tidak valid."
                  : ""
              );
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
              setPasswordErrorMessage(
                e.target.value.length && (e.target.value.length < 8 || !/\d/.test(e.target.value))
                  ? "Password harus minimal 8 karakter dan mengandung huruf serta angka."
                  : ""
              );
            }}
          />
          <Input
            type="password"
            id="confirmationPassword"
            textLabel={"Konfirmasi Kata Sandi"}
            holder="Masukkan Konfirmasi Kata Sandi"
            message={confirmationPasswordErrorMessage}
            messageType="error"
            handleChange={(e) => {
              setConfirmationPassword(e.target.value)
              setConfirmationPasswordErrorMessage(
                e.target.value !== password ? "Konfirmasi password tidak sesuai." : ""
    )}}
          />
        </div>

        <div className="flex flex-row gap-2.5">
          <input
            type="checkbox"
            className="self-start"
            onChange={() => setIsCheck(!isCheck)}
            checked={isCheck}
          />
          <p className="flex flex-row gap-1 text-nowrap b3 text-neutral-400">
            Saya telah memahami dan setuju dengan
            <Link
              className="text-system-highlight underline text-nowrap"
              to={"/snk"}
            >
              syarat & ketentuan
            </Link>
            serta
            <Link className="text-system-highlight text-nowrap" to={"/kp"}>
              kebijakan privasi
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full">
            <PrimerButton
              type={"submit"}
              name={"Daftar"}
              isDisabled={
                !isCheck ||
                !firstname ||
                !lastname ||
                !email ||
                !password ||
                !confirmationPassword ||
                password !== confirmationPassword
              }
            />

            <div className="flex items-center gap-1 sm:gap-2 self-stretch">
              <div className="flex-grow h-0.5 bg-neutral-300 mx-2"></div>
              <div className="text-neutral-300 b3">Atau Daftar dengan</div>
              <div className="flex-grow h-0.5 bg-neutral-300 mx-2"></div>
            </div>

            <GoogleButton handle={googleHandle} />
          </div>
      </form>
    </AuthLayout>
  );
};

export default Daftar;
