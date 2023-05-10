import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
    includeAssets: ['favicon.ico'],
    manifest: {
        name: 'JUMI App',
        short_name: 'JUMI App',
        description: 'An app for automatizacion process',
        icons: [
            { src: 'img/72x72.png', sizes: '72x72', type: 'image/png' },
            { src: 'img/96x96.png', sizes: '96x96', type: 'image/png' },
            { src: 'img/120x120.png', sizes: '120x120', type: 'image/png' },
            { src: 'img/128x128.png', sizes: '128x128', type: 'image/png' },
            { src: 'img/144x144.png', sizes: '144x144', type: 'image/png' },
            { src: 'img/152x152.png', sizes: '152x152', type: 'image/png' },
            { src: 'img/180x180.png', sizes: '180x180', type: 'image/png' },
            { src: 'img/192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'img/384x384.png', sizes: '384x384', type: 'image/png' },
            { src: 'img/512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: 'beige',
        background_color: 'beige',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
    },
    devOptions: { enabled: true },
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
