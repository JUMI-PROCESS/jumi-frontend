import axios from 'axios';
import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';

import { EntityRepository } from '../../output.ports/EntityRepository';
import { IDefinition, Definition } from '../domain/Process';

export class DefinitionRepositoryApi implements EntityRepository<IDefinition> {
    limit: number = 8;

    private URL = JumiBackApiRest.getInstance();

    setConfig(config: Record<string, any>): void {}

    async save(process: Definition): Promise<boolean> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().post(`definition/`, formData);
    }

    async update(_id: string, process: Definition): Promise<Definition | null> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().patch(`definition/?_id=${_id}`, formData);
    }

    async getById(_id: string): Promise<Definition | null> {
        return await this.URL.api.getConecction().get(`definition/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
    ): Promise<Definition[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api.getConecction().get(
            `definition/?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api.getConecction().get(
            `definition/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }

    complete(_id: string, entity: Definition): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
