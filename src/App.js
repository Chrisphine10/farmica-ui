import React from 'react';
import './App.css'; // You can create this file to add custom styles if needed
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from './ErrorBoundary';
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { AuthProvider } from "./helpers/auth/AuthProvider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RequireAuth } from "./routes/RequireAuth";
import { MenuProvider } from "./helpers/menu/MenuProvider";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Verify from "./components/auth/Verify";
import Reset from "./components/auth/Reset";
import Dashboard from "./components/dashboard/Dashboard";
import BatchList from "./components/batch/BatchList";
import BatchView from './components/batch/BatchView';
import AddRework from "./components/rework/AddRework";
import ReworkList from "./components/rework/ReworkList";
import ReworkView from './components/rework/ReworkView';
import StylesList from "./components/style/StylesList";
import StylesView from './components/style/StylesView';
import AddZone from "./components/zone/AddZone";
import ZoneList from "./components/zone/ZoneList";
import ZoneView from './components/zone/ZoneView';
import LotList from './components/lot/LotList';
import LotsView from './components/lot/LotView';
import RegionList from './components/region/RegionList';
import WarehouseList from './components/warehouse/WarehouseList';
import WarehouseView from './components/warehouse/WarehouseView';
import SalesList from './components/sales/SalesList';
import SalesView from './components/sales/SalesView';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const defaultTheme = createTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <MenuProvider>
                <div className="content-container">
                  <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
                  <Router>
                    <Routes>
                      <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/verify" element={<Verify />} />
                      <Route path="/reset" element={<Reset />} />
                      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                      <Route path="/batch-list" element={<RequireAuth><BatchList /></RequireAuth>} />
                      <Route path="/add-rework" element={<RequireAuth><AddRework /></RequireAuth>} />
                      <Route path="/rework-list" element={<RequireAuth><ReworkList /></RequireAuth>} />
                      <Route path="/view-rework" element={<RequireAuth><ReworkView /></RequireAuth>} />
                      <Route path="/styles-list" element={<RequireAuth><StylesList /></RequireAuth>} />
                      <Route path="/add-zone" element={<RequireAuth><AddZone /></RequireAuth>} />
                      <Route path="/add-zone/:id" element={<RequireAuth><AddZone /></RequireAuth>} />
                      <Route path="/zones-list" element={<RequireAuth><ZoneList /></RequireAuth>} />
                      <Route path="/view-zone" element={<RequireAuth><ZoneView /></RequireAuth>} />
                      <Route path="/lots-list" element={<RequireAuth><LotList /></RequireAuth>} />
                      <Route path="/view-lot" element={<RequireAuth><LotsView /></RequireAuth>} />
                      <Route path="/regions-list" element={<RequireAuth><RegionList /></RequireAuth>} />
                      <Route path="/warehouse-list" element={<RequireAuth><WarehouseList /></RequireAuth>} />
                      <Route path="/view-warehouse" element={<RequireAuth><WarehouseView /></RequireAuth>} />
                      <Route path="/sales-list" element={<RequireAuth><SalesList /></RequireAuth>} />
                      <Route path="/view-sales" element={<RequireAuth><SalesView /></RequireAuth>} />
                      <Route path="/view-style" element={<RequireAuth><StylesView /></RequireAuth>} />
                      <Route path="/view-batch" element={<RequireAuth><BatchView /></RequireAuth>} />
                    </Routes>
                  </Router>
                </div>
              </MenuProvider>
            </AuthProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
