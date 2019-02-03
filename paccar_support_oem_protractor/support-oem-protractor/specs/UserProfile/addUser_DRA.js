/**
 * Created by Popazov on 7/12/2017.
 */



describe("Validate adding a  Dealer Region Admin ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtil = require('../../../utilities/user.util.js');
    var moment = require('moment');
    var dateTime = moment().format('MMMM D, YYYY h:mm:ss a');
    var environmentURL = browser.params.environment.url;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var testUserEmail = browser.params.adduser.email;
    var password = browser.params.adduser.password;
    var dealerRegionAdminRole = browser.params.roleslabels.dealerregionadmin;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.driver.get("about:blank")
        browser.sleep(1000);
        loginPage.get();
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [peoplenetAdminEmail];
    loginUserArray.filter(function (eachUser) {
        it("As a" + eachUser + ", I complete the add user form for a verified test user  Dealer Region Admin", function () {
            loginPage.login('supportal', eachUser, password);
            navigation.fleetHealthButton.click();
            navigation.clickUsersLink();
            usersPage.clickAddUserButton();
            usersPage.addNewUser(testUserEmail, dealerRegionAdminRole, 'active', eachUser);
            expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/user/details/', 'Could not add the user on ' + dateTime);
        });

        it('Delete the test user and verify that they are no longer in the User List', function () {
            loginPage.login('supportal', peoplenetAdminEmail, password);
            userUtil.deleteUser(testUserEmail);
        });
    });

});