

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select,TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openCategoryModal } from '../../redux/modalSlice';

function AddCategoryModal({check}) {
    const [open, setOpen] = React.useState(check);
    const dispatch=useDispatch();
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
     dispatch(openCategoryModal())
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
      <React.Fragment>
  
        <Modal
          hideBackdrop
          open={check}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Thêm danh mục</h2>
          <Box sx={{ width: "100% "}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={"X"}
            label="Age"
          >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
          </Select>
  
          <TextField
                id="filled-basic"
                label="Số lượng"
                variant="filled"
                style={{ width: "100%", marginTop: "5px" }}
              />
              <div   style={{   width: "100%", marginTop: "10px"}} >
             
        <Button  variant="contained" color="error" style={{   float:"right"}} onClick={handleClose}>Đóng</Button>
        <Button   variant="contained" color="success" onClick={handleOpen}>
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

export default AddCategoryModal;