import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IForm } from '../domain/Form';

export class FormRepositoryApi implements EntityRepository<IForm> {
    limit: number = 8;

    private URL = JumiBackApiRest.getInstance();

    setConfig(config: Record<string, any>): void {}

    async save(form: IForm): Promise<boolean> {
        return await this.URL.api.getConecction().post(`form/`, { form: form });
    }

    async update(_id: string, form: IForm): Promise<IForm | null> {
        const { data, status } = await this.URL.api.getConecction().patch(`form/?_id=${_id}`, { form: form });
        return data;
    }

    async complete(_id: string, form: IForm): Promise<IForm | null> {
        const { data, status } = await this.URL.api.getConecction().patch(`form/complete/?_id=${_id}`, { form: form });
        return data;
    }

    async getById(_id: string): Promise<IForm | null> {
        return this.URL.api.getConecction().get(`form/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
        limit: number = this.limit
    ): Promise<IForm[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api
            .getConecction()
            .get(
                `form/?query=${query}&page=${page}&limit=${limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
            );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api
            .getConecction()
            .get(`form/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`);
    }
}
