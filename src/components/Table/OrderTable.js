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
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from "@mui/material";
import { getOrderDetailByOrderId, updateStatus } from "../../redux/orderSlice";
import moment from "moment";
import SearchOrder from "../SearchOrder";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(getOrderDetailByOrderId(id));
    setOpen(!open);
  };
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);
  };
  const changeStatus = (row) => {
    const params = {
      id: row.id2,
      status:
        status === "Đang vận chuyển"
          ? "PREPARING_TO_SHIP"
          : status === "Đã giao"
          ? "DELIVERED"
          : status === "Hủy"
          ? "CANCELED"
          : "",
    };
    if (
      window.confirm(
        "Bạn có chắc chắn muốn chuyển trạng thái đơn hàng thành " +
          status +
          " không ?"
      )
    ) {
      dispatch(updateStatus(params));
    }
  };
  return (
    <React.Fragment>
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
        <TableCell align="right">{row.CustomerName}</TableCell>
        <TableCell align="right">
          {moment(row.orderDay).format("MM/DD/YYYY, h:mm:ss a")}
        </TableCell>

        <TableCell align="right">
          {moment(row.expectedReciverDay).format("MM/DD/YYYY, h:mm:ss a")}
        </TableCell>
        <TableCell align="right">{row.discount}</TableCell>
        <TableCell align="right">{row.totalPrice}</TableCell>
        <TableCell align="right">{row.paymentMethod}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Trạng thái"
                onChange={handleChange}
                // onSelect={(id) => changeStatus(row)}
              >
                {row.action.map((x) => (
                  <MenuItem value={x}>{x}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button onClick={(id) => changeStatus(row)}>Cập nhật</Button>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết hóa đơn
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Hình ảnh</TableCell>
                    <TableCell align="right">Đơn giá </TableCell>
                    <TableCell align="right">Số lượng </TableCell>
                    <TableCell align="right">Giảm giá </TableCell>

                    <TableCell align="right">Thành tiền </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((historyRow, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {historyRow.productName}
                      </TableCell>
                      <TableCell>
                        <img
                          src={historyRow.image}
                          style={{ width: "200px" }}
                        />
                      </TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.discount}</TableCell>

                      <TableCell align="right">
                        {Math.round(historyRow.amount * historyRow.price) -
                          Math.round(
                            historyRow.amount *
                              historyRow.price *
                              historyRow.discount
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
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
    id2: PropTypes.number,
    id: PropTypes.number.isRequired,
    CustomerName: PropTypes.string.isRequired,
    orderDay: PropTypes.string.isRequired,
    expectedReciverDay: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    action: PropTypes.array.isRequired,

    details: PropTypes.arrayOf(
      PropTypes.shape({
        productName: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,

        amount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function OrderTable({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    in_progress_order,
    delivered_order,
    prepare_to_ship_order,
    canceled_order,
    orderDetails,
 
  } = useSelector((state) => state.orders);

  const result =
    data === "ORDER_IN_PROGRESS"
      ? in_progress_order
      : data === "PREPARING_TO_SHIP"
      ? prepare_to_ship_order
      : data === "DELIVERED"
      ? delivered_order
    
      : canceled_order;

  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell align="right">Tên khách hàng</TableCell>
                <TableCell align="right">Ngày đặt</TableCell>
                <TableCell align="right">
                  {data === "ORDER_IN_PROGRESS"
                    ? "Ngày giao dự kiến"
                    : data === "PREPARING_TO_SHIP"
                    ? "Ngày giao dự kiến"
                    : data === "DELIVERED"
                    ? "Ngày nhận"
                    : "Ngày hủy"}
                </TableCell>
                <TableCell align="right">Giảm giá</TableCell>
                <TableCell align="right">Tổng tiền</TableCell>
                <TableCell align="right">Phương thức thanh toán</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Đổi trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  var x = {
                    id2:row?.order?.id,
                    id: row?.order?.codeOrder,
                    CustomerName: row?.user?.userName,
                    orderDay: row?.order?.orderDay,
                    expectedReciverDay:
                      row?.order?.status === "ORDER_IN_PROGRESS"
                        ? row?.order?.expectedReciverDay
                        : row?.order?.status === "PREPARING_TO_SHIP"
                        ? row?.order?.expectedReciverDay
                        : row?.order?.status === "DELIVERED"
                        ? row?.order?.actualReciverDay
                        : row?.order?.canceledDay,

                    discount: row?.order?.discount,
                    totalPrice: row?.order?.totalPrice,
                    paymentMethod: row?.order?.paymentMethod,
                    status:
                      row?.order?.status === "ORDER_IN_PROGRESS"
                        ? "Đơn hàng chưa xác nhận"
                        : row?.order?.status === "PREPARING_TO_SHIP"
                        ? "Đang vận chuyển"
                        : row?.order?.status === "DELIVERED"
                        ? "Đã giao"
                        : "Hủy",

                    action:
                      row?.order?.status === "ORDER_IN_PROGRESS"
                        ? ["Đang vận chuyển", "Hủy"]
                        : row?.order?.status === "PREPARING_TO_SHIP"
                        ? ["Đã giao", "Hủy"]
                        : [],
                    details: orderDetails?.map((o) => ({
                      productName: o?.product?.name,
                      image: o?.product?.avatar,
                      price: o?.product?.price,
                      amount: o?.orderDetail?.amount,
                      discount: o?.product?.discount,
                      total: o?.product?.price * o?.product?.amount,
                    })),
                  };
                  return <Row key={row.name} row={x} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={result.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
