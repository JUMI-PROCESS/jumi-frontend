import { Form } from '../domain/Form';
import { Manager, ManagerOptions } from "socket.io-client/build/esm";
import { Socket, SocketOptions } from "socket.io-client/build/esm";

export interface FormSocket {
    URL: Socket<any, any>;
    setConfig(config: Record<string, any>): void;
    onForm(onSignal: Function): Function;
}