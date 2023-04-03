import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Modeler from '../forms/views/Modeler';
import FormLayout from '../forms/layouts/FormLayout';
import ListForms from '../forms/components/ListForms';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Modeler />} />
                <Route path="/formularios" element={<FormLayout />}>
                    <Route path="todos" element={<ListForms />} />
                    <Route path="modelador" element={<Modeler />} />
                </Route>
                <Route path="/procesos" element={<FormLayout />}>
                    <Route path="modelador" element={<Modeler />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
