import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchStyles } from '../../redux/style/actions/styleAction';
import { fetchSales, setSelectedSale } from '../../redux/sales/actions/salesAction';
import QRCode from 'react-qr-code';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactToPrint from 'react-to-print';

const SalesList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sales.sales);
    const selectedRow = useSelector(state => state.sales.sale);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabSales') || 'All');
    const [filteredRows, setFilteredRows] = useState([]);
    const styles = useSelector((state) => state.style.styles);
    const [open, setOpen] = useState(false);

    let key = 0;
    const printRef = useRef(null);

    const handlePrint = () => {
        setOpen(true)
    };

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
                        <Button color='error' onClick={async () => {
                            dispatch(setSelectedSale(sales.find((sale) => sale.id === params.row.id)));
                            handlePrint();
                        }} >Print</Button>
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
                <Dialog open={open} onClose={() => {
                    setOpen(false);
                }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Packing Details: {selectedRow.id}</DialogTitle>
                    <DialogContent ref={printRef}>
                        <DialogContentText>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #000',
                                padding: '10px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                maxWidth: '600px', // Limit the maximum width for better readability
                            }}>

                                {/* QR code on the right */}
                                <div style={{ marginRight: '10px' }}>
                                    <QRCode value={"http://54.175.184.10:3000/qr-code/" + selectedRow.uicode} style={{
                                        height: '100px',
                                        width: '100px',
                                    }} />
                                </div>

                                {/* Descriptions on the left */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography><strong>Style:</strong> {selectedRow.styleName}</Typography>
                                    <Typography><strong>Number of CTNs:</strong> {selectedRow.numberOfCTNs}</Typography>
                                    <Typography><strong>Lot Number:</strong> {selectedRow.lotNumber}</Typography>
                                    <Typography><strong>Batch Number:</strong> {selectedRow.batchNumber}</Typography>
                                    <Typography><strong>Package Date:</strong> {selectedRow.salesDate}</Typography>
                                </div>
                            </div>


                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setOpen(false);
                        }} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => {
                            setOpen(false);
                        }} color="primary">

                            <ReactToPrint
                                trigger={() => <Button>Print Sticker</Button>}
                                content={() => printRef.current}
                            />
                        </Button>
                    </DialogActions>
                </Dialog>
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