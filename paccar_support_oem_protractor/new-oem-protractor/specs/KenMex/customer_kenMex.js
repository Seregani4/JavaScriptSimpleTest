/**
 * Created by Popazov on 11/27/2017.
 */

describe("Verify Spanish translations on the Customer  pages -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var vehicles = require('../../../pages/vehicles.page');
    var customersPage = require('../../../pages/customers.page');
    var kenMexUtil = require('../../../utilities/kenMex.util');
    var translation = require('../../../json/kenmex');
    var testCustomerName = "";
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var spanishOemAdmin = browser.params.testuseremails.kenmexpaccaradmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', spanishOemAdmin, password);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    beforeAll((done) => {
        return customersPage.addNewCustomerEndpoint(paccarAdminEmail, "testCustomer")
            .then((name) => {
                console.log(name)
                return testCustomerName = name
            }).then(() => {
                done()
            })
    });

    afterAll((done) => {
        customersPage.deleteCustomerEndpoint(paccarAdminEmail, testCustomerName)
            .then(() => {
                done()
            })
    });

    it("Validate translations on the Customer List Page", function () {
        navigation.customersLink.click();
        kenMexUtil.validateCustomerListPage(translation);
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.verifyCustomerInList(testCustomerName);
    });

    it("Validate translations on the Customer detail Page", () => {
        navigation.customersLink.click();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.clickCustomerHyperlinkCellSearch(testCustomerName);
        kenMexUtil.validateCustomerDetailsPage(translation);
    });

    it("Validate translations on the Customer edit Page", () => {
        navigation.customersLink.click();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.clickCustomerHyperlinkCellSearch(testCustomerName);
        customersPage.infoTabEditBtn.click();
        kenMexUtil.validateEditCustomerPage(translation);
    });

});
