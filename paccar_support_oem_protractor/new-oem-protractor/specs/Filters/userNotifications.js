/**
 * Created by Popazov on 1/12/2018.
 */

describe("Validate User Notifications Filter Functionality -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    //Chip filter for customer type
    var joinAllChip = browser.params.customertype.joinall;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validates  filters functionality on User notification page.", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        usersPage.notificationsTab.click();
        validationUtil.validateUserNotificationFiltersFunctionality();
    });
});