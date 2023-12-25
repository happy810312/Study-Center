import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthService from "../services/auth-service";
import { LogoIcon, ArrowDownIcon } from "../components/icons";
import { throttle } from "../utils";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const [navBarClass, setNavBarClass] = useState("header-grey-light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    AuthService.logout();
    window.alert("登出成功");
    setCurrentUser(null);
  };
  const handleMenuOpen = () => {
    // menu open時不可以捲動畫面
    isMenuOpen
      ? (document.body.style.overflow = "")
      : (document.body.style.overflow = "hidden");
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };
  const checkScrollDirection = () => {
    let lastScrollTop = 0;
    return () => {
      const currentScrollTop = window.scrollY;

      // 使用callback，更新state在檢查條件
      // 避免同時觸發兩個條件
      setScrollingDown((prevScrollingDown) => {
        if (!prevScrollingDown && currentScrollTop > lastScrollTop) {
          return true;
        } else if (prevScrollingDown && currentScrollTop < lastScrollTop) {
          return false;
        }
        return prevScrollingDown;
      });
      lastScrollTop = currentScrollTop;
    };
  };

  // mobile版畫面突然變大，且menu還是放下的狀態 => 自動縮回
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 992 && isMenuOpen) {
        setIsMenuOpen(false);
        handleMenuOpen();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // mobile版若發生網址變化，且menu還是放下的狀態 => 自動縮回
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
      document.body.style.overflow = "";
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  // 自動調整nav bar顏色
  useEffect(() => {
    // 監聽子節點位置的變化
    const handleScroll = throttle(() => {
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
    });
    handleScroll(); // 初始化

    // 初始化導覽列隱藏功能
    const check = checkScrollDirection();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", check);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", check);
    };
    // pathname改變時會在執行一次
  }, [location.pathname]);
  return (
    <header
      ref={navRef}
      className={`header ${navBarClass}`}
      style={
        scrollingDown
          ? { transform: `translateY(-${navRef.current.offsetHeight}px)` }
          : { transform: "translateY(0)" }
      }
    >
      <div className="header-container">
        <section className="header-logo">
          <Link to="/">
            <LogoIcon width={"75px"} height={"75px"} />
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
                  <ArrowDownIcon width={"20px"} height={"20px"} />
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
            {currentUser && currentUser.user.role === "reader" && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {currentUser && currentUser.user.role === "admin" && (
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
      {isMenuOpen && (
        <motion.div
          // initial={false}
          // animatie={isOpen ? "open" : "closed"}
          // variants={variants}
          className="header-mobile_menu"
        >
          <div className="container">
            <div className="header-mobile_menu_wrapper">
              <nav className="header-mobile_navigation">
                <ul className="header-mobile_navigation-menu">
                  <li className="header-mobile_navigation-list">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="header-mobile_navigation-list">
                    <Link to="/news">News</Link>
                  </li>
                  <li className="header-mobile_navigation-list">
                    <Link to="/schedule">Schedule</Link>
                  </li>
                  <li className="header-mobile_navigation-list menu-list-has-children">
                    <Link to="#">Company</Link>
                    <ul className="header-mobile_navigation-children-menu">
                      <li className="header-mobile_navigation-children-list">
                        <Link to="/about">About</Link>
                      </li>
                      <li className="header-mobile_navigation-children-list">
                        <Link to="/googleMyBusiness">Google My Business</Link>
                      </li>
                    </ul>
                  </li>
                  {currentUser && currentUser.user.role === "reader" && (
                    <li className="header-mobile_navigation-list">
                      <Link to="/profile">Profile</Link>
                    </li>
                  )}

                  {currentUser && currentUser.user.role === "admin" && (
                    <li className="header-mobile_navigation-list">
                      <Link to="/admin">Admin</Link>
                    </li>
                  )}
                </ul>
              </nav>
              <ul className="header-mobile">
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
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default NavComponent;
