import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  Stack,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import Select from "react-select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAddVoucherModal, openModal, openSupplierModal } from "../redux/modalSlice";
import AddProductModal from "./modal/AddProductModal";
import {} from "../redux/supplierSlice";
import useLocationForm from "./address/useLocationForm";
import AddSupplierModal from "./modal/AddSupplierModal";
import { searchSupplier } from "../redux/productSlice";
import { searchVoucher } from "../redux/voucherSlice";
import AddVoucherModal from "./modal/AddVoucherModal";

export default function SearchVoucher() {
  const { vouchers } = useSelector((state) => state.vouchers);
 

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isOpenVoucher } = useSelector((state) => state.modal);
  const handleClick = (e) => {
    e.preventDefault();
   
    dispatch(searchVoucher(text));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchVoucher(text));

  };

  const handleAddSupplier = () => {
    dispatch(openAddVoucherModal());
  };
  return (
    <div>
      <AddSupplierModal check={isOpenVoucher} />
      <Stack direction="row" spacing={2}>
        <Button
          style={{
            backgroundColor: "lightBlue",
            color: "blue",
            height: "40px",
            // marginLeft: "420px",
            float: "right",
          }}
          onClick={handleAddSupplier}
        >
          Thêm voucher
        </Button>
        
      
      </Stack>

      <div style={{ clear: "both", marginBottom: "3px" }}></div>

      {/* <SearchForm style={{ clear: "both", width: "100%" }} categoryId={categoryId} supplierId={supplierId} /> */}
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm theo mã voucher "
          inputProps={{ "aria-label": "search " }}
          value={text}
          onChange={(e) => setText(e.target.value)}
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
      <AddVoucherModal check={isOpenVoucher} />
    </div>
  );
}
