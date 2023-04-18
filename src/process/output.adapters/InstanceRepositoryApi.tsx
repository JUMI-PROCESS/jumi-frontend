import axios from 'axios';
import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';

import { EntityRepository } from '../../output.ports/EntityRepository';
import { IInstance, Instance } from '../domain/Process';

export class InstanceRepositoryApi implements EntityRepository<IInstance> {
    limit: number = 8;

    private URL = JumiBackApiRest.getInstance();

    setConfig(config: Record<string, any>): void {}

    async save(process: IInstance): Promise<boolean> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().post(`instances/`, formData);
    }

    async update(_id: string, process: IInstance): Promise<IInstance | null> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().patch(`instances/?_id=${_id}`, formData);
    }

    async getById(_id: string): Promise<IInstance | null> {
        return this.URL.api.getConecction().get(`instances/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
    ): Promise<IInstance[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api.getConecction().get(
            `instance/?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api.getConecction().get(
            `instance/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }

    complete(_id: string, entity: IInstance): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
