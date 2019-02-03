/**
 * Created by pshrestha on 10/16/2017.
 */

describe("Global Search Bar Functionality - Dealer Owner Groups -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var divisionUser = browser.params.testuseremails.divisionuser;
    var divisionUser1 = browser.params.testuseremails.divisionuser1;
    var doaEmail = browser.params.testuseremails.dealerowneradmin;
    var douEmail = browser.params.testuseremails.dealerowneruser;
    var draEmail = browser.params.testuseremails.dealerregionadmin;
    var druEmail = browser.params.testuseremails.dealerregionuser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var password = browser.params.adduser.password;
    //Image name added to the search string since the searched text also populates on the results.
    var positiveTestDOG = "group_work " + browser.params.testdealerOwnerGroup.name;
    var negativeTestDOG = "group_work " + browser.params.testEditDealerOwnerGroup.name;
    var canSearchUserArray = [paccarAdminEmail, paccarUserEmail, divisionUser, divisionUser1, doaEmail, douEmail, draEmail,
        druEmail, dealerAdminEmail, dealerUserEmail, dealerTechEmail];
    var cannotSearchUserArray1 = [doaEmail, douEmail, draEmail, druEmail, dealerAdminEmail, dealerUserEmail, dealerTechEmail];
    var customerRoleUserArray = [customerAdminEmail, customerUserEmail];

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });
    canSearchUserArray.forEach(function (eachUser) {
        it(eachUser + " may search for a DOG they are a part of via global search bar", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.verifyGlobalSearchResult(positiveTestDOG, true);
            browser.executeScript('window.localStorage.clear();');

        });
    });

    cannotSearchUserArray1.forEach(function (eachUser) {
        it(eachUser + " may NOT search for a DOG they are not a part of via global search bar", function () {

            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.verifyGlobalSearchResult(negativeTestDOG, false);
            browser.executeScript('window.localStorage.clear();');
        });
    });
    customerRoleUserArray.forEach(function (eachUser) {
        it(eachUser + " cannot search for DOG via global search bar", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.verifyGlobalSearchResult(positiveTestDOG, false);
            browser.executeScript('window.localStorage.clear();');
        });
    });
});