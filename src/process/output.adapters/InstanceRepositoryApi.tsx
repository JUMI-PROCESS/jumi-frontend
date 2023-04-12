import axios from 'axios';

import { EntityRepository } from '../../output.ports/EntityRepository';
import { IProcess, Process } from '../domain/Process';

export class InstanceRepositoryApi implements EntityRepository<IProcess> {
    limit: number = 8;

    private URL = axios.create({
        baseURL: 'https://192.168.1.9:3000/api/',
        timeout: 3000,
    });

    setConfig(config: Record<string, any>): void {
        this.URL.defaults.headers.common['Authorization'] = `Bearer ${config['token']}`;
    }

    async save(process: Process): Promise<boolean> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.post(`instances/`, formData);
    }

    async update(_id: string, process: Process): Promise<Process | null> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.patch(`instances/?_id=${_id}`, formData);
    }

    async getById(_id: string): Promise<Process | null> {
        return this.URL.get(`instances/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
    ): Promise<Process[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.get(
            `instance/?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.get(
            `instance/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
        );
    }
}
