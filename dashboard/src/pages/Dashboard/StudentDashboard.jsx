import React, { useState } from "react"; 
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CardActionArea,
  Button,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Popup from '../../popups/Popup';
import Rentals from '../rentals/Rentals';

import RentalSearchTable from '../../popups/RentalSearchTable';
import Borrow from "../../popups/Borrow";
//import BorrowOptions from "../rentals/BorrowOptions";
import BorrowStatus from './BorrowStatus'
import BorrowedItems from './BorrowedItems'


export default function StudentDashboard() {

  return (
    <>
    
    <Box direction="column" sx={{
      width: {
          xs: "100%", // mobile
          md: "400px", // desktop
        },
    }}>
        <BorrowStatus/>
      <Card sx={{width: '600px', height: '300px'}}>
        <BorrowedItems/>
      </Card>
    </Box>
      {/* <BorrowOptions/> */}
    </>
  );
}