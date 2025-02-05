import Footer from "./navigation/Footer";
import Navbar from "./navigation/Navbar";

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="flex w-full h-auto">
        <div
          className="w-full bg-cover bg-center hidden lg:block"
          style={{
            backgroundImage:
              "url('https://firebasestorage.googleapis.com/v0/b/flonn-pubek.appspot.com/o/assets%2Fauth%2Fauth%20image.png?alt=media&token=5632baa4-1d73-48b1-8274-8986ad330290')",
          }}
          aria-hidden="true"
        />

        <main className="w-fit flex flex-col justify-start pt-navbar-default sm:pt-navbar-md min-h-screen">
          {children}
        </main>
      </section>

      <Footer />
    </div>
  );
};

export default AuthLayout;
