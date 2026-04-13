import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
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
});

