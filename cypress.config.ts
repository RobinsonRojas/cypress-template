import { defineConfig } from 'cypress';
import fs from 'fs';

export default defineConfig({
  allowCypressEnv: false,
  retries: 2,
  projectId: '',
  video: true,
  videosFolder: 'cypress/reports/videos',
  screenshotsFolder: 'cypress/reports/screenshots',
  downloadsFolder: 'cypress/reports/downloads',
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/junit/test-results-[hash].xml'
  },
  e2e: {
    requestTimeout: 10000,
    responseTimeout: 60000,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 8000,
    baseUrl: 'https://example.cypress.io',
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalRunAllSpecs: true,

    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD
    },

    setupNodeEvents(on, config) {
      //env SO||cypress.env.json
      const secretKey = process.env.SECRET_KEY || config.env.SECRET_KEY;
      // implement node event listeners here
      on('after:spec', (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed')
          );
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
    }
  }
});
