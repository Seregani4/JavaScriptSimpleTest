/**
 * Created by pshrestha on 7/6/2017.
 */

describe("Validate the User lock out functionality -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var errorUtil = require('../../../utilities/toastMessage.util.js');
    var environmentURL = browser.params.environment.url;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var lockOutUserEmail = browser.params.testuseremails.lockOutUser;
    var password = browser.params.adduser.password;
    var message = errorUtil.incorrectPasswordMessage();

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

    var incorrectPasswordArray =
        ['Password$117', 'LetMeIn', 'thisIsMyPasswordForReal', 'iNeedToWorkMan!123', 'whatIsIt?', 'Password007#Maybe'];
    var randomIncorrectPassword = incorrectPasswordArray[Math.floor(Math.random() * incorrectPasswordArray.length)];

    //PVP-2518 -> User account locked after 50 invalid login attempts.
    it(lockOutUserEmail + ' enters incorrect password 50 times to lock the account. PVP-4837', () => {
        loginPage.get();
        //Enter incorrect password >50 times
        //TODO update if possible to use endpoint to lock user
        for (var i = 0; i <= 50; i++) {
            loginPage.user.sendKeys(lockOutUserEmail);
            loginPage.password.sendKeys(incorrectPasswordArray[Math.floor(Math.random() * incorrectPasswordArray.length)]);
            loginPage.submitBtn.click();
            errorUtil.verifyToastAlert(message);
            loginPage.user.clear();
            loginPage.password.clear();
        }
        browser.sleep(2000);
        //Verify the locked account toast message
        loginPage.user.sendKeys(lockOutUserEmail);
        loginPage.password.sendKeys(randomIncorrectPassword);
        loginPage.submitBtn.click();
        loginPage.verifyAccountLockedToastAlert();
    });

    it('Paccar admin logs in and unlocks ' + lockOutUserEmail + '\'s account. PVP-4837', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        navigation.typeInSearchFilterRecommendation(lockOutUserEmail);
        usersPage.clickUserCheckbox(lockOutUserEmail);
        navigation.editActionButton.click();
        usersPage.securityTab.click();
        expect(usersPage.unlockButton.isDisplayed()).toBe(true, 'Button is not present.');
        usersPage.unlockButton.click();
        expect(usersPage.unlockButton.isPresent()).toBe(false, 'Button is still present.');
        navigation.clickUsersLink();
        navigation.typeInSearchFilterRecommendation(lockOutUserEmail);
        usersPage.verifyActiveStatus(lockOutUserEmail, 'Active');
    });

    it(lockOutUserEmail + ' verifies the log in after account reactivation. PVP-4837', () => {
        loginPage.get();
        loginPage.login('paccar', lockOutUserEmail, password);
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/dashboard', lockOutUserEmail + ' could not log in.');
    });
});
