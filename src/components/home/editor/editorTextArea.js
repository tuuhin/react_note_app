import { useCallback } from "react";
import { Editable } from "slate-react";
import { Typography, Stack } from "@mui/material";

export default function EditorTextArea() {
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
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
      default:
        return (
          <Default
            {...props}
            style={{ alignSelf: props.element.alignment ?? "center" }}
          />
        );
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    // console.log(props.leaf);

    return <FontStyles {...props} />;
  }, []);

  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        padding: "8px 0px",
        borderTop: "1px solid rgba(170, 169, 169, 0.74)",
      }}
    >
      <Editable
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "30em",
          margin: "2px 5px",
          padding: "10px 20px",
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Add Your note"
      />
    </Stack>
  );
}

const FontStyles = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        textDecoration: props.leaf.underlined
          ? "underline"
          : props.leaf.lineThrough
          ? "line-through"
          : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        fontFamily: props.leaf.fontFamily ?? "roboto",
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
