import { Form } from '../domain/Form';
import { FormRepository } from '../ports/FormRepository';
import { getRandomId } from '../utilities/Utilities';

import forms_ from '/public/form';

export class FormRepositoryFake implements FormRepository {
    forms: Array<Form> = forms_;
    limit: number = 10;

    saveForm(form: Form): Promise<boolean> {
        form._id = getRandomId();
        this.forms.push(form);
        return Promise.resolve(true);
    }

    updateForm(_id: string, form: Form): Promise<Form | null> {
        form.form.fields = form.form.fields.map((item) => (item._id ? item : { ...item, _id: getRandomId() }));
        if (_id) {
            this.forms = this.forms.map((item) => (item._id == _id ? form.form : item));
            return Promise.resolve(form);
        } else {
            return Promise.resolve(null);
        }
    }

    getFormById(_id: string): Promise<Form | null> {
        const form = this.forms.find((item) => item._id == _id);
        return Promise.resolve({
            data: form ? form : null,
        });
    }

    getFormsByTenant(tenant: string, query: string, page: number, params: string): Promise<Form[]> {
        const params_ = params.split(',');
        return Promise.resolve({
            data: this.forms.filter(
                (item) =>
                    item.tenant == tenant &&
                    params_.reduce((b, a) => b || item[a].toLowerCase().startsWith(query.toLowerCase()), false)
            ),
        });
    }
}
