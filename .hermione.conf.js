module.exports = {
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      retry: 2,
/*       chromeOptions: {
        args: ['--window-size=1024,768'] // set size here
     }, */
      windowSize: {
        width: 1920,
        height: 1080,
      },
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
