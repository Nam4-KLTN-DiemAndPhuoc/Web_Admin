import { Box, Button, FormControl, Modal, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../redux/dialogSlice";
import { openUpdateAtrributeModal } from "../../redux/modalSlice";
import { updateAttribute } from "../../redux/productSlice";
import MyAlert from "../alert/MyAlert";
import MyDialog from "../alert/MyDialog";

export default function UpdateAttributeModal({ check }) {
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
  const { isOpenUpdateAttributeModal } = useSelector((s) => s.modal);

  const dispatch = useDispatch();
  const [s, setS] = React.useState(-1);
  const [m, setM] = React.useState(-1);
  const [l, setL] = React.useState(-1);
  const [xl, setXL] = React.useState(-1);
  const { product, isAddAttributed,attributes } = useSelector((state) => state.products);
  const { isOpen } = useSelector((s) => s.dialog);
  const [severity, setSeverity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const handleClose = () => {
    dispatch(openUpdateAtrributeModal());
  };

  const handleSaveAttribute = () => {
    if( message == "" && severity == ""){
   
    if (s > 0 || m > 0 || l > 0 || xl > 0) {
      const params = [
        { id:(attributes?.find(a=> a.size ==="S"))?.id ,size: "S", amount: s!== -1 ? s:(attributes?.find(a=> a.size ==="S")?.amount >0 ? attributes?.find(a=> a.size =="S")?.amount :0) , product: product?.product },
        {id:(attributes?.find(a=> a.size ==="M"))?.id, size: "M", amount: m!== -1 ? m :(attributes?.find(a=> a.size ==="M")?.amount >0 ? attributes?.find(a=> a.size ==="M")?.amount :0), product: product?.product },
        { id:(attributes?.find(a=> a.size ==="L"))?.id,size: "L", amount: l!== -1 ? l:(attributes?.find(a=> a.size ==="L")?.amount >0 ? attributes?.find(a=> a.size ==="L")?.amount :0), product: product?.product },
        {id:(attributes?.find(a=> a.size ==="XL"))?.id, size: "XL", amount: xl!== -1 ? xl :(attributes?.find(a=> a.size ==="XL")?.amount >0 ? attributes?.find(a=> a.size ==="XL")?.amount :0), product: product?.product },
      ];
        dispatch(updateAttribute(params))
      dispatch(openDialog());
    }
    setS(-1)
    setL(-1)
    setM(-1)
    setXL(-1)
    handleClose();
  }
  };
  React.useEffect(() => {
 if( (s!= -1 && s<0)|| (m!= -1 && m<0)||(l!= -1 && l<0)||(xl!= -1 && xl<0)){
      setSeverity("error")
      setMessage("Vui lòng nhập số lớn hơn 0")
    }
    else{
      setSeverity("")
      setMessage("")
    }
  }, [

    dispatch,s,m,l, xl, message, severity
  ]);

  return (
    <React.Fragment>
      <MyDialog
        check={isOpen}
        title="Thông báo"
        content="Cập nhật thuộc tính sản phẩm thành công !"
      />

      <Modal
        hideBackdrop
        open={isOpenUpdateAttributeModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="parent-modal-title">Cập nhật thuộc tính</h2>
          <Box sx={{ width: "100% " }}>
    
            {message && severity && (
              <MyAlert severity={severity} message={message} />
            )}
            <FormControl fullWidth>
              <TextField
                id="filled-basic"
                label=" Size S "
                inputProps={{ type: 'number'}}
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                defaultValue={attributes?.find(a=> a.size =="S")?.amount}
                onChange={(e) => setS(e.target.value)}
              />
              <TextField
                id="filled-basic"
                inputProps={{ type: 'number'}}
                label=" Size M "
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
                defaultValue={attributes?.find(a=> a.size =="M")?.amount}

                onChange={(e) => setM(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size L "
                variant="filled"
                inputProps={{ type: 'number'}}
                style={{ width: "100%", marginTop: "5px" }}
                defaultValue={attributes?.find(a=> a.size =="L")?.amount}

                onChange={(e) => setL(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label=" Size XL "
                variant="filled"
                inputProps={{ type: 'number'}}
                style={{ width: "100%", marginTop: "5px" }}
                defaultValue={attributes?.find(a=> a.size =="XL")?.amount}

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

