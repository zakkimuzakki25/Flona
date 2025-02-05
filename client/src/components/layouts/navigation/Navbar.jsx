import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataNavbar } from "../../../data/DataNavbar";
import logo from "../../../assets/logo/logo-white.svg";
import { DefaultPhotoProfile } from "../../../data/DefaultData";
import { BaseAPI } from "../../../api/Api";
import HamburgerButton from "../../common/button/HamburgerButton";

const Navbar = () => {
  const loc = useLocation();

  const [isHidden, setIsHidden] = useState(false);
  const [photo, setPhoto] = useState("");
  const token = window.localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (token) {
      getDataUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getDataUser = () => {
    BaseAPI.get("navbar", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(
      (res) => {
        console.log("data", res);
        const pic = res?.data?.data?.photo;
        if (pic == "") {
          setPhoto(DefaultPhotoProfile);
        } else {
          setPhoto(pic);
        }
      },
      (err) => {
        console.log("error : ", err);
        window.localStorage.setItem("token", "");
      }
    );
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (
        window.scrollY > navbar.offsetHeight &&
        lastScrollY < window.scrollY
      ) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        "w-full flex flex-col justify-center items-center fixed top-0 left-0 z-50"
      }
    >
      <nav
        className={`${
          isHidden && `-translate-y-full`
        } navbar transition-all flex px-5 py-10 md:px-24 md:py-0 w-full h-navbar-default md:h-navbar-md bg-primary-500 shadow-default justify-center items-center`}
      >
        <div className="flex w-full justify-between items-center">
          <Link
            to={"/"}
            className="flex items-center hover:scale-105 transition-all"
          >
            <img src={logo} alt="" className="h-7 md:h-10" />
          </Link>

          <div className="flex-row flex gap-3 sm:gap-16 tracking-wider">
            {DataNavbar.map((list, index) => {
              return (
                <Link
                  key={index}
                  to={list.path}
                  className={`${
                    loc.pathname.includes(list.path)
                      ? "cursor-default text-primary-200"
                      : "hover:scale-110"
                  } ds items-center box-border transition-all duration-150 bg-none hidden sm:flex font-semibold text-white`}
                >
                  <h4>{list.name}</h4>
                </Link>
              );
            })}
          </div>

          {/* profile */}
          {token ? (
            <Link
              to="/profile"
              className={`w-fit h-10 rounded-full bg-primary-400 flex flex-row border-y-2 border-r-2 border-white items-center relative`}
            >
              <img
                src={
                  photo
                    ? photo
                    : "https://i.pinimg.com/originals/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
                }
                referrerPolicy="no-referrer"
                className="w-10 h-10 object-cover rounded-full border-2 border-white absolute"
              />
              <p className="b2 px-3 font-semibold text-white ml-10 text-nowrap">M. Iqbal Muzakki</p>
            </Link>
          ) : (
            <>
              <div className="sm:flex flex-row gap-4 items-center hidden font-bold h-fit tracking-wide">
                <Link
                  to="/daftar"
                  className={`flex items-center hover:scale-110 h-fit transition-all duration-150 bg-none text-primary-200`}
                >
                  <p className="b1">Daftar</p>
                </Link>

                <Link
                  to="/masuk"
                  className={`flex hover:scale-110 transition-all duration-150 bg-none px-1 lg:px-5 py-0.5 lg:py-1.5 rounded-lg bg-primary-400 text-white`}
                >
                  <p className="b1">Masuk</p>
                </Link>
              </div>
            </>
          )}

          {/* hamburger menu */}
          <div className="flex sm:hidden h-full w-full justify-center items-center">
            <HamburgerButton handle={handleButtonClick} isOpen={menuOpen} />
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div
          className={`bg-white text-black h-fit w-full lg:w-full justify-around items-center flex flex-col transition-all duration-300 animate-navbar-hide py-7 z-40`}
        >
          {DataNavbar.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`${
                loc.pathname.includes(item.path)
                  ? "text-oldGreen cursor-default"
                  : "hover:scale-110 hover:text-black"
              } flex ds items-center box-border transition-all duration-150 bg-none`}
            >
              <h3>{item.name}</h3>
            </Link>
          ))}
          {!token && (
            <div className="flex flex-row gap-5 items-center mt-5">
              <Link
                to="/masuk"
                className={` flex ds hover:scale-110 items-center box-border hover:text-black transition-all duration-150 bg-none `}
              >
                <h3>Masuk</h3>
              </Link>

              <Link
                to="/daftar"
                className={`flex ds items-center h-fit text-white box-border hover:text-black transition-all duration-150 bg-none px-3 py-0.5 bg-oldGreen rounded-2xl`}
              >
                <h3>Daftar</h3>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
