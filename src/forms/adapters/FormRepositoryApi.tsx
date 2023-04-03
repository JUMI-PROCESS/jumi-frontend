import axios from 'axios';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';

export class FormRepositoryApi implements FormRepository {
    private URL = axios.create({
        baseURL: 'http://localhost:3000/api/',
        timeout: 1000,
    });

    saveForm(form: Form): Promise<boolean> {
        return Promise.resolve(false)
    }

    updateForm(_id: string, form: Form): Promise<Form | null> {
        return this.URL.patch(`?_id=${_id}`, form);
    }

    getFormsByTenant(tenant: string): Promise<Form[]> {
        return this.URL.get(`?tenant=${tenant}`);
    }
}
