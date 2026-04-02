import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, Typography, FormControl,
  InputLabel, OutlinedInput, InputAdornment,
  IconButton, Button, Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./styles";
import DisplayMessage from "./DisplayMessage";

export default function Login({ setUser, setRole }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'user@smu.edu.ph',
    password: ''
  });

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const loginUser = async () => {
    if (formData.email === "" || formData.password === "") {
      alert("Fields must not be empty");
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/users/login', formData);

      setUser(response.data.name);
      setRole(response.data.role);

      localStorage.setItem('id', JSON.stringify(response.data.id));
      localStorage.setItem('user', JSON.stringify(response.data.name));
      localStorage.setItem('role', JSON.stringify(response.data.role)); // ✅ FIXED

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <DisplayMessage open={showDialog} setOpen={setShowDialog} message={dialogMessage} />

      <Box sx={styles.container}>
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='user@smu.edu.ph'
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              sx={styles.button}
              onClick={loginUser}
            >
              Login
            </Button>
          </CardContent>

          <Link onClick={() => navigate("/signup")} sx={styles.link}>
            Don't have an account? Sign up
          </Link>
        </Card>
      </Box>
    </>
  );
}