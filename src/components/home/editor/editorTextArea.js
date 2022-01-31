import { useCallback } from "react";
import { Editable } from "slate-react";
import { isKeyHotkey } from "is-hotkey";
import { Typography } from "@mui/material";
import { LinkStyle } from "./textStyles";

export default function EditorTextArea() {
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "block-quote":
        return (
          <blockquote {...props.attributes}>
            <q>{props.children}</q>
          </blockquote>
        );
      case "typography":
        return (
          <Typography {...props.attributes} variant={props.element.typoMode}>
            {props.children}
          </Typography>
        );
      case "list-item":
        return <li {...props.attributes}>{props.children}</li>;
      case "ordered-list":
        return <ol {...props.attributes}>{props.children}</ol>;
      case "unordered-list":
        return <ul {...props.attributes}>{props.children}</ul>;
      case "link":
        return <LinkStyle {...props} />;
      default:
        return <Default {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    // console.log(props.leaf);
    return <FontStyles {...props} />;
  }, []);

  return (
    <Editable
      style={{
        borderTop: "2px solid whitesmoke",
        margin: "2px 5px 2px 0px",
        padding: "10px 20px",
      }}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder="Add Your note"
    />
  );
}

const FontStyles = (props) => {
  // console.log(props.leaf);
  return (
    <span
      {...props.attributes}
      style={{
        color: props.leaf.foreGround ?? "black",
        backgroundColor: props.leaf.backGround ?? "white",
        fontWeight: props.leaf.bold ? "bold" : "normal",
        textDecoration: props.leaf.underlined
          ? "underline"
          : props.leaf.lineThrough
          ? "line-through"
          : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        fontFamily: props.leaf.fontFamily ?? "Roboto",
      }}
    >
      {props.children}
    </span>
  );
};

const Default = (props) => {
  return (
    <p {...props.attributes} style={{ padding: 0, margin: 0 }}>
      {props.children}
    </p>
  );
};
