import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TablePagination,
} from "@mui/material";
import { getOrderDetailByOrderId, updateStatus } from "../../redux/orderSlice";
import moment from "moment";
import {
  addPage,
  deleteProduct,
  findByCategory,
  findByCategoryAndName,
  findByCategoryAndSupplier,
  findByCategoryAndSupplierAndName,
  findByName,
  findBySupplier,
  findBySupplierAndName,
  getAllProduct,
  
  getAttribute,
  getImagesByProductId,
  getProductById,
  subPage,
} from "../../redux/productSlice";
import UpdateProductModal from "../modal/UpdateProductModal";
import UpdateAttributeModal from "../modal/UpdateAttributeModal";
import { openUpdateAtrributeModal, openUpdateProductModal } from "../../redux/modalSlice";
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(getAttribute(id));
    setOpen(!open);
  };
  const [status, setStatus] = React.useState("");
  const { isOpenUpdateProductModal, isOpenUpdateAttributeModal } = useSelector((s) => s.modal);
  const { product ,products,page, isDeleted} = useSelector((s) => s.products);

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);
  };

  const handleUpdate = (data) => {
    dispatch(getProductById(data.id));
    dispatch(getImagesByProductId(data.id))
    dispatch(openUpdateProductModal());
  };
  const handleDelete = (id) => {
    const data = {
      id: id, 
      userId: user.id,
    };
    if (window.confirm("Bạn có muốn xóa sản phẩm "+data.id+" không? ")) {
      dispatch(deleteProduct(data));

    }
  };
  const handleUnDelete = (id) => {
    const data = {
      id: id, 
      userId: user.id,
    };
    if (window.confirm("Bạn có muốn bán lại sản phẩm "+data.id+" không? ")) {
      dispatch(deleteProduct(data));

    }
  };
const updateAtrribute=(data)=>{
  dispatch(getAttribute(data))
  dispatch(getProductById(data))

dispatch(openUpdateAtrributeModal())

}
React.useEffect(() => {
}, [dispatch,products,page, subPage, addPage]);
  return (
    <React.Fragment>
      <UpdateProductModal check={isOpenUpdateProductModal} />
      <UpdateAttributeModal check={isOpenUpdateAttributeModal} />

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(id) => handleClick(row.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.productName}</TableCell>
        <TableCell align="right">
          <img src={row.image} style={{ width: "150px" }} />
        </TableCell>

        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.supplier}</TableCell>

        <TableCell align="center">
          {isDeleted ==true? (<Button variant="contained" onClick={(id) => handleUnDelete(row.id)}>
              Bán lại
            </Button>):( <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={(id) => handleUpdate(row)}>
              Cập nhật
            </Button>
            <Button variant="outlined" onClick={(id) => handleDelete(row.id)}>
              Xóa
            </Button>
          </Stack>)}
         
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết sản phẩm
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="right">Số lượng </TableCell>
                    <TableCell align="right">Mô tả </TableCell>
                    <TableCell align="right">Lượt xem </TableCell>
                    <TableCell align="right">Giảm giá </TableCell>
                    <TableCell align="right">Bảo hành</TableCell>
                    <TableCell align="right">Ngày tạo</TableCell>
                    <TableCell style={{width:200, height:50}} align="right">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((historyRow, i) => 
                   (
                   
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {historyRow.productName}
                      </TableCell>

                      <TableCell align="right">{historyRow.price}</TableCell>
                      <TableCell align="right">{historyRow.size}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {row.details.description}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.viewNumber}
                      </TableCell>
                      <TableCell align="right">{historyRow.discount}</TableCell>

                      <TableCell align="right">{historyRow.warranty}</TableCell>
                      <TableCell align="right" style={{width:300}}>
                     {
                        moment(historyRow.createdAt).format("MM/DD/YYYY, h:mm:ss a")}
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="outlined" onClick={(id)=>updateAtrribute(historyRow.action)}>Cập nhật</Button>
                        
                      </TableCell>
                    </TableRow>
                  )
                  )
                }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    image: PropTypes.string,
    category: PropTypes.string.isRequired,
    supplier: PropTypes.string.isRequired,

    action: PropTypes.array.isRequired,

    details: PropTypes.arrayOf(
      PropTypes.shape({
        productName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        viewNumber: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        warranty: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,

      })
    ).isRequired,
  }).isRequired,
};

export default function ProductTable() {
  const dispatch = useDispatch();

  const {
    products,
    categories,
    suppliers,
    attributes,
    page,
    searchByCastegory,
    searchBySupplier,

    searchByName,
  } = useSelector((state) => state.products);
  // React.useEffect(() => {
  //   if (
  //     searchByCastegory !== undefined &&
  //     searchBySupplier !== undefined &&
  //     searchByName !== ""
  //   ) {
  //     dispatch(
  //       findByCategoryAndSupplierAndName({
  //         idCategory: searchByCastegory,
  //         idSupplier: searchBySupplier,
  //         name: searchByName,
  //         page: page,
  //       })
  //     );
  //   } else if (
  //     searchByCastegory !== undefined &&
  //     searchBySupplier !== undefined
  //   ) {
  //     dispatch(
  //       findByCategoryAndSupplier({
  //         idCategory: searchByCastegory,
  //         idSupplier: searchBySupplier,
  //         page: page,
  //       })
  //     );
  //   } else if (searchByCastegory !== undefined && searchByName !== "") {
  //     dispatch(
  //       findByCategoryAndName({
  //         idCategory: searchByCastegory,
  //         name: searchByName,
  //         page: page,
  //       })
  //     );
  //   } else if (searchBySupplier !== undefined && searchByName !== "") {
  //     dispatch(
  //       findBySupplierAndName({
  //         idSupplier: searchBySupplier,
  //         name: searchByName,
  //         page: page,
  //       })
  //     );
  //   } else if (
  //     searchBySupplier !== undefined &&
  //     searchByCastegory !== undefined
  //   ) {
  //     dispatch(
  //       findByCategoryAndSupplier({
  //         idSupplier: searchBySupplier,
  //         idCategory: searchByCastegory,
  //         page: page,
  //       })
  //     );
  //   } else if (searchBySupplier !== undefined) {
  //     dispatch(
  //       findBySupplier({
  //         idSupplier: searchBySupplier,

  //         page: page,
  //       })
  //     );
  //   } else if (searchByCastegory !== undefined) {
  //     dispatch(
  //       findByCategory({
  //         idCategory: searchByCastegory,

  //         page: page,
  //       })
  //     );
  //   } else if (searchByName !== "") {
  //     dispatch(
  //       findByName({
  //         name: searchByName,

  //         page: page,
  //       })
  //     );
  //   } else {
  //     dispatch(getAllProduct(page));
  //   }
  // }, [dispatch]);

  const handleClickFirstPage = () => {
    if (page > 1) {
      dispatch(subPage());
      // if (
      //   searchByCastegory !== null &&
      //   searchBySupplier !== null &&
      //   searchByName !== ""
      // ) {
      //   dispatch(
      //     findByCategoryAndSupplierAndName({
      //       idCategory: searchByCastegory,
      //       idSupplier: searchBySupplier,
      //       name: searchByName,
      //       page: page - 1,
      //     })
      //   );
      // } else if (
      //   searchByCastegory !== undefined &&
      //   searchBySupplier !== undefined
      // ) {
      //   dispatch(
      //     findByCategoryAndSupplier({
      //       idCategory: searchByCastegory,
      //       idSupplier: searchBySupplier,
      //       page: page - 1,
      //     })
      //   );
      // } else if (searchByCastegory !== undefined && searchByName !== "") {
      //   dispatch(
      //     findByCategoryAndName({
      //       idCategory: searchByCastegory,
      //       name: searchByName,
      //       page: page - 1,
      //     })
      //   );
      // } else if (searchBySupplier !== undefined && searchByName !== "") {
      //   dispatch(
      //     findBySupplierAndName({
      //       idSupplier: searchBySupplier,
      //       name: searchByName,
      //       page: page - 1,
      //     })
      //   );
      // } else if (
      //   searchBySupplier !== undefined &&
      //   searchByCastegory !== undefined
      // ) {
      //   dispatch(
      //     findByCategoryAndSupplier({
      //       idSupplier: searchBySupplier,
      //       idCategory: searchByCastegory,
      //       page: page - 1,
      //     })
      //   );
      // } else if (searchBySupplier !== undefined) {
      //   dispatch(
      //     findBySupplier({
      //       idSupplier: searchBySupplier,

      //       page: page - 1,
      //     })
      //   );
      // } else if (searchByCastegory !== undefined) {
      //   dispatch(
      //     findByCategory({
      //       idCategory: searchByCastegory,

      //       page: page - 1,
      //     })
      //   );
      // } else if (searchByName !== "") {
      //   dispatch(
      //     findByName({
      //       name: searchByName,

      //       page: page - 1,
      //     })
      //   );
      // } else {
      //   dispatch(getAllProduct(page - 1));
      // }
    }
  };
  const handleClickLastPage = async () => {
    if (products.length > 0) {
      dispatch(addPage());
      // if (
      //   searchByCastegory !== undefined &&
      //   searchBySupplier !== undefined &&
      //   searchByName !== ""
      // ) {
      //   dispatch(
      //     findByCategoryAndSupplierAndName({
      //       idCategory: searchByCastegory,
      //       idSupplier: searchBySupplier,
      //       name: searchByName,
      //       page: page + 1,
      //     })
      //   );
      // } else if (
      //   searchByCastegory !== undefined &&
      //   searchBySupplier !== undefined
      // ) {
      //   dispatch(
      //     findByCategoryAndSupplier({
      //       idCategory: searchByCastegory,
      //       idSupplier: searchBySupplier,
      //       page: page + 1,
      //     })
      //   );
      // } else if (searchByCastegory !== undefined && searchByName !== "") {
      //   dispatch(
      //     findByCategoryAndName({
      //       idCategory: searchByCastegory,
      //       name: searchByName,
      //       page: page + 1,
      //     })
      //   );
      // } else if (searchBySupplier !== undefined && searchByName !== "") {
      //   dispatch(
      //     findBySupplierAndName({
      //       idSupplier: searchBySupplier,
      //       name: searchByName,
      //       page: page + 1,
      //     })
      //   );
      // } else if (
      //   searchBySupplier !== undefined &&
      //   searchByCastegory !== undefined
      // ) {
      //   dispatch(
      //     findByCategoryAndSupplier({
      //       idSupplier: searchBySupplier,
      //       idCategory: searchByCastegory,
      //       page: page + 1,
      //     })
      //   );
      // } else if (searchBySupplier !== undefined) {
      //   dispatch(
      //     findBySupplier({
      //       idSupplier: searchBySupplier,

      //       page: page + 1,
      //     })
      //   );
      // } else if (searchByCastegory !== undefined) {
      //   dispatch(
      //     findByCategory({
      //       idCategory: searchByCastegory,

      //       page: page + 1,
      //     })
      //   );
      // } else if (searchByName !== "") {
      //   dispatch(
      //     findByName({
      //       name: searchByName,

      //       page: page + 1,
      //     })
      //   );
      // } else {
      //   dispatch(getAllProduct(page + 1));
      // }
    }
  };
  const { openUpdateProductModal } = useSelector((s) => s.modal);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell align="right">Tên sản phẩm</TableCell>
              <TableCell align="right">Hình ảnh</TableCell>
              <TableCell align="right">Danh mục</TableCell>
              <TableCell align="right">Nhà cung cấp</TableCell>
              <TableCell style={{width:300, height:50}} align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row) => {
              var x = {
                id: row?.product?.id,
                productName: row?.product?.name,
                image: row?.product?.avatar,
                category: row?.category?.name,
                supplier: row?.supplier?.supplierName,
                action: [],
                details: 
                attributes?.length >0 ? (attributes?.map((o) => ({
                  productName: o?.product?.name,
                  price: row?.product?.price,
                  size: o?.size,
                  amount: o?.amount,
                  description: o?.product?.description,
                  viewNumber: o?.product?.viewNumber,
                  discount: o?.product?.discount,
                  warranty: o?.product?.warranty,
                  createdAt: o?.product?.createdAt,
                  action:row?.product?.id
                }))):([{
                  productName: row?.product?.name,
                  price: row?.product?.price,
                  size: "",
                  amount: 0,
                  description:row?.product?.description,
                  viewNumber: row?.product?.viewNumber,
                  discount: row?.product?.discount,
                  warranty: row?.product?.warranty,
                  createdAt: row?.product?.createdAt,
                  action:row?.product?.id
                } ]) 
                
              };
              return <Row key={row.id} row={x} />;
            })}
          </TableBody>
        </Table>
        <div style={{ float: "right" }}>
          <Button onClick={handleClickFirstPage}>
            {" "}
            <FirstPageIcon />
          </Button>
          <span>{page}</span>
          <Button onClick={handleClickLastPage}>
            {" "}
            <LastPageIcon />
          </Button>
        </div>
      </TableContainer>
    </Paper>
  );
}
