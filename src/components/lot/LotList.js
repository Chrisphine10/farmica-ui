import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchLots, setSelectedLot } from '../../redux/lot/actions/lotAction';
import { fetchRegions } from '../../redux/region/actions/regionAction';

const LotList = () => {
    const lots = useSelector((state) => state.lot.lots);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabLot') || 'All');
    const regions = useSelector((state) => state.region.regions);
    const [filteredRows, setFilteredRows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let key = 0;

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

    useEffect(() => {
        setLoading(true);
        dispatch(fetchLots());
        dispatch(fetchRegions());
    }, [dispatch]);

    useEffect(() => {
        if (lots.length > 0) {
            setFilteredRows(selectedTab === 'All' ? lots : lots.filter((row) => row.region === selectedTab));
            localStorage.setItem('selectedTabLot', selectedTab);
            setLoading(false);
        }
    }, [selectedTab, lots]);

    return (
        <Layout>
            <h1>Lots</h1>
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
                key={key}
            >
                <Tab label="All" value="All" />
                {regions && regions.map((region) => <Tab label={region.name} value={region.name} key={key++} />)}
            </Tabs>
            {loading ? <CircularProgress /> : <DataGrid
                rows={filteredRows}
                columns={columns}
                disableSelectionOnClick
                initialState={{
                    filter: {
                        filterModel: JSON.parse(localStorage.getItem('dataGridFilter6')) || {
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

export default LotList;