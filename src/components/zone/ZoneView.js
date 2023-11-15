import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import {
    FormControl,
    Paper,
    Grid,
    Typography,
    Button,
    ButtonGroup,
    Divider,
    Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ZoneView = () => {
    const zone = useSelector(state => state.zones.zone);
    const [status, setStatus] = useState(zone.status);
    const navigate = useNavigate();
    const statusOptions = [
        { value: 'PACKING', label: 'PACKING' },
        { value: 'WAREHOUSE', label: 'WAREHOUSE' },
        { value: 'SALES', label: 'SALES' },
        { value: 'REWORK', label: 'REWORK' },
    ];

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        toast.success('Status Updated Successfully to ' + e.target.value);
    }


    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Paper sx={
                        {
                            padding: '16px',
                            margin: 'auto',
                        }
                    } >
                        <h1>Item Details</h1>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Package Date:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.packageDate}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Weight Received:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.weightReceived}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Weight Balance:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.weightBalance}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Number of CTNs:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.numberOfCTNs}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Start CTN Number:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.startCTNNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        End CTN Number:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.endCTNNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Status:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.status}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Lot Details:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.lotDetails}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Created At:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.createdAt}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <br />
                        <ButtonGroup
                            fullWidth
                        >
                            <Button color='secondary' onClick={
                                () => {
                                    navigate('/add-zone/' + zone.id);
                                }
                            }>Edit</Button>
                            <Button color='success' onClick={
                                () => {
                                    navigate('/zones-list');
                                }

                            }>Back</Button>
                            <Button color='warning' onClick={
                                () => {
                                    navigate('/edit-zone');
                                }
                            }>Delete</Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={
                        {
                            padding: '16px',
                            margin: 'auto',
                            maxWidth: '700px',
                        }
                    } >
                        <h1>Change Status</h1>
                        <FormControl fullWidth>
                            <Select native value={status} onChange={handleStatusChange}>
                                {
                                    statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper
                        sx={
                            {
                                padding: '16px',
                                margin: 'auto',
                                maxWidth: '700px',
                            }
                        }>
                        <h1>Comments</h1>
                        <Button color='success'>Add Comment</Button>
                        <div style={
                            {
                                margin: '10px',
                            }
                        }>
                            <Typography variant="body2">
                                {zone.comment}
                            </Typography>
                            <Divider></Divider>
                            <Typography variant="body2">
                                {zone.comment}
                            </Typography>
                            <Divider></Divider>
                            <Typography variant="body2">
                                {zone.comment}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ZoneView;