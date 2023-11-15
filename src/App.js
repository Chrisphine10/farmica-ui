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
import AddRegion from "./components/region/AddRegion";
import RegionsList from "./components/region/RegionsList";
import AddRework from "./components/rework/AddRework";
import ReworkList from "./components/rework/ReworkList";
import AddStyle from "./components/style/AddStyle";
import StylesList from "./components/style/StylesList";
import AddZone from "./components/zone/AddZone";
import ZoneList from "./components/zone/ZoneList";
import ZoneView from './components/zone/ZoneView';
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
                      <Route path="/add-region" element={<RequireAuth><AddRegion /></RequireAuth>} />
                      <Route path="/regions-list" element={<RequireAuth><RegionsList /></RequireAuth>} />
                      <Route path="/add-rework" element={<RequireAuth><AddRework /></RequireAuth>} />
                      <Route path="/rework-list" element={<RequireAuth><ReworkList /></RequireAuth>} />
                      <Route path="/add-style" element={<RequireAuth><AddStyle /></RequireAuth>} />
                      <Route path="/styles-list" element={<RequireAuth><StylesList /></RequireAuth>} />
                      <Route path="/add-zone" element={<RequireAuth><AddZone /></RequireAuth>} />
                      <Route path="/zones-list" element={<RequireAuth><ZoneList /></RequireAuth>} />
                      <Route path="/view-zone" element={<RequireAuth><ZoneView /></RequireAuth>} />
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
