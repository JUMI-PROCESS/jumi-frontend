import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';

import { ISocket } from '../output.ports/ISocket';

export class SocketNotification implements ISocket {
    URL = io(import.meta.env.VITE_SERVER_JUMI, { transports: ['websocket'] });

    setConfig(config: Record<string, any>): void {}
    onMessage(onSignal: Function, type: string = 'signal'): Socket<DefaultEventsMap, DefaultEventsMap> {
        return this.URL.on(type, onSignal as any);
    }
}
