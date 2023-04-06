import React, { createContext, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Routing from './routing/Router';
import { RepositoryContextDefault, RepositoryContext } from './contexts/RepositoryContext'

import { FormRepositoryFake } from './forms/adapters/FormRepositoryFake';

import './App.css';

function App() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return <span>Loading...</span>
    }
    if(!isAuthenticated){
        loginWithRedirect();
        return <span>Loading...</span>
    }

    return (
        <BrowserRouter>
            <RepositoryContext.Provider value={{form:RepositoryContextDefault}}>
                <Routing></Routing> 
            </RepositoryContext.Provider>
        </BrowserRouter>
    );
}

export default App;
