/**
 * Created by pshrestha on 3/23/2017.
 */

describe("Validate editing a Users own information -----> ", () => {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var usersPage = require('../../../pages/users.page');
    var vehiclePage = require('../../../pages/vehicles.page');
    var faultDetailPage = require('../../../pages/fault.details.page');
    var vehicleDetailPage = require('../../../pages/vehicledetail.page');
    var toastMessageUtil = require('../../../utilities/toastMessage.util');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils');
    var tableUtil = require('../../../utilities/tables.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var password = browser.params.adduser.password;
    var realVin = browser.params.vehicle.realdatavin;
    var changePhoneNum = '(999) 999-9999';
    var restorePhoneNum = '(123) 456-7890';

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });
    var loginUserArray = [paccarAdminEmail, customerAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin];

    loginUserArray.forEach(eachUser => {
        it('Edit ' + eachUser + ' information and verify the change.', () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUserMenu('paccar');
            navigation.clickUserProfileLink();
            usersPage.changPhoneNumber('9999999999');
            usersPage.saveBtn.click();
            navigation.goToDifferentPageAndComeBack();
            usersPage.validatePhone(changePhoneNum);
        });

        it('Restore ' + eachUser + 'information and verify the change.', () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUserMenu('paccar');
            navigation.clickUserProfileLink();
            usersPage.changPhoneNumber('1234567890');
            usersPage.saveBtn.click();
            navigation.goToDifferentPageAndComeBack();
            usersPage.validatePhone(restorePhoneNum);
        });
    });

    it('TC-459 Validation toast message "Always collapse navigation bar', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.checkBoxes.get(0).click();
        usersPage.saveBtn.click();
        toastMessageUtil.verifyToastAlert('Your profile has been updated.');
        usersPage.userDetailEditButton.click();
        usersPage.checkBoxes.get(0).click();
        usersPage.saveBtn.click();
        toastMessageUtil.verifyToastAlert('Your profile has been updated.');
    });

    it('TC-460-1 Validate user distance values: Set preferred distance to KM ', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.openDropDowns.get(2).click();
        navigation.waitTillElementToBeClickable(usersPage.takeValueFromDropDowns.first());
        usersPage.kilometersValue.click();
        usersPage.saveBtn.click();
        toastMessageUtil.verifyToastAlert('Your profile has been updated');
    });

    it('TC-460-2 Validate user distance values: Check distance shown in correct values', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(realVin);
        tableUtil.clickTableCell(0, vehiclePage.columns.tableVinColumn);
        navigation.clearAllFiltersButton.click();
        tableUtil.verifyColumn('km', vehicleDetailPage.columns.tableMileageColumn, vehicleDetailPage.allTableRows);
        vehicleDetailPage.faultLogInfoButtons.first().click();
        expect(faultDetailPage.mileageValue.getText()).toContain('km', "Millage displayed not in KiloMeters");
        faultDetailPage.authorizedDealerTab.click();
        expect(faultDetailPage.authorizedDealerApproximateDistance.getText())
            .toContain('Kilometers', 'Authorized Dealers Approximate distance not displayed in KiloMeters')
    });

    it('TC-460-3 Validate user distance values: Set preferred distance back  to Miles ', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.openDropDowns.get(2).click();
        navigation.waitTillElementToBeClickable(usersPage.takeValueFromDropDowns.last());
        usersPage.takeValueFromDropDowns.last().click();
        usersPage.saveBtn.click();
        toastMessageUtil.verifyToastAlert('Your profile has been updated');
    });
});
