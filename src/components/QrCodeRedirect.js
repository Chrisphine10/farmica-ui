import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Paper,
    Grid,
    Typography,
    Button,
    ButtonGroup,
    Divider,
    TextField
} from '@mui/material';
import { fetchReworksByUiCode } from '../redux/rework/actions/reworkAction';
import { fetchSalesByUiCode } from '../redux/sales/actions/salesAction';
import { fetchWarehouseByUicode } from '../redux/warehouse/actions/warehouseAction';
import { fetchZoneByUicode } from '../redux/zones/actions/zonesAction';
import { useSelector, useDispatch } from 'react-redux';


const QrCodeRedirect = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [noPage, setNoPage] = useState(false);
    const selectedSale = useSelector(state => state.sales.sale);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedSale && selectedSale.id !== undefined) {
            setLoading(false);
        } else {
            setLoading(true);
        }

    }, [selectedSale, navigate]);


    useEffect(() => {
        if (id) {
            // if id has the word "Rework" in it, then it is a rework
            if (id.includes("-R")) {
                dispatch(fetchReworksByUiCode(id));
                navigate('/view-rework');
            } else if (id.includes("-S")) {
                dispatch(fetchSalesByUiCode(id));
            } else if (id.includes("WAREHOUSE") && !id.includes("REWORK") && !id.includes("SALES")) {
                dispatch(fetchWarehouseByUicode(id));
                navigate('/view-warehouse');
            } else if (id.includes("ZONE") && !id.includes("WAREHOUSE")) {
                dispatch(fetchZoneByUicode(id));
                navigate('/view-zone');
            } else {
                setNoPage(true);
            }
        }
    }, [dispatch, id, navigate]);

    return (
        <>
            {noPage && <h1>Product not found!</h1>}
            {!loading && <>
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
                                            Uicode:
                                        </strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="body2">
                                        {selectedSale.uicode}
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
                        </Paper>
                    </Grid>
                </Grid>
            </>}
        </>
    );
};

export default QrCodeRedirect;
