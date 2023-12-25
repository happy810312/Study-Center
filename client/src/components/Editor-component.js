import React, { useState, useEffect, useRef } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import NewsService from "../services/news-service";
import { useNavigate } from "react-router-dom";

const EditorComponent = () => {
  const titleRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const navigate = useNavigate();

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    console.log(newEditorState);
  };
  // 如果需要保存和加载编辑器的内容，可以使用 convertToRaw 和 convertFromRaw
  const handleSubmit = () => {
    const title = titleRef.current.value; // 資料庫只儲存title的innerText
    const content = convertToRaw(editorState.getCurrentContent());
    const JsonContent = JSON.stringify(content);

    NewsService.postNews(title, JsonContent)
      .then((post) => {
        console.log(post);
        navigate("/news");
      })
      .catch((e) => {
        console.log(e);
        // setMessage(JSON.stringify(e.response));
      });

    // 送出資料庫
  };

  const customToolbarStyle = {
    backgroundColor: "#F5F6F6", // 自定义工具栏背景颜色
    borderRadius: "8px", // 自定义工具栏边框半径
  };
  const customEditorStyle = {
    border: "1px solid rgb(118,118,118)",
    // minHeight: "300px",
    cursor: "text",
    padding: "0.25rem",
  };

  // 編輯某特定文章時使用
  useEffect(() => {
    // if 進到這個頁面的原因是因為編輯，則執行以下內容
    // 模拟从数据库中检索到的 JSON 字符串
    const jsonStringFromDatabase =
      '{"blocks":[{"key":"6494f","text":"testing","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

    // NewsService.getNews()
    //   .then((data) => {
    //     console.log(data.data.foundNews);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    const contentState = convertFromRaw(JSON.parse(jsonStringFromDatabase));
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    // 如果不是，則編輯欄位是空的，代表新增文章
  }, []); // 确保 useEffect 只在组件挂载时运行一次

  return (
    <div>
      <div className="my-3">
        <label
          className="form-label fs-5 fw-bolder text-secondary"
          htmlFor="news-title"
        >
          Title
        </label>
        <div className="input-group">
          <input
            ref={titleRef}
            className="w-100 p-1"
            id="news-title"
            type="text"
            placeholder="Article title"
          />
        </div>
      </div>
      <label className="form-label fs-5 fw-bolder text-secondary" htmlFor="">
        Content
      </label>
      {/* strict mode下，部分功能不起作用 */}
      <Editor
        wrapperClassName="draft-wysiwyg-wrapper"
        toolbarStyle={customToolbarStyle}
        editorStyle={customEditorStyle}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "fontSize",
            "list",
            "colorPicker",
            "link",
            "emoji",
            "history",
          ],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
        }}
      />
      <button onClick={handleSubmit} className="btn btn-primary mt-2">
        保存内容
      </button>
    </div>
  );
};

export default EditorComponent;
