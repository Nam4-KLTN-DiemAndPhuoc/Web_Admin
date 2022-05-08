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
import { deleteUser } from "../../redux/userSlice";
import { width } from "@mui/system";
import SearchSupplier from "../SearchSupplier";
import { openUpdateSupplierModal } from "../../redux/modalSlice";
import {
  deleteSupplier,
  getSupplierById,
  setCurrentSupplier,
} from "../../redux/productSlice";
import UpdateSupplierModal from "../modal/UpdateSupplierModal";

const columns = [
  { id: "supplierName", label: "Nhà cung cấp", minWidth: 170 },
  { id: "phone", label: "Số điện thoại", minWidth: 100 },
  {
    id: "address",
    label: "Địa chỉ",
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

export default function SupplierTable() {
  const { suppliers } = useSelector((state) => state.products);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const { isOpenUpdateSupplierModal } = useSelector((s) => s.modal);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdateSupplier = (s) => {
    console.log(" update   ", s);
    dispatch(getSupplierById(s.id));
    dispatch(openUpdateSupplierModal());
  };
  const handleDeleteSupplier = (s) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa nhà cung cấp " +
          suppliers.supplierName +
          " không ?"
      )
    ) {
      dispatch(deleteSupplier(s.id));
    }
  };
  return (
    <Paper sx={{ width: "100%" }}>
      <SearchSupplier />
      <UpdateSupplierModal check={isOpenUpdateSupplierModal} />
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
            {suppliers
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="left">{row.supplierName}</TableCell>
                    <TableCell align="left">{row.phoneNumber}</TableCell>
                    <TableCell align="center">
                      {row.street +
                        " " +
                        row.wards +
                        " " +
                        row.district +
                        " " +
                        row.city}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => handleUpdateSupplier(row)}
                      >
                        Cập nhật
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => handleDeleteSupplier(row)}
                      >
                        Xóa
                      </Button>
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
        count={suppliers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
