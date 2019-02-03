/**
 * Created by Cottomoeller on 3/4/2016.
 */

describe("Validate adding a Customer Admin ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtil = require('../../../utilities/user.util.js');
    var moment = require('moment');
    var dateTime = moment().format('MMMM D, YYYY h:mm:ss a');
    var customerAdminRole = browser.params.roleslabels.customeradmin;
    var environmentURL = browser.params.environment.url;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var tsr1 = browser.params.testuseremails.tsr1;
    var tsr2 = browser.params.testuseremails.tsr2;
    var testUserEmail = browser.params.adduser.email;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        // Get a fresh Angular "session" so we can avoid bootstrapping errors


    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [peoplenetAdminEmail, tsr1, tsr2];
    loginUserArray.filter(function (eachUser) {
        it("As a" + eachUser + ", I complete the add user form for a verified test user Customer Admin", function () {
            loginPage.login('supportal', eachUser, password);
            navigation.fleetHealthButton.click();
            navigation.clickUsersLink();
            usersPage.clickAddUserButton();
            usersPage.addNewUser(testUserEmail, customerAdminRole, 'active', eachUser);
            expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/user/details/', 'Could not add the user on ' + dateTime);
        });

        it('Delete the test user and verify that they are no longer in the User List', function () {
            loginPage.login('supportal', peoplenetAdminEmail, password);
            userUtil.deleteUser(testUserEmail);
        });
    });

});