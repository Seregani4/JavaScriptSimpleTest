describe('First test', function () {

    var mainPage = require("../../../pages/main");
    var fs = require('fs');

    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    // it('Validation', function () {
    //     browser.get('https://github.com/')
    //     // mainPage.singIn.click();
    //     browser.takeScreenshot().then(function(png) {
    //         writeScreenShot(png, 'exception.png');
    //     });
    //     function writeScreenShot(data, filename) {
    //         var stream = fs.createWriteStream(filename);
    //         stream.write(new Buffer(data, 'base64'));
    //         stream.end();
    //     }
    // });

    it('Validation', function () {
        browser.get('http://paccar-portal-staging.connectedfleet.io/#/nav/dashboard')
        mainPage.loginBtn.click();
            browser.takeScreenshot().then(function(png) {
                writeScreenShot(png, 'exception.png');
            });
            function writeScreenShot(data, filename) {
                var stream = fs.createWriteStream(filename);
                stream.write(new Buffer(data, 'base64'));
                stream.end();
            }
    });
});