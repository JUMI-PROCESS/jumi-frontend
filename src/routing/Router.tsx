import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Form } from '../forms/domain/Form';

import Filler from '../forms/views/Filler';
import * as ModelerForm from '../forms/views/Modeler';
import AllForms from '../forms/views/AllForms';

import MainLayout from '../layouts/MainLayout';
import FormLayout from '../forms/layouts/FormLayout';

import templateForm from '../../public/templateForm.json';
import ProcessLayout from '../process/layouts/ProcessLayout';

import * as ModelerProcess from '../process/views/Modeler';
import AllProcesses from '../process/views/AllProcesses';
import { Process } from '../process/domain/Process';
import AllDeployments from '../process/views/AllDeployments';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<AllForms />} />
                <Route path="/formularios" element={<FormLayout />}>
                    {/* <Route path="" element={<AllForms />} /> */}
                    <Route path="tareas/:_id" element={<Filler form={null} />} />
                    <Route path="tareas" element={<AllForms />} />
                    <Route path="disponibles" element={<AllForms />} />
                    <Route path="todos" element={<AllForms />} />
                    <Route path="modelador" element={<ModelerForm.default form={new Form(templateForm)} />} />
                    <Route path="modelador/:_id" element={<ModelerForm.default form={null} />} />
                </Route>
                <Route path="/procesos" element={<ProcessLayout />}>
                    {/* <Route path="" element={<AllForms />} /> */}
                    {/* <Route path="tareas/:_id" element={<Filler form={null} />} /> */}
                    <Route path="guardados" element={<AllProcesses />} />
                    <Route path="desplegados" element={<AllDeployments />} />
                    <Route path="definiciones" element={<AllProcesses />} />
                    <Route path="instanciados" element={<AllProcesses />} />
                    <Route path="modelador" element={<ModelerProcess.default process={new Process({})} />} />
                    <Route path="modelador/:_id" element={<ModelerProcess.default process={null} />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
