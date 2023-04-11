export interface EntityRepository<T> {
    limit: number;

    setConfig(config: Record<string, any>): void;
    save(entity: T): Promise<boolean>;
    update(_id: string, entity: T): Promise<T | null>;
    getById(_id: string): Promise<T | null>;
    getBy(query: string, page: number, params: string, paramsExtra?: string[], type?: string): Promise<T[]>;
    getCounter(query: string, params: string, paramsExtra?: string[], type?: string): Promise<number>;
}
