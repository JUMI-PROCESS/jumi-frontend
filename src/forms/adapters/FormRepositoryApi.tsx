import axios from 'axios';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';

export class FormRepositoryApi implements FormRepository {
    limit: number = 8;

    private URL = axios.create({
        baseURL: 'http://192.168.1.9:3000/api/form/',
        timeout: 3000
    });

    setConfig(config: Record<string, any>): void {
        this.URL.defaults.headers.common['Authorization'] = `Bearer ${config['token']}`;
    }

    async saveForm(form: Form): Promise<boolean> {
        return await this.URL.post(``, { form: form });
    }

    async updateForm(_id: string, form: Form): Promise<Form | null> {
        const { data, status } = await this.URL.patch(`?_id=${_id}`, form);
        return data;
    }

    async getFormById(_id: string): Promise<Form | null> {
        return this.URL.get(`${_id}`);
    }

    async getFormsBy(query: string, page: number, params: string, paramsExtra: string[] = []): Promise<Form[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.get(`?query=${query}&page=${page}&limit=${this.limit}&params=${params}&paramsExtra=${paramsExtra_}`);
    }

    async getFormsCounter(query: string, params: string, paramsExtra: string[] = []): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.get(`count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}`);
    }
}