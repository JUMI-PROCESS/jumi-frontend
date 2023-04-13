import axios from 'axios';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { Form, IForm } from '../domain/Form';

export class FormRepositoryApi implements EntityRepository<IForm> {
    limit: number = 8;

    private URL = axios.create({
        baseURL: 'https://192.168.1.9:3000/api/form/',
        timeout: 3000
    });

    setConfig(config: Record<string, any>): void {
        this.URL.defaults.headers.common['Authorization'] = `Bearer ${config['token']}`;
    }

    async save(form: IForm): Promise<boolean> {
        return await this.URL.post(``, { form: form });
    }

    async update(_id: string, form: IForm): Promise<IForm | null> {
        const { data, status } = await this.URL.patch(`?_id=${_id}`, {form: form});
        return data;
    }

    async complete(_id: string, form: IForm): Promise<IForm | null> {
        const { data, status } = await this.URL.patch(`complete/?_id=${_id}`, {form: form});
        return data;
    }

    async getById(_id: string): Promise<IForm | null> {
        return this.URL.get(`${_id}`);
    }

    async getBy(query: string, page: number, params: string, paramsExtra: string[] = [], type: string = ''): Promise<IForm[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.get(`?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`);
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.get(`count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`);
    }
}