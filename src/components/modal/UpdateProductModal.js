import { Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { post } from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../redux/dialogSlice";
import { openUpdateProductModal } from "../../redux/modalSlice";
import {
  addListImage,
  deleteImage,
  deleteS3,
  updateProduct,
} from "../../redux/productSlice";
import MyDialog from "../alert/MyDialog";

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

export default function UpdateProductModal({ check }) {
  const dispatch = useDispatch();
  const { products, images, categories, suppliers, isAddAttributed, product } =
    useSelector((state) => state.products);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const { user } = useSelector((s) => s.auth);
  const [fileArray, setFileArray] = React.useState([]);
  const [previewImages, setPreviewImages] = React.useState([]);
  const [image, setImage] = React.useState({});
  const [change, setChange] = React.useState(false);
  console.log("xxxxx  ", product);
  const handleClose = async () => {
    dispatch(openUpdateProductModal());
  };

  const dialog = useSelector((s) => s.dialog);
  const handleSave = async () => {
    var files = [];
    if (change === true && fileArray?.length > 0) {
      const url = "http://165.22.105.148:9191/api/user-service/auth/upload";

      for (let i = 0; i < fileArray.length; i++) {
        var fd = new FormData();
        fd.append("file", fileArray[i]);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const res = await post(url, fd, config);
        files.push(res);
      }
    }
    const data = {
      id: product?.product?.id,
      name: name,
      description: description,
      avatar: files[0] ? files[0].data : product?.product?.avatar,
      supplierId: product?.supplier?.id,
      price: price,
      discount: discount,
      warranty: product?.supplier?.id,
      createdAt: product?.product?.createdAt,
      createdBy: product?.product?.createdBy,
      updatedBy: user?.id,

      viewNumber: product?.product?.viewNumber,
      categoryId: product?.product?.categoryId,
    };

    const p = await dispatch(updateProduct(data));
    if (images.length > 0 && change === true && files.length > 0) {
      for (let i = 0; i < images?.length; i++) {
        dispatch(deleteImage(images[i]?.id));
        dispatch(deleteS3(images[i]?.url));
      }
    }

    for (let j = 0; j < files.length; j++) {
      let x = {
        url: files[j].data,
        product: p.payload.product,
      };
      dispatch(addListImage(x));
    }

    setChange(false);
    setPreviewImages([]);
    setName("");
    setDescription("");
    setDiscount("");
    setPrice("");

    dispatch(openUpdateProductModal());
    dispatch(openDialog());
  };

  const onChangeFile = (e) => {
    let images = [];
    if (e.target.files.length > 0) {
      setChange(true);

      for (let i = 0; i < e.target.files.length; i++) {
        images.push(URL.createObjectURL(e.target.files[i]));
      }
      setImage(e.target.files[0]);
      setPreviewImages(images);
      setFileArray(e.target.files);
    }
  };
  React.useEffect(() => {
    setName(product?.product?.name);
    setPrice(product?.product?.price);
    setDescription(product?.product?.description);
    setDiscount(product?.product?.discount);
    console.log("1111111111111111111111", product?.product?.name);
  }, [product, dispatch]);
  return (
    <div>
      <MyDialog
        check={dialog.isOpen}
        title="Thông báo"
        content="Cập nhật sản phẩm thành công! "
      />
      <Modal
        open={check}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <h2 id="parent-modal-title">Cập nhật sản phẩm</h2>
          <div>
            <Stack direction="row">
              <Typography
                variant="h7"
                style={{ width: "20%", paddingTop: 15 }}
                gutterBottom
                component="div"
              >
                Tên sản phẩm:{" "}
              </Typography>
              <TextField
                id="filled-basic"
                variant="filled"
                style={{ width: "80%", marginBottom: "5px" }}
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Stack>
            <Stack direction="row">
              <Typography
                variant="h7"
                style={{ width: "20%", paddingTop: 15 }}
                gutterBottom
                component="div"
              >
                Giá:{" "}
              </Typography>
              <TextField
                id="filled-basic"
                inputProps={{ type: "number" }}
                variant="filled"
                style={{ width: "30%", marginBottom: "5px", marginRight: 22 }}
                defaultValue={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Typography
                variant="h7"
                style={{ width: "15%", paddingTop: 25 }}
                gutterBottom
                component="div"
              >
                Giảm giá:{" "}
              </Typography>
              <TextField
                id="filled-basic"
                variant="filled"
                inputProps={{ type: "number" }}
                style={{ width: "32%", marginBottom: "5px" }}
                defaultValue={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Stack>
            <Stack direction="row">
              <Typography
                variant="h7"
                style={{ width: "20%", paddingTop: 15 }}
                gutterBottom
                component="div"
              >
                Mô tả:
              </Typography>
              <TextField
                id="filled-basic"
                variant="filled"
                style={{ width: "80%", marginBottom: "5px" }}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
            <Stack direction="row">
              <Typography
                variant="h7"
                style={{ width: "20%", paddingTop: 25 }}
                gutterBottom
                component="div"
              >
                Danh mục:{" "}
              </Typography>
              <TextField
                id="filled-basic"
                variant="filled"
                style={{ width: "30%", marginBottom: "5px", marginRight: 22 }}
                defaultValue={product?.category?.name}
              />
              <Typography
                variant="h7"
                style={{ width: "15%", paddingTop: 25 }}
                gutterBottom
                component="div"
              >
                Nhà cung cấp:{" "}
              </Typography>
              <TextField
                id="filled-basic"
                variant="filled"
                style={{ width: "32%", marginBottom: "5px" }}
                value={product?.supplier?.supplierName}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              {previewImages.length > 0
                ? previewImages.map((url) => (
                    <img src={url} width="80" height="80" alt="..." />
                  ))
                : images?.map((url) => (
                    <img src={url?.url} width="80" height="80" alt="..." />
                  ))}
              <form encType="multipart/form-data" action="">
                <Button variant="contained" component="label">
                  Cập nhật ảnh
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={(e) => onChangeFile(e)}
                  />
                </Button>
              </form>
            </Stack>
          </div>

          {/* <div style={{ float: "right" }}> */}
          <Stack direction="row" spacing={2} style={{ float: "right" }}>
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
