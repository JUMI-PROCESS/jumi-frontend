import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <Auth0Provider
            domain="dev-rk8v8gk7wiwt6rgi.us.auth0.com"
            clientId="Gql0qF18UhhOxw9DvvRYKpeVzmG0B3tj"
            cacheLocation={'localstorage' as const}
            authorizationParams={{
                redirect_uri: import.meta.env.VITE_REDIRECT_JUMI,
                audience: 'https://dev-rk8v8gk7wiwt6rgi.us.auth0.com/api/v2/',
                scope: 'profile read:current_user',
            }}
        >
            <App />
        </Auth0Provider>,
);
