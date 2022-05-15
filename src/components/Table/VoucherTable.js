import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../SearchForm";
import { Button } from "@mui/material";
import moment from "moment";
import { deleteVoucher } from "../../redux/voucherSlice";
import SearchVoucher from "../SearchVoucher";


const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "codeVoucher", label: "Mã voucher", minWidth: 100 },
  {
    id: "useAmount",
    label: "Số lượt sử dụng",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "discount",
    label: "Giảm giá (%)",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "createAt",
    label: "Ngày tạo",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "deleteAt",
    label: "Trạng thái",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "action",
    label: "Hành động",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
];

export default function VoucherTable() {
  const { vouchers } = useSelector((state) => state.vouchers);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleDeleteSupplier = (s) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa voucher " +
          s.codeVoucher +
          " không ?"
      )
    ) {
      dispatch(deleteVoucher(s.id));
    }
  };
  return (
    <Paper sx={{ width: "100%" }}>
      <SearchVoucher />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 5,
                    fontWeight: "bold",
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.codeVoucher}</TableCell>
                    <TableCell align="center">{row.useAmount}</TableCell>
                    <TableCell align="center">
                      {row.discount*100}
                    </TableCell>
                   
                    <TableCell align="center">
                      {moment(row.createAt).format("MM/DD/YYYY, h:mm:ss a")}
                    </TableCell>
                    <TableCell align="center">
                      {row.deleteAt ==null ?"Đang áp dụng":"Hết hạn"}
                    </TableCell>
                    <TableCell align="right">
                  {row.deleteAt ==null?(<Button
                        variant="contained"
                        onClick={() => handleDeleteSupplier(row)}
                      >
                        Xóa
                      </Button>):(<div></div>)}

                      
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={vouchers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
