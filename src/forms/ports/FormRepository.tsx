import { Form } from '../domain/Form';

export interface FormRepository {
    saveForm(form: Form) : Promise<boolean>;
    updateForm(_id: string, form: Form) : Promise<Form | null>;
    getFormsByTenant(tenant: string): Promise<Array<Form>>;
}
