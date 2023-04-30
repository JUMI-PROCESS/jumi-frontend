import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from "socket.io-client/build/esm";

export interface ISocket {
    URL: Socket<any, any>;
    setConfig(config: Record<string, any>): void;
    onMessage(onSignal: Function, type?: string): Socket<DefaultEventsMap, DefaultEventsMap>;
}