import { useState, useMemo } from "react";
import { Typography } from "@mui/material";
export default function Quotes() {
  const [author, setAuthor] = useState(null);
  const [quote, setQuote] = useState("");

  const fetchQuote = async () => {
    const response = await fetch(
      "https://api.quotable.io/random?tags=technology",
      { method: "GET" }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    setAuthor(jsonData.author);
    setQuote(jsonData.content);
  };
  useMemo(() => fetchQuote(), []);
  if (author == null) {
    return (
      <Typography variant="caption">
        {"Loading thought for the day !!"}
      </Typography>
    );
  }
  return (
    <>
      <Typography
        variant={"subtitle2"}
        component="h6"
        sx={{
          margin: "0px 10%",
          fontStyle: "italic",
          color: "rgba(0,0,0,0.6)",
          textAlign: "center",
        }}
      >
        <q>{quote}</q>
      </Typography>
      <cite sx={{ color: "rgba(0,0,0,0.6)", textAlign: "center" }}>
        - {author}
      </cite>
    </>
  );
}
