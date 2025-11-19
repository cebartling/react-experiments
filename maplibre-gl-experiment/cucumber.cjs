module.exports = {
   default: {
      import: ['e2e/support/server.ts', 'e2e/support/hooks.ts', 'e2e/steps/**/*.steps.ts'],
      loader: ['ts-node/esm'],
      format: ['progress', 'html:e2e-report.html'],
      formatOptions: { snippetInterface: 'async-await' },
      publishQuiet: true,
      paths: ['e2e/features/**/*.feature'],
   },
};
