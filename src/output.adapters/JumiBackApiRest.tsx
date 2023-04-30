import { AxiosApiRest } from './AxiosApiRest';

export class JumiBackApiRest {
    private static instance: JumiBackApiRest;

    private constructor(
        private host = import.meta.env.VITE_SERVER_JUMI,
        public api = new AxiosApiRest({}, host, '/api/'),
    ) {
        JumiBackApiRest.init(api);
    }

    static init(api: AxiosApiRest) {}

    public static getInstance(): JumiBackApiRest {
        if (!JumiBackApiRest.instance) {
            JumiBackApiRest.instance = new JumiBackApiRest();
        }
        JumiBackApiRest.instance.api.connection.defaults.headers.common.Authorization =
            'Bearer ' + localStorage.getItem('access_token');
        JumiBackApiRest.instance.api.connection.defaults.params = { tenant: localStorage.getItem('tenant') };
        JumiBackApiRest.instance.api.connection.defaults.timeout = 10000;
        return JumiBackApiRest.instance;
    }
}
