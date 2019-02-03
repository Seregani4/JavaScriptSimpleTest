/**
 * Created by korniiuk on 11/20/2018.
 */

describe('Validate filters on subscription page -----> ', function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var subscriptionsPage = require('../../../pages/subscriptions.page');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils');
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-2810 Validate vehicle visibility chip filter', () => {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.clickSubscriptionsLink();
        navigation.clearAllFiltersButton.click();
        navigation.chipFilterDropDownButton.click();
        navigation.selectChipFilterByText(chipFilterUtil.vehicleVisibility);
        navigation.chipFilterResults.first().click();
        let searchResult;
        subscriptionsPage.textFromVinRows.getText()
            .then(text => {
                searchResult = text;
            });
        navigation.clickVehiclesLink();
        navigation.chipFilterDropDownButton.click();
        navigation.selectChipFilterByText(chipFilterUtil.vehicleVisibility);
        navigation.chipFilterResults.first().click();
        vehiclesPage.textFromVinRows.getText()
            .then(secondResult => {
                expect(secondResult.toString()).toContain(searchResult.toString(), 'Wrong value')
            });
    });
});

