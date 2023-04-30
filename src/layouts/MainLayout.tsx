import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import ListNotifications from '../components/ListNotifications';
import OptionUser from '../components/OptionUser';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';
import { ISocket } from '../output.ports/ISocket';

import './MainLayout.css'

function MainLayout({}) {
    const location = useLocation().pathname;
    const userContext: Record<string, any> = useContext(UserContext);
    const socketNotification: ISocket = useContext(SocketContext)['notification'];

    useEffect(() => {
        socketNotification.onMessage((value: Record<string, any>) => {
            if (value.user == userContext.user_id) {
                toast.info(value['message']);
                new Notification('JUMI', { body: value['message'], icon: '/public/img/unicauca.png' });
            }
        });

        return () => {
            socketNotification.URL.off('signal', () => console.log('Disconnect socket'));
        };
    }, []);

    useEffect(() => {
        if (location.startsWith('/procesos')) document.title = 'JUMI | Procesos';
        if (location.startsWith('/formularios')) document.title = 'JUMI | Formularios';
    }, [location]);

    return (
        <div className="h-100">
            <nav className="nav-main backg-p1 bb-s1">
                <ul className="d-flex">
                    <Link to={'/inicio'}>
                        <div className="d-flex logo">
                            <img src="/img/unicauca.png" alt="logo-unicauca" height={40} />
                            <div className="d-grid" style={{ margin: '0 10px', textAlign: 'center' }}>
                                <div className="h7">Departamento de Química</div>
                                <div className="sh7">Universidad del Cauca</div>
                            </div>
                        </div>
                    </Link>
                    <div className="nav-menu">
                        <Link className="h7" to={'/procesos'}>
                            <span className={location.startsWith('/procesos') ? 'active-nav' : ''}>PROCESOS</span>
                        </Link>
                        <Link className="h7" to={'/formularios'}>
                            <span className={location.startsWith('/formularios') ? 'active-nav' : ''}>FORMULARIOS</span>
                        </Link>
                    </div>
                    <ListNotifications
                        buttonOpen={
                            <div style={{position: 'relative'}}>
                                <i className="count-not">0</i>
                                <div className="nav-user">&#9993;</div>
                            </div>
                        }
                    />
                    <OptionUser buttonOpen={<div className="nav-user">&#9817;</div>} />
                </ul>
            </nav>
            <div className="backg-p1 h-100">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
