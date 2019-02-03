describe("Vehicle group validation -----> ", function () {

    var navigation = require('../../../pages/navigation.page');
    var loginPage = require('../../../pages/login.page');
    var customersPage = require('../../../pages/customers.page');
    var usersPage = require('../../../pages/users.page');
    var vehicleGroupPage = require('../../../pages/vehiclegroup.page');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vehicleGroup = browser.params.vehiclegroup.name1;
    var testCustomer = browser.params.testcustomer.name;
    var mustBeUnique = 'Group name is already in use. Vehicle Group names must be unique.';
    var duplicateErrorMessage = 'Group name is already in use. Vehicle Group names must be unique.';
    var vehicleGroupRemoved = 'Vehicle Group removed successfully.';
    var maxLengthMessage = 'Field length limit is exceeded';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-2642-1 Validate vehicle group on the user page', () => {
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.vehicleGroupTab.click();
        vehicleGroupPage.createVehicleGroup(vehicleGroup, vehicleGroup);
        navigation.waitTillElementToBeClickable(vehicleGroupPage.addActionBtn);
        vehicleGroupPage.addActionBtn.click();
        vehicleGroupPage.vehicleGroupName.sendKeys(vehicleGroup);
        vehicleGroupPage.vehicleGroupDesc.click();
        vehicleGroupPage.errorMessage.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, mustBeUnique);
            });
        vehicleGroupPage.saveButton.click();
        expect(vehicleGroupPage.popUpForm.isPresent()).toBe(true, 'Pop up was close');
        vehicleGroupPage.cancelButton.click();
    });

    it('TC-2642-2 Delete test vehicle group on the user page', () => {
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.vehicleGroupTab.click();
        vehicleGroupPage.deleteVehicleGroup(vehicleGroup, vehicleGroupRemoved);
    });

    it('TC-2642-3 Validate vehicle group on the customer page', () => {
        navigation.customersLink.click();
        navigation.typeInSearchFilterRecommendation(testCustomer);
        customersPage.clickCustomerHyperlinkCellSearch(testCustomer);
        customersPage.vehicleGroupsTab.click();
        customersPage.addVehicleGroup(vehicleGroup);
        customersPage.addVehicleGroup(vehicleGroup);
        customersPage.duplicateErrorMessage.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, duplicateErrorMessage)
            });
    });

    it('TC-2642-4 Delete test vehicle group on the customer page', () => {
        navigation.customersLink.click();
        navigation.typeInSearchFilterRecommendation(testCustomer);
        customersPage.clickCustomerHyperlinkCellSearch(testCustomer);
        customersPage.vehicleGroupsTab.click();
        customersPage.deleteVehicleGroup(vehicleGroup);
        browser.sleep(1000);
    });

    it(`TC-2736 Validation max length error message on the current user's vehicle tab`, () => {
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.vehicleGroupTab.click();
        vehicleGroupPage.addActionBtn.click();
        vehicleGroupPage.vehicleGroupName.sendKeys(validationUtil.generateString(256, 'd'));
        vehicleGroupPage.vehicleGroupDesc.sendKeys('');
        vehicleGroupPage.saveButton.click();
        expect(vehicleGroupPage.maxLengthMessage.getText()).toBe(maxLengthMessage, 'Wrong error message');
    });

    it(`TC-2736 Validation max length error message on the other customer's vehicle tab`, () => {
        navigation.customersLink.click();
        navigation.applyChipFilter(chipFilterUtil.customers, testCustomer, 1);
        customersPage.clickCustomerHyperlinkCellSearch(testCustomer);
        usersPage.vehicleGroupTab.click();
        customersPage.addGroupBtn.click();
        customersPage.addGroupSendKeys(validationUtil.generateString(256, 'd'));
        usersPage.vehicleGroupTab.click();
        expect(vehicleGroupPage.maxLengthMessage.getText()).toBe(maxLengthMessage, 'Wrong error message');
    });

});