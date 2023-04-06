import React from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';
import OptionUser from '../components/OptionUser';

function MainLayout({}) {
    const location = useLocation().pathname;

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
