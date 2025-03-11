import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { loginService } from '../../services/loginService';


import { useNavigate } from "react-router-dom";

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();  
    const formData = new FormData(e.currentTarget); 
    if(!formData.get('username') || !formData.get('password')){
        return setError('Login fields are required')
    }
    
    setLoading(true)
    // const {err, success, token} =  await loginService(data)       
    const {err, data, token} =  await loginService(formData)       
    setLoading(false)

    if(err){                
        return setError(err)
    }
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