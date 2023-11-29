import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Container,
    ButtonGroup,
    Tabs,
    Tab,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout';
import { createZone, updateZone } from '../../redux/zones/actions/zonesAction';
import { fetchStyles } from '../../redux/style/actions/styleAction';
import { fetchLotsByBatch, createLot, cleanUp, fetchLot } from '../../redux/lot/actions/lotAction';
import { fetchBatches, createBatch, cleanup, fetchBatch } from '../../redux/batch/actions/batchAction';
import { fetchRegions } from '../../redux/region/actions/regionAction';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const AddZone = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [zone, setZone] = useState({
        packageDate: format(new Date(), "yyyy-MM-dd"),
        pdnDate: format(new Date(), "yyyy-MM-dd"),
        weightReceived: '',
        weightBalance: '',
        numberOfCTNs: '',
        startCTNNumber: '',
        endCTNNumber: '',
        lotDetail: {
            id: '',
        },
        style: {
            id: '',
        },
        user: {
            id: localStorage.getItem('userId'),
        }
    });
    const { id } = useParams();
    const zoneDetails = useSelector(state => state.zones.zone);
    const stylesList = useSelector(state => state.style.styles);
    const lotsList = useSelector(state => state.lot.lots);
    const batchesList = useSelector(state => state.batch.batches);
    const batch = useSelector(state => state.batch.batch);
    const lot = useSelector(state => state.lot.lot);
    const zoneCreated = useSelector(state => state.zones.created);
    const zoneUpdated = useSelector(state => state.zones.updated);
    const regionsList = useSelector(state => state.region.regions);
    const [editMode, setEditMode] = useState(false);
    const [lotData, setLotData] = useState({
        id: '',
        lotNo: 0,
        uicode: '',
        batchDetail: {
            id: '',
        },
        user: {
            id: localStorage.getItem('userId'),
        },
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    });
    const [currentPage, setCurrentPage] = useState('BATCH');
    const [newBatch, setNewBatch] = useState(false);
    const [newLot, setNewLot] = useState(false);
    const [batchData, setBatchData] = useState({
        id: '',
        batchNo: '',
        drier: '',
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
        region: {
            id: '',
        },
        user: {
            id: localStorage.getItem('userId'),
        }
    });
    let key = 0;

    useEffect(() => {
        dispatch(fetchStyles());
        dispatch(fetchBatches());
        dispatch(fetchRegions());
    }, [dispatch]);

    useEffect(() => {
        if (zoneUpdated) {
            navigate('/zones-list');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoneUpdated]);

    useEffect(() => {
        zoneDetails.uicode = batch.batchNo + 'LOT' + lot.lotNo + 'ZONE' + zoneDetails.id;
        if (zoneCreated) {
            dispatch(cleanUp());
            dispatch(updateZone(zoneDetails, false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoneCreated]);


    useEffect(() => {
        if (id) {
            setEditMode(true);
            dispatch(fetchBatch(zoneDetails.batchId));
            dispatch(fetchLot(zoneDetails.lotDetail.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (id && batch.id !== undefined) {
            setBatchData({
                ...batchData,
                id: batch.id,
                batchNo: batch.batchNo,
                drier: batch.drier,
                createdAt: batch.createdAt,
                region: {
                    id: batch.region.id,
                },
                user: {
                    id: localStorage.getItem('userId'),
                }
            });
            setLotData({
                ...lotData,
                id: lot.id,
                lotNo: lot.lotNo,
                batchDetail: {
                    id: lot.batchDetail.id,
                },
                user: {
                    id: localStorage.getItem('userId'),
                },
                uicode: batch.batchNo + 'LOT' + lot.lotNo,
            });

            setZone({
                ...zone,
                id: zoneDetails.id,
                uicode: zoneDetails.uicode,
                packageDate: zoneDetails.packageDate,
                pdnDate: zoneDetails.pdnDate,
                weightReceived: zoneDetails.weightReceived,
                weightBalance: zoneDetails.weightBalance,
                numberOfCTNs: zoneDetails.numberOfCTNs,
                startCTNNumber: zoneDetails.startCTNNumber,
                endCTNNumber: zoneDetails.endCTNNumber,
                lotDetail: {
                    id: zoneDetails.lotDetail.id,
                },
                style: {
                    id: zoneDetails.styleId,
                },
                user: {
                    id: zoneDetails.user.id
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batch]);

    const handleChange = (e) => {
        setZone({
            ...zone,
            [e.target.name]: e.target.value,
        });
    };

    const handleLotChange = (e) => {
        setLotData({ ...lotData, [e.target.name]: e.target.value });
    };

    const handleBatchChange = (e) => {
        setBatchData({ ...batchData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (validateZone()) {
            dispatch(createZone(zone));
        }
    };

    const handleCreateLot = () => {
        if (lotData.lotNo === '') {
            toast.error('Please fill all the fields!');
        } else {
            delete lotData.id;
            dispatch(createLot(lotData));
            dispatch(cleanUp());
            setNewLot(false);
            setTimeout(() => {
                dispatch(fetchLotsByBatch(batchData.id));
            }, 1000);
            console.log("lotData", lotData);
        }
    };

    const handleUpdate = () => {
        if (validateZone()) {
            dispatch(updateZone(zone, true));
        }
    };

    const validateZone = () => {
        if (zone.packageDate === '' || zone.pdnDate === '' || zone.weightReceived === '' || zone.weightBalance === '' || zone.numberOfCTNs === '' || zone.startCTNNumber === '' || zone.endCTNNumber === '' || zone.lotDetail.id === '' || zone.style.id === '') {
            toast.error('Please fill all the fields!');
            return false;
        } else {
            return true;
        }
    };

    return (
        <Layout>
            <Container>
                <div style={{ marginBottom: 1 }}>
                    <Tabs
                        value={currentPage}
                        variant="fullWidth"
                        scrollButtons="auto"
                        sx={
                            {
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#1890ff',
                                },
                                width: '100%',
                            }
                        }
                        key={key}
                    >
                        <Tab label="Batch Details" value="BATCH" />
                        <Tab label="Lot Details" value="LOT" />
                        <Tab label="Item Details" value="ITEM" />
                    </Tabs>
                </div>
                {currentPage === 'BATCH' ? ([
                    <>
                        {!newBatch ? (
                            <>
                                <h1>Select Batch</h1>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="batchId">Batch</InputLabel>
                                            <Select
                                                labelId="batchId"
                                                id="batchId"
                                                name="id"
                                                value={batchData.id}
                                                onChange={handleBatchChange}
                                                label="Batch"
                                            >
                                                {batchesList.map((batch) => (
                                                    <MenuItem key={batch.id} value={batch.id}>{batch.batchNo}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonGroup fullWidth variant="outlined" aria-label="outlined primary button group">
                                            <Button color='success' onClick={() => {
                                                if (batchData.id !== '') {
                                                    console.log("batchData", batchData);
                                                    dispatch(fetchLotsByBatch(batchData.id));
                                                    setCurrentPage('LOT')
                                                } else {
                                                    toast.error('Please select a batch!');
                                                }
                                            }}>Next</Button>
                                            <Button color='error' onClick={
                                                () => {
                                                    navigate(-1);
                                                }
                                            }>Cancel</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                                <br />
                                <Button color='success' onClick={() => { setNewBatch(true) }}>Add New Batch</Button>
                            </>
                        ) : null}
                        {newBatch ? (
                            <>
                                <h1>Create Batch</h1>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            margin='normal'
                                            label="Batch No"
                                            name="batchNo"
                                            type="text"
                                            value={batchData.batchNo}
                                            onChange={(e) => setBatchData({ ...batchData, [e.target.name]: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField
                                            fullWidth
                                            margin='normal'
                                            label="Drier"
                                            name="drier"
                                            type="text"
                                            value={batchData.drier}
                                            onChange={(e) => setBatchData({ ...batchData, [e.target.name]: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="regionId">Region</InputLabel>
                                            <Select
                                                labelId="regionId"
                                                id="regionId"
                                                name="regionId"
                                                label="Region"
                                                value={batchData.region.id}
                                                onChange={(e) => setBatchData({ ...batchData, region: { id: e.target.value } })}
                                            >
                                                {regionsList.map((region) => (
                                                    <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <br />
                                <ButtonGroup fullWidth variant="outlined" aria-label="outlined primary button group">
                                    <Button color='success' onClick={() => {
                                        //remove the id field from the batchData object
                                        delete batchData.id;
                                        dispatch(createBatch(batchData));
                                        dispatch(cleanup());
                                        setNewBatch(false);
                                        setTimeout(() => {
                                            dispatch(fetchBatches());
                                        }, 1000);
                                    }}>Submit</Button>
                                    <Button color='error' onClick={
                                        () => {
                                            setNewBatch(false);
                                        }
                                    }>Cancel</Button>
                                </ButtonGroup>

                            </>
                        ) : null}
                    </>
                ]) : null}
                {currentPage === 'LOT' ? ([
                    <>
                        {!newLot ? (
                            <>
                                <h1>Select Lot</h1>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="lotId">Lot</InputLabel>
                                            <Select
                                                labelId="lotId"
                                                id="lotId"
                                                name="id"
                                                onChange={handleLotChange}
                                                value={lotData.id}
                                                label="Lot"
                                            >
                                                {lotsList.map((lot) => (
                                                    <MenuItem key={lot.id} value={lot.id}>{lot.lotNo}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonGroup fullWidth variant="outlined" aria-label="outlined primary button group">
                                            <Button color='success' onClick={() => {
                                                if (lotData.id !== '') {
                                                    setCurrentPage('ITEM')
                                                    dispatch(fetchLot(lotData.id));
                                                    setZone({ ...zone, lotDetail: { id: lotData.id } });
                                                } else {
                                                    toast.error('Please select a lot!');
                                                }
                                            }}>Next</Button>
                                            <Button color='error' onClick={
                                                () => {
                                                    setCurrentPage('BATCH');
                                                }
                                            }>Back</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                                <br />
                                <Button color='success' onClick={() => {
                                    setNewLot(true);
                                }}>Add New Lot</Button>
                            </>
                        ) : null}
                        {newLot ? (
                            <>
                                <h1>Create Lot</h1>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            margin='normal'
                                            label="Lot No"
                                            name="lotNo"
                                            type="text"
                                            value={lotData.lotNo}
                                            onChange={(e) => setLotData({
                                                ...lotData, [e.target.name]: e.target.value,
                                                batchDetail: {
                                                    id: batchData.id,
                                                },
                                                uicode: batch.batchNo + 'LOT' + e.target.value,
                                            })}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <ButtonGroup fullWidth variant="outlined" aria-label="outlined primary button group">
                                    <Button color='success' onClick={handleCreateLot}>Submit</Button>
                                    <Button color='error' onClick={
                                        () => {
                                            setNewLot(false);
                                        }
                                    }>Cancel</Button>
                                </ButtonGroup>
                            </>
                        ) : null}
                    </>
                ]) : null}
                {currentPage === 'ITEM' ? ([
                    <h1>Create Item</h1>,
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                label="Package Date"
                                name="packageDate"
                                type="date"
                                value={zone.packageDate}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                margin='normal'
                                label="Pdn Date"
                                name="pdnDate"
                                type="date"
                                value={zone.pdnDate}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                label="Weight Received"
                                name="weightReceived"
                                type="number"
                                value={zone.weightReceived}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                label="Weight Balance"
                                name="weightBalance"
                                type="number"
                                value={zone.weightBalance}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                label="Number of CTNs"
                                name="numberOfCTNs"
                                type="number"
                                value={zone.numberOfCTNs}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                label="Start CTN Number"
                                name="startCTNNumber"
                                type="number"
                                value={zone.startCTNNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin='normal'
                                label="End CTN Number"
                                name="endCTNNumber"
                                type="number"
                                value={zone.endCTNNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="styleId">Style</InputLabel>
                                <Select
                                    labelId="styleId"
                                    id="styleId"
                                    name="styleId"
                                    label="Style"
                                    value={zone.style.id}
                                    onChange={(e) => setZone({ ...zone, style: { id: e.target.value } })}
                                >
                                    {stylesList.map((style) => (
                                        <MenuItem key={style.id} value={style.id}>{style.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>,
                    <ButtonGroup fullWidth variant="outlined" aria-label="outlined primary button group">
                        {!editMode && (<Button color='success' onClick={handleSubmit}>Submit</Button>)}
                        {editMode && (<Button color='success' onClick={handleUpdate}>Update</Button>)}
                        <Button color='error' onClick={
                            () => {
                                setCurrentPage('LOT');
                            }

                        }>Back</Button>
                        <Button color='error' onClick={
                            () => {
                                navigate(-1);
                            }

                        }>Cancel</Button>
                    </ButtonGroup>
                ]) : null}
            </Container>
        </Layout >
    );
}

export default AddZone;