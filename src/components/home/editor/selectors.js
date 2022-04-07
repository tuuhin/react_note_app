import { useState } from "react";
import is_url from "is-url";
import {
  MenuItem,
  Select,
  Typography,
  IconButton,
  Popover,
  Stack,
  Dialog,
  Grid,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useSlate } from "slate-react";
import { MdColorize, MdLink, MdImage } from "react-icons/md";
import { Transforms, Text, Editor, Range } from "slate";
import { HexColorPicker } from "react-colorful";

export function FontSelector() {
  const editor = useSlate();
  const availableFonts = [
    "Roboto",
    "sans serif",
    "Open Sans",
    "Oxygen",
    "Ubuntu",
    "Poppins",
    "Source Serif Pro",
  ];

  const [font, setfont] = useState(availableFonts[0]);

  const changedFont = (e) => {
    setfont(e.target.value);
    Transforms.setNodes(
      editor,
      { fontFamily: e.target.value },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  return (
    <Select
      variant="standard"
      disableUnderline
      value={font}
      onChange={changedFont}
      sx={{ outline: "none", width: 120, textAlign: "center" }}
    >
      {availableFonts.map((fontFamily) => (
        <MenuItem key={fontFamily} value={fontFamily}>
          <Typography variant={"subtitle2"} sx={{ fontFamily: fontFamily }}>
            {fontFamily}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
}

export function TypographySelector() {
  const editor = useSlate();
  const variants = [
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "caption",
    "overline",
  ];

  const [variant, setVariant] = useState(variants[0]);

  const changeMode = (e) => {
    setVariant(e.target.value);
    Transforms.setNodes(editor, {
      type: "typography",
      typoMode: e.target.value,
      match: (n) => Editor.isBlock(editor, n),
    });
  };

  return (
    <Select
      value={variant}
      onChange={changeMode}
      sx={{ outline: "none", width: 120, textAlign: "center" }}
      variant="standard"
      disableUnderline
    >
      {variants.map((variant) => (
        <MenuItem key={variant} value={variant}>
          <Typography variant={variant}>{variant}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
}
//-----------------------------------------------------------------------------------------------------------
export function ColorPicker() {
  const editor = useSlate();
  const [anchorE1, setAnchorE1] = useState(null);
  const [foreGroundColor, setForeGroundColor] = useState("#ffffff");
  const [backGroundColor, setBackGroundColor] = useState("#000000");
  const clicked = (e) => {
    setAnchorE1(e.currentTarget);
  };
  const closed = () => {
    setAnchorE1(null);
  };

  const changeColor = () => {
    const { selection } = editor;
    Transforms.setNodes(
      editor,
      { foreGround: foreGroundColor, backGround: backGroundColor },
      {
        match: (n) => Text.isText(n) && !Range.isCollapsed(selection),
        split: true,
      }
    );
  };
  const open = !!anchorE1;
  return (
    <>
      <IconButton onClick={clicked}>
        <MdColorize />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorE1}
        onClose={closed}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container sx={{ p: 2, width: "360px" }} spacing={2}>
          <Grid item sm={6} lg={6}>
            <Typography>Background Color</Typography>
          </Grid>
          <Grid item sm={6} lg={6}>
            <Typography>Foreground Color</Typography>
          </Grid>
          <Grid item sm={6} lg={6}>
            <HexColorPicker
              style={{ width: "150px", height: "150px" }}
              color={backGroundColor}
              onChange={(e) => {
                setBackGroundColor(e);
                changeColor();
              }}
            />
          </Grid>

          <Grid item sm={6} lg={6}>
            <HexColorPicker
              style={{ width: "150px", height: "150px" }}
              color={foreGroundColor}
              onChange={(e) => {
                setForeGroundColor(e);
                changeColor();
              }}
            />
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}
// ------------------------------------------------------------------------------------------------------------
export const AddLink = () => {
  const editor = useSlate();
  const [openLinkDialog, setOpenLinkDialog] = useState(false);
  const [radio, setRadio] = useState("web");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  const clicked = () => {
    setOpenLinkDialog(true);
  };

  const closeDialog = () => {
    setOpenLinkDialog(false);
  };

  const setLinkInEditor = () => {
    const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
    if (!link) {
      console.log("inserted");
      Transforms.insertNodes(editor, {
        type: "link",
        url: link,
        children: [{ text: text }],
      });
      Transforms.wrapNodes(editor, {
        type: "paragraph",
        children: [],
      });
    }
    closeDialog();
  };
  return (
    <>
      <IconButton onClick={clicked}>
        <MdLink />
      </IconButton>
      <Dialog open={openLinkDialog} onClose={closeDialog}>
        <DialogTitle>Edit Link</DialogTitle>
        <DialogContent>
          <Grid container alignItems="flex-start">
            <Grid item sm={4} lg={4}>
              <InputLabel>{"Text to Display"}</InputLabel>
            </Grid>
            <Grid item sm={8} lg={8}>
              <TextField
                sx={{ p: 0 }}
                fullWidth
                variant="standard"
                value={text}
                onChangeCapture={(e) => setText(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item sm={12}>
              <InputLabel>{"Link to:"}</InputLabel>
            </Grid>

            <Grid item sm={4} lg={4}>
              <RadioGroup
                value={radio}
                onChange={(e) => setRadio(e.target.value)}
              >
                <FormControlLabel
                  value="web"
                  control={<Radio />}
                  label="Web Link"
                />
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
              </RadioGroup>
            </Grid>
            <Grid item sm={8} lg={8}>
              {radio !== "web" ? (
                <TextField
                  fullWidth
                  variant="standard"
                  helperText={"To what email address should this link go?"}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              ) : (
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    helperText={"To what url should this link go?"}
                    variant="standard"
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    Test this Link
                  </a>
                  <Typography variant="caption">
                    Not sure what to put in the box? First, find the page on the
                    web that you want to link to. (A{" "}
                    <a
                      rel="noreferrer"
                      href="https://google.in"
                      target="_blank"
                      style={{ textDecoration: "none", color: "blue" }}
                    >
                      search engine
                    </a>{" "}
                    might be useful.) Then, copy the web address from the box in
                    your browser's address bar, and paste it into the box above.
                  </Typography>
                </Stack>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant={"text"}>
            Cancel
          </Button>
          <Button
            disabled={!(text && link)}
            variant={"contained"}
            onClick={setLinkInEditor}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
//-----------------------------------------------------------------------------------------------------------
export const ImagePicker = () => {
  const [open, setOpen] = useState(false);
  const [imageLink, setImageLink] = useState(
    "https://images.unsplash.com/photo-1643166406764-569565811559?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  );
  //https://images.unsplash.com/photo-1643166406764-569565811559?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const submitImage = () => {};

  return (
    <>
      <IconButton onClick={openDialog}>
        <MdImage />
      </IconButton>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Choose a Image</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2} alignItems={"center"}>
            <TextField
              fullWidth
              helperText={"Add the link to the Image"}
              variant={"standard"}
              multiline
              value={imageLink}
              maxRows={2}
              onChange={(e) => {
                setImageLink(e.target.value);
              }}
              placeholder="https://images.unsplash.com"
            />
            <Typography variant="caption">
              Not sure what to put in the filed? First, find the image on the
              web that you want to link to. (A{" "}
              <a
                rel="noreferrer"
                href="https://google.in"
                target="_blank"
                style={{ textDecoration: "none", color: "blue" }}
              >
                search engine
              </a>{" "}
              might be useful.) Then, copy the image address from the box in
              your browser's address bar, and paste it into the field above.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant={"text"}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!is_url(imageLink)}
            onClick={submitImage}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
