import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";

import HomepagePrinter from "../components/Homepage-printer-component";
import HomepageSlider from "../components/Homepage-slider-component";
import SeatCategories from "../components/SeatCategories-component";

const HomePage = ({ currentUser, setCurrentUser }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [magicCardOpacity, setMagicCardOpacity] = useState(0);
  const [magicCardTransform, setMagicCardTransform] = useState(0);
  const margicCardRef = useRef(null);
  const animationProps = useSpring({
    opacity: showAnimation ? magicCardOpacity : 1,
    transform: showAnimation
      ? `translateY(-${magicCardTransform}px)`
      : "translateY(0)",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition =
        window.innerHeight * 5 + margicCardRef.current.offsetHeight / 1.33;

      console.log(scrollPosition, triggerPosition);
      console.log(margicCardRef.current.offsetHeight);
      if (scrollPosition >= triggerPosition) {
        setShowAnimation(true);
        setMagicCardOpacity(
          Math.max(1 - (window.scrollY - triggerPosition) / 250, 0)
        );
        setMagicCardTransform(
          Math.min(window.scrollY - triggerPosition) / 50,
          100
        );
      } else {
        setShowAnimation(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="home-hero trigger-for-header-grey-light">
        <div className="container">
          <div className="home-hero_wrapper">
            <HomepagePrinter />
            <div className="home-hero_images">
              <div className="home-hero_image-main">
                <img
                  src="/images/homepage-images/study-center-hero.jpg"
                  alt="study-center"
                />
              </div>
              <div className="home-hero_image-top-after">
                <img src="/images/homepage-images/moon.png" alt="moon" />
              </div>
              <div className="home-hero_image-top-behind">
                <img
                  src="/images/homepage-images/facebook-message.png"
                  alt="facebook-message"
                />
              </div>
              <div className="home-hero_image-bottom-behind">
                <img
                  src="/images/homepage-images/sleeping-bug.png"
                  alt="sleeping"
                />
              </div>
            </div>
            <div className="home-hero_description">
              <div className="home-hero_description-left">
                <p>
                  By offering a high-quality study environment, we make
                  efficiency your advantage in acing the entrance exams.
                </p>
              </div>
              <div className="home-hero_description-right">
                <p>
                  <span className="number">64%</span>
                  <span className="little">
                    of readers successfully pass an exam with only a 5%
                    acceptance rate.
                  </span>
                </p>
              </div>
            </div>
            <div className="home-hero_slider-title">
              <h2>Various types of exams successfully passed by readers.</h2>
            </div>
          </div>
          <HomepageSlider />
        </div>
      </section>
      <section className="study-center-achievement">
        <div className="container">
          <div className="study-center-achievement_wrapper">
            <h2 className="study-center-achievement_title">
              Finally, a convenient K Study Center that offers online seats
              reservations.
            </h2>
            <div className="study-center-achievement_info">
              <img
                src="./images/homepage-images/moon.png"
                alt="test"
                width={400}
                height={300}
              />
              <div className="study-center-achievement_info-text">
                <p>
                  Enhance <span>on-site</span> efficiency by reserving your seat
                  through our online booking system,{" "}
                  <span>saving Valuable Study Time</span>.
                </p>
              </div>
            </div>
            <ul className="study-center-achievement_items">
              <li className="mini-card">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    height="50"
                    width="50"
                    version="1.1"
                    id="Layer_1"
                    viewBox="0 0 512 512"
                  >
                    <g transform="translate(1 1)">
                      <g>
                        <g>
                          <path d="M103.96,152.6c5.12,0.853,9.387-2.56,9.387-7.68l0.853-14.507c0.853-6.827,5.973-11.947,12.8-11.947h50.347     c6.827,0,12.8,5.12,12.8,11.947L191,144.92c0,4.267,4.267,7.68,8.533,7.68c5.12,0,8.533-4.267,8.533-8.533l-0.853-14.507     c-0.853-16.213-14.507-28.16-29.867-28.16H127c-15.36,0-28.16,11.947-29.867,27.307l-0.853,14.507     C95.427,148.333,98.84,152.6,103.96,152.6z" />
                          <path d="M317.293,152.6c5.12,0.853,9.387-2.56,9.387-7.68l0.853-14.507c0.853-6.827,5.973-11.947,12.8-11.947h50.347     c6.827,0,12.8,5.12,12.8,11.947l0.853,14.507c0,4.267,4.267,7.68,8.533,7.68c5.12,0,8.533-4.267,8.533-8.533l-0.853-14.507     c-0.853-16.213-14.507-28.16-29.867-28.16h-50.347c-15.36,0-28.16,11.947-29.867,27.307l-0.853,14.507     C308.76,148.333,312.173,152.6,317.293,152.6z" />
                          <path d="M493.933,203.8h-34.541l-4.712-88.747c-1.707-26.453-23.893-47.787-51.2-47.787h-74.24     c-26.453,0-49.493,20.48-51.2,46.933c-2.298,28.337-5.282,65.6-7.103,89.6h-24.946l-5.498-88.747     c-1.707-26.453-23.893-47.787-51.2-47.787h-74.24c-26.453,0-48.64,20.48-51.2,46.933c-1.532,28.337-4.437,65.6-6.251,89.6H16.067     C6.68,203.8-1,211.48-1,220.867v17.067c0,6.28,3.447,11.782,8.533,14.746v44.988c0,14.507,11.093,25.6,25.6,25.6h8.533v8.533     c0,15.83,10.921,29.232,25.6,33.046v52.288c0,14.507,11.093,25.6,25.6,25.6c14.507,0,25.6-11.093,25.6-25.6v-51.2h68.267v51.2     c0,14.507,11.093,25.6,25.6,25.6c14.507,0,25.6-11.093,25.6-25.6v-51.2H255h17.067v51.2c0,14.507,11.093,25.6,25.6,25.6     s25.6-11.093,25.6-25.6v-51.2h68.267v51.2c0,14.507,11.093,25.6,25.6,25.6s25.6-11.093,25.6-25.6v-52.288     c14.679-3.814,25.6-17.216,25.6-33.046v-8.533h8.533c14.507,0,25.6-11.093,25.6-25.6v-44.988     c5.086-2.963,8.533-8.466,8.533-14.746v-17.067C511,211.48,503.32,203.8,493.933,203.8z M493.933,237.933h-51.2v-17.067h8.533     h42.667V237.933z M294.253,115.907c1.707-17.92,16.213-31.573,34.133-31.573h74.24c17.92,0,33.28,14.507,34.133,32.427     l5.12,87.04c-8.533,0-16.213,7.68-16.213,17.067v17.067c0,0.481,0.03,0.961,0.073,1.441c0.018,0.211,0.041,0.42,0.066,0.629     c0.024,0.186,0.055,0.371,0.086,0.556c0.809,5.167,3.947,9.578,8.308,12.119V280.6H289.133v-27.921     c4.362-2.541,7.499-6.952,8.308-12.119c0.03-0.185,0.061-0.37,0.086-0.556c0.026-0.209,0.048-0.418,0.066-0.629     c0.043-0.479,0.073-0.96,0.073-1.441v-17.067c0-0.506-0.031-1.005-0.076-1.501c-0.02-0.223-0.049-0.443-0.078-0.663     c-0.03-0.221-0.063-0.442-0.102-0.66c-0.966-5.727-4.796-10.506-9.966-12.79C289.151,181.348,291.702,143.968,294.253,115.907z      M255,306.2h-8.533c-5.12,0-8.533-3.413-8.533-8.533v-8.533V255h34.133v34.133v8.533c0,5.12-3.413,8.533-8.533,8.533H255z      M278.893,220.867h1.707v17.067h-51.2v-17.067h8.533H278.893z M80.92,115.907c1.707-17.92,16.213-31.573,34.133-31.573h74.24     c17.92,0,33.28,14.507,34.133,32.427l5.12,87.04c-8.533,0-16.213,7.68-16.213,17.067v17.067c0,0.481,0.03,0.961,0.073,1.441     c0.018,0.211,0.041,0.42,0.066,0.629c0.024,0.186,0.055,0.371,0.086,0.556c0.809,5.167,3.947,9.578,8.308,12.119V280.6H75.8     v-27.921c4.362-2.541,7.499-6.952,8.308-12.119c0.03-0.185,0.061-0.37,0.086-0.556c0.026-0.209,0.048-0.418,0.066-0.629     c0.043-0.479,0.073-0.96,0.073-1.441v-17.067c0-0.506-0.031-1.005-0.076-1.501c-0.02-0.223-0.049-0.443-0.078-0.663     c-0.03-0.221-0.063-0.442-0.102-0.66c-0.966-5.724-4.792-10.5-9.958-12.786C76.671,181.352,79.219,143.97,80.92,115.907z      M16.067,220.867H65.56h1.707v17.067h-51.2V220.867z M24.6,297.667V255h34.133v34.133v8.533c0,5.12-3.413,8.533-8.533,8.533     H33.133C28.013,306.2,24.6,302.787,24.6,297.667z M58.733,331.8v-9.909c9.463-3.176,16.164-11.575,16.976-22.068     c0.006-0.075,0.011-0.149,0.016-0.224c0.044-0.637,0.074-1.28,0.074-1.932h145.067c0,14.507,11.093,25.6,25.6,25.6v25.6H229.4     h-34.133h-85.333H75.8C66.413,348.867,58.733,341.187,58.733,331.8z M101.4,417.133c0,5.12-3.413,8.533-8.533,8.533     c-5.12,0-8.533-3.413-8.533-8.533v-51.2H101.4V417.133z M220.867,417.133c0,5.12-3.413,8.533-8.533,8.533     c-5.12,0-8.533-3.413-8.533-8.533v-51.2h17.067V417.133z M306.2,417.133c0,5.12-3.413,8.533-8.533,8.533     s-8.533-3.413-8.533-8.533v-51.2H306.2V417.133z M425.667,417.133c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533     v-51.2h17.067V417.133z M434.2,348.867h-34.133h-85.333H280.6h-17.067v-25.6c14.507,0,25.6-11.093,25.6-25.6H434.2     c0,0.652,0.03,1.294,0.074,1.932c0.005,0.075,0.01,0.15,0.016,0.224c0.812,10.493,7.513,18.892,16.976,22.068v9.909     C451.267,341.187,443.587,348.867,434.2,348.867z M485.4,297.667c0,5.12-3.413,8.533-8.533,8.533H459.8     c-5.12,0-8.533-3.413-8.533-8.533v-8.533V255H485.4V297.667z" />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="number">300+</span>
                <span className="name">seats</span>
              </li>
              <li className="mini-card">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 48 48"
                  >
                    <path d="M0 0h48v48H0z" fill="none" />
                    <g id="Shopicon">
                      <circle cx="20.083" cy="17.997" r="2" />
                      <circle cx="28.002" cy="17.997" r="2" />
                      <path d="M24.083,31.913C28.448,31.913,32,28.363,32,24h-4c0,2.157-1.757,3.913-3.917,3.913S20.166,26.157,20.166,24h-4   C16.166,28.363,19.718,31.913,24.083,31.913z" />
                      <path d="M41.369,19.029C39.205,11.517,32.282,6,24.083,6S8.961,11.517,6.797,19.029C5.282,19.177,4.083,20.448,4.083,22v4   c0,1.65,1.35,3,3,3c1.65,0,3-1.35,3-3v-2.002C10.084,16.279,16.364,10,24.083,10c7.72,0,14,6.28,14,14s-6.28,14-14,14v0h-2.014   c-1.65,0-3,1.35-3,3s1.35,3,3,3h4.014c1.552,0,2.824-1.199,2.971-2.714c5.931-1.709,10.606-6.384,12.315-12.315   c1.515-0.147,2.714-1.419,2.714-2.971v-4C44.083,20.448,42.884,19.176,41.369,19.029z" />
                    </g>
                  </svg>
                </div>
                <span className="number">24hrs</span>
                <span className="name">service</span>
              </li>
              <li className="mini-card">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      opacity="0.5"
                      d="M4.72718 2.73332C5.03258 2.42535 5.46135 2.22456 6.27103 2.11478C7.10452 2.00177 8.2092 2 9.7931 2H14.2069C15.7908 2 16.8955 2.00177 17.729 2.11478C18.5387 2.22456 18.9674 2.42535 19.2728 2.73332C19.5782 3.0413 19.7773 3.47368 19.8862 4.2902C19.9982 5.13073 20 6.24474 20 7.84202L20 18H7.42598C6.34236 18 5.96352 18.0057 5.67321 18.0681C5.15982 18.1785 4.71351 18.4151 4.38811 18.7347C4.27837 18.8425 4.22351 18.8964 4.09696 19.2397C4.02435 19.4367 4 19.5687 4 19.7003V7.84202C4 6.24474 4.00176 5.13073 4.11382 4.2902C4.22268 3.47368 4.42179 3.0413 4.72718 2.73332Z"
                      fill="#1C274D"
                    />
                    <path
                      d="M20 18H7.42598C6.34236 18 5.96352 18.0057 5.67321 18.0681C5.15982 18.1785 4.71351 18.4151 4.38811 18.7347C4.27837 18.8425 4.22351 18.8964 4.09696 19.2397C3.97041 19.5831 3.99045 19.7288 4.03053 20.02C4.03761 20.0714 4.04522 20.1216 4.05343 20.1706C4.16271 20.8228 4.36259 21.1682 4.66916 21.4142C4.97573 21.6602 5.40616 21.8206 6.21896 21.9083C7.05566 21.9986 8.1646 22 9.75461 22H14.1854C15.7754 22 16.8844 21.9986 17.7211 21.9083C18.5339 21.8206 18.9643 21.6602 19.2709 21.4142C19.4705 21.254 19.6249 21.0517 19.7385 20.75H8C7.58579 20.75 7.25 20.4142 7.25 20C7.25 19.5858 7.58579 19.25 8 19.25H19.9754C19.9926 18.8868 19.9982 18.4741 20 18Z"
                      fill="#1C274D"
                    />
                    <path
                      d="M7.25 7C7.25 6.58579 7.58579 6.25 8 6.25H16C16.4142 6.25 16.75 6.58579 16.75 7C16.75 7.41421 16.4142 7.75 16 7.75H8C7.58579 7.75 7.25 7.41421 7.25 7Z"
                      fill="#1C274D"
                    />
                    <path
                      d="M8 9.75C7.58579 9.75 7.25 10.0858 7.25 10.5C7.25 10.9142 7.58579 11.25 8 11.25H13C13.4142 11.25 13.75 10.9142 13.75 10.5C13.75 10.0858 13.4142 9.75 13 9.75H8Z"
                      fill="#1C274D"
                    />
                  </svg>
                </div>
                <span className="number">10,000+</span>
                <span className="name">success stories</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="more-for-study-center trigger-for-header-grey-light">
        <div className="container">
          <div className="more-for-study-center_wrapper">
            <div className="more-for-study-center_info">
              <div className="more-for-study-center_image">
                <img
                  src="./images/homepage-images/Calendar.png"
                  alt="calendar"
                />
              </div>
              <div className="more-for-study-center_info-text">
                <h2 className="more-for-study-center_title">
                  Give yourself more motivation to strive.
                </h2>
                <p className="more-for-study-center_description">
                  We make it easy for readers to track their study progress.We
                  push the most important information out so that users can
                  choose how often they'd like to check-in.
                </p>
                <img
                  src="./images/homepage-images/admission-Information.jpg"
                  alt="admission-information"
                />
                <p className="more-for-study-center_description">
                  <span className="number">2+ hours</span>On average, readers at
                  K Study Center can save over per day while achieving the same
                  study progress.
                </p>
                <div className="more-for-study-center_link">
                  <Link to="/news">Learn more</Link>
                </div>
              </div>
            </div>
            <div className="more-for-study-center_items">
              <ul className="more-for-study-center_items-list">
                <li className="more-for-study-center_item">
                  <div className="icon">
                    <svg
                      fill="#000000"
                      height="50"
                      width="50"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M304.056,150h-284C9.028,150,0,157.744,0,168.768v176C0,355.796,9.028,366,20.056,366H116v40.524l-21.856,14.808 c-1.456,0.988-2.088,3.484-1.572,5.164S94.648,430,96.404,430h131.292c0.024,0,0.06,0,0.08,0c2.212,0,4-2.468,4-4.676 c0-1.592-0.964-3.312-2.316-3.952L208,406.524V366h96.056C315.084,366,324,355.796,324,344.768v-176 C324,157.744,315.084,150,304.056,150z M172,374.536c0,5.604-4.392,10.168-10,10.168c-5.608,0-10-4.56-10-10.168V366h20V374.536z M300,342H24V174h276V342z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M484,82H368c-15.464,0-28,12.536-28,28v292c0,15.464,12.536,28,28,28h116c15.464,0,28-12.536,28-28V110 C512,94.536,499.464,82,484,82z M409.984,109.02c5.516,0,10,4.488,10,10c0,5.512-4.484,10-10,10s-10-4.488-10-10 C399.984,113.508,404.468,109.02,409.984,109.02z M378.056,105.02c7.72,0,14,6.28,14,14c0,7.72-6.28,14-14,14 c-7.72,0-14-6.28-14-14C364.056,111.3,370.336,105.02,378.056,105.02z M479.8,398H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,394.416,484.22,398,479.8,398z M479.8,370H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,366.416,484.22,370,479.8,370z M479.8,342H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,338.416,484.22,342,479.8,342z M479.8,314H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,310.416,484.22,314,479.8,314z M479.8,286H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,282.416,484.22,286,479.8,286z M488,250c0,2.208-1.788,4-4,4H368 c-2.212,0-4-1.792-4-4v-32c0-2.208,1.788-4,4-4h116c2.212,0,4,1.792,4,4V250z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </div>
                  <span>
                    Online seat reservation inquiry. Leave the brain-teasers to
                    us.
                  </span>
                </li>
                <li className="more-for-study-center_item">
                  <div className="icon">
                    <svg
                      fill="#000000"
                      height="50"
                      width="50"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M304.056,150h-284C9.028,150,0,157.744,0,168.768v176C0,355.796,9.028,366,20.056,366H116v40.524l-21.856,14.808 c-1.456,0.988-2.088,3.484-1.572,5.164S94.648,430,96.404,430h131.292c0.024,0,0.06,0,0.08,0c2.212,0,4-2.468,4-4.676 c0-1.592-0.964-3.312-2.316-3.952L208,406.524V366h96.056C315.084,366,324,355.796,324,344.768v-176 C324,157.744,315.084,150,304.056,150z M172,374.536c0,5.604-4.392,10.168-10,10.168c-5.608,0-10-4.56-10-10.168V366h20V374.536z M300,342H24V174h276V342z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M484,82H368c-15.464,0-28,12.536-28,28v292c0,15.464,12.536,28,28,28h116c15.464,0,28-12.536,28-28V110 C512,94.536,499.464,82,484,82z M409.984,109.02c5.516,0,10,4.488,10,10c0,5.512-4.484,10-10,10s-10-4.488-10-10 C399.984,113.508,404.468,109.02,409.984,109.02z M378.056,105.02c7.72,0,14,6.28,14,14c0,7.72-6.28,14-14,14 c-7.72,0-14-6.28-14-14C364.056,111.3,370.336,105.02,378.056,105.02z M479.8,398H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,394.416,484.22,398,479.8,398z M479.8,370H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,366.416,484.22,370,479.8,370z M479.8,342H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,338.416,484.22,342,479.8,342z M479.8,314H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,310.416,484.22,314,479.8,314z M479.8,286H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,282.416,484.22,286,479.8,286z M488,250c0,2.208-1.788,4-4,4H368 c-2.212,0-4-1.792-4-4v-32c0-2.208,1.788-4,4-4h116c2.212,0,4,1.792,4,4V250z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </div>
                  <span>Tailoring seat options to your reading habits.</span>
                </li>
                <li className="more-for-study-center_item">
                  <div className="icon">
                    <svg
                      fill="#000000"
                      height="50"
                      width="50"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M304.056,150h-284C9.028,150,0,157.744,0,168.768v176C0,355.796,9.028,366,20.056,366H116v40.524l-21.856,14.808 c-1.456,0.988-2.088,3.484-1.572,5.164S94.648,430,96.404,430h131.292c0.024,0,0.06,0,0.08,0c2.212,0,4-2.468,4-4.676 c0-1.592-0.964-3.312-2.316-3.952L208,406.524V366h96.056C315.084,366,324,355.796,324,344.768v-176 C324,157.744,315.084,150,304.056,150z M172,374.536c0,5.604-4.392,10.168-10,10.168c-5.608,0-10-4.56-10-10.168V366h20V374.536z M300,342H24V174h276V342z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M484,82H368c-15.464,0-28,12.536-28,28v292c0,15.464,12.536,28,28,28h116c15.464,0,28-12.536,28-28V110 C512,94.536,499.464,82,484,82z M409.984,109.02c5.516,0,10,4.488,10,10c0,5.512-4.484,10-10,10s-10-4.488-10-10 C399.984,113.508,404.468,109.02,409.984,109.02z M378.056,105.02c7.72,0,14,6.28,14,14c0,7.72-6.28,14-14,14 c-7.72,0-14-6.28-14-14C364.056,111.3,370.336,105.02,378.056,105.02z M479.8,398H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,394.416,484.22,398,479.8,398z M479.8,370H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,366.416,484.22,370,479.8,370z M479.8,342H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,338.416,484.22,342,479.8,342z M479.8,314H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,310.416,484.22,314,479.8,314z M479.8,286H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,282.416,484.22,286,479.8,286z M488,250c0,2.208-1.788,4-4,4H368 c-2.212,0-4-1.792-4-4v-32c0-2.208,1.788-4,4-4h116c2.212,0,4,1.792,4,4V250z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </div>
                  <span>
                    Providing readers with tea bags and a relaxation area to
                    keep you refreshed.
                  </span>
                </li>
                <li className="more-for-study-center_item">
                  <div className="icon">
                    <svg
                      fill="#000000"
                      height="50"
                      width="50"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M304.056,150h-284C9.028,150,0,157.744,0,168.768v176C0,355.796,9.028,366,20.056,366H116v40.524l-21.856,14.808 c-1.456,0.988-2.088,3.484-1.572,5.164S94.648,430,96.404,430h131.292c0.024,0,0.06,0,0.08,0c2.212,0,4-2.468,4-4.676 c0-1.592-0.964-3.312-2.316-3.952L208,406.524V366h96.056C315.084,366,324,355.796,324,344.768v-176 C324,157.744,315.084,150,304.056,150z M172,374.536c0,5.604-4.392,10.168-10,10.168c-5.608,0-10-4.56-10-10.168V366h20V374.536z M300,342H24V174h276V342z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                        <g>
                          {" "}
                          <g>
                            {" "}
                            <path d="M484,82H368c-15.464,0-28,12.536-28,28v292c0,15.464,12.536,28,28,28h116c15.464,0,28-12.536,28-28V110 C512,94.536,499.464,82,484,82z M409.984,109.02c5.516,0,10,4.488,10,10c0,5.512-4.484,10-10,10s-10-4.488-10-10 C399.984,113.508,404.468,109.02,409.984,109.02z M378.056,105.02c7.72,0,14,6.28,14,14c0,7.72-6.28,14-14,14 c-7.72,0-14-6.28-14-14C364.056,111.3,370.336,105.02,378.056,105.02z M479.8,398H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,394.416,484.22,398,479.8,398z M479.8,370H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,366.416,484.22,370,479.8,370z M479.8,342H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,338.416,484.22,342,479.8,342z M479.8,314H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,310.416,484.22,314,479.8,314z M479.8,286H372.064c-4.416,0-8-3.584-8-8 c0-4.416,3.584-8,8-8h107.74c4.416,0,8,3.584,8,8C487.804,282.416,484.22,286,479.8,286z M488,250c0,2.208-1.788,4-4,4H368 c-2.212,0-4-1.792-4-4v-32c0-2.208,1.788-4,4-4h116c2.212,0,4,1.792,4,4V250z"></path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </div>
                  <span>
                    Offering the highest-quality environment for academic
                    success.
                  </span>
                </li>
              </ul>
              <div className="more-for-study-center-items_image">
                <img
                  className="more-for-study-center-items_image-reservation"
                  src="./images/homepage-images/reservation.png"
                  alt="reservation"
                />
                <img
                  className="more-for-study-center-items_image-seats"
                  src="./images/homepage-images/reservation2.jpg"
                  alt="seats"
                  // width={300}
                  // height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="studying-magic trigger-for-header-dark">
        <div className="container">
          <div className="studying-magic_wrapper">
            <h2 className="studying-magic_title">
              Studying made so easy; it feels like magic.
            </h2>
            <span className="studying-magic_subtitle">
              You can select your seat with just one finger.
            </span>
            <div className="studying-magic_card-interactive">
              <div className="studying-magic_pin-spacer">
                <div className="studying-magic_cards">
                  <ul
                    ref={margicCardRef}
                    className="studying-magic_card-list"
                    style={
                      showAnimation
                        ? {
                            position: "fixed",
                            top: margicCardRef.current.getBoundingClientRect()
                              .top,
                            left: "50%",
                            transform: "translateX(-50%)",
                            padding: "0 1rem",
                          }
                        : { position: "relative" }
                    }
                  >
                    <li className="studying-magic_card studying-magic_card-0">
                      <animated.div
                        className="studying-magic_card-image"
                        style={animationProps}
                      >
                        <img
                          src="./images/homepage-images/login.png"
                          alt="login"
                          width={500}
                          height={500}
                        />
                      </animated.div>
                      <animated.div
                        className="studying-magic_card-description"
                        style={animationProps}
                      >
                        <span className="studying-magic_card-step">STEP1</span>
                        <h3 className="studying-magic_card-step">
                          Join K Study Center
                        </h3>
                      </animated.div>
                    </li>
                    {/* <li className="studying-magic_card studying-magic_card-1">
                      <div className="studying-magic_card-image"></div>
                      <div className="studying-magic_card-description">
                        <span className="studying-magic_card-step">STEP2</span>
                        <h3 className="studying-magic_card-step">
                          On-Site seat arrangement
                        </h3>
                      </div>
                    </li>
                    <li className="studying-magic_card studying-magic_card-2">
                      <div className="studying-magic_card-image"></div>
                      <div className="studying-magic_card-description">
                        <span>STEP3</span>
                        <h3>Automated reminders are sent</h3>
                      </div>
                    </li>
                    <li className="studying-magic_card studying-magic_card-3">
                      <div className="studying-magic_card-image"></div>
                      <div className="studying-magic_card-description">
                        <span>STEP4</span>
                        <h3>Admission Granted</h3>
                      </div>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="impressive-learning trigger-for-header-grey-light">
        <div className="container">
          <div className="impressive-learning_wrapper">
            <div className="impressive-learning_top">
              <div className="impressive-learning_top-image"></div>
              <div className="impressive-learning_top-text"></div>
            </div>
            <div className="impressive-learning_bottom">
              <div className="impressive-learning_bottom-text"></div>
              <div className="impressive-learning_bottom-image"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="studying-minutes">
        <div className="container">
          <div className="studying-minutes_wrapper">
            <h2 className="studying-minutes_title"></h2>
            <div className="studying-minutes_contents">
              <div className="studying-minutes_image"></div>
              <ul className="studying-minutes_list">
                <li className="studying-minutes_card"></li>
                <li className="studying-minutes_card"></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <SeatCategories />
    </>
  );
};

export default HomePage;
