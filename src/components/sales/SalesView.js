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
import { updateSale } from '../../redux/sales/actions/salesAction';
import { fetchWarehouse } from '../../redux/warehouse/actions/warehouseAction';
import { toast } from 'react-toastify';

const SalesView = () => {
    const selectedSale = useSelector((state) => state.sales.sale);
    const warehouse = useSelector((state) => state.warehouse.warehouse);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [salesData, setSalesData] = useState({
        id: '',
        salesDate: Date.now(),
        numberOfCTNs: '',
        startCTNNumber: '',
        endCTNNumber: '',
        warehouseDetail: {
            id: '',
        },
        lotDetail: {
            id: '',
        },
        style: {
            id: '',
        },
        user: {
            id: '',
        }
    });

    const handleSalesEdit = () => {
        if (validateRewokData()) {
            dispatch(updateSale(salesData, warehouse, selectedSale.numberOfCTNs));
            setEditMode(false);
        }
    }
    const validateRewokData = () => {
        if (salesData.numberOfCTNs === '' || salesData.startCTNNumber === '' || salesData.endCTNNumber === '') {
            toast.error('Please fill all the fields!');
            return false;
        } else if (salesData.numberOfCTNs <= 0 || salesData.startCTNNumber <= 0 || salesData.endCTNNumber <= 0) {
            toast.error('Please fill all the fields with valid data!');
            return false;
        } else if (salesData.numberOfCTNs < (salesData.endCTNNumber - salesData.startCTNNumber + 1)) {
            toast.error('Number of CTNs should be greater than or equal to the difference between start and end CTN numbers!');
            return false;
        } else if (salesData.numberOfCTNs > (salesData.endCTNNumber - salesData.startCTNNumber + 1)) {
            toast.error('Number of CTNs should be less than or equal to the difference between start and end CTN numbers!');
            return false;
        } else if (salesData.numberOfCTNs > warehouse.numberOfCTNs) {
            toast.error('Number of CTNs should be less than or equal to the number of CTNs in the warehouse!');
            return false;
        } else if (warehouse.startCTNNumber <= salesData.startCTNNumber && warehouse.endCTNNumber >= salesData.endCTNNumber) {
            toast.error('Start and end CTN numbers should be within the range of warehouse start and end CTN numbers!');
            return false;
        } else if (salesData.startCTNNumber > salesData.endCTNNumber) {
            toast.error('Start CTN number should be less than or equal to end CTN number!');
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        setSalesData({
            id: selectedSale.id,
            salesDate: selectedSale.salesDate,
            numberOfCTNs: selectedSale.numberOfCTNs,
            startCTNNumber: selectedSale.startCTNNumber,
            endCTNNumber: selectedSale.endCTNNumber,
            warehouseDetail: {
                id: selectedSale.warehouseDetail.id,
            },
            lotDetail: {
                id: selectedSale.lotDetail.id,
            },
            style: {
                id: selectedSale.style.id,
            },
            user: {
                id: selectedSale.user.id,
            }
        });
        dispatch(fetchWarehouse(selectedSale.warehouseDetail.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSale]);


    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Paper elevation={3} style={{
                        padding: '16px',
                        margin: 'auto',
                    }}>
                        <h1>Sales View</h1>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Sales ID:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {selectedSale.id}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Sales Date:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedSale.salesDate}
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
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedSale.numberOfCTNs}
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
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedSale.startCTNNumber}
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
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedSale.endCTNNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Lot Number:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {selectedSale.lotNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Batch Code:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {selectedSale.batchNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Region Name:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {selectedSale.regionName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Style Name:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {selectedSale.styleName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <br />
                        <ButtonGroup
                            fullWidth
                        >
                            <Button
                                onClick={() => {
                                    setEditMode(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                color='error'
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Back
                            </Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
                {editMode &&
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper elevation={3} style={{
                            padding: '16px',
                            margin: 'auto',
                        }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Edit Sales
                            </Typography>
                            <Divider />
                            <br />
                            <TextField
                                id="outlined-basic"
                                label="Number of CTNs"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                type='number'
                                required
                                value={salesData.numberOfCTNs}
                                onChange={(e) => {
                                    setSalesData({
                                        ...salesData,
                                        numberOfCTNs: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                label="Start CTN Number"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                type='number'
                                required
                                value={salesData.startCTNNumber}
                                onChange={(e) => {
                                    setSalesData({
                                        ...salesData,
                                        startCTNNumber: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                label="End CTN Number"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                type='number'
                                required
                                value={salesData.endCTNNumber}
                                onChange={(e) => {
                                    setSalesData({
                                        ...salesData,
                                        endCTNNumber: e.target.value,
                                    });
                                }}
                            />
                            <br />
                            <Divider />
                            <br />
                            <ButtonGroup
                                fullWidth
                                variant='outlined'
                                margin='normal'
                            >
                                <Button
                                    onClick={handleSalesEdit}
                                >
                                    Update
                                </Button>
                                <Button
                                    color='error'
                                    onClick={() => {
                                        setEditMode(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </ButtonGroup>
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
        </Layout >
    );
};

export default SalesView;