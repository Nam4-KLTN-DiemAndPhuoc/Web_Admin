import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchOrder } from "../redux/orderSlice";

export default function () {
  var options = ["online", "offline"];
  const { status } = useSelector((s) => s.orders);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    setKey(e.target.value);
    if (e.target.value != "") {
      dispatch(
        searchOrder({
          paymentMethod:
            paymentMethod === "online" || paymentMethod === "offline"
              ? paymentMethod
              : "",
          status: status,
          codeOrder: e.target.value,
        })
      );
    }
  };

  const setChange = (data) => {
    setPaymentMethod(data);
  };

  useEffect(() => {
    if (paymentMethod === "online" || paymentMethod === "offline") {
      dispatch(
        searchOrder({
          paymentMethod: paymentMethod,
          status: status,
          codeOrder: key,
        })
      );
    } else {
      dispatch(
        searchOrder({
          paymentMethod: "",
          status: status,
          codeOrder: key,
        })
      );
    }
  }, [paymentMethod, key]);

  return (
    <div style={{ marginBottom: 15 }}>
      <Autocomplete
        style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <>
            <TextField {...params} label="Phương thức thanh toán" />

            {setChange(params.inputProps.value)}
          </>
        )}
      />
      <Paper
        component="form"
        sx={{ p: "4px 4px", display: "flex", alignItems: "center" }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Mã đơn hàng "
          inputProps={{ "aria-label": "Mã đơn hàng " }}
          onChange={(e) => handleClick(e)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="Mã đơn hàng">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
