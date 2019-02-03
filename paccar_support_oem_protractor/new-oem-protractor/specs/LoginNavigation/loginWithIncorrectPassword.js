/**
 * Created by jelliott on 1/4/2017.
 */

describe('Verify Error toast message for invalid login attempts -----> ', function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var errorUtil = require('../../../utilities/toastMessage.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUser = browser.params.testuseremails.dealerregionadmin;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var password = browser.params.adduser.password;
    var message = errorUtil.incorrectPasswordMessage();

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [paccarAdminEmail, paccarUserEmail, customerAdminEmail, customerUserEmail, dealerAdminEmail,
        dealerUserEmail, dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerTechEmail,
        factoryWorkerEmail, divisionUserEmail];

    loginUserArray.filter(function (eachUser) {
        it('Login with An Incorrect Password and Validate Alert Appears', function () {
            loginPage.get();
            loginPage.user.sendKeys(eachUser);
            loginPage.password.sendKeys(password + password);
            loginPage.submitBtn.click();
            errorUtil.verifyToastAlert(message);

            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/login');
        });
    });
});