import { Form } from '../domain/Form';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from "socket.io-client/build/esm";

export interface FormSocket {
    URL: Socket<any, any>;
    setConfig(config: Record<string, any>): void;
    onForm(onSignal: Function): Socket<DefaultEventsMap, DefaultEventsMap>;
}