import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress } from '@mui/material';
import { cleanUpComment } from '../../redux/comment/actions/commentsAction';
import { fetchZones, setSelectedZone, cleanUpZone } from '../../redux/zones/actions/zonesAction';
import { useNavigate } from 'react-router-dom';
import { fetchStyles } from '../../redux/style/actions/styleAction';

const ZoneList = () => {
    const zonesList = useSelector(state => state.zones.zones);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTab') || 'All');
    const [filteredRows, setFilteredRows] = useState([]);
    const styles = useSelector((state) => state.style.styles);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let key = 0;


    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'packageDate', headerName: 'Package Date', flex: 1 },
        // { field: 'weightReceived', headerName: 'Weight Received', flex: 1 },
        // { field: 'weightBalance', headerName: 'Weight Balance', flex: 1 },
        { field: 'uicode', headerName: 'Uicode', flex: 1 },
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
                            async () => {
                                dispatch(await setSelectedZone(await zonesList.find((row) => row.id === params.id)));
                                navigate('/view-zone');
                            }
                        }>View</Button>
                        <Button color='warning'
                            onClick={
                                async () => {
                                    dispatch(await setSelectedZone(await zonesList.find((row) => row.id === params.id)));
                                    navigate('/add-zone/' + params.id);
                                }
                            }
                        >Edit</Button>
                    </ButtonGroup>
                </>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        dispatch(fetchZones());
        dispatch(fetchStyles());
        dispatch(cleanUpComment());
        dispatch(cleanUpZone());
    }, [dispatch]);


    useEffect(() => {
        if (zonesList.length > 0) {
            setFilteredRows(selectedTab === 'All' ? zonesList : zonesList.filter((row) => row.styleName === selectedTab));
            localStorage.setItem('selectedTab', selectedTab);
            setLoading(false);
        }
    }, [selectedTab, zonesList]);

    const reload = () => {
        dispatch(fetchZones());
    }


    return (
        <Layout>
            <div style={{ width: '100%' }}>
                <h1>Packing Zones List </h1>
                <div style={{ marginBottom: 20 }}>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button color='success' href="/add-zone">Add Item </Button>
                        <Button color='error' onClick={reload}>Reload</Button>
                    </ButtonGroup>
                </div>
                {!loading ? [<div style={{ marginBottom: 1 }}>
                    <Tabs
                        value={selectedTab}
                        variant="scrollable"
                        scrollButtons="auto"
                        onChange={(e, newValue) => setSelectedTab(newValue)}
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
                        <Tab label="All Styles" value="All" />
                        {styles && styles.map((style) => <Tab label={style.name} value={style.name} key={key++} />)}
                    </Tabs>
                </div>,

                <DataGrid
                    key={key + 1}
                    rows={filteredRows}
                    columns={columns}
                    disableSelectionOnClick
                    initialState={{
                        filter: {
                            filterModel: JSON.parse(localStorage.getItem('dataGridFilter')) || {
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
                />] :
                    <div>
                        <CircularProgress
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    </div>}
            </div>
        </Layout >
    );
};

export default ZoneList;