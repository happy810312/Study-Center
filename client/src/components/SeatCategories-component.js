import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const SeatCategoriesComponent = () => {
  // card information
  const cardContent = [
    {
      img_src: "./images/seatCategories-images/single-occupancy-study-room.png",
      img_alt: "Single Occupancy Study Room",
      title: "Single Occupancy Study Room",
      description:
        "Our Single Occupancy Study Room at K Study Center offers a private and focused environment for individuals seeking a tranquil space to delve into their academic pursuits. This dedicated room is designed to cater to the needs of those who prefer to study or work alone.",
    },
    {
      img_src: "./images/seatCategories-images/double-occupancy-study-room.png",
      img_alt: "Double Occupancy Study Room",
      title: "Double Occupancy Study Room",
      description:
        "Our Double Occupancy Study Room at K Study Center provides a collaborative and conducive space for pairs of individuals looking to study, work, or research together. It's an ideal setting for those who thrive on shared knowledge and motivation.",
    },
    {
      img_src: "./images/seatCategories-images/large-seating-area.png",
      img_alt: "Large Seating Area",
      title: "Large Seating Area",
      description:
        "Large Seating Area is a spacious and comfortable zone designed to accommodate individuals or groups seeking an expansive and relaxed environment for various activities.",
    },
    {
      img_src: "./images/seatCategories-images/single-seating-area.png",
      img_alt: "Single Seating Area",
      title: "Single Seating Area",
      description:
        "Single Seating Area is where you'll find a dedicated space designed for individuals seeking a focused and tranquil environment for their work, study, or research needs.",
    },
  ];
  // hooks
  const cardRef = useRef(null);
  const constraintsRef = useRef(null);
  const [cardWidthWithPadding, setCardWidthWithPadding] = useState(0);
  const [cardsAmountInScreen, setCardsAmountInScreen] = useState(0);
  // desktop slider's arrow
  const controls = useAnimation();

  // mobile drag

  useLayoutEffect(() => {
    const updateCardInfo = () => {
      setCardWidthWithPadding(cardRef.current.getBoundingClientRect().width);
      setCardsAmountInScreen(
        Math.floor(window.innerWidth / cardWidthWithPadding)
      );
    };

    updateCardInfo(); // 初次渲染時計算一次card width、card amount

    window.addEventListener("resize", updateCardInfo);

    return () => {
      window.removeEventListener("resize", updateCardInfo);
    };
  }, [cardWidthWithPadding, cardsAmountInScreen]);

  return (
    <section className="seat-categories trigger-for-header-grey-light">
      <div className="container">
        <div className="seat-categories_wrapper">
          <h2 className="seat-categories_title">Our Seat Categories.</h2>
          <div className="seat-categories_nav-slider">
            <motion.div
              // handleLeftArrow
              data-direction={1}
              onClick={() => {}}
              className="seat-categories_nav-slider-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" />
              </svg>
            </motion.div>
            <motion.div
              // handleRightArrow
              data-direction={-1}
              onClick={() => {}}
              className="seat-categories_nav-slider-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" />
              </svg>
            </motion.div>
          </div>
          <div ref={constraintsRef} className="seat-categories_slider">
            <div>
              <motion.ul
                className="seat-categories_list"
                drag="x"
                // dragConstraints={{
                //   right: cardWidthWithPadding,
                //   left:
                //     -(cardContent.length - cardsAmountInScreen) *
                //     cardWidthWithPadding,
                // }}
                dragConstraints={constraintsRef}
                dragElastic={0.3}
                animate={controls}
              >
                <AnimatePresence>
                  {cardContent.map((card, index) => {
                    return (
                      <motion.li
                        ref={cardRef}
                        className="seat-categories_card"
                        key={index}
                      >
                        <div className="seat-categories_card-image">
                          <img src={card.img_src} alt={card.img_alt} />
                        </div>
                        <div className="seat-categories_card-categories">
                          <h3 className="seat-categories_card-categories-title">
                            {card.title}
                          </h3>
                          <span className="seat-categories_card-categories-description">
                            {card.description}
                          </span>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatCategoriesComponent;
