import axios from 'axios';
import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';

import forms from '/public/form';

export class FormRepositoryFake implements FormRepository {
    forms: Array<Form> = [forms.form];

    saveForm(form: Form): Promise<boolean> {
        this.forms.push(form);
        return Promise.resolve(true);
    }

    updateForm(_id: string, form: Form): Promise<Form | null> {
        console.log(_id, form, this.forms)
        if (_id) {
            this.forms = this.forms.map((item) => (item._id == _id ? form.form : item));
            return Promise.resolve(form);
        } else {
            return Promise.resolve(null);
        }
    }

    getFormsByTenant(tenant: string): Promise<Form[]> {
        return Promise.resolve({data:this.forms});
    }
}
