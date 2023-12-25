import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import SeatCategoriesComponent from "../components/SeatCategories-component";
import EditorComponent from "../components/Editor-component";
import { ArrowDownIcon, TrashcanIcon } from "../components/icons";
import NewsService from "../services/news-service";

const NewsPage = () => {
  // 按下button後怎麼判斷是按哪個button對應哪個收折?
  const [active, setActive] = useState(false);
  const [[news, content], setNews] = useState([]);
  const [message, setMessage] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const listItemRef = useRef(null);

  // 選擇最近的li，才不會出現點一個全部一起打開的問題
  const handleDisplayContent = (event) => {
    const clickedButton = event.target;
    const listItem = clickedButton.closest("li");
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
    const _id = e.target.closest("li").getAttribute("data-id");
    if (window.confirm("Sure to delete the new?")) {
      NewsService.deleteNews(_id).then((data) => {
        console.log(data);
      });
    }
  };

  useEffect(() => {
    NewsService.getNews()
      .then((data) => {
        const foundNews = data.data.foundNews;
        if (!foundNews) {
          setMessage(data.data.message);
          return;
        }
        const titles = foundNews.map((title) => {
          return title.title;
        });
        const contentState = foundNews.map((data) => {
          return data.content;
        });
        console.log(titles, contentState);
        setNews([titles, contentState]);
        // setEditorState(EditorState.createWithContent(contentState));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
              <Link to="/news/post" className="news-add-btn">
                Add
              </Link>
              <Link to="#" onClick={handleEditButton} className="news-edit-btn">
                Edit
              </Link>
            </div>
            {message && <div className="alert alert-danger">{message}</div>}
            <div className="news-accordion">
              <ul className="news-accordion_list">
                {/* {news.map((data, index) => {
                  return (
                    <li
                      key={index}
                      ref={listItemRef}
                      data-id={1}
                      className="news-accordion_card"
                    >
                      <div className="news-accordion_card-navigation">
                        <h3 className="news-accordion_card-title">{data}</h3>
                        <button
                          className="news-accordion_card-arrow"
                          onClick={handleDisplayContent}
                          type="button"
                        >
                          <ArrowDownIcon width={"30px"} height={"30px"} />
                        </button>
                      </div>
                      <p className="news-accordion_card-content">
                        {content[index]}
                      </p>
                      <div
                        onClick={handleRemoveButton}
                        className="news-accordion_card-delete"
                      >
                        <TrashcanIcon width={"30px"} height={"30px"} />
                      </div>
                    </li>
                  );
                })} */}
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
