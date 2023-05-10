import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import ListNotifications from '../components/ListNotifications';
import OptionUser from '../components/OptionUser';
import { SocketContext } from '../contexts/SocketContext';
import { UserContext } from '../contexts/UserContext';
import { NotificationRepositoryApi } from '../notifications/output.adapters/NotificationRepositoryApi';
import { ISocket } from '../output.ports/ISocket';
import { useCounter } from '../store.global';
import './MainLayout.css';

function MainLayout({}) {
    const location = useLocation().pathname;
    const userContext: Record<string, any> = useContext(UserContext);
    const socketNotification: ISocket = useContext(SocketContext)['notification'];
    const count = useCounter((state) => state.counterNotification);
    const setCounter = useCounter((state) => state.setCounter);

    useEffect(() => {
        const fetchData = async () => {
            const data = await new NotificationRepositoryApi().getCounter('', 'title', ['owner'], '');
            setCounter(data.data);
            const regex = /\[(\d+)\]/g;
            document.title = document.title.replace(regex, `[${data.data}]`);
        };
        socketNotification.onMessage((value: Record<string, any>) => {
            if (value.user == userContext.user_id) {
                toast.info(value['title']);
                if (import.meta.env.MODE === 'development') {
                    new Notification(value['title'], {
                        body: value['message'],
                        icon: '/img/128x128.png',
                    });
                } else {
                    Notification.requestPermission(function (result) {
                        if (result === 'granted') {
                            navigator.serviceWorker.ready.then(function (registration) {
                                registration.showNotification(value['title'], {
                                    body: value['message'],
                                    icon: '/img/128x128.png',
                                });
                            });
                        }
                    });
                }
                fetchData();
            }
        });
        fetchData();

        return () => {
            socketNotification.URL.off('signal', () => console.log('Disconnect socket'));
        };
    }, []);

    useEffect(() => {
        if (location.startsWith('/procesos')) document.title = `JUMI | Procesos [${count}]`;
        if (location.startsWith('/formularios')) document.title = `JUMI | Formularios [${count}]`;
    }, [location]);

    return (
        <div className="h-100">
            <nav className="nav-main backg-p1 bb-s1">
                <ul className="d-flex">
                    <Link to={'/inicio'}>
                        <div className="d-flex logo">
                            <img src="/jumi.svg" alt="logo-unicauca" height={40} />
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
                            <div style={{ position: 'relative' }}>
                                <i className="count-not">{count <= 9 ? count : '9+'}</i>
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
