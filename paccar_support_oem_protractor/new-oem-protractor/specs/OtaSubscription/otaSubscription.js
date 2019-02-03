//Created by jstaffon on 6/25/18//

describe('Changes OTA subscription to Active and validates, then back to Inactive and validates', function(){

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var toastMessage = require ('../../../utilities/toastMessage.util.js');
    var otaSubscriptionPage = require('../../../pages/otaSupscription.page.js');
    var vehiclePage = require('../../../pages/vehicles.page.js');
    var remoteDiagPage = require('../../../pages/remoteDiagnostics.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.otavin1;
    var disabledVin = browser.params.vehicle.disabledVin;
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

    it("TC-2627 Verifies that Active OTA VIN does display on OTA Subscription page table", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehiclePage.clickVehicleHyperlinkCellSearch(vin);
        vehiclePage.clickEditVehicleBtn(vin);
        vehiclePage.otaSubscriptionField.click();
        navigation.waitTillElementToBeClickable(vehiclePage.activeOtaSubscriptionButton);
        vehiclePage.activeOtaSubscriptionButton.click();
        vehiclePage.saveButton.click();
        toastMessage.verifyToastAlert(vin + ' has been updated.');
        navigation.otaSubscriptionLink.click();
        navigation.typeInSearchFilter(vin);
        expect(otaSubscriptionPage.otaTable.getAttribute('outerText')).toContain(vin);
    });

    it("TC-2627 Verifies that Inactive OTA VIN does not display on OTA Subscription page table", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehiclePage.clickVehicleHyperlinkCellSearch(vin);
        vehiclePage.clickEditVehicleBtn(vin);
        vehiclePage.otaSubscriptionField.click();
        navigation.waitTillElementToBeClickable(vehiclePage.inactiveOtaSubscriptionButton);
        vehiclePage.inactiveOtaSubscriptionButton.click();
        vehiclePage.saveButton.click();
        toastMessage.verifyToastAlert(vin + ' has been updated.');
        navigation.otaSubscriptionLink.click();
        navigation.typeInSearchFilter(vin);
        expect (otaSubscriptionPage.otaTable.getAttribute('outerText')).not.toContain(vin);

    });

    it('TC-5184 Verifies that inactive remote diagnostic VINs OTA Subscription field is greyed out', function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickRemoteDiagLink();
        navigation.typeInSearchFilter(disabledVin);
        remoteDiagPage.clickVinHyperlinkCellSearch(disabledVin);
        vehiclePage.clickEditVehicleBtn(disabledVin);
        expect(vehiclePage.otaSubscriptionField.getAttribute('disabled')).toBe('true');
    });

});