const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 15000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3210",
    headless: true,
  },
  webServer: {
    command: "WEBSOCKET_PORT=3210 PROJECTS_BASE_HOST=localhost npx vite --port 3210",
    port: 3210,
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
