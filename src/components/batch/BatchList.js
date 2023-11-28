import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchBatches, setSelectedBatch } from '../../redux/batch/actions/batchAction';
import { fetchRegions } from '../../redux/region/actions/regionAction';

const BatchList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const batches = useSelector((state) => state.batch.batches);
    const regions = useSelector((state) => state.region.regions);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabBatch') || 'All');
    const [filteredRows, setFilteredRows] = useState([]);

    let key = 0;

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'batchNo', headerName: 'Batch No', flex: 1 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'drier', headerName: 'Drier', flex: 1 },
        { field: 'region', headerName: 'Region', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button color='success' onClick={() => {
                            dispatch(setSelectedBatch(params.row));
                            navigate('/view-batch');
                        }}>View</Button>
                        {/* <Button onClick={() => {
                            dispatch(setSelectedBatch(params.row));
                            navigate('/batch/edit');
                        }}>Edit</Button> */}
                    </ButtonGroup>
                </strong>
            ),
        },
    ]

    useEffect(() => {
        setLoading(true);
        dispatch(fetchBatches());
        dispatch(fetchRegions());
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        if (batches.length > 0 && batches[0].id) {
            setFilteredRows(selectedTab === 'All' ? batches : batches.filter((row) => row.region === selectedTab));
            localStorage.setItem('selectedTabBatch', selectedTab);
        }
    }, [selectedTab, batches]);

    return (
        <Layout>
            <h1>Batches</h1>
            <Tabs
                onChange={(e, newValue) => setSelectedTab(newValue)}
                value={selectedTab}
                variant="scrollable"
                scrollButtons="auto"
                sx={
                    {
                        '& .MuiTabs-flexContainer': {
                            borderBottom: 1,
                            borderColor: 'divider',
                        },
                    }
                }
            ><Tab label="All Regions" value="All" />
                {regions && regions.map((region) => <Tab label={region.name} value={region.name} key={key++} />)}
            </Tabs>
            {loading ? <CircularProgress /> : <DataGrid
                rows={filteredRows}
                columns={columns}
                disableSelectionOnClick
                initialState={{
                    filter: {
                        filterModel: JSON.parse(localStorage.getItem('dataGridFilter4')) || {
                            items: [{ columnField: 'ID', operatorValue: 'contains', value: '' }],
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />}
        </Layout>
    );
}

export default BatchList;
