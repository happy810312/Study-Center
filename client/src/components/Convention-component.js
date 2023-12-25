import React, { useState } from "react";

const ConventionComponent = () => {
  const [active, setActive] = useState(false);

  const handleToggleButton = (event) => {
    const clickedButton = event.target;
    const listItem = clickedButton.closest("li");
    console.log(listItem);
    if (listItem) {
      active
        ? listItem.classList.remove("active")
        : listItem.classList.add("active");
      setActive(!active);
    }
  };
  return (
    <section className="faq trigger-for-header-dark">
      <div className="container">
        <div className="faq_wrapper">
          <div className="faq-content">
            <h2 className="faq-title">Convention for K-Books</h2>
            <span className="faq-subtitle">
              To maintain a clean and conducive reading environment and enhance
              the quality of reading, please adhere to the following rules
              together.
            </span>
          </div>
          <div className="faq-accordion">
            <ul className="faq-accordion_list">
              <li className="faq-accordion_card">
                <h3 className="faq-accordion_card-title">
                  Before taking your seat, please be aware of the following
                </h3>
                <ol className="faq-accordion_card-contents">
                  <li className="faq-accordion_card-content">
                    Please set your mobile phone to silent mode.
                  </li>
                  <li className="faq-accordion_card-content">
                    Bringing food into the K Study Room is strictly prohibited.
                    Please refrain from dining in the K Study Room. (You may
                    have your meal in the lounge area and place your food on the
                    counter.)
                  </li>
                </ol>
                <button
                  onClick={handleToggleButton}
                  className="faq-accordion_card-arrow"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                  </svg>
                </button>
              </li>
              <li className="faq-accordion_card">
                <h3 className="faq-accordion_card-title">
                  In the K Study Room, please be mindful of the following
                </h3>
                <ol className="faq-accordion_card-contents">
                  <li className="faq-accordion_card-content">
                    Conversations and phone calls are not allowed in the K Study
                    Room. If you need to answer a phone call, please proceed to
                    the lounge area. Please refrain from answering calls in the
                    K Study Room corridor (carpeted area).
                  </li>
                  <li className="faq-accordion_card-content">
                    Please minimize noise from plastic bags, beverages, flipping
                    through books, pen movements, calculator usage, keyboard
                    typing, footsteps, and door/cabinet opening. Keep noise
                    levels to a minimum.
                  </li>
                  <li className="faq-accordion_card-content">
                    Do not post documents, graffiti, or damage the tabletops at
                    the study seats. If you are using audiovisual software,
                    please use headphones, and adjust the volume accordingly.
                  </li>
                  <li className="faq-accordion_card-content">
                    Readers who are not scheduled for the entire day should not
                    leave personal items on top of the bookshelves. Staff
                    members will regularly clean and dispose of items left on
                    top of the bookshelves.
                  </li>
                  <li className="faq-accordion_card-content">
                    If you have reserved a seat or a fixed location, and you are
                    unable to come, please call to inform us before the
                    designated time begins. The latest time for requesting leave
                    is just before the designated time starts (morning: before
                    8:15 AM, noon: before 12:30 PM, evening: before 5:30 PM).
                  </li>
                </ol>
                <button
                  onClick={handleToggleButton}
                  className="faq-accordion_card-arrow"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                  </svg>
                </button>
              </li>
              <li className="faq-accordion_card">
                <h3 className="faq-accordion_card-title">
                  Before leaving your seat, please take note of the following
                </h3>
                <ol className="faq-accordion_card-contents">
                  <li className="faq-accordion_card-content">
                    When leaving your seat, please carry your valuable
                    belongings with you to avoid personal financial loss.
                  </li>
                  <li className="faq-accordion_card-content">
                    After finishing your reading, when preparing to leave your
                    seat, kindly ensure that you clean the tabletop thoroughly.
                    Do not leave eraser shavings, paper scraps, or trash behind,
                    and please push in the chair.
                  </li>
                </ol>
                <button
                  onClick={handleToggleButton}
                  className="faq-accordion_card-arrow"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                  </svg>
                </button>
              </li>
              <li className="faq-accordion_card">
                <h3 className="faq-accordion_card-title">
                  To maintain a high-quality environment, please adhere to the
                  following rules
                </h3>
                <ol className="faq-accordion_card-contents">
                  <li className="faq-accordion_card-content">
                    Smoking, indecent behavior, or excessive intimacy are
                    strictly prohibited throughout the facility.
                  </li>
                  <li className="faq-accordion_card-content">
                    Entry to the facility is not permitted for individuals
                    exhibiting abnormal behavior, untidy attire, shirtless
                    attire, or those who do not observe hygiene standards.
                  </li>
                  <li className="faq-accordion_card-content">
                    Loud noises and gambling games are strictly prohibited
                    inside the facility. In the lounge area, please keep
                    conversations and phone calls at a low volume to avoid
                    disturbing other readers.
                  </li>
                  <li className="faq-accordion_card-content">
                    Due to the enclosed nature of the K Study Room, please
                    refrain from using strongly scented items.
                  </li>
                  <li className="faq-accordion_card-content">
                    Feel free to inform the front desk if you require
                    adjustments to the air conditioning temperature or if there
                    are cleanliness concerns in the environment.
                  </li>
                  <li className="faq-accordion_card-content">
                    If you encounter any issues while studying, please report
                    them immediately to the front desk. The front desk staff
                    will handle them promptly. Avoid addressing fellow readers
                    directly to prevent conflicts.
                  </li>
                  <li className="faq-accordion_card-content">
                    During time periods when you do not have a fixed seat,
                    please refrain from retrieving books from the fixed seat
                    bookshelves. If you have an urgent need, kindly contact the
                    front desk, and they will assist you without disturbing
                    readers at their seats.
                  </li>
                  <li className="faq-accordion_card-content">
                    If you have allergies or cold symptoms, please wear a mask
                    and refrain from blowing your nose or coughing inside the K
                    Study Room.
                  </li>
                </ol>
                <button
                  onClick={handleToggleButton}
                  className="faq-accordion_card-arrow"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                  </svg>
                </button>
              </li>
              <li className="faq-accordion_card">
                <h3 className="faq-accordion_card-title">
                  If you are using a laptop, mouse, or computer, please take
                  note of the following
                </h3>
                <ol className="faq-accordion_card-contents">
                  <li className="faq-accordion_card-content">
                    Personal seats are designated for tablet and mobile phone
                    use only. The use of laptops is strictly prohibited. If
                    needed, please use the 'Large' seats or the research rooms.
                  </li>
                  <li className="faq-accordion_card-content">
                    'Large' seats do not allow the use of external mice. You may
                    use the built-in touchpad or silent mice. If you require an
                    external mouse, please use the research rooms.
                  </li>
                  <li className="faq-accordion_card-content">
                    When using a computer or typing on a laptop keyboard, please
                    be mindful of the volume and force. If there is no
                    improvement after a warning, usage rights for that time
                    period may be revoked.
                  </li>
                </ol>
                <button
                  onClick={handleToggleButton}
                  className="faq-accordion_card-arrow"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
          <h3 className="faq-alert">
            If individuals repeatedly ignore the above rules, the library
            reserves the right to refund and vacate the seat, and may also
            cancel their membership.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default ConventionComponent;
