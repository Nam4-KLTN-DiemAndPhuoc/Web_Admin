import { Autocomplete, Button, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCategoryModal, openModal, openSupplierModal } from "../redux/modalSlice";
import AddProductModal from "./modal/AddProductModal";
import SearchForm from "./SearchForm";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AddSupplierModal from "./modal/AddSupplierModal";
import AddCategoryModal from "./modal/AddCategoryModal";
export default function TextFieldCustom() {
  const { products, categories, suppliers } = useSelector(
    (state) => state.products
  );
  const { isOpenSupplier,isOpenCategory  } = useSelector((state) => state.modal);

  const [check, setCheck] = useState(isOpenSupplier);
  const dispatch = useDispatch();

  const options = categories?.map((option) => {
    return option.name;
  });
  const options2 = suppliers?.map((option) => {
    return option.supplierName;
  });

  const handleAddCategory=()=>{
dispatch(openCategoryModal())
  }
  const handleAddSupplier=()=>{
    dispatch(openSupplierModal())
  }
  
  return (
    <div>
    
      <Autocomplete
        style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params)  => (
        
          <TextField {...params} label="Danh mục"  />
        )}
      />
      <Tooltip title="Thêm danh mục" placement="top" >
      <Button onClick={handleAddCategory}   variant="outlined"  style={{ float: "left", height:54 }}> <AddCircleOutlinedIcon /></Button>
      </Tooltip>
      <Autocomplete
       style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={options2}
        sx={{ width: 295, marginLeft: "5px" }}
        renderInput={(params) => (
          <TextField {...params} label="Nhà cung cấp" />
        )}
      />
      <Tooltip title="Thêm nhà cung cấp" placement="top" >

           <Button onClick={handleAddSupplier} variant="outlined"  style={{ float: "left", height:54 }}> <AddCircleOutlinedIcon /></Button>
           </Tooltip>

    
      <div style={{ clear: "both", marginBottom: "3px" }}></div>

      <AddSupplierModal check={isOpenSupplier} />
      <AddCategoryModal check={isOpenCategory} />

    </div>
  );
}
