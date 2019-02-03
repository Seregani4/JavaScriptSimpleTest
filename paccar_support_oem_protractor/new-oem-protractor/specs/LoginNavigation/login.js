/**
 * Created by Cottomoeller on 6/6/2016.
 */

describe('Verify Login and Logout is functional -----> ', function () {

    var moment = require('moment');
    var dateTime = moment().format('MMMM D, YYYY h:mm:ss a');
    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var environmentURL = browser.params.environment.url;
    var peopleNetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [peopleNetAdminEmail, paccarAdminEmail, paccarUserEmail, dealerAdminEmail, dealerUserEmail,
        divisionUserEmail, factoryWorkerEmail, customerAdminEmail, customerUserEmail, dealerTechEmail, dealerOwnerAdmin,
        dealerOwnerUser, dealerRegionAdmin, dealerRegionUser];

    it('Login and Logout as every user role in the Portal', function () {
        loginUserArray.filter(function (eachUser) {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.logOut();
            browser.executeScript('window.localStorage.clear();');
        });
    });

    //Log in a 100 times as random users and check for errors
    it('Random users log in and verify ONE CLICK LOGIN.', function () {
        loginPage.get();
        var randomUserName;
        for (var i = 0; i <= 100; i++) {
            loginPage.user.sendKeys(randomUserName = loginUserArray[Math.floor(Math.random() * loginUserArray.length)]);
            loginPage.password.sendKeys(password);
            loginPage.submitBtn.click();
            expect(browser.getCurrentUrl()).toBe(environmentURL + '/#/nav/dashboard', "Could not log in with " +
                randomUserName + ' at ' + dateTime);
            navigation.logOut();
            browser.executeScript('window.localStorage.clear();');
        }
    });
});
