import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: { host: "127.0.0.1", port: 3000 },
  plugins: [
    tsconfigPaths(),
    tanstackStart({ server: { entry: "server" } }),
    react(),
    tailwindcss(),
    nitro({ preset: "node-server" }),
  ],
});
