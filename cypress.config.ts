import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
  e2e: {
    specPattern: ["cypress/e2e/**/*.e2e.ts"],
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
      return config;
    },
  },
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: true,
  env: {
    NEXT_PUBLIC_DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  },
  // experimentalStudio: true,
});
