import React, { createContext, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routing from './routing/Router';
import { RepositoryContextDefault, RepositoryContext } from './contexts/RepositoryContext'

import { FormRepositoryFake } from './forms/adapters/FormRepositoryFake';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <RepositoryContext.Provider value={{form:RepositoryContextDefault}}>
                <Routing></Routing> 
            </RepositoryContext.Provider>
        </BrowserRouter>
    );
}

export default App;
