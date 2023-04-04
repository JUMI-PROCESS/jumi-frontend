import React from 'react';

import { Link, Outlet } from 'react-router-dom';

function MainLayout({}) {
    return (
        <div className='h-100'>
            <nav className="nav-main backg-p1 bb-s1">
                <ul className="d-flex">
                    <Link to={'/inicio'}>
                        <div className="d-flex logo">
                            <img src="/img/unicauca.png" alt="logo-unicauca" height={40} />
                            <div className="d-grid" style={{ margin: '0 10px', textAlign: 'center' }}>
                                <div className='h7'>Departamento de Química</div>
                                <div className='sh7'>Universidad del Cauca</div>
                            </div>
                        </div>
                    </Link>
                    <div className="nav-menu">
                        <Link className='h7' to={'/procesos'}>PROCESOS</Link>
                        <Link className='h7' to={'/formularios'}>FORMULARIOS</Link>
                    </div>
                    <div className="nav-user">&#9817;</div>
                </ul>
            </nav>
            <div className="backg-p1 h-100">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
