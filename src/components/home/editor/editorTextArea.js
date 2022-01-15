import { useCallback } from "react";
import { Editable } from "slate-react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function EditorTextArea() {
  const renderElement = useCallback((props) => {
    console.log(props.element.type);

    switch (props.element.type) {
      case "typography":
        return (
          <Typography {...props.attributes} variant={props.element.typoMode}>
            {props.children}
          </Typography>
        );
      case "heading-2":
        return (
          <Typography {...props.attributes} variant="h2">
            {props.children}
          </Typography>
        );
      case "heading-3":
        return (
          <Typography {...props.attributes} variant="h3">
            {props.children}
          </Typography>
        );
      case "list-item":
        return <li {...props.attributes}>{props.children}</li>;
      case "ordered-list":
        return <OrderedList {...props} />;
      case "unordered-list":
        return <UnOrderedList {...props} />;
      default:
        return (
          <Default
            {...props}
            style={{ alignSelf: props.element.alignment ?? "flex-start" }}
          />
        );
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    // console.log(props.leaf);
    if (props.leaf.link) return <Link {...props} />;

    return <FontStyles {...props} />;
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        margin: " 0px 5px",
        minHeight: " 25em",
        padding: "2px 0px",
        borderTop: "1px solid rgba(170, 169, 169, 0.74)",
        borderBottom: "1px solid rgba(170, 169, 169, 0.74)",
      }}
    >
      <Editable
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 0,
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="kindly…"
        spellCheck
        autoFocus
      />
    </Box>
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

const OrderedList = (props) => <ol {...props.attributes}>{props.children}</ol>;

const UnOrderedList = (props) => (
  <ul {...props.attributes}>{props.children}</ul>
);

const Link = (props) => <a {...props.attributes}>{props.children}</a>;
