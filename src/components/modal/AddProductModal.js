import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  openCategoryModal,
  openModal,
  openSupplierModal,
} from "../../redux/modalSlice";
import axios, { post } from "axios";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import {
  Autocomplete,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import TextFieldCustom from "../TextFieldCustom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import styled from "@emotion/styled";
import { addAttribute, addProduct, uploadFile } from "../../redux/productSlice";
import AddSupplierModal from "./AddSupplierModal";
import AddCategoryModal from "./AddCategoryModal";

const Input = styled("input")({
  display: "none",
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ params }) {
  console.log("parrmas ", params);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [s, setS] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [l, setL] = React.useState(0);
  const [xl, setXL] = React.useState(0);
  const {product}= useSelector(state=>state.products)

  const handleOpen = async () => {
    setOpen(true);

    if (params?.avatar != null) {
      console.log("aaa");
      const url = "http://localhost:9191/api/user-service/auth/upload";
      let formData = new FormData();
      formData.append("file", params.avatar);
      console.log("formData ", formData);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await post(url, formData, config);
      const data = {
        name: params.name,
        price: params.price,
        avatar: res.data,
        description: params.description,
        categoryId: params.categoryId,
        supplierId: params.supplierId,
      };
      dispatch(addProduct(data));
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAttribute = () => {
    if (s > 0 || m > 0 || l > 0 || xl > 0) {
      const params = [
        { size: "S", amount: s ,product:product.product},
        { size: "M", amount: m,product:product.product },
        { size: "L", amount: l,product:product.product },
        { size: "XL", amount: xl,product:product.product },
      ];

      console.log(params)
      dispatch(addAttribute(params))
    }
    handleClose()
  };
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleOpen}>
        Thêm thuộc tính
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="parent-modal-title">Thêm thuộc tính</h2>
          <Box sx={{ width: "100% " }}>
            <FormControl fullWidth>
              <TextField
                id="filled-basic"
                label=" Size S - Số lượng"
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setS(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size M - Số lượng"
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setM(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size L - Số lượng"
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setL(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size XL - Số lượng"
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setXL(e.target.value)}
              />
              <div style={{ width: "100%", marginTop: "10px" }}>
                <Button
                  variant="contained"
                  color="error"
                  style={{ float: "right" }}
                  onClick={handleClose}
                >
                  Đóng
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSaveAttribute}
                >
                  Lưu
                </Button>
              </div>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function AddProductModal({ check }) {
  // const [checkk, setCheckk] = React.useState(check);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const [open, setOpen] = React.useState(check);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [file, setFile] = React.useState("");
  const [image, setImage] = React.useState({});
  const [supplierId, setSupplierId] = React.useState();
  const [categoryId, setCategoryId] = React.useState();

  const handleOpen = () => {
    setOpen = !isOpen;
  };
  const handleClose = () => {
    dispatch(openModal());
    setFile("");
    setPrice(0);
    setDescription("");
  };

  const onChangeFile = (e) => {
    if (e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      console.log("fiel  ", URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setFile("");
      setImage(null);
    }
  };
  const handleSave = () => {
    dispatch(openModal());
    setFile("");
    setPrice(0);
    setDescription("");
  };
  const { products, categories, suppliers } = useSelector(
    (state) => state.products
  );
  const { isOpenSupplier, isOpenCategory } = useSelector(
    (state) => state.modal
  );

  const options = categories?.map((option) => {
    return option.name;
  });
  const options2 = suppliers?.map((option) => {
    return option.supplierName;
  });

  const handleAddCategory = () => {
    dispatch(openCategoryModal());
  };
  const handleAddSupplier = () => {
    dispatch(openSupplierModal());
  };
  return (
    <div>
      <Modal
        open={check}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <h2 id="parent-modal-title">Thêm sản phẩm</h2>
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
                  {
                    // console.log("ss ",params.inputProps.value)

                    // console.log("ss ",( categories?.find(c=> c.name===params.inputProps.value))?.id   )
                    setCategoryId(
                      categories?.find(
                        (c) => c.name === params.inputProps.value
                      )?.id
                    )
                  }
                  {/* <input type={"hidden"}  value={( categories?.find(c=> c.name===params.inputProps.value))?.id   } /> */}
                </>
              )}
            />
            <Tooltip title="Thêm danh mục" placement="top">
              <Button
                onClick={handleAddCategory}
                variant="outlined"
                style={{ float: "left", height: 54 }}
              >
                <AddCircleOutlinedIcon />
              </Button>
            </Tooltip>
            <Autocomplete
              style={{ float: "left" }}
              disablePortal
              id="combo-box-demo"
              options={options2}
              sx={{ width: 295, marginLeft: "5px" }}
              renderInput={(params) => (
                <>
                  <TextField {...params} label="Nhà cung cấp" />

                  {setSupplierId(
                    suppliers?.find(
                      (c) => c.supplierName === params.inputProps.value
                    )?.id
                  )}
                </>
              )}
            />
            <Tooltip title="Thêm nhà cung cấp" placement="top">
              <Button
                onClick={handleAddSupplier}
                variant="outlined"
                style={{ float: "left", height: 54 }}
              >
                {" "}
                <AddCircleOutlinedIcon />
              </Button>
            </Tooltip>

            <div style={{ clear: "both", marginBottom: "3px" }}></div>

            <AddSupplierModal check={isOpenSupplier} />
            <AddCategoryModal check={isOpenCategory} />
            <TextField
              id="filled-basic"
              label="Tên sản phẩm"
              variant="filled"
              style={{ width: "100%", marginBottom: "5px" }}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              id="filled-basic"
              label="Giá"
              variant="filled"
              style={{ width: "100%", marginBottom: "5px" }}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Mô tả"
              variant="filled"
              style={{ width: "100%", marginBottom: "5px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
              {file != "" && (
                <img id="output" src={file} width="100" height="100" />
              )}
              <form encType="multipart/form-data" action="">
                <Button variant="contained" component="label">
                  Thêm hình ảnh
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => onChangeFile(e)}
                  />
                </Button>
              </form>
            </Stack>
          </div>

          {/* <div style={{ float: "right" }}> */}
          <Stack direction="row" spacing={2} style={{ float: "right" }}>
            <ChildModal
              params={{
                name: name,
                price: price,
                avatar: image,
                description: description,
                supplierId: supplierId,
                categoryId: categoryId,
              }}
            />
            <Button variant="contained" color="success" onClick={handleSave}>
              Lưu
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Đóng
            </Button>
          </Stack>
          {/* </div> */}
        </Box>
      </Modal>
    </div>
  );
}
