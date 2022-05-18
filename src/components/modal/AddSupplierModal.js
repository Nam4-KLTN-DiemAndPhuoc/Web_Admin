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
import { openCategoryModal, openSupplierModal } from "../../redux/modalSlice";
import Select from "react-select";
import useLocationForm from "../address/useLocationForm";
import { addSupplier } from "../../redux/productSlice";
import { openDialog } from "../../redux/dialogSlice";
import MyDialog from "../alert/MyDialog";
import MyAlert from "../alert/MyAlert";
import { phoneValidator, validPhone } from "../regex/regex";

function AddSupplierModal({ check }) {
  const [open, setOpen] = React.useState(check);
  const {isOpen}= useSelector(state=> state.dialog)
  const [severity, setSeverity]= useState("")
  const [messaage, setMessage]= useState("")
  const dispatch = useDispatch();
  const handleOpen = () => {
    if(name!="" && phone!="" && street!="" && selectedWard.label!="" && selectedDistrict.label!="" &&  selectedCity.label!="" ){
      const data = {
        supplierName: name,
        phoneNumber: phone,
        street: street,
        wards: selectedWard.label,
        district: selectedDistrict.label,
        city: selectedCity.label,
      };
      dispatch(addSupplier(data));
      dispatch(openDialog())
  
      dispatch(openSupplierModal());
      setName("")
      setPhone("")
      setStreet("")
      setMessage("")
      setSeverity("")
    }
    else{
      setSeverity("error")
      setMessage("Vui lòng nhập hết các trường bên dưới!")
    }
  
   
  };
  const handleClose = () => {
    setOpen(false);
    setName("")
    setPhone("")
    setStreet("")
    setMessage("")
    setSeverity("")
    dispatch(openSupplierModal());
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
  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;
  const [street, setStreet] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  useEffect(() => {
     if( phone !==""){
      if(phoneValidator(phone) != ""){
        setSeverity("error")
        setMessage("Số điện thoại không hợp lệ")
      }else{
        setSeverity("")
        setMessage("")
      }
    }
    else if(name=="" || phone=="" || street=="" || selectedWard?.label=="" || selectedDistrict?.label=="" || selectedCity?.label=="" ){

      setSeverity("error")
      setMessage("Vui lòng nhập hết các trường bên dưới")
    }
    else{
      setSeverity("")
      setMessage("")
    }
  }, [

    dispatch,name,phone,street, selectedWard,selectedDistrict,selectedCity ,messaage, severity
  ]);

  return (
    <React.Fragment>
     
      
      <MyDialog check={isOpen} title="Thông báo"
       content="Thêm nhà cung cấp thành công" />
      <Modal
        hideBackdrop
        open={check}
        onClose={!check}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 650 }}>
          <h2 id="parent-modal-title">Thêm nhà cung cấp</h2>
         {severity !="" && messaage !="" && (<MyAlert severity={severity} message={messaage} />)}

          <Box sx={{ width: "100% " }}>
            <FormControl fullWidth>
              <TextField
                id="filled-basic"
                label="Tên nhà cung cấp"
                variant="standard"
                value={name}
                style={{ width: "100%", marginTop: "5px" }}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                id="filled-basic"
                label="Số điện thoại"
                variant="filled"
                value={phone}
                style={{
                  width: "100%",
                  marginTop: "5px",
                  marginBottom: "10px",
                }}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div style={{ marginBottom: 10 }}>
                <b></b>
              </div>
              {/* <form
                onSubmit={onSubmit}
                className="w-11/12 p-5 mx-auto mt-10 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3"
              > */}
              {/* <div className="flex flex-col gap-5"> */}
              <Stack direction="row" spacing={2}>
                <Select
                  name="cityId"
                  key={`cityId_${selectedCity?.value}`}
                  isDisabled={cityOptions.length === 0}
                  options={cityOptions}
                  onChange={(option) => onCitySelect(option)}
                  placeholder="Tỉnh/Thành"
                  defaultValue={selectedCity}
                />

                <Select
                  name="districtId"
                  key={`districtId_${selectedDistrict?.value}`}
                  isDisabled={districtOptions.length === 0}
                  options={districtOptions}
                  onChange={(option) => onDistrictSelect(option)}
                  placeholder="Quận/Huyện"
                  defaultValue={selectedDistrict}
                />

                <Select
                  name="wardId"
                  key={`wardId_${selectedWard?.value}`}
                  isDisabled={wardOptions.length === 0}
                  options={wardOptions}
                  placeholder="Phường/Xã"
                  onChange={(option) => onWardSelect(option)}
                  defaultValue={selectedWard}
                />
                {/* </div> */}
              </Stack>
              <TextField
                id="filled-basic"
                label="Tên đường, số nhà"
                variant="filled"
                value={street}
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(e) => setStreet(e.target.value)}
              />
              {/* <button
                  type="submit"
                  className="w-full p-2 mt-4 text-white bg-blue-900 rounded"
                  hidden
                ></button>
              </form> */}
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

export default AddSupplierModal;
