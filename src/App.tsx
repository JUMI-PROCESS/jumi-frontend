import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routing from './routing/Router';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routing></Routing>
        </BrowserRouter>
    );
}

export default App;
