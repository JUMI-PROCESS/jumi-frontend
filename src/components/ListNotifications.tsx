import React, { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import AllNotifications from '../notifications/views/AllNotification';

type props = {
    buttonOpen: JSX.Element;
};

function OptionUser({ buttonOpen }: props) {
    const user: Record<string, any> = useContext(UserContext);

    return (
        <div>
            <Popup trigger={buttonOpen} position="bottom right" className='w-100' closeOnDocumentClick>
                <div style={{ padding: '10px', width: '100%' }}>
                    <AllNotifications />
                </div>
            </Popup>
        </div>
    );
}

export default OptionUser;
