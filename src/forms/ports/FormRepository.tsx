import { Form } from '../domain/Form';

export interface FormRepository {
    limit: number;

    setConfig(config: Record<string, any>): void;
    saveForm(form: Form) : Promise<boolean>;
    updateForm(_id: string, form: Form) : Promise<Form | null>;
    getFormById(_id: string): Promise<Form | null>;
    getFormsBy(query: string, page: number, params: string, paramsExtra?: string[], type?: string): Promise<Array<Form>>;
    getFormsCounter(query: string, params: string, paramsExtra?: string[], type?: string): Promise<number>;
}
