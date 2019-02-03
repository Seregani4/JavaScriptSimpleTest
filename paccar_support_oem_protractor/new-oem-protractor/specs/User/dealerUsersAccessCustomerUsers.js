/**
 * Created by pshrestha on 6/2/2017.
 */

describe("Validate Dealer Users can access Customer User Accounts -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUserEmail = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUserEmail = browser.params.testuseremails.dealerregionuser;
    var password = browser.params.adduser.password;
    var customerAdmin = browser.params.testuseremails.preferredcustomeradmin;
    var customerUser = browser.params.testuseremails.preferredcustomeruser;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [dealerAdminEmail, dealerUserEmail, dealerTechEmail, dealerOwnerAdminEmail, dealerOwnerUserEmail, dealerRegionAdminEmail, dealerRegionUserEmail];
    //var loginUserArray = [dealerAdminEmail];

    loginUserArray.forEach((eachUser) => {
        it(eachUser + " verifies accessing customer users profiles.", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUsersLink();
            navigation.typeInSearchFilterRecommendation(customerAdmin);
            usersPage.clickUserEmail();
            usersPage.verifySelectedUserRole('Customer Administrator');
        });
    });

    loginUserArray.forEach((eachUser) => {
        it(eachUser + " verifies accessing customer users profiles.", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUsersLink();
            navigation.typeInSearchFilterRecommendation(customerUser);
            usersPage.clickUserEmail();
            usersPage.verifySelectedUserRole('Customer User');
        });
    });
});