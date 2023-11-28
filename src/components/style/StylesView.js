import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchWarehousesByStyle, setSelectedWarehouse } from '../../redux/warehouse/actions/warehouseAction';
import { fetchSalesByStyle, setSelectedSale } from '../../redux/sales/actions/salesAction';
import { fetchZonesByStyle, setSelectedZone } from '../../redux/zones/actions/zonesAction';

const StylesView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const style = useSelector((state) => state.style.style);
    const warehouses = useSelector((state) => state.warehouse.warehouses);
    const sales = useSelector((state) => state.sales.sales);
    const zonesList = useSelector((state) => state.zones.zones);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        if (style.id !== undefined) {
            dispatch(fetchWarehousesByStyle(style.id));
            dispatch(fetchSalesByStyle(style.id));
            dispatch(fetchZonesByStyle(style.id));
        }
    }, [dispatch, style]);

    useEffect(() => {
        if (warehouses.length > 0 && warehouses[0].id) {
            setLoading(false);
        }
    }, [warehouses]);

    const columnsWarehouse = [
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

    const columnsSales = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'salesDate', headerName: 'Sales Date', flex: 1 },
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
                            dispatch(setSelectedSale(sales.find((sale) => sale.id === params.row.id)));
                            navigate('/view-sales');
                        }}>View</Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ]

    const columnsZones = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'packageDate', headerName: 'Package Date', flex: 1 },
        // { field: 'weightReceived', headerName: 'Weight Received', flex: 1 },
        // { field: 'weightBalance', headerName: 'Weight Balance', flex: 1 },
        { field: 'numberOfCTNs', headerName: 'Number of CTNs', flex: 1 },
        { field: 'startCTNNumber', headerName: 'Start CTN Number', flex: 1 },
        { field: 'endCTNNumber', headerName: 'End CTN Number', flex: 1 },
        { field: 'styleName', headerName: 'Style Details', flex: 1 },
        { field: 'lotNumber', headerName: 'Lot Details', flex: 1 },
        { field: 'batchNumber', headerName: 'Batch Details', flex: 1 },
        { field: 'regionName', headerName: 'Region', flex: 1 },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 1.3,
            renderCell: (params) => (
                <>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button color='success' onClick={
                            () => {
                                dispatch(setSelectedZone(zonesList.find((row) => row.id === params.id)));
                                navigate('/view-zone');
                            }
                        }>View</Button>
                        <Button color='warning'
                            onClick={
                                () => {
                                    dispatch(setSelectedZone(zonesList.find((row) => row.id === params.id)));
                                    navigate('/add-zone/' + params.id);
                                }
                            }
                        >Edit</Button>
                    </ButtonGroup>
                </>
            ),
        },
    ];

    return (
        <Layout>
            <div style={{ height: '100%', width: '100%' }}>
                <h1>Style Details</h1>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>
                            <p><strong>Style Name: </strong>{style.name}</p>
                            <p><strong>Style Code: </strong>{style.code}</p>
                            <p><strong>Style Grade: </strong>{style.grade}</p>
                        </div>
                    </div>
                    <Button variant="outlined" color="warning" onClick={() => navigate(-1)}>Back</Button>
                </div>
                <h2>Sales List</h2>
                {loading ? <CircularProgress /> : <DataGrid
                    rows={sales}
                    columns={columnsSales}
                    disableSelectionOnClick
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />}
                <br />
                <h2>Warehouse List</h2>
                {loading ? <CircularProgress /> : <DataGrid
                    rows={warehouses}
                    columns={columnsWarehouse}
                    disableSelectionOnClick
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    slots={{ toolbar: GridToolbar }}
                    rowHeight={40}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />}
                <br />
                <h2>Zone List</h2>
                {loading ? <CircularProgress /> : <DataGrid
                    rows={zonesList}
                    columns={columnsZones}
                    disableSelectionOnClick
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    slots={{ toolbar: GridToolbar }}
                    rowHeight={40}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                />}
            </div>
        </Layout>
    )

}

export default StylesView;