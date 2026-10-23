
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'https://demoqa.com',

    async setupNodeEvents(on, config) {
      const cucumber = await import(
        '@badeball/cypress-cucumber-preprocessor'
      );

      const esbuild = await import(
        '@bahmutov/cypress-esbuild-preprocessor'
      );

      const cucumberEsbuild = await import(
        '@badeball/cypress-cucumber-preprocessor/esbuild'
      );

      await cucumber.addCucumberPreprocessorPlugin(
        on,
        config
      );

      on(
        'file:preprocessor',
        esbuild.default({
          plugins: [
            cucumberEsbuild.createEsbuildPlugin(config),
          ],
        })
      );

      return config;
    },
  },
});
