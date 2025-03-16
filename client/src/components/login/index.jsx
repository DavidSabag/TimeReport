import React, { useState, useContext, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { loginService } from '../../services/loginService';
import { EmployeeDataContext } from "../../globalState"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(EmployeeDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    const token = Cookies.get("session-token");
    const data = localStorage.getItem("employeeData");
    dispatch({ type: 'LOGIN', payload: !!token });
    dispatch({ type: 'EMPLOYEEDATA', payload: JSON.parse(data) });
    if (token) navigate("/dashboard");
  }, [navigate])



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get('username') || !formData.get('password')) {
      return setError('Login fields are required')
    }

    setLoading(true)
    const { data, token } = await loginService(formData)
    setLoading(false)

    if (data.err) {
      return setError(data.err)
    }

    dispatch({ type: 'LOGIN', payload: !!token });
    dispatch({ type: 'EMPLOYEEDATA', payload: data });
    localStorage.setItem('employeeData', JSON.stringify(data))
    navigate("/dashboard");

  }


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <div className={'flex justify-center'}>
            {
              loading ? <CircularProgress className={'mt-[30px]'} /> :
                <div className={'flex flex-col w-full'}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                  <label className={'w-full flex justify-center font-medium text-[darkred]'}>{error}</label>
                </div>
            }
          </div>
        </Box>
      </Box>
    </Container>

  );
}

export default Login