import { Form } from '../domain/Form';

export interface FormRepository {
    limit: number;

    saveForm(form: Form) : Promise<boolean>;
    updateForm(_id: string, form: Form) : Promise<Form | null>;
    getFormById(_id: string): Promise<Form | null>;
    getFormsByTenant(tenant: string, query: string, page: number, params: string): Promise<Array<Form>>;
}
