import "draft-js/dist/Draft.css";
import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
  ContentState,
  CompositeDecorator,
  Entity,
} from "draft-js";

const colorStyle = {
  RED: {
    color: "red",
  },
  BLUE: {
    color: "blue",
  },
};

const colorDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback) => {
      contentBlock.findStyleRanges((character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null && Entity.get(entityKey).getType() === "COLOR"
        );
      }, callback);
    },
    component: (props) => {
      const style = colorStyle[props.style["text-decoration"]];
      return <span style={style}>{props.children}</span>;
    },
  },
]);

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(colorDecorator)
  );
  const [selectedColor, setSelectedColor] = useState("BLACK");

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const toggleColor = (color) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithColor = contentState.createEntity(
      "COLOR",
      "IMMUTABLE",
      { color }
    );
    const entityKey = contentStateWithColor.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithColor,
    });
    handleEditorChange(
      RichUtils.toggleInlineStyle(newEditorState, "COLOR-" + entityKey)
    );
  };

  const getCurrentStyle = () => {
    return editorState.getCurrentInlineStyle();
  };

  return (
    <div>
      <button
        onClick={() =>
          handleEditorChange(RichUtils.toggleInlineStyle(editorState, "BOLD"))
        }
      >
        Bold
      </button>
      <button
        onClick={() =>
          handleEditorChange(
            RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
          )
        }
      >
        Underline
      </button>
      <button
        onClick={() =>
          handleEditorChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
        }
      >
        Italic
      </button>
      <button onClick={() => toggleColor(selectedColor)}>Apply Color</button>
      <select
        onChange={(e) => setSelectedColor(e.target.value)}
        value={selectedColor}
      >
        <option value="BLACK">Black</option>
        <option value="RED">Red</option>
        <option value="BLUE">Blue</option>
      </select>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        customStyleMap={colorStyle}
      />
    </div>
  );
};

export default RichTextEditor;
