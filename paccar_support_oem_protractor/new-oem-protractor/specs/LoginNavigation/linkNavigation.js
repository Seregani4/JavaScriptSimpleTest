/**
 * Created by tbui on 2/25/2016.
 */

describe("Basic Navigation the User DropDown -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("All User Profile DropDown links are functional", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        //test user menu links
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();

        navigation.clickUserMenu('paccar');
        navigation.clickChangeLogsLink();

        navigation.clickUserMenu('paccar');
        navigation.clickPrivacyAndTermsLink();

        navigation.clickUserMenu('paccar');
        navigation.clickHelpLink();
    });
});