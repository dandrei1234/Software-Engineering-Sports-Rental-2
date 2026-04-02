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
  const cards = [
    {
      title: "Overdue Items",
      value: 0,
      icon: <ErrorOutlineIcon />,
      color: "#EF4444",
      onClick: () => console.log("Overdue Items clicked"),
    },
    {
      title: "Total Equipment",
      value: 30,
      icon: <Inventory2OutlinedIcon />,
      color: "#6366F1",
      onClick: () => console.log("Total Equipment clicked"),
    },
    {
      title: "Active Rentals",
      value: 0,
      icon: <AccessTimeOutlinedIcon />,
      color: "#F59E0B",
      onClick: () => console.log("Active Rentals clicked"),
    },
  ];

  export default function StaffDashboard() {
    const [openRentalSearch, setOpen] = useState(false);
    const [rentals, setRentals] = useState([]);
    const [data, setData] = useState([]);

    return (
      <>
        <Popup rentalSearch open={openRentalSearch} setOpen={setOpen} setData={setRentals} />
        
        
        {/* <RentalSearchTable data = {data} /> */}

        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardActionArea onClick={card.onClick}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {card.title}
                        </Typography>
                        <Typography variant="h5" fontWeight="bold">
                          {card.value}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          backgroundColor: `${card.color}20`,
                          color: card.color,
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{height: '30px'}}  
        >
          Search
        </Button>
        
        <Rentals
            data={rentals}
            setData={setRentals}/>
      </>
    );
  }