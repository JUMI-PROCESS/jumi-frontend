import axios, { AxiosResponse } from 'axios';

import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IDeployment } from '../domain/Process';

export class DeploymentRepositoryApi
    implements EntityRepository<IDeployment, AxiosResponse<IDeployment | IDeployment[] | Number>>
{
    limit: number = 8;

    private URL = JumiBackApiRest.getInstance();

    setConfig(config: Record<string, any>): void {}

    async save(deployment: IDeployment): Promise<AxiosResponse<IDeployment>> {
        const blob = new Blob([deployment['binary']], { type: 'application/xml' });
        const file = new File([blob], `${deployment['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(deployment).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().post(`deployment/`, formData);
    }

    async update(_id: string, deployment: IDeployment): Promise<AxiosResponse<IDeployment>> {
        const blob = new Blob([deployment['binary']], { type: 'application/xml' });
        const file = new File([blob], `${deployment['name']}.bpmn`, { type: 'application/xml' });
        var formData = new FormData();
        Object.entries(deployment).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.set('source', file);
        return await this.URL.api.getConecction().patch(`deployment/?_id=${_id}`, formData);
    }

    async delete(_id: string): Promise<AxiosResponse<Number | IDeployment | IDeployment[], any>> {
        const { data, status } = await this.URL.api.getConecction().delete(`deployment/?_id=${_id}`);
        return data;
    }

    async getById(_id: string): Promise<AxiosResponse<IDeployment>> {
        return await this.URL.api.getConecction().get(`deployment/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
    ): Promise<AxiosResponse<IDeployment[]>> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return await this.URL.api
            .getConecction()
            .get(
                `deployment/?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
            );
    }

    async getCounter(
        query: string,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
    ): Promise<AxiosResponse<Number>> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return await this.URL.api
            .getConecction()
            .get(`deployment/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`);
    }

    complete(_id: string, entity: IDeployment): Promise<AxiosResponse<Number | IDeployment | IDeployment[], any>> {
        throw new Error('Method not implemented.');
    }
}
