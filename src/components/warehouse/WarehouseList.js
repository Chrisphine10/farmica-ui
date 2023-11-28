import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchRegions } from '../../redux/region/actions/regionAction';

import { fetchWarehouses, setSelectedWarehouse } from '../../redux/warehouse/actions/warehouseAction';

const WarehouseList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const warehouses = useSelector((state) => state.warehouse.warehouses);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabWarehouse') || 'All');
    const [filteredRows, setFilteredRows] = useState([]);
    const regions = useSelector((state) => state.region.regions);

    let key = 0;

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'warehouseDate', headerName: 'Warehouse Date', flex: 1 },
        { field: 'numberOfCTNs', headerName: 'No. of CTNs', flex: 1 },
        { field: 'startCTNNumber', headerName: 'Start CTN Number', flex: 1 },
        { field: 'endCTNNumber', headerName: 'End CTN Number', flex: 1 },
        { field: 'styleName', headerName: 'Style Details', flex: 1 },
        { field: 'lotNumber', headerName: 'Lot Details', flex: 1 },
        { field: 'batchNumber', headerName: 'Batch Details', flex: 1 },
        { field: 'regionName', headerName: 'Region', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button color='success' onClick={() => {
                            dispatch(setSelectedWarehouse(warehouses.find((warehouse) => warehouse.id === params.row.id)));
                            navigate('/view-warehouse');
                        }}>View</Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ]

    useEffect(() => {
        setLoading(true);
        dispatch(fetchWarehouses());
        dispatch(fetchRegions());
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        if (warehouses.length > 0 && warehouses[0].id) {
            setFilteredRows(selectedTab === 'All' ? warehouses : warehouses.filter((row) => row.region === selectedTab));
            localStorage.setItem('selectedTabWarehouse', selectedTab);
            setLoading(false);
        }
    }, [warehouses, selectedTab]);

    return (
        <Layout>
            <div style={{ height: '100%', width: '100%' }}>
                <h1>Warehouse List</h1>
                <Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)}>
                    <Tab label="All Regions" value="All" />
                    {regions && regions.map((region) => <Tab label={region.name} value={region.name} key={key++} />)}
                </Tabs>
                {loading ? <CircularProgress /> : (
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        disableRowSelectionOnClick
                        initialState={{
                            filter: {
                                filterModel: JSON.parse(localStorage.getItem('dataGridFilter2')) || {
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
                    />
                )}
            </div>
        </Layout>
    );

}

export default WarehouseList;