import { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
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
  useEffect(() => {
    fetchQuote();
  }, []);
  if (author == null) {
    return <CircularProgress />;
  }
  return (
    <>
      <Typography
        variant={"h5"}
        sx={{
          margin: "0px 10%",
          fontStyle: "italic",
          fontWeight: 400,
          color: "rgba(0,0,0,0.6)",
          textAlign: "center",
        }}
      >
        <q>{quote}</q>
      </Typography>
      <cite>{author}</cite>
    </>
  );
}
