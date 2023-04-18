import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';

import { FormSocket } from '../ports/FormSocket';

export class FormSocketImp implements FormSocket {
    URL = io(import.meta.env.VITE_SERVER_JUMI, { transports: ['websocket'] });

    setConfig(config: Record<string, any>): void {}
    onForm(onSignal: Function): Socket<DefaultEventsMap, DefaultEventsMap> {
        return this.URL.on('signal', onSignal as any);
    }
}
