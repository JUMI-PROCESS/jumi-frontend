import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import moment from 'moment';
import 'moment/dist/locale/es';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { SocketContext, socketFormContextDefault, socketNotificationContextDefault } from './contexts/SocketContext';
import { UserContext } from './contexts/UserContext';
import Routing from './routing/Router';

moment.locale('es');

function App() {
    const [user, setUser] = useState(null);

    const { loginWithRedirect, isAuthenticated, isLoading, getAccessTokenSilently, user: userCurrent } = useAuth0();

    useEffect(() => {
        const getAccessToken = async () => {
            const token = await getAccessTokenSilently();
            const user_ = await axios.get(
                `https://dev-rk8v8gk7wiwt6rgi.us.auth0.com/api/v2/users/${userCurrent?.sub}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            localStorage.setItem('user', user_.data.user_id);
            localStorage.setItem('access_token', token);
            localStorage.setItem('tenant', user_.data.user_metadata.tenant);
            setUser({ ...user_.data, token: token });
        };

        if (userCurrent) getAccessToken();
    }, [userCurrent]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (!isAuthenticated) {
        loginWithRedirect();
        return <span>Loading auth...</span>;
    }

    if (!user) {
        return <span>Loading user...</span>;
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={user}>
                <SocketContext.Provider
                    value={{ form: socketFormContextDefault, notification: socketNotificationContextDefault }}
                >
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
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
