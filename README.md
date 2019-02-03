# OEM-Automation
Automated Tests for all Portals

Portal E2E functional tests using Protractor &amp; CucumberJS

## Background:
This project serves as the automated functional test framework for Paccar OEM Web Portal application. I am leveraging 3 NodeJS modules that serve as
the foundation for this BDD test framework:

1. **Protractor** - (http://angular.github.io/protractor/#/) Angular wrapper around Selenium WebDriver. This allows for the automated BDD tests to be executed exactly an end user would: via
the web interface. This tool opens up a web browser, performs url navigation, button clicks, keystrokes, etc.
2. **CucumberJS** - (https://github.com/cucumber/cucumber/wiki) BDD test framework providing the interface by which we are able to write plain and clear, business-facing test cases and execute
our automated Protractor tests using those same files.
3. **Chai** - (http://chaijs.com/) Protractor provides native support for the Jasmine test framework. Because we are choosing to use Cucumber as our framework, we needed
an assertion library that Cucumber can "talk" to. Chai (chai-as-promised, in our case) provides us with that. Following suit with the BDD-theme of this
project, chai provides an extremely simple, expressive, human-readable interface to write the "glue code" for our tests with.

## Dependencies:
* NodeJS (https://nodejs.org/download/)

## Set Up Project Locally:
1. `npm install`
  * This will install all npm dependencies for the project (protractor, cucumber, chai, chai-as-promised, hide-stack-frames-from, moment, and superagent)
  * **NOTE** - You may have to install these npm modules globally
2. `webdriver-manager start`
  * This will start up the selenium server on our remote QA Workstation machine
  * If you want to run these tests locally, comment out the first line of the config file, and uncomment this: `//seleniumAddress: 'http://localhost:4444/wd/hub',`
3. `protractor conf.cuke.js`
  * This will run the full suite of browser tests. To modify build parameters, such as the browser, call that particular json key and its new value (prepended with '--') that you
    want to modify from the config file. Example: `protractor conf.cuke.js --capabilities.browserName="firefox"`

## Run Tests on Jenkins server (Includes HTML report of results on completion):
(http://10.10.64.26:8080/job/Portal_Protractor_Tests_Parameterized/)

1. Select **Build with Parameters** - This will allow you to choose which portal feature tests you wish to run, in addition to the depth of tests run (full regression vs. smoke tests), as well
as the browser (Chrome, IE, or FF).
2. Wait for build to complete > Click **Cucumber Reports**
3. From the Cucumber Reports html page, you may view a statistical pass/fail overview of the tests as a whole, and you are also given the option to click on each Feature Scenario for the specific
console logs of what failed.
  * **NOTE**- ElementNotVisibleError, ElementNotFound, and ElementNotClickable errors are likely indicative of certain HTML elements' attributes/identifiers being modified (I do my best to keep
  up with these front end changes)

