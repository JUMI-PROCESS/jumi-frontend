import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IFormTemplate } from '../domain/Form';

export class FormTemplateRepositoryApi implements EntityRepository<IFormTemplate> {
    limit: number = 8;

    constructor(private URL = JumiBackApiRest.getInstance()) {}

    setConfig(config: Record<string, any>): void {}

    async save(form: IFormTemplate): Promise<boolean> {
        return await this.URL.api.getConecction().post(`form-template/`, { form: form });
    }

    async update(_id: string, form: IFormTemplate): Promise<IFormTemplate | null> {
        const { data, status } = await this.URL.api.getConecction().patch(`form-template/?_id=${_id}`, { form: form });
        return data;
    }

    async delete(_id: string): Promise<boolean> {
        const { data, status } = await this.URL.api.getConecction().delete(`form-template/?_id=${_id}`);
        return data;
    }

    async complete(_id: string, form: IFormTemplate): Promise<IFormTemplate | null> {
        const { data, status } = await this.URL.api
            .getConecction()
            .patch(`form-template/complete/?_id=${_id}`, { form: form });
        return data;
    }

    async getById(_id: string): Promise<IFormTemplate | null> {
        return this.URL.api.getConecction().get(`form-template/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
        limit: number = this.limit,
    ): Promise<IFormTemplate[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api
            .getConecction()
            .get(
                `form-template/?query=${query}&page=${page}&limit=${limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
            );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api
            .getConecction()
            .get(`form-template/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`);
    }
}
