/**
 * Created by tbui on 3/14/2016.
 */

describe("Global Search Bar Functionality - Users searching Dealerships -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var password = browser.params.adduser.password;
    var dealershipCode = browser.params.testdealer.code;
    var loginUserArray = [paccarAdminEmail, paccarUserEmail, dealerOwnerAdminEmail, dealerRegionAdminEmail,
        dealerAdminEmail, dealerUserEmail, customerAdminEmail, customerUserEmail];

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    loginUserArray.forEach(function (eachUser) {

        it(eachUser + " may search for dealer via global search bar", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            //search for existing users by DEALER NAME
            navigation.clickThisGlobalSearchResult(dealershipCode, 'Dealer');
            navigation.logOut();
            //needs a clear due to the loop.
            browser.executeScript('window.localStorage.clear();');
        });
    });
});