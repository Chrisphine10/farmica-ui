import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import {
    TextField,
    Paper,
    Grid,
    Typography,
    Button,
    ButtonGroup,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createWarehouse } from '../../redux/warehouse/actions/warehouseAction';
import { fetchZone } from '../../redux/zones/actions/zonesAction';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { fetchComments, createComment } from '../../redux/comment/actions/commentsAction';

const ZoneView = () => {
    const zone = useSelector(state => state.zones.zone);
    const warehouseData = useSelector(state => state.warehouse.warehouse);
    const comments = useSelector(state => state.comments.comments);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [warehouse, setWarehouse] = useState({
        id: '',
        warehouseDate: format(new Date(), "yyyy-MM-dd"),
        numberOfCTNs: '',
        startCTNNumber: '',
        endCTNNumber: '',
        packingZoneDetail: {
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

    const handleAddToWarehouse = () => {
        if (validateWarehouse()) {
            dispatch(createWarehouse(warehouse, zone));
            dispatch(fetchComments('PACKING'));
            setOpen(false);
        }
    }


    const handleDelete = () => {
        toast.success('Delete functionality not implemented yet!');
    }

    const validateWarehouse = () => {
        if (warehouse.numberOfCTNs === '' || warehouse.startCTNNumber === '' || warehouse.endCTNNumber === '') {
            toast.error('Please fill all the fields!');
            return false;
        } else if (warehouse.numberOfCTNs > zone.numberOfCTNs) {
            toast.error('Number of CTNs cannot be greater than the number of CTNs in the zone!');
            return false;
        } else if (warehouse.startCTNNumber < zone.startCTNNumber || warehouse.endCTNNumber > zone.endCTNNumber) {
            toast.error('Start CTN Number and End CTN Number should be in the range of the zone!');
            return false;
        } else if (warehouse.startCTNNumber > warehouse.endCTNNumber) {
            toast.error('Start CTN Number cannot be greater than End CTN Number!');
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        setWarehouse({
            ...warehouse,
            packingZoneDetail: {
                id: zone.id,
            },
            lotDetail: {
                id: zone.lotDetail.id,
            },
            style: {
                id: zone.style.id,
            },
            user: {
                id: zone.user.id,
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zone]);

    useEffect(() => {
        if (warehouseData.id) {
            console.log(warehouseData);
            dispatch(fetchZone(zone.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [warehouseData]);


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
                                        Lot Number:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.lotNumber}
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
                                    {zone.batchNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        uiCode:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.uicode}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Region Code:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {zone.regionName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
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
                                    {zone.styleName}
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
                                    navigate(-1);
                                }

                            }>Back</Button>
                            <Button color='warning' onClick={
                                () => {
                                    handleDelete();
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
                        <h1>Create Warehouse</h1>
                        {!open && <Button
                            color='success'
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Add To Warehouse
                        </Button>}
                        {open && <>
                            <TextField
                                id="outlined-basic"
                                label="Number of Cartons"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                type='number'
                                required
                                onChange={(e) => {
                                    setWarehouse({
                                        ...warehouse,
                                        numberOfCTNs: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Start CTN Number"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                type='number'
                                required
                                onChange={(e) => {
                                    setWarehouse({
                                        ...warehouse,
                                        startCTNNumber: e.target.value,
                                    });
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                label="End CTN Number"
                                variant="outlined"
                                fullWidth
                                margin='normal'
                                type='number'
                                required
                                onChange={(e) => {
                                    setWarehouse({
                                        ...warehouse,
                                        endCTNNumber: e.target.value,
                                    });
                                }}
                            />
                            <Divider />
                            <ButtonGroup fullWidth style={{ marginTop: '10px' }}>
                                <Button color='success'
                                    onClick={() => {
                                        handleAddToWarehouse();
                                    }}
                                >Add To Warehouse </Button>
                                <Button color='warning'
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >Cancel</Button>
                            </ButtonGroup>
                        </>}
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
                            {comments.map((comment) => {
                                return (
                                    <div key={comment.id}>
                                        <Typography variant="body2">
                                            <strong>
                                                {comment.user.firstName} {comment.user.lastName}:
                                            </strong>
                                        </Typography>
                                        <Typography variant="body2">
                                            {comment.comment}
                                        </Typography>
                                        <Divider />
                                    </div>
                                )
                            })}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ZoneView;