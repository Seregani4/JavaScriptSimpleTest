/**
 * Created by pshrestha on 3/23/2017.
 */

describe("Validate the pages on the Users Account Drop down -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var helpPage = require('../../../pages/help.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();')
    });

    var loginUserArray = [paccarAdminEmail, divisionUserEmail, customerAdminEmail, customerUserEmail, dealerAdminEmail];

    loginUserArray.filter(function (eachUser) {
        it(eachUser + " checks to see Help Page.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUserMenu('paccar');
            navigation.clickHelpLink();
            helpPage.checkHelpPageInfo(eachUser);
        });

        it(eachUser + " checks to see Privacy and Terms Page.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUserMenu('paccar');
            navigation.clickPrivacyAndTermsLink();
            helpPage.checkPrivacyContent();
            helpPage.chackTermsContent();
        });
    });
});
