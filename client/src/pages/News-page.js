import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SeatCategoriesComponent from "../components/SeatCategories-component";
import Footer from "../components/Footer-component";

const NewsPage = () => {
  // 做一個post route來po文
  // 按下button後怎麼判斷是按哪個button對應哪個收折?
  const [active, setActive] = useState(false);
  const listItemRef = useRef(null);

  // 選擇最近的li，才不會出現點一個全部一起打開的問題
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

  const handleEditButton = () => {
    const editElement = document.querySelector(".news-edit-btn");
    const editingElement = document.querySelector(".news-edit-btn.editing");
    const trashcans = document.querySelectorAll(".news-accordion_card-delete");
    trashcans.forEach((trashcan) => {
      trashcan.classList.add("active");
    });
    editElement.classList.add("editing");
    editElement.innerHTML = "OK";
    if (editingElement) {
      editElement.classList.remove("editing");
      editElement.innerHTML = "Edit";
      trashcans.forEach((trashcan) => {
        trashcan.classList.remove("active");
      });
    }
  };

  const handleRemoveButton = (e) => {
    e.target.closest("li").remove();
    window.alert("Deleted!");
  };
  return (
    <>
      <section className="news trigger-for-header-grey-light">
        <div className="container">
          <div className="news_wrapper">
            <div className="news-content">
              <h2 className="news-title">What's NEWS?</h2>
              <span className="news-subtitle">
                The latest event promotions and business information will be
                updated here. For detailed event information, please contact our
                front desk staff.
              </span>
            </div>
            <div className="news-btns">
              {/* Add button 連結到另一個新增news的頁面 */}
              <Link to="#" className="news-add-btn">
                Add
              </Link>
              <Link to="#" onClick={handleEditButton} className="news-edit-btn">
                Edit
              </Link>
            </div>
            <div className="news-accordion">
              <ul className="news-accordion_list">
                <li ref={listItemRef} className="news-accordion_card">
                  <div className="news-accordion_card-navigation">
                    <h3 className="news-accordion_card-title">
                      Typhoon Kanu Response Measures
                    </h3>
                    <button
                      className="news-accordion_card-arrow"
                      onClick={handleToggleButton}
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
                  </div>
                  <span className="news-accordion_card-content">
                    Due to the approaching Typhoon Kanu,the "Human Resources
                    Administration Office" has issued a notice of work
                    suspension on 8/3 (Thursday).To ensure the safety of our
                    readers, K Bookstore (Changqing Hall, Yusheng Hall) will be
                    closed on 8/3 (Thursday).Upon resumption of normal business
                    operations, the bookstore will uniformly return the leave
                    points to the fund for those who had reserved seats or fixed
                    spaces.We apologize for any inconvenience this may cause and
                    kindly request that you pay attention to your personal
                    safety when coming and going.
                  </span>
                  <div
                    onClick={handleRemoveButton}
                    className="news-accordion_card-delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </li>
                <li className="news-accordion_card">
                  <div className="news-accordion_card-navigation">
                    <h3 className="news-accordion_card-title">
                      Preventing COVID-19 in Our New Normal
                    </h3>
                    <button
                      className="news-accordion_card-arrow"
                      onClick={handleToggleButton}
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
                  </div>
                  <span className="news-accordion_card-content">
                    Safety Knows No Boundaries,We take care of the cleaning and
                    disinfection of public spaces and seats! After each reader
                    finishes using them, we wipe down the tables and chairs with
                    bleach water, making them ready for the next reader. This
                    ensures not only your safety and peace of mind but also
                    allows you to focus on your studies.
                  </span>
                  <div
                    onClick={handleRemoveButton}
                    className="news-accordion_card-delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <SeatCategoriesComponent />
    </>
  );
};

export default NewsPage;
