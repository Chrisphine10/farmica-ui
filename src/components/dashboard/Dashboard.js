import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Button, Grid, Paper } from '@mui/material';
import { fetchReport, generateReport, fetchStyleReport } from '../../redux/report/actions/reportActions';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../Layout';
import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const reportData = useSelector((state) => state.report.report);
    const styleReportData = useSelector((state) => state.report.styleReport);

    useEffect(() => {
        setLoading(false);
        dispatch(fetchReport());
        dispatch(fetchStyleReport());
        setLoading(true);
    }, [dispatch]);

    /*
    {
    "createAt": "2023-11-20T12:13:25+03:00",
    "totalItemsInWarehouse": 14333,
    "totalItemsInSales": 558,
    "totalItemsInRework": 4136,
    "totalItemsInPacking": 16549,
    "totalItemsInReworkComplete": 9180,
    "totalItemsInReworkPending": 13631
    }*/
    return (
        <Layout>
            <div>
                <h1>Dashboard</h1>
                <Button variant="outlined" onClick={() => {
                    dispatch(generateReport())
                    setTimeout(() => {
                        dispatch(fetchReport());
                    }, 1000);
                }}>Generate Report</Button>
                {loading ? <Grid container spacing={3} paddingTop={5}>
                    {/* Total Items in Packing Zone */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3}>
                            <CardContent>
                                <Typography variant="h6">Total Items in Packing Zone</Typography>
                                <Typography variant="h4">{reportData.totalItemsInPacking}</Typography>
                            </CardContent>
                        </Paper>
                    </Grid>

                    {/* Total Items in Warehouse */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3}>
                            <CardContent>
                                <Typography variant="h6">Total Items in Warehouse</Typography>
                                <Typography variant="h4">{reportData.totalItemsInWarehouse}</Typography>
                            </CardContent>
                        </Paper>
                    </Grid>

                    {/* Total Items in Sales */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3}>
                            <CardContent>
                                <Typography variant="h6">Total Items in Sales</Typography>
                                <Typography variant="h4">{reportData.totalItemsInSales}</Typography>
                            </CardContent>
                        </Paper>
                    </Grid>

                    {/* Total Items in Rework */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper elevation={3}>
                            <CardContent>
                                <Typography variant="h6">Total Items in Rework</Typography>
                                <Typography variant="h4">{reportData.totalItemsInRework}</Typography>
                            </CardContent>
                        </Paper>
                    </Grid>

                    {/* Style Report Data */}
                    {styleReportData.length > 0 ? styleReportData.map((styleReport, index) => {
                        return (
                            <Grid item xs={12} sm={2} md={2}>
                                <Paper elevation={3}>
                                    <CardContent>
                                        <Typography>{styleReport.style.name}:{styleReport.totalStyle}</Typography>
                                        <Typography>Rework: {styleReport.totalStyleInRework}</Typography>
                                        <Typography>Packing: {styleReport.totalStyleInPacking}</Typography>
                                        <Typography>Sales: {styleReport.totalStyleInSales}</Typography>
                                        <Typography>Warehouse: {styleReport.totalStyleInWarehouse}</Typography>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        )
                    }) : <h1>Loading...</h1>}


                    {/* Add more cards for other relevant information */}
                </Grid>
                    : <h1>Loading...</h1>}

                {/* Add charts or graphs here */}
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6}>
                            <h2>Bar Chart Example</h2>
                            <BarChart
                                colors={
                                    ['#FF0000', '#00FF00', '#0000FF']
                                }
                                xAxis={[
                                    {
                                        id: 'barCategories',
                                        data: ['bar A', 'bar B', 'bar C'],
                                        scaleType: 'band',
                                    },
                                ]}
                                series={[
                                    {
                                        data: [2, 5, 3],
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <h2>Bar Chart Example</h2>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                width={500}
                                height={300}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
