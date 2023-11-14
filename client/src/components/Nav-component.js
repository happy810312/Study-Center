import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthService from "../services/auth-service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const [navBarClass, setNavBarClass] = useState("header-grey-light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功");
    setCurrentUser(null);
  };
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // 監聽子節點位置的變化
    const handleScroll = () => {
      // useRef.current. "DOM元素屬性"
      const navBarHeight = navRef.current.offsetHeight;
      const childNodes = document.querySelectorAll(
        ".trigger-for-header-grey-light, .trigger-for-header-dark"
      );

      childNodes.forEach((node) => {
        const nodeTop = node.getBoundingClientRect().top;
        if (nodeTop < navBarHeight) {
          // 子節點進入 navigation bar 高度範圍內
          if (node.classList.contains("trigger-for-header-grey-light")) {
            setNavBarClass("header-grey-light");
            // console.log(1);
          } else {
            setNavBarClass("header-dark");
            // console.log(2); // 會以最後一個setNavBarClass來結束，所以雖然更上面的也小於navBarHeight
            // 但仍然是以最後改變的為主
          }
        }
      });
    };
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // pathname改變時會在執行一次
  }, [location.pathname]);

  return (
    <header ref={navRef} className={`header ${navBarClass}`}>
      <div className="header-container">
        <section className="header-logo">
          <Link to="/">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              viewBox="0 0 225.000000 225.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              {" "}
              <g
                transform="translate(0.000000,225.000000) scale(0.050000,-0.050000)"
                stroke="none"
              >
                {" "}
                <path d="M1990 4289 c-184 -92 -350 -332 -350 -506 0 -82 58 -287 91 -324 16 -18 29 -43 29 -56 0 -12 7 -23 15 -23 8 0 47 -30 85 -66 414 -388 1119 84 937 628 -30 90 -170 278 -208 278 -16 0 -29 9 -29 21 0 97 -404 131 -570 48z m317 -137 c67 -20 93 -22 93 -5 0 13 23 -3 50 -35 28 -32 50 -66 50 -75 0 -9 12 -17 26 -17 47 0 100 -135 58 -146 -20 -6 -11 -10 21 -12 63 -2 72 -61 34 -212 -11 -44 -23 -91 -26 -104 -8 -37 -33 -56 -33 -25 0 15 -27 -10 -60 -55 -68 -92 -77 -97 -207 -117 -179 -26 -413 77 -413 183 0 14 -16 41 -35 60 -50 51 -49 279 2 357 29 44 41 50 55 29 12 -20 17 -12 18 26 0 43 7 52 33 42 19 -7 28 -5 22 7 -20 32 13 65 96 95 101 37 105 37 216 4z" />{" "}
                <path d="M1478 3039 c-19 -12 34 -192 62 -209 9 -6 69 3 133 20 166 43 1036 43 1140 0 40 -16 83 -30 97 -30 24 0 119 198 102 214 -12 13 -1514 17 -1534 5z" />{" "}
                <path d="M1060 2800 c-238 -23 -458 -101 -497 -175 -11 -20 -18 -455 -18 -1010 l0 -976 62 42 c236 157 796 232 1139 151 135 -32 139 -34 139 -102 0 -72 0 -72 360 -74 l325 -3 6 72 c17 201 1002 178 1271 -30 42 -33 82 -52 90 -42 7 9 9 458 3 996 l-10 980 -80 52 c-112 73 -315 115 -632 131 l-272 14 -11 -138 c-7 -76 -26 -205 -42 -288 -17 -82 -58 -312 -92 -510 -60 -348 -84 -481 -123 -670 -10 -49 -23 -126 -30 -170 -23 -153 -51 -194 -135 -202 -43 -3 -87 -15 -100 -25 -35 -29 -324 -38 -319 -10 3 12 -6 21 -20 20 -186 -16 -222 40 -292 457 -23 132 -63 357 -91 500 -27 143 -78 433 -114 645 l-65 385 -151 -3 c-83 -1 -218 -9 -301 -17z m341 -221 c10 -16 20 -51 21 -79 3 -38 6 -34 16 20 12 64 59 -254 58 -390 -1 -22 12 -71 27 -108 20 -51 21 -70 4 -76 -18 -6 -16 -28 7 -82 20 -48 31 -133 30 -241 -1 -120 5 -164 22 -157 17 6 23 -20 21 -84 -2 -53 1 -67 6 -34 12 66 67 137 67 85 0 -16 -10 -33 -23 -37 -16 -6 -17 -40 -2 -127 13 -74 14 -123 2 -131 -11 -6 -20 -30 -22 -52 -3 -33 -10 -37 -36 -21 -23 15 -114 11 -302 -13 -148 -19 -283 -28 -301 -22 -18 7 -38 3 -45 -9 -7 -11 -31 -21 -53 -21 -24 0 -35 -9 -27 -22 10 -15 3 -16 -24 -3 -20 11 -48 16 -62 11 -28 -10 -37 1484 -10 1526 8 12 42 32 75 43 l60 22 -60 5 c-95 8 183 28 367 27 121 -1 171 -10 184 -30z m1994 11 c378 -33 345 49 345 -845 l0 -741 -63 -22 c-35 -12 -68 -18 -74 -12 -5 5 3 11 19 12 53 4 -252 56 -337 57 -50 0 -85 10 -85 24 0 16 -45 19 -156 11 -182 -14 -237 -4 -250 45 -7 28 0 34 31 26 36 -10 38 -4 25 73 -14 84 8 434 25 387 6 -18 17 -16 41 9 21 20 25 36 12 40 -13 4 -19 38 -14 82 4 41 8 88 8 104 0 62 44 260 58 260 8 0 9 29 2 65 -13 63 12 155 43 155 8 0 15 14 15 30 0 17 -8 30 -18 30 -10 0 -23 13 -29 29 -7 19 -1 25 16 19 19 -8 31 14 41 71 13 76 18 81 82 81 37 0 68 10 68 22 0 12 14 17 30 11 17 -7 91 -17 165 -23z" />{" "}
              </g>{" "}
            </svg>
          </Link>
          <Link to="/">K Study Center.</Link>
        </section>
        <nav className="header-navigation">
          <ul className="header-menu">
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/schedule">Schedule</Link>
            </li>
            <li className="menu-company">
              <Link to="#">
                Company
                <span
                  style={{
                    position: "absolute",
                    left: "100%",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                  </svg>
                </span>
              </Link>
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/googleMyBusiness">Google My Business</Link>
                </li>
              </ul>
            </li>
            {currentUser && currentUser.user.role == "reader" && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {currentUser && currentUser.user.role == "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </nav>
        <ul className="header-btn_desktop">
          <li>
            <Link to="/plan">Book a Seat</Link>
          </li>
          {!currentUser && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link onClick={handleLogout} to="/">
                Logout
              </Link>
            </li>
          )}
        </ul>
        <div
          onClick={handleMenuOpen}
          className={`header-btn_mobile ${isMenuOpen ? "menu-open" : ""}`}
        >
          <div className="header-btn_mobile-between"></div>
        </div>
      </div>
      <div className="header-mobile_menu"></div>
    </header>
  );
};

export default NavComponent;
