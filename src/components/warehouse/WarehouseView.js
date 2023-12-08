import React, { useState, useEffect } from 'react';
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
    TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchWarehouse, updateWarehouse } from '../../redux/warehouse/actions/warehouseAction';
import { createSale, updateSaleUiCode, cleanUpSales } from '../../redux/sales/actions/salesAction';
import { createRework, updateReworkUiCode, cleanUpRework } from '../../redux/rework/actions/reworkAction';
import { fetchZone } from '../../redux/zones/actions/zonesAction';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { fetchComments, createComment } from '../../redux/comment/actions/commentsAction';

const WarehouseView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState('STATUS_CHANGE');
    const selectedWarehouse = useSelector((state) => state.warehouse.warehouse);
    const selectedSale = useSelector((state) => state.sales.sale);
    const selectedRework = useSelector((state) => state.rework.rework);
    const salesCreated = useSelector((state) => state.sales.created);
    const reworkCreated = useSelector((state) => state.rework.created);
    const comments = useSelector(state => state.comments.comments);
    const comment = useSelector(state => state.comments.comment);
    const zone = useSelector((state) => state.zones.zone);
    const [editMode, setEditMode] = useState(false);
    const [warehouse, setWarehouse] = useState({
        id: '',
        warehouseDate: Date.now(),
        numberOfCTNs: '',
        receivedCTNs: '',
        startCTNNumber: '',
        endCTNNumber: '',
        uicode: '',
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
            login: '',
        },
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSx"),
    });


    const [commentData, setCommentData] = useState({
        comment: "",
        status: "WAREHOUSE",
        zoneId: 0,
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSx"),
        user: {
            id: localStorage.getItem("userId"),
        }
    });


    const handleCommentChange = (e) => {
        setCommentData({
            ...commentData,
            comment: e.target.value,
            zoneId: selectedWarehouse.id,
        });
    }

    const handleCommentSubmit = () => {
        dispatch(createComment(commentData));
    }

    useEffect(() => {
        if ((comment.id !== undefined || comment) && (selectedWarehouse && selectedWarehouse.id === comment.zoneId)) {
            dispatch(fetchComments(selectedWarehouse.id, 'PACKING'));
            setCommentData({
                ...commentData,
                comment: '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment]);



    const [salesData, setSalesData] = useState({
        id: '',
        salesDate: Date.now(),
        numberOfCTNs: '',
        startCTNNumber: '',
        endCTNNumber: '',
        uicode: '',
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSx"),
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
            id: localStorage.getItem('userId'),
            login: localStorage.getItem('login'),
        }
    });

    const [reworkData, setReworkData] = useState({
        id: '',
        pdnDate: Date.now(),
        reworkDate: Date.now(),
        numberOfCTNs: '',
        startCTNNumber: '',
        endCTNNumber: '',
        status: 'PENDING',
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSx"),
        warehouseDetail: {
            id: '',
        },
        lotDetail: {
            id: '',
        },
        user: {
            id: localStorage.getItem('userId'),
            login: localStorage.getItem('login'),
        }
    });

    useEffect(() => {
        console.log("selectedWarehouse: ", selectedWarehouse);
        setWarehouse({
            ...warehouse,
            id: selectedWarehouse.id,
            warehouseDate: selectedWarehouse.warehouseDate,
            numberOfCTNs: selectedWarehouse.numberOfCTNs,
            receivedCTNs: selectedWarehouse.receivedCTNs,
            startCTNNumber: selectedWarehouse.startCTNNumber,
            endCTNNumber: selectedWarehouse.endCTNNumber,
            uicode: selectedWarehouse.uicode,
            packingZoneDetail: {
                id: selectedWarehouse.packingZoneDetail.id,
            },
            lotDetail: {
                id: selectedWarehouse.lotDetail.id,
            },
            style: {
                id: selectedWarehouse.style.id,
            },
            user: {
                id: selectedWarehouse.user.id,
                login: selectedWarehouse.user.login,
            }
        });

        setSalesData({
            ...salesData,
            salesDate: format(new Date(), "yyyy-MM-dd"),
            uicode: selectedWarehouse.uicode + '-S' + Math.random(),
            packingZoneDetail: {
                id: selectedWarehouse.packingZoneDetail.id,
            },
            lotDetail: {
                id: selectedWarehouse.lotDetail.id,
            },
            style: {
                id: selectedWarehouse.style.id,
            },
            warehouseDetail: {
                id: selectedWarehouse.id,
            }
        });

        setReworkData({
            ...reworkData,
            pdnDate: format(new Date(), "yyyy-MM-dd"),
            reworkDate: format(new Date(), "yyyy-MM-dd"),
            uicode: selectedWarehouse.uicode + '-R' + Math.random(),
            packingZoneDetail: {
                id: selectedWarehouse.packingZoneDetail.id,
            },
            lotDetail: {
                id: selectedWarehouse.lotDetail.id,
            },
            warehouseDetail: {
                id: selectedWarehouse.id,
            }
        });
        dispatch(fetchZone(selectedWarehouse.packingZoneDetail.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedWarehouse]);

    useEffect(() => {
        if (salesCreated && salesData.numberOfCTNs !== '') {
            console.log("selectedSale: ", selectedSale);
            selectedSale.uicode = selectedWarehouse.uicode + '-S' + selectedSale.id;
            dispatch(updateSaleUiCode(selectedSale));
            dispatch(cleanUpSales());
            dispatch(fetchWarehouse(selectedWarehouse.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salesCreated]);

    useEffect(() => {
        if (reworkCreated && reworkData.numberOfCTNs !== '') {
            console.log("selectedRework: ", selectedRework);
            selectedRework.uicode = selectedWarehouse.uicode + '-R' + selectedRework.id;
            dispatch(updateReworkUiCode(selectedRework));
            dispatch(cleanUpRework());
            dispatch(fetchWarehouse(selectedWarehouse.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reworkCreated]);

    // setSalesData({
    //     ...salesData,
    //     uicode: salesData.uicode,
    // });

    const statusOptions = [
        { value: 'STATUS_CHANGE', label: 'STATUS CHANGE' },
        { value: 'SALES', label: 'SALES' },
        { value: 'REWORK', label: 'REWORK' },
    ];


    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleEdit = () => {
        dispatch(updateWarehouse(warehouse, zone, selectedWarehouse.numberOfCTNs));
        setEditMode(false);
    };

    const handleDelete = () => {
        toast.error('Delete functionality not implemented yet!');
    };

    const handleSales = () => {
        delete salesData.id;
        if (validateSales()) {
            dispatch(createSale(salesData, warehouse, zone));
            setWarehouse({
                ...warehouse,
                numberOfCTNs: warehouse.numberOfCTNs - salesData.numberOfCTNs,
            });
            setStatus('STATUS_CHANGE');
        }
    }

    const handleRework = () => {
        delete reworkData.id;
        if (validateRework()) {
            dispatch(createRework(reworkData, warehouse, zone));
            setWarehouse({
                ...warehouse,
                numberOfCTNs: warehouse.numberOfCTNs - reworkData.numberOfCTNs,
            });
            setStatus('STATUS_CHANGE');
        }
    }

    const validateSales = () => {
        if (salesData.numberOfCTNs === '' || salesData.startCTNNumber === '' || salesData.endCTNNumber === '') {
            toast.error('Please fill all the fields!');
            return false;
        } else if (salesData.numberOfCTNs < 0 || salesData.startCTNNumber < 0 || salesData.endCTNNumber < 0) {
            toast.error('Number of CTNs, Start CTN Number and End CTN Number cannot be negative!');
            return false;
        } else if (salesData.numberOfCTNs > selectedWarehouse.numberOfCTNs) {
            toast.error('Number of CTNs cannot be greater than total number of CTNs!');
            return false;
        } else if (salesData.startCTNNumber < selectedWarehouse.startCTNNumber || salesData.endCTNNumber > selectedWarehouse.endCTNNumber) {
            toast.error('Start CTN Number and End CTN Number should be between the range of total CTNs!');
            return false;
        } else if (salesData.startCTNNumber > salesData.endCTNNumber) {
            toast.error('Start CTN Number cannot be greater than End CTN Number!');
            return false;
        } else {
            return true;
        }
    }

    const validateRework = () => {
        if (reworkData.numberOfCTNs === '' || reworkData.startCTNNumber === '' || reworkData.endCTNNumber === '') {
            toast.error('Please fill all the fields!');
            return false;
        } else if (reworkData.numberOfCTNs < 0 || reworkData.startCTNNumber < 0 || reworkData.endCTNNumber < 0) {
            toast.error('Number of CTNs, Start CTN Number and End CTN Number cannot be negative!');
            return false;
        } else if (reworkData.numberOfCTNs > selectedWarehouse.numberOfCTNs) {
            toast.error('Number of CTNs cannot be greater than total number of CTNs!');
            return false;
        } else if (reworkData.startCTNNumber < selectedWarehouse.startCTNNumber || reworkData.endCTNNumber > selectedWarehouse.endCTNNumber) {
            toast.error('Start CTN Number and End CTN Number should be between the range of total CTNs!');
            return false;
        } else if (reworkData.startCTNNumber > reworkData.endCTNNumber) {
            toast.error('Start CTN Number cannot be greater than End CTN Number!');
            return false;
        } else {
            return true;
        }
    }


    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                    <Paper elevation={3} style={{
                        padding: '16px',
                        margin: 'auto',
                    }}>
                        <h1>Warehouse View</h1>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Warehouse ID:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedWarehouse.id}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Warehouse Date:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedWarehouse.warehouseDate}
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
                                    {selectedWarehouse.numberOfCTNs}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    <strong>
                                        Received CTNs:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="body2">
                                    {selectedWarehouse.receivedCTNs}
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
                                    {selectedWarehouse.startCTNNumber}
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
                                    {selectedWarehouse.endCTNNumber}
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
                                    {selectedWarehouse.lotNumber}
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
                                    {selectedWarehouse.batchNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} padding={1}>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    <strong>
                                        UiCode:
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {selectedWarehouse.uicode}
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
                                    {selectedWarehouse.regionName}
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
                                    {selectedWarehouse.styleName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <br />
                        <ButtonGroup
                            fullWidth
                        >
                            <Button color='secondary' onClick={() => {
                                setEditMode(true);
                            }}>Edit</Button>
                            <Button color='success' onClick={
                                () => {
                                    navigate(-1);
                                }

                            }>Back</Button>
                            <Button color='warning' onClick={handleDelete}>Delete</Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
                {!editMode ? <>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Paper sx={
                            {
                                padding: '16px',
                                margin: 'auto',
                                maxWidth: '700px',
                            }
                        } >
                            <Grid container spacing={2} padding={1}>
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
                            </Grid>
                            <br />
                            <Divider />
                            {status === 'SALES' &&
                                <>
                                    <h3>Add Sales Details</h3>
                                    <TextField
                                        id="outlined-basic"
                                        label="Number of Cartons"
                                        variant="outlined"
                                        fullWidth
                                        margin='normal'
                                        type='number'
                                        required
                                        onChange={(e) => {
                                            setSalesData({
                                                ...salesData,
                                                numberOfCTNs: e.target.value,
                                            });
                                        }
                                        }
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Start CTN Number"
                                        variant="outlined"
                                        fullWidth
                                        margin='normal'
                                        type='number'
                                        required
                                        inputProps={{
                                            min: selectedWarehouse.startCTNNumber,
                                            max: selectedWarehouse.endCTNNumber,
                                            step: 1,
                                        }}
                                        onChange={(e) => {
                                            setSalesData({
                                                ...salesData,
                                                startCTNNumber: e.target.value,
                                            });
                                        }
                                        }
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
                                            setSalesData({
                                                ...salesData,
                                                endCTNNumber: e.target.value,
                                            });
                                        }
                                        }
                                    />
                                    <ButtonGroup fullWidth style={{ marginTop: '10px' }}>
                                        <Button color='success'
                                            onClick={handleSales}
                                        >Add To Sales</Button>
                                    </ButtonGroup>
                                </>
                            }

                            {status === 'REWORK' &&
                                <>
                                    <h3>Add Rework Details</h3>
                                    <TextField
                                        id="outlined-basic"
                                        label="Number of CTNs"
                                        variant="outlined"
                                        fullWidth
                                        margin='normal'
                                        type='number'
                                        required
                                        onChange={(e) => {
                                            setReworkData({
                                                ...reworkData,
                                                numberOfCTNs: e.target.value,
                                            });
                                        }
                                        }
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Start CTN Number"
                                        variant="outlined"
                                        fullWidth
                                        margin='normal'
                                        type='number'
                                        required
                                        inputProps={{
                                            min: selectedWarehouse.startCTNNumber,
                                            max: selectedWarehouse.endCTNNumber,
                                            step: 1,
                                        }}
                                        onChange={(e) => {
                                            setReworkData({
                                                ...reworkData,
                                                startCTNNumber: e.target.value,
                                            });
                                        }
                                        }
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
                                            setReworkData({
                                                ...reworkData,
                                                endCTNNumber: e.target.value,
                                            });
                                        }
                                        }
                                    />
                                    <ButtonGroup fullWidth style={{ marginTop: '10px' }}>
                                        <Button
                                            color='success'
                                            onClick={handleRework}
                                        >Add To Rework</Button>
                                    </ButtonGroup>
                                </>
                            }

                        </Paper>
                    </Grid> </> :
                    <>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Paper
                                sx={
                                    {
                                        padding: '16px',
                                        margin: 'auto',
                                        maxWidth: '700px',
                                    }
                                }>
                                <h1>Edit Warehouse Details</h1>
                                <TextField
                                    id="outlined-basic"
                                    label="Number of CTNs"
                                    variant="outlined"
                                    fullWidth
                                    margin='normal'
                                    type='number'
                                    required
                                    value={warehouse.numberOfCTNs}
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
                                    inputProps={{
                                        min: selectedWarehouse.startCTNNumber,
                                        max: selectedWarehouse.endCTNNumber,
                                        step: 1,
                                    }}
                                    value={warehouse.startCTNNumber}
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
                                    value={warehouse.endCTNNumber}
                                    onChange={(e) => {
                                        setWarehouse({
                                            ...warehouse,
                                            endCTNNumber: e.target.value,
                                        });
                                    }}
                                />
                                <ButtonGroup fullWidth style={{ marginTop: '10px' }}>
                                    <Button color='success' onClick={handleEdit}>Update</Button>
                                    <Button color='warning' onClick={() => {
                                        setEditMode(false);
                                    }}>Cancel</Button>
                                </ButtonGroup>
                            </Paper>
                        </Grid>
                    </>}

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
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Comment'
                            variant='outlined'
                            multiline
                            rowsMax={4}
                            onChange={handleCommentChange}
                        />
                        <Button
                            color='success'
                            onClick={handleCommentSubmit}
                        >Add Comment</Button>
                        <div style={
                            {
                                margin: '10px',
                            }
                        }>
                            <Divider />
                            {comments.map((comment) => {
                                return (
                                    <div key={comment.id}>
                                        <Typography variant="body2" margin={1} style={{
                                            overflow: 'hidden',
                                            maxWidth: '90%',
                                        }}>
                                            <strong>
                                                {comment.user.firstName} {comment.user.lastName}:
                                            </strong> <span>{comment.comment}</span>
                                        </Typography>
                                        <Divider />
                                    </div>
                                )
                            })}
                        </div>
                    </Paper>
                </Grid>
            </Grid >
        </Layout >
    );
};

export default WarehouseView;