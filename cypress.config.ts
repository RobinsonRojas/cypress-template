import { defineConfig } from 'cypress';
import fs from 'fs';

export default defineConfig({
  e2e: {
    projectId: '',
    viewportWidth: 1366,
    viewportHeight: 600,
    requestTimeout: 10000,
    responseTimeout: 60000,
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 8000,
    retries: {
      openMode: 0,
      runMode: 2
    },
    video: true,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results-[hash].xml'
    },
    videosFolder: 'cypress/reports/videos',
    downloadsFolder: 'cypress/reports/downloads',
    screenshotsFolder: 'cypress/reports/screenshots',
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalRunAllSpecs: true,
    allowCypressEnv: false,
    scrollBehavior: 'center',

    setupNodeEvents(on, config) {
      config.baseUrl = config.env.BASE_URL;

      // implement node event listeners here

      // Launch Chrome with a clean profile (no cookies, cache or sessions)
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--guest');
          launchOptions.args.push('--disable-extensions');
          launchOptions.args.push('--disable-sync');
        }
        return launchOptions;
      });

      // Video management: delete videos for passing tests to save space
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

      return config;
    }
  }
});
