import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchLotsByBatch, setSelectedLot } from '../../redux/lot/actions/lotAction';

const BatchView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const batch = useSelector((state) => state.batch.batch);
    const lots = useSelector((state) => state.lot.lots);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (batch.id !== undefined) {
            dispatch(fetchLotsByBatch(batch.id));
        }
    }, [dispatch, batch]);

    useEffect(() => {
        if (lots.length > 0 && lots[0].id) {
            setLoading(false);
        }
    }, [lots]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'lotNo', headerName: 'Lot Number', flex: 1 },
        { field: 'batch', headerName: 'Batch Code', flex: 1 },
        { field: 'region', headerName: 'Region', flex: 1 },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 1.3,
            renderCell: (params) => (
                <>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button color='success' onClick={
                            () => {
                                dispatch(setSelectedLot(lots.find((row) => row.id === params.id)));
                                navigate('/view-lot');
                            }
                        }>View</Button>
                    </ButtonGroup>
                </>
            ),
        },
    ];

    return (
        <Layout>
            <h1>Batch Details</h1>
            <Paper elevation={3} style={{
                padding: '16px',
                margin: 'auto',
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>
                        <p><strong>Batch No:</strong> {batch.batchNo}</p>
                        <p><strong>Created At:</strong> {batch.createdAt}</p>
                        <p><strong>Drier:</strong> {batch.drier}</p>
                        <p><strong>Region:</strong> {batch.region}</p>
                    </div>
                </div>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button color='warning' onClick={() => navigate(-1)}>Back</Button>
                </ButtonGroup>
            </Paper>
            <h2>Lots</h2>
            {loading ? <CircularProgress /> : (
                <DataGrid
                    rows={lots}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            )}
        </Layout>
    )
}

export default BatchView;