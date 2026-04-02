import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Sidebar from "./Sidebar";

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const role = localStorage.getItem("role");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };


  function displaySidebar() {
    if (localStorage.getItem("role") === '"staff"') {
        return (
          <>
            <Sidebar/>
          </>
        )
    }
  }
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">My App</Typography>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem disabled>
              ID: {localStorage.getItem("id")}
            </MenuItem>
            <MenuItem disabled>
              role: {role}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {displaySidebar()}
    </>
  );
};

export default Navbar;