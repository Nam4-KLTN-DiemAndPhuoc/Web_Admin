import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import OrderTable from "../../components/Table/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../redux/userSlice";
import TabCustom from "../../components/TabCustom";
import Content from "../../components/Content";
import UserTable from "../../components/Table/UserTable";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "../../redux/authSlice";
import { getAllOrder, getByStatus, setStatusOrder } from "../../redux/orderSlice";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {
  getAllCategory,
  getAllProduct,
  getAllSupplier,
  getAttribute,
} from "../../redux/productSlice";
import {
  getAllVoucher,

} from "../../redux/voucherSlice";
import ProductTable from "../../components/Table/ProductTable";
import ContentProduct from "../../components/ContentProduct";
import SupplierTable from "../../components/Table/SupplierTable";
import { getSuppliers } from "../../redux/supplierSlice";
import VoucherTable from "../../components/Table/VoucherTable";
const drawerWidth = 240;

function Dashboard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [check, setCheck] = React.useState("Đơn hàng");

  React.useEffect(() => {
    dispatch(getByStatus("ORDER_IN_PROGRESS"));
    dispatch(getByStatus("PREPARING_TO_SHIP"));
    dispatch(getByStatus("DELIVERED"));
    dispatch(getByStatus("CANCELED"));
    dispatch(setStatusOrder("ORDER_IN_PROGRESS"))

    dispatch(getAllCategory());
    dispatch(getAllSupplier());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (text) => {
    if (text === "Đơn hàng") {
      setCheck("Đơn hàng");
    } else if (text === "Khách hàng") {
      setCheck("Khách hàng");
      dispatch(getAll());
    } else if (text === "Sản phẩm") {
      setCheck("Sản phẩm");
    } else if (text === "Đăng xuất") {
      // if (window.confirm("Bạn có chắc chắn muốn đăng xuất không? ")) {
        dispatch(logout());
        navigate("/login", (require = "true"));
      // }
    } else if (text === "Nhà cung cấp") {
      dispatch(getAllSupplier());
      setCheck("Nhà cung cấp");
    }else if (text === "Voucher") {
      dispatch(getAllVoucher());
      setCheck("Voucher");
    }
  };

  const drawer = (
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
            <EventNoteIcon />
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
            <SupervisedUserCircleIcon />
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
            <ShoppingBasketIcon />
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
            <FactoryIcon />
          </ListItemIcon>
          <ListItemText primary={"Nhà cung cấp"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          key={"Voucher"}
          onClick={() => handleClick("Voucher")}
        >
          <ListItemIcon>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText primary={"Voucher"} />
        </ListItem>
        <Divider />
        <Divider style={{ marginTop: "400px" }} />
        <ListItem
          button
          key={"Đăng xuất"}
          onClick={() => handleClick("Đăng xuất")}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Đăng xuất"} />
        </ListItem>
      </List>
      {/* <Divider /> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Table
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {check == "Khách hàng" ? (
          <UserTable />
        ) : check == "Đơn hàng" ? (
          <Content />
        ) : check == "Sản phẩm" ? (
          <ContentProduct />
        ) : check == "Nhà cung cấp" ? (
          <SupplierTable />
        ) : (
          <VoucherTable />
        )}

        <Typography paragraph></Typography>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
