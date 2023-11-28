import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { register } from '../../redux/auth/actions/authAction';
import { format } from 'date-fns';
import { toast } from 'react-toastify';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mvuna.co.ke/">
                Farmica System
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registrationHolder = useSelector((state) => state.auth.registrationHolder);

    const [userRegistrationData, setUserRegistrationData] = useState({
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: "null",
        activated: true,
        langKey: "en",
        createdBy: "Website",
        createdDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        lastModifiedBy: "Website",
        lastModifiedDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        authorities: [
            "ROLE_USER"
        ],
        password: '',
    });


    const handleSubmit = async () => {
        const success = validateData(userRegistrationData);
        if (success) {
            const newData = {
                ...userRegistrationData,
                login: userRegistrationData.firstName,
            }
            delete newData.confirmPassword;
            dispatch(register(newData));
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };


    useEffect(() => {
        if (registrationHolder) {
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationHolder]);

    const validateData = (data) => {
        // all names should be at least 3 characters long
        if (data.firstName.length < 3 || data.lastName.length < 3) {
            toast.error("Name should be at least 3 characters long");
            return false;
        } else if (data.password.length < 6) {
            toast.error("Password should be at least 6 characters long");
            return false;
        } else if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password should match");
            return false;
        } else {
            return true;
        }
    }


    return (
        <Container component="main" maxWidth="x" sx={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%',
            }
        }>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img
                    style={{ width: '300px', marginBottom: '20px' }}
                    src="/logo.jpg" alt="logo" />
                <h1>Sign Up</h1>
                <Box
                    sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="First Name"
                        name="fname"
                        autoComplete="first-name"
                        autoFocus
                        onChange={(e) => setUserRegistrationData({ ...userRegistrationData, firstName: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lname"
                        label="Last Name"
                        name="lname"
                        autoComplete="last-name"
                        autoFocus
                        onChange={(e) => setUserRegistrationData({ ...userRegistrationData, lastName: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setUserRegistrationData({ ...userRegistrationData, email: e.target.value })}
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
                        autoFocus
                        onChange={(e) => setUserRegistrationData({ ...userRegistrationData, password: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        autoFocus
                        onChange={(e) => setUserRegistrationData({ ...userRegistrationData, confirmPassword: e.target.value })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        color='success'
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/reset" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
} 
