import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';

type Props = {};

enum OPTIONS {
    GUARDADOS = '/procesos/guardados',
    DESPLEAGOS = '/procesos/desplegados',
    DEFINICIONES = '/procesos/definiciones',
    INSTANCIADOS = '/procesos/instanciados',
    MODELADOR = '/procesos/modelador',
}

export default function ProcessLayout({}: Props) {
    const location = useLocation().pathname;

    localStorage.setItem('users', JSON.stringify([]));
    localStorage.setItem('forms', JSON.stringify([]));
    localStorage.setItem('labels', JSON.stringify([]));

    return (
        <div style={{ padding: '20px' }}>
            <ul className="tab-list">
                {Object.entries(OPTIONS).map(([key, value]) => (
                    <li key={key}>
                        <Link className={`tab ${location.startsWith(value) ? 'active' : ''}`} to={value}>
                            {key}
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
