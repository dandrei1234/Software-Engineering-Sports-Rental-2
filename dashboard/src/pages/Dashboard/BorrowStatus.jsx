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

  export default function StaffDashboard() {
  
    return (
      <>
              <Grid container>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                      <CardActionArea
                         >
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
                                "Overdue Items"
                              </Typography>
                              <Typography variant="h5" fontWeight="bold">
                                0
                              </Typography>
                            </Box>
      
                            <Box
                              sx={{
                                color: '#EF4444',
                                p: 1.5,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <ErrorOutlineIcon />
                            </Box>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
              </Grid>
      </>
    );
  }