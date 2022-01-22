import {
  Typography,
  Paper,
  ListItem,
  Slide,
  ListItemText,
} from "@mui/material";
import DateFormat from "../../../utils/dateFormat";

export default function NotesSimplified(props) {
  return (
    <Slide in timeout={1000} direction={"right"}>
      <Paper
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        onClick={() => props.onClick()}
      >
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {props.heading}
              </Typography>
            }
            secondary={
              <>
                <Typography variant="body2">{`Category: ${props.category}`}</Typography>
                <Typography variant={"caption"}>
                  <DateFormat at={props.createdAt} />
                </Typography>
              </>
            }
          />
        </ListItem>
      </Paper>
    </Slide>
  );
}
