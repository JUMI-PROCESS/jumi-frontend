import axios from 'axios';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';

export class FormRepositoryApi implements FormRepository {
    forms: Array<Form> = [];

    saveForm(form: Form): Promise<boolean> {
        this.forms.push(form);
        return Promise.resolve(true);
    }

    updateForm(_id: string, form: Form): Promise<Form | null> {
        if (_id) {
            this.forms.map((item) => (item._id == _id ? form : item));
            return Promise.resolve(form);
        } else {
            return Promise.resolve(null);
        }
    }

    getFormsByTenant(tenant: string): Promise<Form[]> {
        return Promise.resolve(this.forms.filter((item) => item.tenant == tenant));
    }
}
