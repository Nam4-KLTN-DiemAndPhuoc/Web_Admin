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

const columns = [
  { id: "userName", label: "Họ Tên", minWidth: 170 },
  { id: "phone", label: "Số điện thoại", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    align: "right",
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


export default function UserTable() {
  const { users } = useSelector((state) => state.users);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch= useDispatch();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick=(user)=>{
    if( user.deletedAt == null){
     if( window.confirm(
        "Bạn có chắc chắn muốn chặn tài khoản " +
        user.userName  +
          " không ?"
      )){
        dispatch(deleteUser(user.id))
      }
    }
    else{
     if( window.confirm(
        "Bạn có chắc chắn muốn kích hoạt lại tài khoản " +
          user.userName +
          " không ?"
      )){
        dispatch(deleteUser(user.id))

      }
    }
  
  }
  return (
    <Paper sx={{ width: "100%" }}>
      <SearchForm  />
      
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
            {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell  align='left'>
                     {row.userName }
                    </TableCell> 
                     <TableCell  align='left'>
                     {row.phone }
                    </TableCell>
                
                    <TableCell align='right'>
                     {row.email }
                    </TableCell>
                
                    <TableCell align='right'>
                     {row.deletedAt ===null ? "Đang hoạt động":"Đã bị khóa" }
                    </TableCell>
                    <TableCell align='right'>
                     {row.deletedAt ===null ? (
                       <Button variant="contained" onClick={()=>handleClick(row)}>Khóa tài khoản</Button>
                     ):( <Button variant="outline" onClick={()=>handleClick(row)}>Kích hoạt tài khoản</Button>) }
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
