import styled from "@emotion/styled";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {
  Autocomplete, FormControl, Stack,
  TextField,
  Tooltip
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { post } from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openDialog,
  
} from "../../redux/dialogSlice";
import {
  openCategoryModal,
  openModal,
  openSupplierModal
} from "../../redux/modalSlice";
import {
  addAttribute,
  addListImage,
  addProduct,unAddAttributed
} from "../../redux/productSlice";
import MyDialog from "../alert/MyDialog";
import AddCategoryModal from "./AddCategoryModal";
import AddSupplierModal from "./AddSupplierModal";


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
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [s, setS] = React.useState(0);
  const [m, setM] = React.useState(0);
  const [l, setL] = React.useState(0);
  const [xl, setXL] = React.useState(0);
  const { product } = useSelector((state) => state.products);
  const { isOpen } = useSelector((s) => s.dialog);

  const handleOpen = async () => {
    setOpen(true);

    if (params?.images.length > 0) {
      const url = "http://localhost:9191/api/user-service/auth/upload";

      var files = [];
      for (let i = 0; i < params.images.length; i++) {
        var fd = new FormData();
        fd.append("file", params.images[i]);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const res = await post(url, fd, config);
        files.push(res);
      }
      const data = {
        name: params.name,
        price: params.price,
        avatar: files[0].data,

        description: params.description,
        categoryId: params.categoryId,
        supplierId: params.supplierId,
      };
      const p = await dispatch(addProduct(data));

      for (let j = 0; j < files.length; j++) {
        let x = {
          url: files[j].data,
          product: p.payload.product,
        };
        dispatch(addListImage(x));
      }
    } else {
      const data = {
        name: params.name,
        price: params.price,

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
        { size: "S", amount: s, product: product.product },
        { size: "M", amount: m, product: product.product },
        { size: "L", amount: l, product: product.product },
        { size: "XL", amount: xl, product: product.product },
      ];

      dispatch(addAttribute(params));
      dispatch(openDialog());
    }
    handleClose();
  };
  const { isAddAttributed } = useSelector((s) => s.products);

  return (
    <React.Fragment>
      <MyDialog
        check={isOpen}
        title="Thông báo"
        content="Thêm thuộc tính sản phẩm thành công !"
      />
      {isAddAttributed == false && (
        <Button variant="contained" onClick={handleOpen}>
          Thêm thuộc tính
        </Button>
      )}

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
                inputProps={{ type: 'number'}}
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setS(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size M - Số lượng"
                inputProps={{ type: 'number'}}
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setM(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size L - Số lượng"
                inputProps={{ type: 'number'}}
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setL(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size XL - Số lượng"
                inputProps={{ type: 'number'}}
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
  const [fileArray, setFileArray] = React.useState([]);
  const [previewImages, setPreviewImages] = React.useState([]);

  const handleClose = () => {
    dispatch(unAddAttributed());
    dispatch(openModal());
    setFile("");
    setPrice(0);
    setDescription("");
  };

  const onChangeFile = (e) => {
    let images = [];

    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setImage(e.target.files[0]);
    setPreviewImages(images);
    setFileArray(e.target.files);
  };
  const dialog = useSelector((s) => s.dialog);
  const handleSave = () => {
    dispatch(openDialog());
    dispatch(unAddAttributed());
    dispatch(openModal());
    setFile("");
    setPrice(0);
    setDescription("");
  };
  const { products, categories, suppliers, isAddAttributed } = useSelector(
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
      <MyDialog
        check={dialog.isOpen}
        title="Thông báo"
        content="Thêm sản phẩm thành công! "
      />
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
                    setCategoryId(
                      categories?.find(
                        (c) => c.name === params.inputProps.value
                      )?.id
                    )
                  }
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
              {/* {file != "" && (
                <img id="output" src={file} width="100" height="100" />
              )} */}

              {(previewImages || []).map((url) => (
                <img src={url} width="80" height="80" alt="..." />
              ))}
              <form encType="multipart/form-data" action="">
                <Button variant="contained" component="label">
                  Thêm ảnh
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => onChangeFile(e)}
                    multiple
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
                images: fileArray,
                description: description,
                supplierId: supplierId,
                categoryId: categoryId,
              }}
            />
            {isAddAttributed == true && (
              <Button variant="contained" color="success" onClick={handleSave}>
                Lưu
              </Button>
            )}

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
