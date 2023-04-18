import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import useTenantForms from '../../forms/hooks/useTenantForms';
import { UserContext } from '../../contexts/UserContext';
import UseTenantFormsTemplates from '../../forms/hooks/useTenantFormsTemplates';

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

    const forms = UseTenantFormsTemplates({ query: '', page: 0, paramsExtra: [], type: '', limit: 100 });
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
