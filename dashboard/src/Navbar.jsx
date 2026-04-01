import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Sidebar from "./Sidebar";

const Navbar = () => {

  return (
    <>
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">My App</Typography>

          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
    </AppBar>
      <Sidebar />

    </>
  );
};

export default Navbar;