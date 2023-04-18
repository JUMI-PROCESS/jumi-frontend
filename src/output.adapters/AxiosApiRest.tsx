import axios, { AxiosInstance } from 'axios';
import https from 'https';

import { ApiRest } from '../output.ports/ApiRest';

export class AxiosApiRest implements ApiRest<AxiosInstance> {
    connection: AxiosInstance;
    config: Record<string, any>;
    host: String;
    path: String;

    constructor(config: Record<string, any>, host: String, path: String = '/') {
        this.config = config;
        this.host = host;
        this.path = path;
        this.connection = axios.create({
            baseURL: `${this.host}${this.path}`,
            ...config,
        });
    }

    init(): void {
        this.connection.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }

    getConecction(): AxiosInstance {
        return this.connection;
    }
}
