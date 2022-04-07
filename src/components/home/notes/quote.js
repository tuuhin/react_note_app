import { useState, useCallback, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
export default function Quotes() {
  const [author, setAuthor] = useState(null);
  const [quote, setQuote] = useState("");
  const fetchNote = useCallback(async () => {
    const response = await fetch(
      "https://api.quotable.io/random?tags=technology",
      { method: "GET" }
    );
    const jsonData = await response.json();
    setAuthor(jsonData.author);
    setQuote(jsonData.content);
  }, []);

  useEffect(fetchNote, [fetchNote]);

  return (
    <Stack
      spacing={1.2}
      direction={"column"}
      alignItems={"flex-end"}
      sx={{ pr: 4 }}
    >
      {author != null ? (
        <>
          <Typography variant={"subtitle2"}>
            <q>{quote}</q>
          </Typography>
          <Typography variant={"caption"}>
            <cite>{`-${author}`}</cite>
          </Typography>
        </>
      ) : (
        <Typography variant="caption" sx={{ textAlign: "right" }}>
          {"Loading thought for the day !!"}
        </Typography>
      )}
    </Stack>
  );
}
