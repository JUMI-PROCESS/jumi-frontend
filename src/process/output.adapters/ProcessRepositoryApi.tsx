import axios from 'axios';
import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';

import { EntityRepository } from '../../output.ports/EntityRepository';
import { IProcess, Process } from '../domain/Process';

export class ProcessRepositoryApi implements EntityRepository<IProcess> {
    limit: number = 8;

    private URL = JumiBackApiRest.getInstance();

    setConfig(config: Record<string, any>): void {}

    async save(process: Process): Promise<boolean> {
        const blob = new Blob([process['binary']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().post(`process/`, formData);
    }

    async update(_id: string, process: Process): Promise<Process | null> {
        const blob = new Blob([process['binary']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().patch(`process/?_id=${_id}`, formData);
    }

    async getById(_id: string): Promise<Process | null> {
        return this.URL.api.getConecction().get(`process/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
    ): Promise<Process[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api.getConecction().get(
            `process/?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api.getConecction().get(
            `process/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }

    complete(_id: string, entity: IProcess): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
