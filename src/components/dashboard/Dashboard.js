import React, { useEffect, useState } from 'react';
import { CardContent, Typography, FormControl, Select, MenuItem, InputLabel, ButtonGroup, Button, Grid, Paper, Divider, Tabs, Tab } from '@mui/material';
import { fetchReport, generateReport, fetchStyleReport, fetchReportByMonthAndYear, fetchStyleReportByMonthAndYear, cleanUpReport } from '../../redux/report/actions/reportActions';
import { useDispatch, useSelector } from "react-redux";
import Layout from '../Layout';
import { BarChart, PieChart } from '@mui/x-charts';


const Dashboard = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const reportData = useSelector((state) => state.report.report);
    const styleReportData = useSelector((state) => state.report.styleReport);
    const historyReport = useSelector((state) => state.report.historyReport);
    const historyStyleReport = useSelector((state) => state.report.historyStyleReport);
    const [selectedTab, setSelectedTab] = useState(localStorage.getItem('selectedTabDashboard') || 'Live_Report');
    const [transformedStyleReportData, setTransformedStyleReportData] = useState({});
    const [yearData, setYearData] = useState(null);
    const [monthData, setMonthData] = useState(null);
    const [transformedStyleReport, setTransformedStyleReport] = useState([]);
    useEffect(() => {
        setLoading(false);
        dispatch(fetchReport());
        dispatch(fetchStyleReport());
    }, [dispatch]);

    useEffect(() => {
        if (historyStyleReport !== [] && historyStyleReport !== null && historyStyleReport !== undefined) {
            setTransformedStyleReport(convertData(historyStyleReport))
        }
    }, [historyStyleReport]);


    // Generate an array of months
    const months = Array.from({ length: 12 }, (_, index) => new Date(2023, index).toLocaleString('default', { month: 'long' }));

    // Generate an array of years from 2023 to the current year
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2022 }, (_, index) => 2023 + index);

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

    const handleReport = (month) => {
        setMonthData(months[month - 1]);
        if (yearData && monthData) {
            dispatch(fetchReportByMonthAndYear(month, yearData));
            dispatch(fetchStyleReportByMonthAndYear(month, yearData));
        }
    }

    const convertData = (data) => {
        const transformedData = data.reduce((acc, item) => {
            const { style, totalStyleInRework, totalStyleInWarehouse, totalStyleInSales, totalStyleInPacking } = item;

            // Check if the style already exists in the accumulator for each section
            const existingReworkStyleIndex = acc.rework.findIndex((section) => section.style.id === style.id);
            const existingWarehouseStyleIndex = acc.warehouse.findIndex((section) => section.style.id === style.id);
            const existingSalesStyleIndex = acc.sales.findIndex((section) => section.style.id === style.id);
            const existingPackingZoneStyleIndex = acc.packingZone.findIndex((section) => section.style.id === style.id);

            // Create a section object
            const section = { style, numberOfCTNs: totalStyleInRework };

            // Update existing styles or add new styles to each section
            if (existingReworkStyleIndex !== -1) {
                acc.rework[existingReworkStyleIndex].numberOfCTNs += totalStyleInRework;
            } else {
                acc.rework.push(section);
            }

            if (existingWarehouseStyleIndex !== -1) {
                acc.warehouse[existingWarehouseStyleIndex].numberOfCTNs += totalStyleInWarehouse;
            } else {
                acc.warehouse.push({ style, numberOfCTNs: totalStyleInWarehouse });
            }

            if (existingSalesStyleIndex !== -1) {
                acc.sales[existingSalesStyleIndex].numberOfCTNs += totalStyleInSales;
            } else {
                acc.sales.push({ style, numberOfCTNs: totalStyleInSales });
            }

            if (existingPackingZoneStyleIndex !== -1) {
                acc.packingZone[existingPackingZoneStyleIndex].numberOfCTNs += totalStyleInPacking;
            } else {
                acc.packingZone.push({ style, numberOfCTNs: totalStyleInPacking });
            }

            return acc;
        }, { rework: [], warehouse: [], sales: [], packingZone: [] });

        return transformedData;

    }

    useEffect(() => {
        // write a fucntion to transform the data for styles to be sections and the total of that style in each section
        // then use that data to create the graph
        if (styleReportData.length > 0 && styleReportData !== [] && styleReportData !== null && styleReportData !== undefined && reportData !== undefined) {
            console.log('styleReportData', styleReportData);
            const transformedData = convertData(styleReportData);
            console.log('transformedData', transformedData);
            setTransformedStyleReportData(transformedData);
            setLoading(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [styleReportData]);

    const reload = () => {
        setLoading(false);
        dispatch(fetchReport());
        dispatch(fetchStyleReport());
    }

    return (
        <Layout>
            <div>
                <h1>Dashboard</h1>
                {loading ?
                    <>
                        <Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)} style={
                            {
                                marginBottom: '10px'
                            }
                        }>
                            <Tab label="Live Report" value="Live_Report" />
                            <Tab label="Monthly Report" value="Monthly_Report" />
                        </Tabs>
                        {selectedTab === 'Live_Report' &&
                            <>
                                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                                    <Button color='error' onClick={reload}>Reload Live Report</Button>
                                </ButtonGroup>
                                <Grid container spacing={3} paddingTop={3}>

                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3}>
                                            <CardContent>
                                                <Typography variant="h6"><strong>Total Items in Packing Zone</strong></Typography>
                                                <Typography variant="h4">{reportData.totalItemsInPacking}</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>

                                    {/* Total Items in Warehouse */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3}>
                                            <CardContent>
                                                <Typography variant="h6"><strong>Total Items in Warehouse</strong></Typography>
                                                <Typography variant="h4">{reportData.totalItemsInWarehouse}</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>

                                    {/* Total Items in Sales */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3}>
                                            <CardContent>
                                                <Typography variant="h6"><strong>Total Items in Sales</strong></Typography>
                                                <Typography variant="h4">{reportData.totalItemsInSales}</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>

                                    {/* Total Items in Rework */}
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3}>
                                            <CardContent>
                                                <Typography variant="h6"><strong>Total Items in Rework</strong></Typography>
                                                <Typography variant="h4">{reportData.totalItemsInRework}</Typography>
                                            </CardContent>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={6}>
                                        {/* Total Items in Packing Zone */}
                                        <Grid container spacing={3}>
                                            {/* Style Report Data */}
                                            <Grid item xs={12} sm={12} md={12}>
                                                <h2>Style Report</h2>
                                            </Grid>

                                            {styleReportData.length > 0 ? styleReportData.map((styleReport, index) => {
                                                return (

                                                    <Grid item xs={12} sm={2} md={6}>
                                                        <Paper elevation={3}>
                                                            <CardContent>
                                                                <Typography
                                                                    style={
                                                                        {
                                                                            textAlign: 'center',
                                                                            paddingTop: '5px',
                                                                            paddingBottom: '5px',
                                                                            fontWeight: 'bold',
                                                                            fontSize: '20px'
                                                                        }
                                                                    }
                                                                >{styleReport.style.name}</Typography>
                                                                <Divider
                                                                    style={
                                                                        {
                                                                            marginBottom: '10px'
                                                                        }
                                                                    }
                                                                />
                                                                <Typography><strong>Total:</strong> {styleReport.totalStyle}</Typography>
                                                                <Typography><strong>Packing:</strong> {styleReport.totalStyleInPacking}</Typography>
                                                                <Typography><strong>Sales:</strong> {styleReport.totalStyleInSales}</Typography>
                                                                <Typography><strong>Warehouse:</strong> {styleReport.totalStyleInWarehouse}</Typography>
                                                                <Typography><strong>Rework:</strong> {styleReport.totalStyleInRework}</Typography>
                                                            </CardContent>
                                                        </Paper>
                                                    </Grid>
                                                )
                                            }) : <h1>Loading...</h1>}
                                        </Grid>

                                        {/* Add more cards for other relevant information */}
                                    </Grid>
                                    {/* Add charts or graphs here */}
                                    <Grid item xs={12} sm={6} md={4} lg={6}>
                                        <Grid container spacing={3}>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <h2
                                                    style={{
                                                        paddingTop: '10px',
                                                        paddingLeft: '10px',

                                                    }}
                                                >Live Rework Graph</h2>
                                                <PieChart
                                                    sx={
                                                        {
                                                            paddingLeft: '10px',
                                                        }
                                                    }
                                                    series={[{
                                                        data: [
                                                            { id: 0, value: reportData.totalItemsInPacking, label: "Packing" },
                                                            { id: 1, value: reportData.totalItemsInSales, label: "Sales" },
                                                            { id: 2, value: reportData.totalItemsInWarehouse, label: "Warehouse" },
                                                            { id: 3, value: reportData.totalItemsInRework, label: "Rework" }],
                                                        innerRadius: 30,
                                                        outerRadius: 100,
                                                        paddingAngle: 5,
                                                        cornerRadius: 5,
                                                        startAngle: 0,
                                                        endAngle: 300,
                                                        cx: 150,
                                                        cy: 150,
                                                    }
                                                    ]}

                                                    height={300}
                                                />
                                                <br />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <h2
                                                    style={{
                                                        paddingTop: '10px',
                                                        paddingLeft: '10px',

                                                    }}
                                                >Live Style Stacking Graph</h2>
                                                <BarChart

                                                    colors={
                                                        ['#1976d2', '#dc004e', '#ffc107', '#3f51b5', '#4caf50', '#ff4081', '#f50057', '#ff6e40', '#ff3d00', '#00e676', '#00b0ff', '#ff9100', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5']
                                                    }
                                                    xAxis={[
                                                        {
                                                            scaleType: 'band',
                                                            data: ['rework', 'warehouse', 'sales', 'packingZone'],
                                                        },
                                                    ]}
                                                    series={[
                                                        ...styleReportData.map((styleReport) => ({
                                                            stack: 'A',
                                                            label: styleReport.style.name,
                                                            data: [transformedStyleReportData['rework']
                                                                .filter((styles) => styles.style.id === styleReport.style.id)
                                                                .map((styles) => (styles.numberOfCTNs)),
                                                            transformedStyleReportData['warehouse']
                                                                .filter((styles) => styles.style.id === styleReport.style.id)
                                                                .map((styles) => (styles.numberOfCTNs)),
                                                            transformedStyleReportData['sales']
                                                                .filter((styles) => styles.style.id === styleReport.style.id)
                                                                .map((styles) => (styles.numberOfCTNs)),
                                                            transformedStyleReportData['packingZone']
                                                                .filter((styles) => styles.style.id === styleReport.style.id)
                                                                .map((styles) => (styles.numberOfCTNs))]
                                                        })),
                                                    ]}
                                                    yAxis={
                                                        [{
                                                            label: 'Number of CTNs',
                                                        }]
                                                    }
                                                    xAxisTitle="Style"
                                                    yAxisTitle="Section"
                                                    height={500}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <h2
                                                    style={{
                                                        paddingTop: '10px',
                                                        paddingLeft: '10px',

                                                    }}
                                                >Live Styles Bar Graph</h2>
                                                <BarChart
                                                    sx={
                                                        {
                                                            marginLeft: '10px',
                                                            textAlign: 'center',
                                                            alignContent: 'center',
                                                        }
                                                    }
                                                    colors={
                                                        ['#1976d2', '#dc004e', '#ffc107', '#3f51b5', '#4caf50', '#ff4081', '#f50057', '#ff6e40', '#ff3d00', '#00e676', '#00b0ff', '#ff9100', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5']
                                                    }
                                                    xAxis={[{ scaleType: 'band', data: styleReportData.map((styleReport) => styleReport.style.code) }]}
                                                    yAxis={
                                                        [{
                                                            label: 'Number of CTNs',
                                                        }]
                                                    }
                                                    series={[{
                                                        data: styleReportData.map((styleReport) => styleReport.totalStyleInRework), type: 'bar', name: 'Rework', label: 'Rework',
                                                    },
                                                    { data: styleReportData.map((styleReport) => styleReport.totalStyleInPacking), type: 'bar', name: 'Packing', label: 'Packing' },
                                                    { data: styleReportData.map((styleReport) => styleReport.totalStyleInSales), type: 'bar', name: 'Sales', label: 'Sales' },
                                                    { data: styleReportData.map((styleReport) => styleReport.totalStyleInWarehouse), type: 'bar', name: 'Warehouse', label: 'Warehouse' },
                                                    { data: styleReportData.map((styleReport) => styleReport.totalStyle), type: 'bar', name: 'Total', label: 'Total' }
                                                    ]}
                                                    height={400}
                                                />
                                                <br />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>}
                        {selectedTab === 'Monthly_Report' &&
                            <>
                                <Button variant="outlined" onClick={() => {
                                    dispatch(generateReport())
                                    setTimeout(() => {
                                        dispatch(fetchReport());
                                    }, 1000);
                                }}>Generate Report</Button>
                                <Grid container spacing={3}>
                                    <Grid item xs={3} sm={3} md={3}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="yearFilterLabel">Year</InputLabel>
                                            <Select labelId="yearFilterLabel" id="yearFilter" label="year"
                                                onChange={(e) => {
                                                    dispatch(cleanUpReport)
                                                    setYearData(e.target.value)
                                                }}>
                                                {years.map((year, index) => (
                                                    <MenuItem key={index} value={`${year}`}>
                                                        {`${year}`}
                                                    </MenuItem>
                                                ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {yearData !== null &&
                                        <>
                                            <Grid item xs={3} sm={3} md={3}>
                                                < FormControl fullWidth margin="normal">
                                                    <InputLabel id="monthFilterLabel">Month</InputLabel>
                                                    <Select labelId="monthFilterLabel" id="monthFilter" label="month" onChange={(e) => handleReport(e.target.value)}>
                                                        {months.map((month, index) => (
                                                            <MenuItem key={index} value={`${index + 1}`}>
                                                                {`${month}`}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                                <br />
                                <Grid container spacing={3} paddingTop={3}>
                                    {historyReport !== {} && monthData !== null ?
                                        <>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Paper elevation={3}>
                                                    <CardContent>
                                                        <Typography variant="h6"><strong>Total Items in Packing Zone</strong></Typography>
                                                        <Typography variant="h4">{historyReport.totalItemsInPacking}</Typography>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>

                                            {/* Total Items in Warehouse */}
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Paper elevation={3}>
                                                    <CardContent>
                                                        <Typography variant="h6"><strong>Total Items in Warehouse</strong></Typography>
                                                        <Typography variant="h4">{historyReport.totalItemsInWarehouse}</Typography>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>

                                            {/* Total Items in Sales */}
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Paper elevation={3}>
                                                    <CardContent>
                                                        <Typography variant="h6"><strong>Total Items in Sales</strong></Typography>
                                                        <Typography variant="h4">{historyReport.totalItemsInSales}</Typography>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>

                                            {/* Total Items in Rework */}
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Paper elevation={3}>
                                                    <CardContent>
                                                        <Typography variant="h6"><strong>Total Items in Rework</strong></Typography>
                                                        <Typography variant="h4">{historyReport.totalItemsInRework}</Typography>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                        </> : null}
                                    {monthData !== null && yearData !== null && historyStyleReport !== [] && historyStyleReport.length > 0 ?
                                        <>
                                            <Grid item xs={12} sm={6} md={4} lg={6}>

                                                <Grid container spacing={3}>
                                                    {/* Style Report Data */}
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <h2>{monthData} Style Report</h2>
                                                    </Grid>

                                                    {historyStyleReport.length > 0 ? historyStyleReport.map((styleReport, index) => {
                                                        return (

                                                            <Grid item xs={12} sm={2} md={6}>
                                                                <Paper elevation={3}>
                                                                    <CardContent>
                                                                        <Typography
                                                                            style={
                                                                                {
                                                                                    textAlign: 'center',
                                                                                    paddingTop: '5px',
                                                                                    paddingBottom: '5px',
                                                                                    fontWeight: 'bold',
                                                                                    fontSize: '20px'
                                                                                }
                                                                            }
                                                                        >{styleReport.style.name}</Typography>
                                                                        <Divider
                                                                            style={
                                                                                {
                                                                                    marginBottom: '10px'
                                                                                }
                                                                            }
                                                                        />
                                                                        <Typography><strong>Total:</strong> {styleReport.totalStyle}</Typography>
                                                                        <Typography><strong>Packing:</strong> {styleReport.totalStyleInPacking}</Typography>
                                                                        <Typography><strong>Sales:</strong> {styleReport.totalStyleInSales}</Typography>
                                                                        <Typography><strong>Warehouse:</strong> {styleReport.totalStyleInWarehouse}</Typography>
                                                                        <Typography><strong>Rework:</strong> {styleReport.totalStyleInRework}</Typography>
                                                                    </CardContent>
                                                                </Paper>
                                                            </Grid>
                                                        )
                                                    }) : null}
                                                </Grid>
                                            </Grid>
                                            {/* Add charts or graphs here */}
                                            <Grid item xs={12} sm={6} md={4} lg={6}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <h2
                                                            style={{
                                                                paddingTop: '10px',
                                                                paddingLeft: '10px',

                                                            }}
                                                        >{monthData} Rework Graph</h2>
                                                        <PieChart
                                                            sx={
                                                                {
                                                                    paddingLeft: '10px',
                                                                }
                                                            }
                                                            series={[{
                                                                data: [
                                                                    { id: 0, value: historyReport.totalItemsInPacking, label: "Packing" },
                                                                    { id: 1, value: historyReport.totalItemsInSales, label: "Sales" },
                                                                    { id: 2, value: historyReport.totalItemsInWarehouse, label: "Warehouse" },
                                                                    { id: 3, value: historyReport.totalItemsInRework, label: "Rework" }],
                                                                innerRadius: 30,
                                                                outerRadius: 100,
                                                                paddingAngle: 5,
                                                                cornerRadius: 5,
                                                                startAngle: 0,
                                                                endAngle: 300,
                                                                cx: 150,
                                                                cy: 150,
                                                            }
                                                            ]}

                                                            height={300}
                                                        />
                                                        <br />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <h2
                                                            style={{
                                                                paddingTop: '10px',
                                                                paddingLeft: '10px',

                                                            }}
                                                        >{monthData} Style Stacking Graph</h2>
                                                        <BarChart

                                                            colors={
                                                                ['#1976d2', '#dc004e', '#ffc107', '#3f51b5', '#4caf50', '#ff4081', '#f50057', '#ff6e40', '#ff3d00', '#00e676', '#00b0ff', '#ff9100', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5']
                                                            }
                                                            xAxis={[
                                                                {
                                                                    scaleType: 'band',
                                                                    data: ['rework', 'warehouse', 'sales', 'packingZone'],
                                                                },
                                                            ]}
                                                            series={[
                                                                ...historyStyleReport.map((styleReport) => ({
                                                                    stack: 'A',
                                                                    label: styleReport.style.name,
                                                                    data: [transformedStyleReport['rework']
                                                                        .filter((styles) => styles.style.id === styleReport.style.id)
                                                                        .map((styles) => (styles.numberOfCTNs)),
                                                                    transformedStyleReport['warehouse']
                                                                        .filter((styles) => styles.style.id === styleReport.style.id)
                                                                        .map((styles) => (styles.numberOfCTNs)),
                                                                    transformedStyleReport['sales']
                                                                        .filter((styles) => styles.style.id === styleReport.style.id)
                                                                        .map((styles) => (styles.numberOfCTNs)),
                                                                    transformedStyleReport['packingZone']
                                                                        .filter((styles) => styles.style.id === styleReport.style.id)
                                                                        .map((styles) => (styles.numberOfCTNs))]
                                                                })),
                                                            ]}
                                                            yAxis={
                                                                [{
                                                                    label: 'Number of CTNs',
                                                                }]
                                                            }
                                                            xAxisTitle="Style"
                                                            yAxisTitle="Section"
                                                            height={500}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={12} md={12}>
                                                        <h2
                                                            style={{
                                                                paddingTop: '10px',
                                                                paddingLeft: '10px',

                                                            }}
                                                        >{monthData} Styles Bar Graph</h2>
                                                        <BarChart
                                                            sx={
                                                                {
                                                                    marginLeft: '10px',
                                                                    textAlign: 'center',
                                                                    alignContent: 'center',
                                                                }
                                                            }
                                                            colors={
                                                                ['#1976d2', '#dc004e', '#ffc107', '#3f51b5', '#4caf50', '#ff4081', '#f50057', '#ff6e40', '#ff3d00', '#00e676', '#00b0ff', '#ff9100', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5', '#ff3d00', '#00c853', '#6200ea', '#00b8d4', '#ffab00', '#304ffe', '#0091ea', '#ff6d00', '#00bfa5', '#d50000', '#aeea00', '#2962ff', '#00bfa5']
                                                            }
                                                            xAxis={[{ scaleType: 'band', data: historyStyleReport.map((styleReport) => styleReport.style.code) }]}
                                                            yAxis={
                                                                [{
                                                                    label: 'Number of CTNs',
                                                                }]
                                                            }
                                                            series={[{
                                                                data: historyStyleReport.map((styleReport) => styleReport.totalStyleInRework), type: 'bar', name: 'Rework', label: 'Rework',
                                                            },
                                                            { data: historyStyleReport.map((styleReport) => styleReport.totalStyleInPacking), type: 'bar', name: 'Packing', label: 'Packing' },
                                                            { data: historyStyleReport.map((styleReport) => styleReport.totalStyleInSales), type: 'bar', name: 'Sales', label: 'Sales' },
                                                            { data: historyStyleReport.map((styleReport) => styleReport.totalStyleInWarehouse), type: 'bar', name: 'Warehouse', label: 'Warehouse' },
                                                            { data: historyStyleReport.map((styleReport) => styleReport.totalStyle), type: 'bar', name: 'Total', label: 'Total' }
                                                            ]}
                                                            height={400}
                                                        />
                                                        <br />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                        : null
                                    }
                                </Grid>
                            </>
                        }
                    </> : <h1>Loading...</h1>}
            </div>
        </Layout >
    );
};


export default Dashboard;
