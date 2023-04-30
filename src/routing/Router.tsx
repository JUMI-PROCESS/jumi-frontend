import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SocketContext, socketNotificationContextDefault, socketFormContextDefault } from '../contexts/SocketContext';
import {
    DefinitionRepositoryApiContextDefault as definition,
    DeploymentRepositoryContextDefault as deployment,
    FormRepositoryContextDefault as form,
    FormTemplateRepositoryContextDefault as formTemplate,
    InstanceRepositoryApiContextDefault as instance,
    ProcessRepositoryContextDefault as process,
    RepositoryContext,
    UserRepositoryApiContextDefault as userR,
} from '../contexts/RepositoryContext';
import { FormTemplate } from '../forms/domain/Form';
import { Process } from '../process/domain/Process';
import templateForm from '/public/templateForm.json';

const ModelerForm = React.lazy(() => import('../forms/views/Modeler'));
const ModelerProcess = React.lazy(() => import('../process/views/Modeler'));

const FormLayout = React.lazy(() => import('../forms/layouts/FormLayout'));
const DeleteForm = React.lazy(() => import('../forms/views/DeleteForm'));
const Filler = React.lazy(() => import('../forms/views/Filler'));
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const ProcessLayout = React.lazy(() => import('../process/layouts/ProcessLayout'));
const DeleteProcess = React.lazy(() => import('../process/views/DeleteProcess'));
const AllDeployments = React.lazy(() => import('../process/views/AllDeployments'));
const AllInstances = React.lazy(() => import('../process/views/AllInstances'));
const AllProcesses = React.lazy(() => import('../process/views/AllProcesses'));
const AllFormsTemplates = React.lazy(() => import('../forms/views/AllFormsTemplates'));
const AllDefinitions = React.lazy(() => import('../process/views/AllDefinitions'));
const AllForms = React.lazy(() => import('../forms/views/AllForms'));

function Router() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RepositoryContext.Provider
                value={{ form, formTemplate, process, deployment, instance, definition, user: userR }}
            >
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<AllForms />} />
                            <Route path="/formularios" element={<FormLayout />}>
                                {/* <Route path="" element={<AllForms />} /> */}
                                <Route path="eliminar/:_id" element={<DeleteForm />} />
                                <Route path="tareas/:_id" element={<Filler form={null} />} />
                                <Route path="tareas" element={<AllForms />} />
                                <Route path="disponibles" element={<AllFormsTemplates />} />
                                <Route path="todos" element={<AllFormsTemplates />} />
                                <Route
                                    path="modelador"
                                    element={<ModelerForm form={new FormTemplate(templateForm)} />}
                                />
                                <Route path="modelador/:_id" element={<ModelerForm form={null} />} />
                            </Route>
                            <Route path="/procesos" element={<ProcessLayout />}>
                                {/* <Route path="" element={<AllForms />} /> */}
                                <Route path="eliminar/:_id" element={<DeleteProcess />} />
                                <Route path="guardados" element={<AllProcesses />} />
                                <Route path="desplegados" element={<AllDeployments />} />
                                <Route path="definiciones" element={<AllDefinitions />} />
                                <Route path="instanciados" element={<AllInstances />} />
                                <Route path="modelador" element={<ModelerProcess process={new Process({})} />} />
                                <Route path="modelador/:_id" element={<ModelerProcess process={null} />} />
                            </Route>
                        </Route>
                    </Routes>
            </RepositoryContext.Provider>
        </Suspense>
    );
}

export default Router;
