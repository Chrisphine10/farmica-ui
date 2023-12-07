import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import {
    Paper,
    Grid,
    Typography,
    Divider,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/auth/actions/authAction';

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // State to indicate if we're loading data
    const userDetails = useSelector((state) => state.auth.user);


    useEffect(() => {
        setLoading(true);
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (userDetails !== null && userDetails !== undefined) {
            console.log('userDetails', userDetails);
            setLoading(false);
        }
    }, [userDetails]);

    return (
        <Layout>
            <Paper sx={
                {
                    margin: 'auto',
                    width: '100%',
                    maxWidth: 800,
                }
            }>
                <div
                    style={
                        { paddingLeft: 10, paddingTop: 10 }
                    }
                >
                    <h1>Account Details</h1>
                </div>
                <Divider />
                {!loading ? (
                    <div style={
                        { padding: 10, margin: 10 }
                    }>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>First Name:</strong> {userDetails.firstName}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>Last Name:</strong> {userDetails.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>Email:</strong> {userDetails.email}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            sx={
                                {
                                    marginTop: '16px',
                                }
                            }
                            onClick={() => navigate(`/edit-user-details/${userDetails.id}`)}
                        >
                            Edit
                        </Button> */}
                    </div>
                ) : (
                    <div >Loading...</div>
                )}
            </Paper>
        </Layout>
    );

}

export default Profile;