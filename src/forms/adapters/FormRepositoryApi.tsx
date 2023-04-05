import axios from 'axios';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';

export class FormRepositoryApi implements FormRepository {
    limit: number = 8;

    private URL = axios.create({
        baseURL: 'http://localhost:3000/api/',
        timeout: 3000,
    });

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

    async getFormsByTenant(tenant: string, query: string, page: number, params: string): Promise<Form[]> {
        return this.URL.get(`?tenant=${tenant}&query=${query}&page=${page}&limit=${this.limit}&params=${params}`);
    }

    async getFormsCounter(tenant: string, query: string, params: string): Promise<number> {
        console.log(query)
        return this.URL.get(`get/count/?tenant=${tenant}&query=${query}&params=${params}`);
    }
}
