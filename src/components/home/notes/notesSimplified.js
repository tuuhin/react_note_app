import { Typography, Grid, Paper, Chip } from "@mui/material";

export default function NotesSimplified() {
  return (
    <Paper sx={{ margin: "5px", padding: "10px", width: "90%" }}>
      <Typography variant={"caption"}>20 FEB</Typography>

      <Typography variant="h6">Exploring Ideas</Typography>

      <Typography
        variant={"body2"}
        component="div"
        sx={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          width: "100%",
          textOverflow: "ellipsis",
          overflow: "hidden",
          wordWrap: "break-word",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque atque, a
        aspernatur magni doloremque hic nisi reiciendis perspiciatis illo
        consequuntur, quis assumenda nostrum nesciunt ducimus est in. Porro,
        quidem nisi?
      </Typography>
      <Grid spacing={1} container>
        {Array.from(Array(3), (_, i) => i + 1).map((e) => (
          <Grid item key={e}>
            <Chip label="Chip Filled" />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
