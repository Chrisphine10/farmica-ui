import React from 'react';
import './App.css'; // You can create this file to add custom styles if needed
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from './ErrorBoundary';
import store from "./redux/store";
import { Provider } from "react-redux";
import { AuthProvider } from "./helpers/auth/AuthProvider";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const defaultTheme = createTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/login" element={<div>Login</div>} />
                <Route path="/register" element={<div>Register</div>} />
                <Route path="/dashboard" element={<div>Dashboard</div>} />
                <Route path="/dashboard/:id" element={<div>Dashboard</div>} />
                <Route path="/profile" element={<div>Profile</div>} />
                <Route path="/profile/:id" element={<div>Profile</div>} />
                <Route path="/settings" element={<div>Settings</div>} />
                <Route path="/settings/:id" element={<div>Settings</div>} />
              </Routes>
            </Router>
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
