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

export default function Signup({ setUser }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });

    // Clear error when typing
    setErrors({
      ...errors,
      [event.target.id]: ''
    });
  };

  const validateForm = () => {
    let newErrors = {
      name: '',
      email: '',
      password: ''
    };

    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
      if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least 1 uppercase letter";
      isValid = false;
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least 1 number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerUser = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        'http://localhost:1337/users/signup',
        formData
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: ''
      });

      setDialogMessage(response.data.message);
      setShowDialog(true);

      // Redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setDialogMessage(
        error.response?.data?.message || "Signup failed"
      );
      setShowDialog(true);
    }
  };

  return (
    <>
      <DisplayMessage
        open={showDialog}
        setOpen={setShowDialog}
        message={dialogMessage}
      />

      <Box sx={styles.container}>
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Signup
            </Typography>

            {/* Name */}
            <FormControl fullWidth margin="normal" error={!!errors.name}>
              <InputLabel>Full Name</InputLabel>
              <OutlinedInput
                id="name"
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <Typography color="error" variant="caption">
                {errors.name}
              </Typography>
            </FormControl>

            {/* Email */}
            <FormControl fullWidth margin="normal" error={!!errors.email}>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Typography color="error" variant="caption">
                {errors.email}
              </Typography>
            </FormControl>

            {/* Password */}
            <FormControl fullWidth margin="normal" error={!!errors.password}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Typography color="error" variant="caption">
                {errors.password}
              </Typography>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              sx={styles.button}
              onClick={registerUser}
            >
              Sign up
            </Button>
          </CardContent>

          <Box textAlign="center" mt={2}>
              <Link onClick={() => navigate("/login")} sx={styles.link}>
                Already have an account? Log in
              </Link>
          </Box>
        </Card>
      </Box>
    </>
  );
}