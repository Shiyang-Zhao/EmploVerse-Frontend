import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from 'components/Authentication/js/UserProvider';

ReactDOM.createRoot(document.getElementById('App'))
    .render(
        <React.StrictMode>
            <UserProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserProvider>
        </React.StrictMode>);