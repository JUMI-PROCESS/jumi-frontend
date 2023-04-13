import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { SocketContext, SocketContextDefault } from './contexts/FormSocketContext';
import {
    DefinitionRepositoryApiContextDefault as definition,
    DeploymentRepositoryContextDefault as deployment,
    FormRepositoryContextDefault as form,
    InstanceRepositoryApiContextDefault as instance,
    ProcessRepositoryContextDefault as process,
    RepositoryContext,
} from './contexts/RepositoryContext';
import { UserContext } from './contexts/UserContext';
import Routing from './routing/Router';

function App() {
    const [user, setUser] = useState(null);

    const {
        loginWithRedirect,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
        user: userCurrent,
        logout,
    } = useAuth0();

    useEffect(() => {
        const getAccessToken = async () => {
            const token = await getAccessTokenSilently();
            const user_ = await axios.get(
                `https://dev-rk8v8gk7wiwt6rgi.us.auth0.com/api/v2/users/${userCurrent?.sub}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            localStorage.setItem('access_token', token);
            setUser({ ...user_.data, token: token });
        };

        if (userCurrent) getAccessToken();
    }, [userCurrent]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (!isAuthenticated) {
        logout();
        loginWithRedirect();
        return <span>Loading auth...</span>;
    }

    if (!user) {
        return <span>Loading user...</span>;
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={user}>
                <RepositoryContext.Provider value={{ form, process, deployment, instance, definition }}>
                    <SocketContext.Provider value={{ form: SocketContextDefault }}>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
                        />
                        <Routing></Routing>
                    </SocketContext.Provider>
                </RepositoryContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
