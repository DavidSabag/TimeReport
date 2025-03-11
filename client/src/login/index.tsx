import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Cookies from 'js-cookie';


import { useNavigate } from "react-router-dom";

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();  
    const res = await fetch('http://localhost:8080/login', {credentials: "include"})
    const data = await res.json();
    const token = Cookies.get("session-token");
    setIsAuthenticated(!!token)
    console.log(data)
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
                    loading? <CircularProgress className={'mt-[30px]'}/> : 
                    <div className={'flex flex-col w-full'}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button> 
                        <label className={'w-full flex justify-center font-medium text-[darkred]'}>תנשמת תנשמת תנשמת, בלילה נושמת!!</label>
                    </div>
                }   
              </div>                
          </Box>
        </Box>        
      </Container>    

  );
}

export default Login