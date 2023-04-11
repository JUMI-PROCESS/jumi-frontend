import { createContext } from 'react';
import { FormRepositoryApi } from '../forms/adapters/FormRepositoryApi';
import { DeploymentRepositoryApi } from '../process/adapters/DeploymentRepositoryApi';
import { ProcessRepositoryApi } from '../process/adapters/ProcessRepositoryApi';

export const FormRepositoryContextDefault = new FormRepositoryApi();
export const ProcessRepositoryContextDefault = new ProcessRepositoryApi();
export const DeploymentRepositoryContextDefault = new DeploymentRepositoryApi();
export const RepositoryContext = createContext({
    form: FormRepositoryContextDefault,
    process: ProcessRepositoryContextDefault,
    deployment: DeploymentRepositoryContextDefault,
});
