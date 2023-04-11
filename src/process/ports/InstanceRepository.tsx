export interface InstanceRepository<T> {
    limit: number;

    setConfig(config: Record<string, any>): void;
    save(process: T) : Promise<boolean>;
    update(_id: string, process: T) : Promise<T | null>;
    getById(_id: string): Promise<T | null>;
    getBy(query: string, page: number, params: string, paramsExtra?: string[], type?: string) : Promise<T[]>
    getCounter(query: string, params: string, paramsExtra?: string[], type?: string): Promise<number>
}
