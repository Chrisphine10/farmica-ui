import React from 'react';
import { Button, Typography, Container, AppBar, Toolbar } from '@mui/material';
import './App.css'; // You can create this file to add custom styles if needed
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const defaultTheme = createTheme();
  return (
    <ErrorBoundary>
      <ThemeProvider theme={defaultTheme}>
        <Container>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Material-UI React App</Typography>
            </Toolbar>
          </AppBar>
          <div>
            <Typography variant="h4">Welcome to Material-UI!</Typography>
            <Button variant="contained" color="primary">
              Click me
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
