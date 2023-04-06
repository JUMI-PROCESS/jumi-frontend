import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Modeler from '../forms/views/Modeler';
import FormLayout from '../forms/layouts/FormLayout';
import ListForms from '../forms/components/ListForms';
import { Form } from '../forms/domain/Form';

import templateForm from '../../public/templateForm.json'
import AllForms from '../forms/views/AllForms';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<AllForms />} />
                <Route path="/formularios" element={<FormLayout />}>
                    <Route path="" element={<AllForms />} />
                    <Route path="todos" element={<AllForms />} />
                    <Route path="modelador" element={<Modeler form={new Form(templateForm)}/>} />
                    <Route path="modelador/:_id" element={<Modeler form={null}/>} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
