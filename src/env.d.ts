interface ImportMetaEnv {
    VITE_SERVER_JUMI: string;
    VITE_APP_JUMI: string;
    VITE_REDIRECT_JUMI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
