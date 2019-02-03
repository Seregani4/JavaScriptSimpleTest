/**
 * Created by pshrestha on 10/16/2017.
 */

describe("Global Search Bar Functionality - Dealer Regions -----> ", function () {

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
    var positiveTestRegion = "language " + browser.params.testdealerRegion.name;
    var negativeTestRegion = "language " + browser.params.testdealerRegion.name2;
    // var canSearchUserArray = [paccarAdminEmail, paccarUserEmail, divisionUser, divisionUser1, doaEmail, douEmail, draEmail,
    //     druEmail, dealerAdminEmail, dealerUserEmail, dealerTechEmail];
    // var cannotSearchUserArray1 = [doaEmail, douEmail, draEmail, druEmail, dealerAdminEmail, dealerUserEmail, dealerTechEmail];
    var customerRoleUserArray = [customerAdminEmail, customerUserEmail];
    var canSearchUserArray = [paccarAdminEmail];
    var cannotSearchUserArray1 = [doaEmail];

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    it("Users may search for a Dealer Region they are a part of via global search bar", function () {
        canSearchUserArray.forEach(function (eachUser) {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.verifyGlobalSearchResult(positiveTestRegion, true);
            browser.executeScript('window.localStorage.clear();');
        });
    });

    it("Users may NOT search for a Dealer Region they are not a part of via global search bar", function () {
        cannotSearchUserArray1.forEach(function (eachUser) {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.verifyGlobalSearchResult(negativeTestRegion, false);
            browser.executeScript('window.localStorage.clear();');
        });
    });

    it("Customer Role Users cannot search for Dealer Region via global search bar", function () {
        customerRoleUserArray.forEach(function (eachUser) {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.verifyGlobalSearchResult(positiveTestRegion, false);
            browser.executeScript('window.localStorage.clear();');
        });
    });
});