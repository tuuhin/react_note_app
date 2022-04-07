import { useState } from "react";
import { Popover, Button, Stack } from "@mui/material";
export function LinkStyle(props) {
  const [anchorE1, setAnchorE1] = useState(null);
  const open = !!anchorE1;
  const options = (e) => {
    setAnchorE1(e.currentTarget);
  };
  const closed = () => {
    setAnchorE1(null);
  };

  return (
    <>
      <span {...props.attributes}>
        <button onClick={options} style={{ backgroundColor: "blue" }}>
          {props.children}
        </button>
      </span>
      <Popover
        open={open}
        anchorEl={anchorE1}
        onClose={closed}
        sx={{ p: 1 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ p: 1 }}>
          <Button variant="text">Open</Button>
          <Button variant="text">CLose</Button>
        </Stack>
      </Popover>
    </>
  );
}
