import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: 'prompt',
    includeAssets: ['favicon.ico'],
    manifest: {
        name: 'JUMI App',
        short_name: 'JUMI App',
        description: 'An app for automatizacion process',
        icons: [{ src: '/public/vite.svg', sizes: '192x192' }],
        theme_color: 'beige',
        background_color: 'beige',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
    },
};

// https://vitejs.dev/config/
export default ({ command, mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        server: {
            host: true,
            port: 5173,
        },
        preview: {
            host: true,
            port: 5173,
        },
        plugins: [react(), basicSsl(), VitePWA(manifestForPlugin)],
        build: {
            outDir: 'dist',
        },
    });
};
