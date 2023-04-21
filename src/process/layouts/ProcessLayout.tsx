import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import useTenantFormsTemplates from '../../forms/hooks/useTenantFormsTemplates';
import useTenantUsers from '../../users/hooks/useTenantUsers';

type Props = {};

enum OPTIONS {
    GUARDADOS = '/procesos/guardados',
    DESPLEGADOS = '/procesos/desplegados',
    DEFINICIONES = '/procesos/definiciones',
    INSTANCIADOS = '/procesos/instanciados',
    MODELADOR = '/procesos/modelador',
}

export default function ProcessLayout({}: Props) {
    const userContext: Record<string, any> = useContext(UserContext);

    const location = useLocation().pathname;

    const users = useTenantUsers({ query: '', page: 0, paramsExtra: [], type: '', limit: 100 });
    const forms = useTenantFormsTemplates({ query: '', page: 0, paramsExtra: [], type: '', limit: 100 });
    localStorage.setItem(
        'forms',
        JSON.stringify(
            forms.data.map((item) => {
                return { _id: item._id, name: item.name };
            }),
        ),
    );
    localStorage.setItem(
        'users',
        JSON.stringify(
            users.data.map((item) => {
                return { _id: item.user_id, nickname: item.nickname };
            }),
        ),
    );
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
