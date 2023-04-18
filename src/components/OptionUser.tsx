import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { UserContext } from '../contexts/UserContext';

import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';

type props = {
    buttonOpen: JSX.Element;
};

function OptionUser({ buttonOpen }: props) {
    const { logout } = useAuth0();
    const user: Record<string, any> = useContext(UserContext);

    const onPermissions = () => {
        Notification.requestPermission();
    }

    const onLogout = () => {
        localStorage.removeItem('access_token');
        logout({ logoutParams: { returnTo: import.meta.env.VITE_APP_JUMI } });
    };

    return (
        <div>
            <Popup trigger={buttonOpen} position="bottom right" closeOnDocumentClick>
                <div style={{ padding: '10px' }}>
                    <div style={{ padding: '0' }} className="field-input">
                        <span>{user['nickname']}</span>
                        <span onClick={onPermissions}>Notifiaciones</span>
                        <span onClick={onLogout}>SALIR</span>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default OptionUser;
