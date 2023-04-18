import React from 'react';
import { Route, Routes } from 'react-router-dom';

import templateForm from '../../public/templateForm.json';
import { Form, FormTemplate } from '../forms/domain/Form';
import FormLayout from '../forms/layouts/FormLayout';
import AllForms from '../forms/views/AllForms';
import AllFormsTemplates from '../forms/views/AllFormsTemplates';
import Filler from '../forms/views/Filler';
import * as ModelerForm from '../forms/views/Modeler';
import MainLayout from '../layouts/MainLayout';
import { Process } from '../process/domain/Process';
import ProcessLayout from '../process/layouts/ProcessLayout';
import AllDefinitions from '../process/views/AllDefinitions';
import AllDeployments from '../process/views/AllDeployments';
import AllInstances from '../process/views/AllInstances';
import AllProcesses from '../process/views/AllProcesses';
import * as ModelerProcess from '../process/views/Modeler';

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<AllForms />} />
                <Route path="/formularios" element={<FormLayout />}>
                    {/* <Route path="" element={<AllForms />} /> */}
                    <Route path="tareas/:_id" element={<Filler form={null} />} />
                    <Route path="tareas" element={<AllForms />} />
                    <Route path="disponibles" element={<AllFormsTemplates />} />
                    <Route path="todos" element={<AllFormsTemplates />} />
                    <Route path="modelador" element={<ModelerForm.default form={new FormTemplate(templateForm)} />} />
                    <Route path="modelador/:_id" element={<ModelerForm.default form={null} />} />
                </Route>
                <Route path="/procesos" element={<ProcessLayout />}>
                    {/* <Route path="" element={<AllForms />} /> */}
                    <Route path="guardados" element={<AllProcesses />} />
                    <Route path="desplegados" element={<AllDeployments />} />
                    <Route path="definiciones" element={<AllDefinitions />} />
                    <Route path="instanciados" element={<AllInstances />} />
                    <Route path="modelador" element={<ModelerProcess.default process={new Process({})} />} />
                    <Route path="modelador/:_id" element={<ModelerProcess.default process={null} />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default Router;
