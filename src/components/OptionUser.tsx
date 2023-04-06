import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';

function OptionUser({buttonOpen}) {
    const { logout } = useAuth0();
    return (
        <div>
            <Popup trigger={buttonOpen} position="bottom left" closeOnDocumentClick>
            <div style={{ padding: '10px' }}>
                    <div style={{ padding: '0' }} className="field-input" onClick={() => logout({ logoutParams: { returnTo: "http://127.0.0.1:5173" } })}>
                        <span>SALIR</span>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default OptionUser;
