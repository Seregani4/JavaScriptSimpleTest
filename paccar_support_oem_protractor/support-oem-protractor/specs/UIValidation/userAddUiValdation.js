/**
 * Created by Popazov on 10/20/2017.
 */
describe("User Add Page UI Validation----- : ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var userPage = require('../../../pages/users.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var preferredUnits = ['English','Miles','Gallons','Degrees Fahrenheit','Pounds Per Square Inch','Pounds'];
    browser.driver.manage().window().maximize();


    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.fleetHealthButton.click();
        navigation.clickUsersLink();
        userPage.verifyUserListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    it("Validate the All fields and buttons on User Add page", function () {
        userPage.addUserButton.click();
        userPage.validatePreferredUnits(preferredUnits);
        userPage.validateAddUserUi();
    });


});
