import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: '/SpyGame/',  // Заміни your-repo на ім'я свого репозиторію

});

