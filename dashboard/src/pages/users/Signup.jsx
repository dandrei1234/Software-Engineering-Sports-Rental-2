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

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validateForm = () => {
    let newErrors = { name: '', email: '', password: '' };
    let isValid = true;

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

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerUser = async () => {
    if (!validateForm()) return;

    try {
      // The path remains /api/users/signup because that's how we mounted it in index.js
      const response = await axios.post('/api/users/signup', formData);

      setDialogMessage(response.data.message || "Signup successful!");
      setShowDialog(true);
      setFormData({ name: '', email: '', password: '' });

      setTimeout(() => {
        setShowDialog(false); 
        navigate("/login");
      }, 2000);

    } catch (error) {
      const message = error.response?.data?.message || "Signup failed. Check connection.";
      setDialogMessage(message);
      setShowDialog(true);
    }
  };

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
            Signup
          </Typography>

          <FormControl fullWidth margin="normal" error={!!errors.name}>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <OutlinedInput id="name" label="Full Name" value={formData.name} onChange={handleChange} />
            {errors.name && <Typography color="error" variant="caption">{errors.name}</Typography>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            {errors.email && <Typography color="error" variant="caption">{errors.email}</Typography>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
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
            {errors.password && <Typography color="error" variant="caption">{errors.password}</Typography>}
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            sx={{ ...styles.button, mt: 2 }}
            onClick={(e) => {
              e.currentTarget.blur(); // THE ARIA FIX
              registerUser();
            }}
          >
            Sign up
          </Button>

          <Box textAlign="center" mt={3}>
            <Link component="button" variant="body2" onClick={() => navigate("/login")} sx={{ ...styles.link, textDecoration: 'none' }}>
              Already have an account? Log in
            </Link>
          </Box>
        </CardContent>
      </Card>

      <DisplayMessage open={showDialog} setOpen={setShowDialog} message={dialogMessage} />
    </Box>
  );
}