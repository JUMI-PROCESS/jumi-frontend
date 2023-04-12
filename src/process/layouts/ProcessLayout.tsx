import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import UseTenantForms from '../../forms/hooks/useTenantForms';
import useTenantForms from '../../forms/hooks/useTenantForms';
import { UserContext } from '../../contexts/UserContext';

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

    const forms = useTenantForms({ query: '', page: 0, paramsExtra: [], type: '' });
    console.log(userContext);
    localStorage.setItem(
        'forms',
        JSON.stringify(
            forms.data.map((item) => {
                return { _id: item._id, name: item.name };
            }),
        ),
    );
    localStorage.setItem('users', JSON.stringify(
        [{_id: userContext.user_id, nickname: userContext.nickname}],
    ),);
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
