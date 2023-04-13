export interface EntityRepository<T=any,R=any> {
    limit: number;

    setConfig(config: Record<string, any>): void;
    save(entity: T): Promise<R>;
    update(_id: string, entity: T): Promise<R>;
    complete(_id: string, entity: T): Promise<R>;
    getById(_id: string): Promise<R>;
    getBy(query: string, page: number, params: string, paramsExtra?: string[], type?: string): Promise<R>;
    getCounter(query: string, params: string, paramsExtra?: string[], type?: string): Promise<R>;
}
