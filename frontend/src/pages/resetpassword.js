import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const tonavigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://roadhealthmap.vercel.app/resetPassword', {
        token,
        password,
      });

      const { success, message } = response.data;

      if (success) {
        setSuccess(true);
      } else {
        setError(message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = () => {
    tonavigate('/login');
  };

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div>
        <Typography variant="h4" align="center" mb={3}>
          Reset Password
        </Typography>
        {success ? (
          <>
            <Typography variant="body1" align="center" mb={2}>
              Password reset successfully.
            </Typography>
            <Button variant="contained" color="inherit" onClick={handleLogin}>
              Go to Login
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} sx={{ alignItems: 'center' }}>
            <TextField type="password" label="New Password" value={password} onChange={handlePasswordChange} sx={{ mb: 2 }} />
            <br />
            <TextField type="password" label="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} sx={{ mb: 2 }} />
            {error && <Typography color="error">{error}</Typography>}
            <br />
            <Button type="submit" variant="contained" color="inherit" sx={{ mt: 2 }}>
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default ResetPasswordPage;

