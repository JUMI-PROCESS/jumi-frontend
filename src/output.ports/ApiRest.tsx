export interface ApiRest<T> {
    readonly connection: T;
    readonly config: Record<string, any>;
    readonly host: String;
    readonly path: String;
    init(): void;
    getConecction(): T;
}
