import { createContext } from 'react';
import { FormRepositoryApi } from '../forms/adapters/FormRepositoryApi';
import { FormRepositoryFake } from '../forms/adapters/FormRepositoryFake';

export const RepositoryContextDefault = new FormRepositoryApi();
export const RepositoryContext = createContext({ form: RepositoryContextDefault });
