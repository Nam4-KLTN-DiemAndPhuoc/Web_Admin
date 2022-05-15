import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  IconButton,
  InputBase,
  Paper,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalSlice";
import {
  addPage, findByCategory,
  findByCategoryAndName, findByCategoryAndNameDeleted, findByCategoryAndSupplier,
  findByCategoryAndSupplierAndName,
  findByCategoryAndSupplierAndNameDeleted, findByCategoryAndSupplierDeleted, findByCategoryDeleted, findByName, findByNameDeleted, findBySupplier,
  findBySupplierAndName, findBySupplierAndNameDeleted, findBySupplierDeleted, getAllProduct,
  getProductsDelete, setIsDeletedFalse, setIsDeletedTrue, subPage
} from "../redux/productSlice";
import AddProductModal from "./modal/AddProductModal";

export default function SearchCategory() {
  const {
    products,
    categories,
    suppliers,
    page,
    isDeleted,

  } = useSelector((state) => state.products);
  const { isOpen } = useSelector((state) => state.modal);

  const [categoryId, setCategoryId] = useState();
  const [supplierId, setSupplierId] = useState();
  const [searchByCastegory, setSearchByCastegory] = useState("");
  const [searchBySupplier, setSearchBySupplier] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (
      searchByCastegory !== undefined &&
      searchBySupplier !== undefined &&
      searchByName !== ""
    ) {
      dispatch(
        findByCategoryAndSupplierAndName({
          idCategory: searchByCastegory,
          idSupplier: searchBySupplier,
          name: searchByName,
          page: page,
        })
      );
    } else if (
      searchByCastegory !== undefined &&
      searchBySupplier !== undefined
    ) {
      dispatch(
        findByCategoryAndSupplier({
          idCategory: searchByCastegory,
          idSupplier: searchBySupplier,
          page: page,
        })
      );
    } else if (searchByCastegory !== undefined && searchByName !== "") {
      dispatch(
        findByCategoryAndName({
          idCategory: searchByCastegory,
          name: searchByName,
          page: page,
        })
      );
    } else if (searchBySupplier !== undefined && searchByName !== "") {
      dispatch(
        findBySupplierAndName({
          idSupplier: searchBySupplier,
          name: searchByName,
          page: page,
        })
      );
    } else if (
      searchBySupplier !== undefined &&
      searchByCastegory !== undefined
    ) {
      dispatch(
        findByCategoryAndSupplier({
          idSupplier: searchBySupplier,
          idCategory: searchByCastegory,
          page: page,
        })
      );
    } else if (searchBySupplier !== undefined) {
      dispatch(
        findBySupplier({
          idSupplier: searchBySupplier,

          page: page,
        })
      );
    } else if (searchByCastegory !== undefined) {
      dispatch(
        findByCategory({
          idCategory: searchByCastegory,

          page: page,
        })
      );
    } else if (searchByName !== "") {
      dispatch(
        findByName({
          name: searchByName,

          page: page,
        })
      );
    } else {
      dispatch(getAllProduct(page));
    }
  };

  const options = categories?.map((option) => {
    return option.name;
  });
  const options2 = suppliers?.map((option) => {
    return option.supplierName;
  });

  const handleAddProduct = () => {
    dispatch(openModal());
  };
  const handleSearch = () => {
    if (
      searchByCastegory !== undefined &&
      searchBySupplier !== undefined &&
      searchByName !== ""
    ) {
      dispatch(
        findByCategoryAndSupplierAndName({
          idCategory: searchByCastegory,
          idSupplier: searchBySupplier,
          name: searchByName,
          page: page,
        })
      );
    } else if (
      searchByCastegory !== undefined &&
      searchBySupplier !== undefined
    ) {
      dispatch(
        findByCategoryAndSupplier({
          idCategory: searchByCastegory,
          idSupplier: searchBySupplier,
          page: page,
        })
      );
    } else if (searchByCastegory !== undefined && searchByName !== "") {
      dispatch(
        findByCategoryAndName({
          idCategory: searchByCastegory,
          name: searchByName,
          page: page,
        })
      );
    } else if (searchBySupplier !== undefined && searchByName !== "") {
      dispatch(
        findBySupplierAndName({
          idSupplier: searchBySupplier,
          name: searchByName,
          page: page,
        })
      );
    } else if (
      searchBySupplier !== undefined &&
      searchByCastegory !== undefined
    ) {
      dispatch(
        findByCategoryAndSupplier({
          idSupplier: searchBySupplier,
          idCategory: searchByCastegory,
          page: page,
        })
      );
    } else if (searchBySupplier !== undefined) {
      dispatch(
        findBySupplier({
          idSupplier: searchBySupplier,

          page: page,
        })
      );
    } else if (searchByCastegory !== undefined) {
      dispatch(
        findByCategory({
          idCategory: searchByCastegory,

          page: page,
        })
      );
    } else if (searchByName !== "") {
      dispatch(
        findByName({
          name: searchByName,

          page: page,
        })
      );
    } else {
      dispatch(getAllProduct(page));
    }
  };
  const cate = (v) => {
    dispatch(setSearchByCastegory(v));
  };
  const sup = (v) => {
    dispatch(setSearchBySupplier(v));
  };

  const [typeProduct, setTypeProduct] = useState("");
  const optionsSP = ["Sản phẩm đã xóa", "Sản phẩm đang bán"];
  const setChange = (data) => {
    setTypeProduct(data);
  };
  useEffect(() => {
    if (typeProduct === "Sản phẩm đã xóa") {
      dispatch(setIsDeletedTrue());
      if (
        searchByCastegory !== undefined &&   searchByCastegory !== "" &&
        searchBySupplier !== undefined && searchBySupplier !== "" &&
        searchByName !== ""
      ) {
        dispatch(
          findByCategoryAndSupplierAndNameDeleted({
            idCategory: searchByCastegory,
            idSupplier: searchBySupplier,
            name: searchByName,
            page: page,
          })
        );
      } else if (
        searchByCastegory !== undefined &&   searchByCastegory !== "" &&
        searchBySupplier !== undefined &&  searchBySupplier !== ""
      ) {
        dispatch(
          findByCategoryAndSupplierDeleted({
            idCategory: searchByCastegory,
            idSupplier: searchBySupplier,
            page: page,
          })
        );
      } else if (searchByCastegory !== undefined && searchByCastegory !== "" && searchByName !== "") {
        dispatch(
          findByCategoryAndNameDeleted({
            idCategory: searchByCastegory,
            name: searchByName,
            page: page,
          })
        );
      } else if (searchBySupplier !== undefined && searchBySupplier !== "" && searchByName !== "") {
        dispatch(
          findBySupplierAndNameDeleted({
            idSupplier: searchBySupplier,
            name: searchByName,
            page: page,
          })
        );
      
      } else if (searchBySupplier !== undefined && searchBySupplier !== "") {
        dispatch(
          findBySupplierDeleted({
            idSupplier: searchBySupplier,

            page: page,
          })
        );
      } else if (searchByCastegory !== undefined && searchByCastegory !== "") {
        dispatch(
          findByCategoryDeleted({
            idCategory: searchByCastegory,

            page: page,
          })
        );
      } else if (searchByName !== "") {
        dispatch(
          findByNameDeleted({
            name: searchByName,

            page: page,
          })
        );
      } else {
        dispatch(getProductsDelete(page));
      }
    } else {
      dispatch(setIsDeletedFalse());
      if (
        searchByCastegory !== undefined && searchByCastegory !==""&&
        searchBySupplier !== undefined &&   searchBySupplier !== "" &&
        searchByName !== ""
      ) {
        dispatch(
          findByCategoryAndSupplierAndName({
            idCategory: searchByCastegory,
            idSupplier: searchBySupplier,
            name: searchByName,
            page: page,
          })
        );
      } else if (
        searchByCastegory !== undefined && searchByCastegory !== "" &&
        searchBySupplier !== undefined && searchBySupplier !== "" 
    
      ) {
        dispatch(
          findByCategoryAndSupplier({
            idCategory: searchByCastegory,
            idSupplier: searchBySupplier,
            page: page,
          })
        );
      } else if (searchByCastegory !== undefined && searchByName !== "") {
        dispatch(
          findByCategoryAndName({
            idCategory: searchByCastegory,
            name: searchByName,
            page: page,
          })
        );
      } else if (searchBySupplier !== undefined && searchByName !== "") {
        dispatch(
          findBySupplierAndName({
            idSupplier: searchBySupplier,
            name: searchByName,
            page: page,
          })
        );
      }  else if (searchBySupplier !== undefined && searchBySupplier!== "" ) {
        dispatch(
          findBySupplier({
            idSupplier: searchBySupplier,

            page: page,
          })
        );
      } else if (searchByCastegory !== undefined && searchByCastegory != "") {
        dispatch(
          findByCategory({
            idCategory: searchByCastegory,

            page: page,
          })
        );
      } else if (searchByName !== "") {
        dispatch(
          findByName({
            name: searchByName,

            page: page,
          })
        );
      } else {
        dispatch(getAllProduct(page));
      }
    }
  }, [
    typeProduct,
    searchByName,
    searchByCastegory,
    searchBySupplier,
    subPage,
    addPage,
    dispatch, page
  ]);
  return (
    <div>
      <Autocomplete
        style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <>
            <TextField {...params} label="Danh mục" />
            {setSearchByCastegory(
              categories?.find((c) => c.name === params.inputProps.value)?.id
            )}
          </>
        )}
      />
      <Autocomplete
        style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={options2}
        sx={{ width: 300, marginLeft: "5px" }}
        renderInput={(params) => (
          <>
            <TextField {...params} label="Nhà cung cấp" />

            {setSearchBySupplier(
              suppliers?.find((c) => c.supplierName === params.inputProps.value)
                ?.id
            )}
          </>
        )}
      />

      {/* <Button
        style={{
          backgroundColor: "lightBlue",
          color: "blue",
          height: "55px",
          marginLeft: "5px",
        }}
        onClick={handleSearch}
      >
        Áp dụng
      </Button> */}
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

      <Autocomplete
        style={{ float: "left" }}
        disablePortal
        id="combo-box-demo"
        options={optionsSP}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <>
            <TextField {...params} label="Loại sản phẩm" />

            {setChange(params.inputProps.value)}
          </>
        )}
      />
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
          onChange={(e) => setSearchByName(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <AddProductModal check={isOpen} />
    </div>
  );
}
