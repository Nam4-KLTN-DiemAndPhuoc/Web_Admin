import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import OrderTable from "./Table/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { getByStatus } from "../redux/orderSlice";

export default function TabCustom() {
  
const dispatch =useDispatch()
  const [value, setValue] = React.useState("ORDER_IN_PROGRESS");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Đơn hàng chưa xác nhận" value="ORDER_IN_PROGRESS" />

            <Tab label="Đơn hàng đang vận chuyển" value="PREPARING_TO_SHIP" />
            <Tab label="Đơn hàng đã giao" value="DELIVERED" />
            <Tab label="Đơn hàng đã hủy" value="CANCELED" />
          </TabList>
        </Box>
        <OrderTable data={value}/>
      </TabContext>
    </Box>
  );
}
