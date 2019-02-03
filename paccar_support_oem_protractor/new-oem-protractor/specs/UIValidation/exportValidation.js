/**
 * Created by pshrestha on 3/5/2017.
 * Edited by Surya on 2/22/2018.
 */

describe("Validate the export buttons work -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var remoteDiagPage = require('../../../pages/remoteDiagnostics.page');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var tsr1Email = browser.params.testuseremails.tsr1;
    var tsr2Email = browser.params.testuseremails.tsr2;
    var dealerEntity = 'dealers';
    var customerEntity = 'customers';
    var userEntity = 'users';
    var vehicleEntity = 'vehicles';
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail, paccarUserEmail, customerAdminEmail,
        customerUserEmail, dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin, tsr1Email, tsr2Email];

    loginUserArray.forEach(function (eachUser) {
        it("Check to see the error toast does not appear as " + eachUser + " when exporting entities.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.dataExport(dealerEntity);
            navigation.dataExport(customerEntity);
            navigation.dataExport(userEntity);
            navigation.dataExport(vehicleEntity);
        });
    });

    var loginUserArrayRemote = [peoplenetAdminEmail, paccarAdminEmail];

    loginUserArrayRemote.filter(function (bothUser) {
        it("Check to see the error toast does not appear as " + bothUser + " when exporting from Remote Diagnostics.", function () {
            loginPage.get();
            loginPage.login('paccar', bothUser, password);
            navigation.clickRemoteDiagLink();
            remoteDiagPage.exportButton.click();
            expect(remoteDiagPage.checkForToastAlert()).toBe(true);
        });
    });
});
