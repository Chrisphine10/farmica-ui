import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import {
    Paper,
    Grid,
    Typography,
    Button,
    ButtonGroup,
    Divider,
    TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRework } from '../../redux/rework/actions/reworkAction';
import { fetchWarehouse } from '../../redux/warehouse/actions/warehouseAction';
import { toast } from 'react-toastify';

const ReworkView = () => {
    const selectedRework = useSelector((state) => state.rework.rework);
    const warehouse = useSelector((state) => state.warehouse.warehouse);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [reworkData, setReworkData] = useState({
        id: '',
        pdnDate: Date.now(),
        reworkDate: Date.now(),
        numberOfCTNs: '',
        startCTNNumber: '',
        endCTNNumber: '',
        status: 'PENDING',
        warehouseDetail: {
            id: '',
        },
        lotDetail: {
            id: '',
        },
        user: {
            id: '',
        }
    });

    const handleReworkEdit = () => {
        if (validateRewokData()) {
            dispatch(updateRework(reworkData, warehouse, selectedRework.numberOfCTNs));
            setEditMode(true);
        }
    }

    const validateRewokData = () => {
        if (reworkData.numberOfCTNs === '' || reworkData.startCTNNumber === '' || reworkData.endCTNNumber === '') {
            toast.error('Please fill all the fields!');
            return false;
        } else if (reworkData.numberOfCTNs < 0 || reworkData.startCTNNumber < 0 || reworkData.endCTNNumber < 0) {
            toast.error('Please enter positive values!');
            return false;
        } else if (reworkData.numberOfCTNs < reworkData.endCTNNumber - reworkData.startCTNNumber) {
            toast.error('Number of CTNs should be greater than the difference between start and end CTN numbers!');
            return false;
        } else if (reworkData.numberOfCTNs < reworkData.endCTNNumber) {
            toast.error('Number of CTNs should be greater than end CTN number!');
            return false;
        } else if (reworkData.startCTNNumber > reworkData.endCTNNumber) {
            toast.error('Start CTN number should be less than end CTN number!');
            return false;
        } else if (reworkData.numberOfCTNs > warehouse.numberOfCTNs) {
            toast.error('Number of CTNs should be less than available quantity!');
            return false;
        } else if (warehouse.startCTNNumber >= reworkData.startCTNNumber) {
            toast.error('Start CTN number should be greater than warehouse start CTN number!');
            return false;
        } else if (warehouse.endCTNNumber <= reworkData.endCTNNumber) {
            toast.error('End CTN number should be less than warehouse end CTN number!');
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        setReworkData({
            id: selectedRework.id,
            pdnDate: selectedRework.pdnDate,
            reworkDate: selectedRework.reworkDate,
            numberOfCTNs: selectedRework.numberOfCTNs,
            startCTNNumber: selectedRework.startCTNNumber,
            endCTNNumber: selectedRework.endCTNNumber,
            status: selectedRework.status,
            warehouseDetail: {
                id: selectedRework.warehouseDetail.id,
            },
            lotDetail: {
                id: selectedRework.lotDetail.id,
            },
            user: {
                id: selectedRework.user.id,
            }
        });
        console.log(selectedRework);
        dispatch(fetchWarehouse(selectedRework.warehouseDetail.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRework])

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Paper elevation={3} style={{
                        padding: '16px',
                        margin: 'auto',
                    }}>
                        <h1>Rework Details</h1>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Rework ID:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        PDN Date:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.pdnDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        Rework Date:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.reworkDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        Number of CTNs:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.numberOfCTNs}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        Start CTN Number:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.startCTNNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        End CTN Number:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.endCTNNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        Status:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.status}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        Warehouse ID:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.warehouseDetail.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        Lot Number
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.lotNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        Added By:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedRework.user.login}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={12}>
                                <ButtonGroup fullWidth
                                    variant='outlined'
                                    margin='normal'>
                                    <Button
                                        color='success'
                                        onClick={() => navigate(-1)}
                                        fullWidth
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        color='warning'
                                        onClick={() => setEditMode(true)}
                                        fullWidth
                                    >
                                        Edit
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                {editMode &&
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} style={{
                            padding: '16px',
                            margin: 'auto',
                        }}>
                            <h1>Edit Rework</h1>
                            <Divider />
                            <Grid container spacing={2} padding={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Number of CTNs"
                                        name="numberOfCTNs"
                                        onChange={(e) => setReworkData({ ...reworkData, numberOfCTNs: e.target.value })}
                                        required
                                        value={reworkData.numberOfCTNs}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Start CTN Number"
                                        name="startCTNNumber"
                                        onChange={(e) => setReworkData({ ...reworkData, startCTNNumber: e.target.value })}
                                        required
                                        value={reworkData.startCTNNumber}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="End CTN Number"
                                        name="endCTNNumber"
                                        onChange={(e) => setReworkData({ ...reworkData, endCTNNumber: e.target.value })}
                                        required
                                        value={reworkData.endCTNNumber}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <Button
                                            color='success'
                                            onClick={() => handleReworkEdit()}
                                            fullWidth
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            color='warning'
                                            onClick={() => setEditMode(false)}
                                            fullWidth
                                        >
                                            Cancel
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                }
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
                                test
                            </Typography>
                            <Divider></Divider>
                            <Typography variant="body2">
                                test
                            </Typography>
                            <Divider></Divider>
                            <Typography variant="body2">
                                test
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ReworkView;