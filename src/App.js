import React from 'react'
import AuthContainer from './components/auth/AuthContainer';
import { AppProvider } from './contexts/AppContext';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/theme.scss';

const App = () => {

    return (
      <AppProvider>
        <AuthContainer />
      </AppProvider>
    )
}

export default App