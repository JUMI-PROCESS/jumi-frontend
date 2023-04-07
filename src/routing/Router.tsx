import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Form } from '../forms/domain/Form';

import Filler from '../forms/views/Filler';
import Modeler from '../forms/views/Modeler';
import AllForms from '../forms/views/AllForms';

import MainLayout from '../layouts/MainLayout';
import FormLayout from '../forms/layouts/FormLayout';

import templateForm from '../../public/templateForm.json';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<AllForms />} />
                <Route path="/formularios" element={<FormLayout />}>
                    <Route path="" element={<AllForms />} />
                    <Route path="tareas/:_id" element={<Filler form={null} />} />
                    <Route path="tareas" element={<AllForms />} />
                    <Route path="disponibles" element={<AllForms />} />
                    <Route path="todos" element={<AllForms />} />
                    <Route path="modelador" element={<Modeler form={new Form(templateForm)} />} />
                    <Route path="modelador/:_id" element={<Modeler form={null} />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
