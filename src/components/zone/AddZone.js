import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    CircularProgress,
    Backdrop,
    Typography,
    Container,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout';
import { createZone } from '../../redux/zones/actions/zonesAction';

const AddZone = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [zone, setZone] = useState({});
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const zoneDetails = useSelector(state => state.zones.zone);

    useEffect(() => {
        if (id) {
            setZone(zoneDetails);
        }
    }, [id, zoneDetails]);

    const handleChange = (e) => {
        setZone({ ...zone, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(createZone(zone));
        setLoading(false);
        navigate('/zones-list');
    };

    return (
        <Layout>
            <Container>
                <h1>Create Item</h1>
                {/* FPO Form */}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
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
                            label="End CTN Number"
                            name="endCTNNumber"
                            type="number"
                            value={zone.endCTNNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Status"
                            name="status"
                            value={zone.status}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Lot Details"
                            name="lotDetails"
                            value={zone.lotDetails}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );


}

export default AddZone;