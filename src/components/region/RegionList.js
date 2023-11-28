import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../Layout';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
    Button,
    ButtonGroup,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    Grid,
    MenuItem,
} from '@mui/material';
import { fetchRegions, deleteRegion, createRegion } from '../../redux/region/actions/regionAction';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { counties } from "kenya";
import { format } from 'date-fns';

const RegionList = () => {
    const dispatch = useDispatch();
    const regions = useSelector((state) => state.region.regions);
    const [loading, setLoading] = useState(true);
    const [filteredRows, setFilteredRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedRegionData, setSelectedRegionData] = useState(null);
    const [region, setRegion] = useState({
        name: '',
        code: '',
        user: {
            id: localStorage.getItem('userId'),
        },
        createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSx"),
        updateAt: format(new Date(), "yyyy-MM-dd"),
    });

    useEffect(() => {
        dispatch(fetchRegions());
    }, [dispatch]);

    const handleNewRegion = () => {
        dispatch(createRegion(region));
        setOpen(false);
        setTimeout(() => {
            dispatch(fetchRegions());
        }, 1000);
    };

    const firstThreeLetters = (param) => {
        return param.substring(0, 3).toUpperCase();
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'code', headerName: 'Code', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <strong>
                    <ButtonGroup variant="outlined" aria-label="outlined warning button group">
                        {/* <Button color='primary' onClick={() => {
                            dispatch(setSelectedRegion(params.row));
                            setOpen(true);
                        }}>View</Button> */}
                        <Button color='warning' onClick={() => {
                            setSelectedRegionData(params.row.id);
                            setOpenDelete(true);
                        }}>Delete</Button>
                    </ButtonGroup>
                </strong>
            ),
        },
    ];

    useEffect(() => {
        if (regions.length > 0 && regions[0].id) {
            setLoading(false);
            setFilteredRows(regions);
        }
    }, [regions]);

    return (
        <Layout>
            <h1>Regions</h1>
            <div style={{ marginBottom: 20 }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button color='success' onClick={() => {
                        setOpen(true);
                    }}>Add Region</Button>
                </ButtonGroup>
            </div>
            <Dialog open={openDelete} onClose={() => {
                setOpenDelete(false);
            }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Region</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this region?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenDelete(false);
                    }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        dispatch(deleteRegion(selectedRegionData));
                        setTimeout(() => {
                            dispatch(fetchRegions());
                        }, 1000);
                        setOpenDelete(false);
                    }} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={() => {
                setOpen(false);
            }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Region</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select County
                    </DialogContentText>
                </DialogContent>
                <Grid item xs={6} sx={{
                    padding: 2
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="county">County</InputLabel>
                        <Select
                            labelId="county"
                            id="county"
                            label="County"
                            name="county"
                            onChange={(e) => {
                                setRegion({
                                    ...region,
                                    name: e.target.value,
                                    code: firstThreeLetters(e.target.value),
                                });
                            }}
                        >
                            {counties.map((county) => (
                                <MenuItem key={county.name} value={county.name}>
                                    {county.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <DialogActions>
                    <Button onClick={() => {
                        setOpen(false);
                    }} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleNewRegion();
                        setOpen(false);
                    }} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            {loading ? <CircularProgress /> : (
                <>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            initialState={{
                                filter: {
                                    filterModel: JSON.parse(localStorage.getItem('dataGridFilter7')) || {
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
                    </div>
                </>
            )}
        </Layout>
    );
}

export default RegionList;