import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Link, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import CssBaseline from '@mui/material/CssBaseline';
import { counties } from "kenya";
import { register } from '../../redux/auth/actions/authAction';
import { format } from 'date-fns';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mvuna.co.ke/">
                mVuna System
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const [isLoading, setLoading] = useState(false);
    const userDetails = useSelector(state => state.auth.user);
    const marketFacilitator = useSelector((state) => state.accounts.marketFacilitator);
    const registrationError = useSelector((state) => state.auth.error);
    const marketFacilitatorError = useSelector((state) => state.accounts.error);
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openError, setOpenError] = useState("");
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const [userRegistrationData, setUserRegistrationData] = useState({
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: "null",
        activated: true,
        langKey: "EN",
        createdBy: "Website",
        createdDate: '',
        authorities: [
            "ROLE_USER"
        ],
        password: '',
    });

    const [userMarketFacilitatorData, setUserMarketFacilitatorData] = useState(
        {
            county: '',
            gender: '',
            ageRange: '',
            createdAt: '',
            numberOfZones: 0,
            updateAt: '',
            user: {
                "id": 0,
                "login": "string"
            }
        });









    useEffect(() => {
        console.log("registrationError: " + registrationError);
        if (registrationError !== null && registrationError !== undefined && registrationError !== "") {
            if (registrationError.detail === undefined || registrationError.detail === null || registrationError.detail === "") {
                setOpenError(registrationError.message);
            } else {
                setOpenError(registrationError.detail);
            }
            // wait for 2 seconds
            setTimeout(() => {
                setOpenSnackbar(true);
                setLoading(false);
            }, 2000);
        }
    }, [registrationError]);


    useEffect(() => {
        if (marketFacilitator !== null && marketFacilitator.id !== undefined && marketFacilitator !== "") {
            console.log("marketFacilitator");
            setLoading(false);
            navigate('/login');
        }
    }, [marketFacilitator, navigate]);

    useEffect(() => {
        console.log("marketFacilitatorError: " + marketFacilitatorError);
        if (marketFacilitatorError !== null && marketFacilitatorError !== undefined && marketFacilitatorError !== "") {
            setOpenError(marketFacilitatorError.detail);
            // wait for 2 seconds
            setTimeout(() => {
                setOpenSnackbar(true);
                setLoading(false);
            }, 2000);
        }
    }, [marketFacilitatorError]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = await validateData();
        setOpenError(error);
        console.log(error);
        if (error !== null) {
            setOpenSnackbar(true);
            setLoading(false);
        } else {
            setLoading(true);
            // set user registration data
            dispatch(register(userRegistrationData));
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    // Define the AgeRange enum
    const AgeRange = {
        AGE_18_TO_24: 'AGE_18_TO_24',
        AGE_25_TO_34: 'AGE_25_TO_34',
        AGE_35_TO_44: 'AGE_35_TO_44',
        AGE_45_TO_54: 'AGE_45_TO_54',
        AGE_55_TO_64: 'AGE_55_TO_64',
        AGE_OVER_65: 'AGE_OVER_65',
    };

    const Gender = {
        MALE: 'MALE',
        FEMALE: 'FEMALE'
    }


    const validateData = (data) => {
        // all names should be at least 3 characters long
        if (data.fname.length < 3 || data.lname.length < 3) {
            return "Name should be at least 3 characters long";
        }
        // phone number should be 9 digits long
        if (data.phone.length !== 9) {
            return "Phone number should be 9 digits long";
        }
        // password should be at least 8 characters long
        if (data.password.length < 8) {
            return "Password should be at least 8 characters long";
        }
        // password and confirm password should match   
        if (data.password !== data.confirmPassword) {
            return "Password and confirm password should match";
        }
        // email should be valid
        if (!data.email.includes('@')) {
            return "Email should be valid";
        }
        return null;

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
                    src="/mVuna.png" alt="logo" />
                <h1>Sign Up</h1>
                {openError !== null ? <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={() => setOpenSnackbar(false)}
                    message={openError}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                ></Snackbar> : null}
                <Box component="form"
                    noValidate
                    onSubmit={handleSubmit}
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
                    />
                    <TextField
                        label="Phone Number"
                        required
                        id="phone"
                        name='phone'
                        type="number"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    +254
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="gender">Gender</InputLabel>
                        <Select
                            name='gender'
                            required
                            label="Gender"
                        >
                            {Object.values(Gender).map((gender) => (
                                <MenuItem key={gender} value={gender}>
                                    {gender}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Age Range</InputLabel>
                        <Select
                            label="Age Range"
                            name='ageRange'
                            required
                        >
                            {Object.values(AgeRange).map((ageRange) => (
                                <MenuItem key={ageRange.at} value={ageRange}>
                                    {ageRange}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Add dropdown for counties */}
                    <FormControl
                        fullWidth
                        margin="normal"
                        required
                    >
                        <InputLabel id="county">County</InputLabel>
                        <Select
                            labelId="county"
                            name='county'
                            label="County"
                        >
                            {counties.map((county) => (
                                county.id === null ? null : <MenuItem key={county.name} value={county.name}>
                                    {county.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="numberOfZones"
                        label="Number of Zones"
                        type="number"
                        id="numberOfZones"
                        autoComplete="current-password"
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleOpen}
                    >
                        {isLoading ? <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                            onClick={handleClose}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop> : 'Sign Up'}
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
