import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Гра Шпигун",
                short_name: "Шпигун",
                start_url: "./index.html",
                display: "standalone",
                background_color: "#000000",
                theme_color: "#333333",
                icons: [
                    {
                        src: "icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        })
    ],
    base: '/SpyGame/',
});
