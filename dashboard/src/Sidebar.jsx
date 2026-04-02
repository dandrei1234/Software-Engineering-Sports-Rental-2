import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const sidebarWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [menuItems, setMenuItems] = useState([
    { text: "Dashboard", path: "/dashboard",  },
    { text: "Audit Log", path: "/auditlog",  },
  ]);

  return (
    <Box
      sx={{
        width: sidebarWidth,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        bgcolor: "grey.100",
        borderRight: "1px solid #ddd",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Sports Rental</Typography>
      </Box>

      <List>
        {menuItems.map((item) => {
          const isActive = activeItem === item.text;
          const role = localStorage.getItem('role')
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "white" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive
                      ? "primary.dark"
                      : "grey.200",
                  },
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;