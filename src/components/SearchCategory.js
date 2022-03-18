import { Autocomplete, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";
import AddProductModal from "./modal/AddProductModal";
import SearchForm from "./SearchForm";
import TextFieldCustom from "./TextFieldCustom";

export default function SearchCategory() {
  const { products, categories, suppliers } = useSelector(
    (state) => state.products
  );
  const { isOpen } = useSelector((state) => state.modal);

  const [check, setCheck] = useState(isOpen);
  const dispatch = useDispatch();

  const options = categories?.map((option) => {
    return option.name;
  });
  const options2 = suppliers?.map((option) => {
    return option.supplierName;
  });

  const handleAddProduct = () => {
    dispatch(openModal());
  };
  return (
    <div>
      <Autocomplete
        style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Danh mục" />
        )}
      />
      <Autocomplete
        style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={options2}
        sx={{ width: 300, marginLeft: "5px" }}
        renderInput={(params) => (
          <TextField {...params} label="Nhà cung cấp" />
        )}
      />

      <Button
        style={{
          backgroundColor: "lightBlue",
          color: "blue",
          height: "55px",
          marginLeft: "5px",
        }}
      >
        Áp dụng
      </Button>
      <Button
        style={{
          backgroundColor: "lightBlue",
          color: "blue",
          height: "55px",
          marginLeft: "5px",
          float: "right",
        }}
        onClick={handleAddProduct}
      >
        Thêm sản phẩm
      </Button>
      <div style={{ clear: "both", marginBottom: "3px" }}></div>

      <SearchForm style={{ clear: "both", width: "100%" }} />
      <AddProductModal check={isOpen} />
    </div>
  );
}
