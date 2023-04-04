import React from 'react';

import { Link, Outlet } from 'react-router-dom';

type Props = {};

enum OPTIONS {
    TAREAS = '/formularios/tareas',
    DISPONIBLES = '/formularios/disponibles',
    TODOS = '/formularios/todos',
    MODELADOR = '/formularios/modelador',
}

export default function FormLayout({}: Props) {
    return (
        <div style={{ padding: '20px' }}>
            <ul className="tab-list">
                {Object.entries(OPTIONS).map(([key, value]) => (
                    <li key={key}>
                        <Link className="tab" to={value}>{key}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
