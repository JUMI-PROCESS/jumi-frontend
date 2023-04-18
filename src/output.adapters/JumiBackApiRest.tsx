import { AxiosApiRest } from './AxiosApiRest';

export class JumiBackApiRest {
    private static instance: JumiBackApiRest;

    private constructor(
        private host = import.meta.env.VITE_SERVER_JUMI,
        private config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            },
        },
        public api = new AxiosApiRest(config, host, '/api/'),
    ) {
        JumiBackApiRest.init(api);
    }

    static init(api: AxiosApiRest) {}

    public static getInstance(): JumiBackApiRest {
        if (!JumiBackApiRest.instance) {
            JumiBackApiRest.instance = new JumiBackApiRest();
        }

        return JumiBackApiRest.instance;
    }
}
