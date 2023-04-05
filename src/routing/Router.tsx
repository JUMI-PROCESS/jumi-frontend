import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Modeler from '../forms/views/Modeler';
import FormLayout from '../forms/layouts/FormLayout';
import ListForms from '../forms/components/ListForms';
import { Form } from '../forms/domain/Form';

import templateForm from '../../public/templateForm.json'

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<ListForms />} />
                <Route path="/formularios" element={<FormLayout />}>
                    <Route path="" element={<ListForms />} />
                    <Route path="todos" element={<ListForms />} />
                    <Route path="modelador" element={<Modeler form={new Form(templateForm)}/>} />
                    <Route path="modelador/:_id" element={<Modeler form={null}/>} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
