import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../helpers/auth/AuthProvider';
// import { useDispatch } from "react-redux";

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

// TODO remove, this demo shouldn't need to reset the theme.


export default function Reset() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    //const marketFacilitator = useSelector((state) => state.accounts.marketFacilitator);

    // const dispatch = useDispatch();

    const redirectPath = location.state?.path || '/home';



    const getMarketFacilitator = async (username) => {
    };


    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var status = await auth.signin(data.get('email'), data.get('password'), data.get('rememberMe'));
        if (status) {
            getMarketFacilitator(data.get('email'));
            setOpenSuccess(true);
            navigate(redirectPath);
        } else {
            setOpenError(true);
        }
        setLoading(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Container component="main" maxWidth="x">
            <CssBaseline />
            <Snackbar
                open={openSuccess}
                autoHideDuration={2000}
                onClose={() => setOpenSuccess(false)}
                message="Email Successful"
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            ></Snackbar>
            <Snackbar
                open={openError}
                autoHideDuration={2000}
                onClose={() => setOpenError(false)}
                message="Email Failed"
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            ></Snackbar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        </Backdrop> : 'Reset Password'}
                    </Button>
                    <Grid container>
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