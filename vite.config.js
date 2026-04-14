import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";
import sendEmail from "./api/send-email.js";

export default defineConfig(({ mode }) => {
  // Make .env variables available to server middleware (process.env.*)
  const env = loadEnv(mode, process.cwd(), "");
  for (const [k, v] of Object.entries(env)) {
    if (typeof process.env[k] === "undefined") process.env[k] = v;
  }

  return {
  plugins: [
    {
      name: "local-api-send-email",
      configureServer(server) {
        server.middlewares.use("/api/send-email", async (req, res) => {
          // Vite strips the mount path; normalize URL for handler
          req.url = "/api/send-email";
          await sendEmail(req, res);
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "products/index.html"),
        rawCotton: resolve(__dirname, "products/raw-cotton/index.html"),
        cottonYarn: resolve(__dirname, "products/cotton-yarn/index.html"),
        cottonWaste: resolve(__dirname, "products/cotton-waste/index.html"),
        agriProducts: resolve(__dirname, "products/agri-products/index.html"),
        about: resolve(__dirname, "about/index.html"),
        services: resolve(__dirname, "services/index.html"),
        contact: resolve(__dirname, "contact/index.html")
      }
    }
  }
  };
});

