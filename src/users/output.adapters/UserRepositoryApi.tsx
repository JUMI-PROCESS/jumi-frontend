import { JumiBackApiRest } from '../../output.adapters/JumiBackApiRest';
import { EntityRepository } from '../../output.ports/EntityRepository';
import { IUser } from '../domain/user';

export class UserRepositoryApi implements EntityRepository<IUser> {
    limit: number = 8;

    private URL = JumiBackApiRest.getInstance();

    setConfig(config: Record<string, any>): void {}

    async save(form: IUser): Promise<boolean> {
        return await this.URL.api.getConecction().post(`user/`, { form: form });
    }

    async update(_id: string, form: IUser): Promise<IUser | null> {
        const { data, status } = await this.URL.api.getConecction().patch(`user/?_id=${_id}`, { form: form });
        return data;
    }

    async delete(_id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async complete(_id: string, form: IUser): Promise<IUser | null> {
        throw new Error('Method not implemented.');
    }

    async getById(_id: string): Promise<IUser | null> {
        return this.URL.api.getConecction().get(`user/${_id}`);
    }

    async getBy(
        query: string,
        page: number,
        params: string,
        paramsExtra: string[] = [],
        type: string = '',
        limit: number = this.limit
    ): Promise<IUser[]> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api
            .getConecction()
            .get(
                `user/?query=${query}&page=${page}&limit=${limit}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`,
            );
    }

    async getCounter(query: string, params: string, paramsExtra: string[] = [], type: string = ''): Promise<number> {
        const paramsExtra_ = paramsExtra.reduce((b, a) => b + `${a},`, '');
        return this.URL.api
            .getConecction()
            .get(`user/count/all?&query=${query}&params=${params}&paramsExtra=${paramsExtra_}&type=${type}`);
    }
}
