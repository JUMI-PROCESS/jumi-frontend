import { createContext } from 'react';
import { FormRepositoryApi } from '../forms/adapters/FormRepositoryApi';
import { FormRepositoryFake } from '../forms/adapters/FormRepositoryFake';
import { FormSocketImp } from '../forms/adapters/FormSocketImp';

export const SocketContextDefault = new FormSocketImp();
export const SocketContext = createContext({ form: SocketContextDefault });