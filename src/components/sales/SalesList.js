import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchStyles } from '../../redux/style/actions/styleAction';
import { fetchSales, setSelectedSale } from '../../redux/sales/actions/salesAction';

const SalesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sales.sales);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabSales') || 'All');
    const [filteredRows, setFilteredRows] = useState([]);
    const styles = useSelector((state) => state.style.styles);

    let key = 0;

    const columns = [
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

    useEffect(() => {
        setLoading(true);
        dispatch(fetchSales());
        dispatch(fetchStyles());
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        if (sales.length > 0 && sales[0].id) {
            setFilteredRows(selectedTab === 'All' ? sales : sales.filter((row) => row.styleName === selectedTab));
            localStorage.setItem('selectedTabSales', selectedTab);
            setLoading(false);
        }
    }, [sales, selectedTab]);

    return (
        <Layout>
            <div style={{ height: '100%', width: '100%' }}>
                <h1>Sales List</h1>
                {loading ? <CircularProgress
                    size={24}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                /> : <>
                    <Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)}>
                        <Tab label="All Regions" value="All" />
                        {styles && styles.map((style) => <Tab label={style.name} value={style.name} key={key++} />)}
                    </Tabs>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        disableSelectionOnClick
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
                </>}
            </div>
        </Layout>
    )

}

export default SalesList;