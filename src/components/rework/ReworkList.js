import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchReworks, setSelectedRework } from '../../redux/rework/actions/reworkAction';
import { fetchStyles } from '../../redux/style/actions/styleAction';

const ReworkList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reworks = useSelector((state) => state.rework.reworks);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabRework') || 'All');
    const [filteredRows, setFilteredRows] = useState([]);
    const styles = useSelector((state) => state.style.styles);

    let key = 0;


    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'pdnDate', headerName: 'PDN Date', flex: 1 },
        { field: 'reworkDate', headerName: 'Rework Date', flex: 1 },
        { field: 'numberOfCTNs', headerName: 'No. of CTNs', flex: 1 },
        { field: 'startCTNNumber', headerName: 'Start CTN Number', flex: 1 },
        { field: 'endCTNNumber', headerName: 'End CTN Number', flex: 1 },
        { field: 'styleName', headerName: 'Style Details', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button
                            color='success'
                            onClick={() => {
                                dispatch(setSelectedRework(reworks.find((row) => row.id === params.row.id)));
                                navigate('/view-rework');
                            }}>View</Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ]

    useEffect(() => {
        setLoading(true);
        console.log('fetching styles');
        dispatch(fetchReworks());
        dispatch(fetchStyles());
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (reworks.length > 0 && reworks[0].id) {
            console.log(reworks);
            setFilteredRows(selectedTab === 'All' ? reworks : reworks.filter((row) => row.styleName === selectedTab));
            localStorage.setItem('selectedTabRework', selectedTab);
            setLoading(false);
        }
    }, [reworks, selectedTab]);


    return (
        <Layout>
            <div style={{ width: '100%' }}>
                <h1>Rework List</h1>
                {loading ? <CircularProgress /> :
                    <>
                        <div style={{ marginBottom: 1 }}> <Tabs
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
                            rows={filteredRows}
                            columns={columns}
                            disableSelectionOnClick

                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                        />
                    </>
                }
            </div>
        </Layout>
    );

}

export default ReworkList;