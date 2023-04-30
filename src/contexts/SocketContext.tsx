import { createContext } from 'react';
import { SocketNotification } from '../output.adapters/SocketNotificacion';

export const socketNotificationContextDefault = new SocketNotification();
export const socketFormContextDefault = new SocketNotification();
export const SocketContext = createContext({ notification: socketNotificationContextDefault, form: socketFormContextDefault });