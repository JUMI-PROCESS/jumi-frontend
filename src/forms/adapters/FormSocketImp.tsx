import { io } from 'socket.io-client';

import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';
import { FormSocket } from '../ports/FormSocket';
import { Socket } from 'dgram';

export class FormSocketImp implements FormSocket {
    URL = io('http://localhost:3000', {transports: ['websocket']}); 

    setConfig(config: Record<string, any>): void {
    }
    onForm(onSignal: Function): Function {
        return () => this.URL.on('signal', onSignal as any);
    }
}
