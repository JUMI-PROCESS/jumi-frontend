import { createContext } from 'react';
import { FormSocketImp } from '../forms/output.adapaters/FormSocketImp';

export const SocketContextDefault = new FormSocketImp();
export const SocketContext = createContext({ form: SocketContextDefault });