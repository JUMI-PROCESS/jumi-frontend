import { createContext } from 'react';

import { FormRepositoryApi } from '../forms/output.adapaters/FormRepositoryApi';
import { FormTemplateRepositoryApi } from '../forms/output.adapaters/FormTemplateRepositoryApi';
import { DefinitionRepositoryApi } from '../process/output.adapters/DefinitionRepositoryApi';
import { DeploymentRepositoryApi } from '../process/output.adapters/DeploymentRepositoryApi';
import { InstanceRepositoryApi } from '../process/output.adapters/InstanceRepositoryApi';
import { ProcessRepositoryApi } from '../process/output.adapters/ProcessRepositoryApi';
import { UserRepositoryApi } from '../users/output.adapters/UserRepositoryApi';

export const FormRepositoryContextDefault = new FormRepositoryApi();
export const FormTemplateRepositoryContextDefault = new FormTemplateRepositoryApi();
export const ProcessRepositoryContextDefault = new ProcessRepositoryApi();
export const DeploymentRepositoryContextDefault = new DeploymentRepositoryApi();
export const InstanceRepositoryApiContextDefault = new InstanceRepositoryApi();
export const DefinitionRepositoryApiContextDefault = new DefinitionRepositoryApi();
export const UserRepositoryApiContextDefault = new UserRepositoryApi();

export const RepositoryContext = createContext({
    form: FormRepositoryContextDefault,
    formTemplate: FormTemplateRepositoryContextDefault,
    process: ProcessRepositoryContextDefault,
    deployment: DeploymentRepositoryContextDefault,
    instance: InstanceRepositoryApiContextDefault,
    definition: DefinitionRepositoryApiContextDefault,
    user: UserRepositoryApiContextDefault,
});
