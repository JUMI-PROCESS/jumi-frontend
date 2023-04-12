import { createContext } from 'react';
import { FormRepositoryApi } from '../forms/adapters/FormRepositoryApi';
import { DeploymentRepositoryApi } from '../process/output.adapters/DeploymentRepositoryApi';
import { ProcessRepositoryApi } from '../process/output.adapters/ProcessRepositoryApi';
import { InstanceRepositoryApi } from '../process/output.adapters/InstanceRepositoryApi';
import { DefinitionRepositoryApi } from '../process/output.adapters/DefinitionRepositoryApi';

export const FormRepositoryContextDefault = new FormRepositoryApi();
export const ProcessRepositoryContextDefault = new ProcessRepositoryApi();
export const DeploymentRepositoryContextDefault = new DeploymentRepositoryApi();
export const InstanceRepositoryApiContextDefault = new InstanceRepositoryApi();
export const DefinitionRepositoryApiContextDefault = new DefinitionRepositoryApi();
export const RepositoryContext = createContext({
    form: FormRepositoryContextDefault,
    process: ProcessRepositoryContextDefault,
    deployment: DeploymentRepositoryContextDefault,
    instance: InstanceRepositoryApiContextDefault,
    definition: DefinitionRepositoryApiContextDefault,
});
