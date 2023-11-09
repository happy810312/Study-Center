import React, { useState, useRef } from "react";

const SeatCategoriesComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleMouseUp = (e) => {
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX;
    const diff = newX - startX;
    setTranslateX(translateX + diff);
  };
  const handleRightArrow = () => {
    const diff = 388;
    console.log(translateX);
    if (translateX == 0) return;
    setTranslateX(translateX + diff);
  };
  const handleLeftArrow = () => {
    const diff = 388;
    console.log(translateX);
    if (translateX == -diff) return;
    setTranslateX(translateX - diff);
  };

  return (
    <section className="seat-categories trigger-for-header-grey-light">
      <div className="container">
        <div className="seat-categories_wrapper">
          <h2 className="seat-categories_title">Our Seat Categories.</h2>
          <div className="seat-categories_nav-slider">
            <div
              onClick={handleRightArrow}
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
            </div>
            <div
              onClick={handleLeftArrow}
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
            </div>
          </div>
          <div
            className="seat-categories_slider"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            <ul className="seat-categories_list">
              <li className="seat-categories_card">
                <div className="seat-categories_card-image">
                  <img
                    src="./images/seatCategories-images/single-occupancy-study-room.png"
                    alt="Single Occupancy Study Room"
                  />
                </div>
                <div className="seat-categories_card-categories">
                  <h3 className="seat-categories_card-categories-title">
                    Single Occupancy Study Room
                  </h3>
                  <span className="seat-categories_card-categories-description">
                    Our Single Occupancy Study Room at K Study Center offers a
                    private and focused environment for individuals seeking a
                    tranquil space to delve into their academic pursuits. This
                    dedicated room is designed to cater to the needs of those
                    who prefer to study or work alone.
                  </span>
                </div>
              </li>
              <li className="seat-categories_card">
                <div className="seat-categories_card-image">
                  <img
                    src="./images/seatCategories-images/double-occupancy-study-room.png"
                    alt="Double Occupancy Study Room"
                  />
                </div>
                <div className="seat-categories_card-categories">
                  <h3 className="seat-categories_card-categories-title">
                    Double Occupancy Study Room
                  </h3>
                  <span className="seat-categories_card-categories-description">
                    Our Double Occupancy Study Room at K Study Center provides a
                    collaborative and conducive space for pairs of individuals
                    looking to study, work, or research together. It's an ideal
                    setting for those who thrive on shared knowledge and
                    motivation.
                  </span>
                </div>
              </li>
              <li className="seat-categories_card">
                <div className="seat-categories_card-image">
                  <img
                    src="./images/seatCategories-images/large-seating-area.png"
                    alt="Large Seating Area"
                  />
                </div>
                <div className="seat-categories_card-categories">
                  <h3 className="seat-categories_card-categories-title">
                    Large Seating Area
                  </h3>
                  <span className="seat-categories_card-categories-description">
                    Large Seating Area is a spacious and comfortable zone
                    designed to accommodate individuals or groups seeking an
                    expansive and relaxed environment for various activities.
                  </span>
                </div>
              </li>
              <li className="seat-categories_card">
                <div className="seat-categories_card-image">
                  <img
                    src="./images/seatCategories-images/single-seating-area.png"
                    alt="Single Seating Area"
                  />
                </div>
                <div className="seat-categories_card-categories">
                  <h3 className="seat-categories_card-categories-title">
                    Single Seating Area
                  </h3>
                  <span className="seat-categories_card-categories-description">
                    Single Seating Area is where you'll find a dedicated space
                    designed for individuals seeking a focused and tranquil
                    environment for their work, study, or research needs.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatCategoriesComponent;
