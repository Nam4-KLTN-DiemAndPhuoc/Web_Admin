import { Divider, List, ListItem, Toolbar } from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAll } from "../redux/userSlice";


  export default function DrawerCustom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (text) => {
    
      
          if (text === "Đơn hàng") {
          
          } else if (text === "Khách hàng") {
            dispatch(getAll());
            
          
          
          } else if (text === "Nhà cung cấp") {
          } else if (text === "Sản phẩm") {
          }
        };
      
      return(
    
    <div>
      <Toolbar />
      <Divider />
 
      <Divider />
      <List>
     
        <ListItem
          button
          key={"Đơn hàng"}
          onClick={() => handleClick("Đơn hàng")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Đơn hàng"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          key={"Khách hàng"}
          onClick={() => handleClick("Khách hàng")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Khách hàng"} />
        </ListItem>

        
        <Divider />
        <ListItem
          button
          key={"Sản phẩm"}
          onClick={() => handleClick("Sản phẩm")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Sản phẩm"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          key={"Nhà cung cấp"}
          onClick={() => handleClick("Nhà cung cấp")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Nhà cung cấp"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  }
