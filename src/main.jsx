import React from 'react'
import App from './App.jsx'
import './index.css'
import { render } from 'react-dom';

const appContainer = document.getElementById('root');
render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    appContainer
);
