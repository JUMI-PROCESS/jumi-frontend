import axios from 'axios';
import { EntityRepository } from '../../ports/EntityRepository';
import { IDeployment } from '../domain/Process';

export class DeploymentRepositoryApi implements EntityRepository<IDeployment> {
    limit: number = 8;

    private URL = axios.create({
        baseURL: 'https://192.168.1.9:3000/api/',
        timeout: 3000,
    });

    setConfig(config: Record<string, any>): void {
        this.URL.defaults.headers.common['Authorization'] = `Bearer ${config['token']}`;
    }

    async save(process: IDeployment): Promise<boolean> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.post(`deployment/`, formData);
    }

    async update(_id: string, process: IDeployment): Promise<IDeployment | null> {
        const blob = new Blob([process['source']], { type: 'application/xml' });
        const file = new File([blob], `${process['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(process).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.patch(`deployment/?_id=${_id}`, formData);
    }

    async getById(_id: string): Promise<IDeployment | null> {
        return await this.URL.get(`${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = ''
    ): Promise<IDeployment[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return await this.URL.get(
            `deployment/?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`
        );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return await this.URL.get(
            `deployment/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`
        );
    }
}
