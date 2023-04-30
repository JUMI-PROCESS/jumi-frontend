import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { INotification } from '../domain/Notification';

export class NotificationRepositoryApi implements EntityRepository<INotification> {
    limit: number = 8;

    private URL = JumiBackApiRest.getInstance();

    setConfig(config: Record<string, any>): void {}

    async save(form: INotification): Promise<boolean> {
        return await this.URL.api.getConecction().post(`notification/`, { form: form });
    }

    async update(_id: string, form: INotification): Promise<INotification | null> {
        const { data, status } = await this.URL.api.getConecction().patch(`notification/?_id=${_id}`, { form: form });
        return data;
    }

    async delete(_id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async complete(_id: string, form: INotification): Promise<INotification | null> {
        throw new Error('Method not implemented.');
    }

    async getById(_id: string): Promise<INotification | null> {
        return this.URL.api.getConecction().get(`notification/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
        limit: number = this.limit
    ): Promise<INotification[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return await this.URL.api
            .getConecction()
            .get(
                `notification/?query=${query}&page=${page}&limit=${limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
            );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return await this.URL.api
            .getConecction()
            .get(`notification/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`);
    }
}
