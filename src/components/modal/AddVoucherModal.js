import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAddVoucherModal, openCategoryModal, openSupplierModal } from "../../redux/modalSlice";
import Select from "react-select";
import useLocationForm from "../address/useLocationForm";
import { addSupplier } from "../../redux/productSlice";
import { openDialog } from "../../redux/dialogSlice";
import MyDialog from "../alert/MyDialog";
import MyAlert from "../alert/MyAlert";
import { phoneValidator, validPhone } from "../regex/regex";
import { addVoucher } from "../../redux/voucherSlice";

function AddVoucherModal({ check }) {
  const [open, setOpen] = React.useState(check);
  const {isOpen}= useSelector(state=> state.dialog)
  const [severity, setSeverity]= useState("")
  const [messaage, setMessage]= useState("")
  const dispatch = useDispatch();
  const handleOpen = () => {
    if(codeVoucher!=="" && useAmount>=0 && discount>=0 && discount<=100){
      const data = {
        codeVoucher: codeVoucher,
        useAmount: useAmount,
        discount: discount/100,
       
      };
      dispatch(addVoucher(data));
      dispatch(openDialog())
  
      dispatch(openAddVoucherModal());
    }
  
   
  };
  const handleClose = () => {
    setOpen(false);
    setMessage("")
    setSeverity("")
    dispatch(openAddVoucherModal());
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
 
  const [codeVoucher, setCodeVoucher] = useState("");
  const [useAmount, setUseAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  
  useEffect(() => {

    if(codeVoucher=="" || useAmount=="" || discount=="" ){

      setSeverity("error")
      setMessage("Vui lòng nhập hết các trường bên dưới")
    }else if(codeVoucher <0 || useAmount<0 || discount<0 ){

      setSeverity("error")
      setMessage("Vui lòng nhập số > 0")
    }else if( discount>100 || discount<0 ){

      setSeverity("error")
      setMessage("Giảm giá phải > 0 và < 100")
    }
    else{
      setSeverity("")
      setMessage("")
    }
  }, [

    dispatch,messaage, severity,codeVoucher,useAmount,discount
  ]);

  return (
    <React.Fragment>
     
      
      <MyDialog check={isOpen} title="Thông báo"
       content="Thêm voucher thành công" />
      <Modal
        hideBackdrop
        open={check}
        onClose={!check}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 650 }}>
          <h2 id="parent-modal-title">Thêm voucher</h2>
         {severity !="" && messaage !="" && (<MyAlert severity={severity} message={messaage} />)}

          <Box sx={{ width: "100% " }}>
            <FormControl fullWidth>
              <TextField
                id="filled-basic"
                label="Mã voucher"
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setCodeVoucher(e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Số lượt sử dụng"
                variant="filled"
                style={{
                  width: "100%",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
                onChange={(e) => setUseAmount(e.target.value)}
              />
              <div style={{ marginBottom: 10 }}>
                <b></b>
              </div>
            
              <TextField
                id="filled-basic"
                label="Giảm giá (%)"
                variant="filled"
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => setDiscount(e.target.value)}
              />
      
              <div style={{ marginBottom: 10 }}>
                <b></b>
              </div>

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
  );
}

export default AddVoucherModal;
