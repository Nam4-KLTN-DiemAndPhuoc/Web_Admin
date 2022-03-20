import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../redux/dialogSlice";
import { openCategoryModal } from "../../redux/modalSlice";
import { addCategory } from "../../redux/productSlice";
import MyAlert from "../alert/MyAlert";
import MyDialog from "../alert/MyDialog";

function AddCategoryModal({ check }) {
  const [open, setOpen] = React.useState(check);
  const dispatch = useDispatch();
  const {errorMessage}= useSelector(state=> state.products)
  const [severity, setSeverity]= useState("")
  const [messaage, setMessage]= useState("")

  const [name, setName]= useState("")
const {isOpen}=useSelector(s=>s.dialog)

  const handleOpen = async() => {
      if( name !==""){
       const a= await  dispatch(addCategory({name:name}))
       if(a.payload.data==''){
         setSeverity("error")
         setMessage("Tên danh mục đã tồn tại! ")
       }
       else{
         setMessage("")
         setSeverity("")
         dispatch(openDialog())
    dispatch(openCategoryModal());

       }
       
      }


  };
  const handleClose = () => {
    dispatch(openCategoryModal());
  };
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
  return (
    <>

 
    <React.Fragment>
    <MyDialog check={isOpen} title="Thông báo" content="Thêm danh mục thành công!" />
      <Modal
        hideBackdrop
        open={check}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>


          <h2 id="parent-modal-title">Thêm danh mục</h2>
          { messaage && severity && (
<MyAlert severity={severity} message={messaage} />

  )}
          <Box sx={{ width: "100% " }}>
            <FormControl fullWidth>
              <TextField
                id="filled-basic"
                label="Tên danh mục"
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={e=> setName(e.target.value)}
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
                  onClick={handleOpen}
                >
                  Lưu
                </Button>
              </div>
            </FormControl>
        
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
    </>
  );
 
}

export default AddCategoryModal;
