import { useCallback } from "react";
import { Editable } from "slate-react";
import { Typography } from "@mui/material";
import { LinkStyle } from "./textStyles";

export default function EditorTextArea() {
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "block-quote":
        return <q {...props.attributes}>{props.children}</q>;
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
        height: "50vh",
        margin: "10px",
        padding: "10px",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder="your note over here"
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
