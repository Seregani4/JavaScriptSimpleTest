describe("Validation drop down search/filter on Dealers/Service Centers page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var paccarAdmin = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var firstDealer = browser.params.testdealer.name;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it('Dealers/Service Centers - Drop Down Search/Filter TC-1655', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdmin, password);
        navigation.dealersLink.click();
        validationUtil.validateDropDownSearchAndFilters(navigation.chipFilterDealerButton, firstDealer, 0, dealersPage.columns.nameColumn, true);
    });
});