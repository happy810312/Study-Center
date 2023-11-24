import React from "react";
import { Link } from "react-router-dom";
import {
  LogoIcon,
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  LineIcon,
  ArrowRightIcon,
} from "../components/icons";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_wrapper">
          <div className="footer-left">
            <div className="footer-left_title">
              <Link to="/" className="footer-left_title-logo">
                <LogoIcon width={"40px"} height={"40px"} />
                <span className="footer-left_title-name">K Study Center.</span>
              </Link>
              <span className="footer-left_left_title-description">
                NoCopyright © 2023 K Study Center
                <br />
                No Rights Reserved
              </span>
              <div className="footer-left_icons">
                <div className="footer-left_icon-item">
                  <Link
                    to="https://www.facebook.com/profile.php?id=100064738357460&locale=zh_TW"
                    target="_blank"
                  >
                    <FacebookIcon />
                  </Link>
                </div>
                <div className="footer-left_icon-item">
                  <Link
                    to="https://www.instagram.com/explore/locations/268145671/k-k/"
                    target="_blank"
                  >
                    <InstagramIcon />
                  </Link>
                </div>
                <div className="footer-left_icon-item">
                  <Link to="#">
                    <TelegramIcon />
                  </Link>
                </div>
                <div className="footer-left_icon-item">
                  <Link to="#">
                    <LineIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-navigation">
            <ul className="footer-navigation_menu">
              <li className="footer-navigation_menu-item">
                <Link to="#">About Us</Link>
              </li>
              <li className="footer-navigation_menu-item">
                <Link to="/news">News</Link>
              </li>
              <li className="footer-navigation_menu-item">
                <Link to="/schedule">Schedule</Link>
              </li>
              <li className="footer-navigation_menu-item">
                <Link to="/book">Program Plan</Link>
              </li>
              <li className="footer-navigation_menu-item">
                <Link to="#">GMB</Link>
              </li>
              <li className="footer-navigation_menu-item">
                <Link to="#">Contact Us</Link>
              </li>
              <li className="footer-navigation_menu-item">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="footer-navigation_menu-item">
                <Link to="/user-terms">User Terms</Link>
              </li>
            </ul>
          </div>
          <div className="footer-subscribe">
            <span className="footer-subscribe_text">
              Stay updated on our latest promotions. Please leave your
              information, and one of our specialists will get in touch with
              you.
            </span>
            <div className="footer-subscribe_input">
              <input type="text" placeholder="Enter Your E-Mail" />
              <button type="button">
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
