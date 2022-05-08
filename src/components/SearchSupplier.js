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
import { openModal, openSupplierModal } from "../redux/modalSlice";
import AddProductModal from "./modal/AddProductModal";
import {} from "../redux/supplierSlice";
import useLocationForm from "./address/useLocationForm";
import AddSupplierModal from "./modal/AddSupplierModal";
import { searchSupplier } from "../redux/productSlice";

export default function SearchSupplier() {
  const { suppliers } = useSelector((state) => state.suppliers);
  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
    useLocationForm(false);
  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;
  const { isOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isOpenSupplier } = useSelector((state) => state.modal);
  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      key: text,
      city: selectedCity != null ? selectedCity?.label : "",
      district: selectedDistrict != null ? selectedDistrict?.label : "",
      ward: selectedWard != null ? selectedWard?.label : "",
    };
    dispatch(searchSupplier(data));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const data = {
      key: text,
      city: selectedCity != null ? selectedCity?.label : "",
      district: selectedDistrict != null ? selectedDistrict?.label : "",
      ward: selectedWard != null ? selectedWard?.label : "",
    };
    dispatch(searchSupplier(data));
  };

  const handleAddSupplier = () => {
    dispatch(openSupplierModal());
  };
  return (
    <div>
      <AddSupplierModal check={isOpenSupplier} />
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
          Thêm nhà cung cấp
        </Button>
        <Select
          name="cityId"
          key={`cityId_${selectedCity?.value}`}
          isDisabled={cityOptions.length === 0}
          options={cityOptions}
          onChange={(option) => onCitySelect(option)}
          placeholder="Tỉnh/Thành"
          defaultValue={selectedCity}
          styles={{ flex: 5 }}
        />

        <Select
          name="districtId"
          key={`districtId_${selectedDistrict?.value}`}
          isDisabled={districtOptions.length === 0}
          options={districtOptions}
          onChange={(option) => onDistrictSelect(option)}
          placeholder="Quận/Huyện"
          defaultValue={selectedDistrict}
        />

        <Select
          name="wardId"
          key={`wardId_${selectedWard?.value}`}
          isDisabled={wardOptions.length === 0}
          options={wardOptions}
          placeholder="Phường/Xã"
          onChange={(option) => onWardSelect(option)}
          defaultValue={selectedWard}
        />
        {/* </div> */}
        <Button
          style={{
            backgroundColor: "lightBlue",
            color: "blue",
            height: "40px",
            marginLeft: "5px",
          }}
          onClick={handleSearch}
        >
          Áp dụng
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
          placeholder="Search "
          inputProps={{ "aria-label": "search " }}
          // value={text}
          // onChange={(e) => setText(e.target.value)}
          onClick={handleClick}
          onChange={(event) => {
            setText(event.target.value);
          }}
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
      <AddProductModal check={isOpen} />
    </div>
  );
}
