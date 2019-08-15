//jshint strict: false
exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine',
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    browserName: 'chrome'
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
