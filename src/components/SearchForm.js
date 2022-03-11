import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useDispatch } from "react-redux";
import { searchUser } from "../redux/userSlice";

export default function SearchForm() {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(searchUser(text));
  };
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 1250 }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search "
        inputProps={{ "aria-label": "search " }}
        onChange={(event) => {
          console.log(event.target.value);
          setText(event.target.value);
        }}
        onClick={handleClick}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
