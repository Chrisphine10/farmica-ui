import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Tabs, Tab, CircularProgress, TextField, FormControl, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchStyles, selectedStyle, createStyle, deleteStyle } from '../../redux/style/actions/styleAction';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyleList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const styles = useSelector((state) => state.style.styles);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabStyle') || 'All');
    const [selectedStyleData, setSelectedStyleData] = useState(null);
    const [filteredRows, setFilteredRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [styleData, setStyleData] = useState({
        name: '',
        grade: '',
        code: '',
        user: {
            id: localStorage.getItem('userId'),
        },
    });

    let key = 0;

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'grade', headerName: 'Grade', flex: 1 },
        { field: 'code', headerName: 'Code', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        <Button color='success' onClick={() => {
                            dispatch(selectedStyle(params.row));
                            navigate('/view-style');
                        }}>View</Button>
                        <Button color='warning' onClick={() => {
                            setSelectedStyleData(params.row);
                            setOpenDelete(true);
                        }}>Delete</Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ]

    const GradeType = [
        { value: 'STANDARD', label: 'Standard' },
        { value: 'PREMIUM', label: 'Premium' },
    ];

    useEffect(() => {
        setLoading(true);
        dispatch(fetchStyles());
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        if (styles.length > 0 && styles[0].id) {
            setFilteredRows(selectedTab === 'All' ? styles : styles.filter((row) => row.grade === selectedTab));
            localStorage.setItem('selectedTabStyle', selectedTab);
        }
    }, [selectedTab, styles]);

    const handleNewStyle = () => {
        dispatch(createStyle(styleData));
        setOpen(false);
        setTimeout(() => {
            dispatch(fetchStyles());
        }, 1000);
    };

    return (
        <Layout>
            <h1>Styles Details</h1>
            <div style={{ marginBottom: 20 }}>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button color='success' onClick={() => {
                        setOpen(true);
                    }
                    }>Add Style</Button>
                </ButtonGroup>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Style</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            onChange={(e) => setStyleData({ ...styleData, name: e.target.value })}
                        />
                        <FormControl fullWidth>
                            <Select
                                native
                                value={styleData.grade}
                                onChange={(e) => setStyleData({ ...styleData, grade: e.target.value })}
                                inputProps={{
                                    name: 'grade',
                                    id: 'grade',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {GradeType.map((grade) => (
                                    <option value={grade.value}>{grade.label}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="code"
                            label="Code"
                            type="text"
                            fullWidth
                            onChange={(e) => setStyleData({ ...styleData, code: e.target.value })}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNewStyle}>Add</Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Delete Style</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this style?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button onClick={() => {
                        dispatch(deleteStyle(selectedStyleData.id));
                        setTimeout(() => {
                            dispatch(fetchStyles());
                        }, 1000);
                        setOpenDelete(false);
                    }}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Tabs
                onChange={(e, newValue) => setSelectedTab(newValue)}
                value={selectedTab}
                variant="scrollable"
                scrollButtons="auto"
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
                <Tab label="All" value="All" />
                <Tab label="Standard" value="STANDARD" />
                <Tab label="Premium" value="PREMIUM" />
            </Tabs>
            <div style={{ width: '100%' }}>
                {loading ? <CircularProgress /> : <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    disableSelectionOnClick
                    initialState={{
                        filter: {
                            filterModel: JSON.parse(localStorage.getItem('dataGridFilter3')) || {
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
            </div>
        </Layout>
    )
}

export default StyleList