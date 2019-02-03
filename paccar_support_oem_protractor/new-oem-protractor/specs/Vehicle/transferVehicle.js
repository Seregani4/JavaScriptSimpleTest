describe("Transfer vehicle to any customer -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var usersPage = require('../../../pages/users.page');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var customersPage = require('../../../pages/customers.page');
    var dealersPage = require('../../../pages/dealers.page');
    var transferOwnershipPage = require('../../../pages/TransferOwnership.page');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page');
    var dashboard2 = require('../../../pages/dashboard2.page');
    var validationUtil = require('../../../utilities/validation.util');
    var customerUtil = require('../../../utilities/customer.util');
    var userUtil = require('../../../utilities/user.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils');
    var preferredCustomer = browser.params.testpreferredcustomer.name;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var testDealer = browser.params.testdealer3.name;
    var joinAllCustomerAdminName = browser.params.testcustomer.name;
    var transferCustomerName = browser.params.addcustomerfortransfer.name;
    var transferCustomerEmail = browser.params.addcustomerfortransfer.email;
    var transferSecondCustomerName = browser.params.addcustomerfortransfer.name2;
    var typeJoinAll = browser.params.customertype.joinall;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var password = browser.params.adduser.password;
    var vinForTransfer = browser.params.vehicle.vinForTransfer;
    var dealersCode = browser.params.testdealer.code;
    var location = 'Worldwide Equipment - Pikeville';
    var testUserForTransfer = 'UserForTransfer@test.com';
    var locationValues;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [dealerAdminEmail, dealerOwnerAdmin];

    it('TC-2087 Create customer for transfer vehicle', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.customersLink.click();
        customersPage.addCustomerButton.click();
        customersPage.addNewCustomerForTransfer(
            typeJoinAll,
            transferCustomerName,
            transferCustomerEmail
        );
        navigation.usersLink.click();
        usersPage.addUserButton.click();
        usersPage.addNewUser2(
            testUserForTransfer,
            'active',
            browser.params.adduser.organizationtype.customer,
            'CustomerForTransfe',
            browser.params.roleslabels.customeradmin
        );
    });

    it('TC-2087 Set as Preferred Dealer', function () {
        loginPage.get();
        loginPage.login('paccar', testUserForTransfer, password);
        navigation.dealersLink.click();
        navigation.applyChipFilter(chipFilterMatrix.dealers, location, 1);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        dealersPage.preferredDealerCheckbox.getAttribute('aria-checked').then(function (attribute) {
            if (attribute === 'false')
                dealersPage.preferredDealerCheckbox.click();
        })
    });

    loginUserArray.forEach(function (eachUser) {
        it('TC-2087 Transfer vehicle to created customer ' + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.vehiclesLink.click();
            navigation.chipFilterSendKeys(vinForTransfer);
            vehiclesPage.actionBarMoreOptionsButton.click();
            navigation.waitTillElementToBeClickable(vehiclesPage.transferOwnershipActionButton);
            vehiclesPage.transferOwnershipActionButton.click();
            transferOwnershipPage.CustomerNameField.sendKeys(transferCustomerName.substring(0, transferCustomerName.length - 1));
            customersPage.suggestionTransferDropDown.getText().then(function (text) {
                validationUtil.validateTextContainArray(text, [
                    browser.params.addcustomer.address1,
                    browser.params.addcustomer.address2,
                    browser.params.addcustomer.city,
                    browser.params.addcustomer.state,
                    browser.params.addcustomer.zip
                ])
            });
            customersPage.suggestionTransferDropDown.click();
            usersPage.saveBtn.click();
            navigation.waitTillElementToBeClickable(transferOwnershipPage.confirmTransferBtn);
            transferOwnershipPage.confirmTransferBtn.click();
            navigation.customersLink.click();
            vehiclesPage.chipFilterSendKeys(transferCustomerEmail);
            expect(customersPage.preferredIcon.isDisplayed()).toBe(true, 'Customer without preferred icon');
            navigation.vehiclesLink.click();
            navigation.chipFilterSendKeys(vinForTransfer);
            vehiclesPage.verifyVIN(vinForTransfer);
        });

        it('TC-2087 Validate customer and vehicle according to logged ' + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', peoplenetAdminEmail, password);
            navigation.usersLink.click();
            vehiclesPage.chipFilterSendKeys(eachUser);
            usersPage.clickUserEmailHyperLinkCellSearch(eachUser);
            usersPage.organizationNameField.getText().then(function (text) {
                var organizationName = text;
                if (eachUser === dealerOwnerAdmin) {
                    navigation.dealerOwnerGroupsLink.click();
                    navigation.chipFilterSendKeys(organizationName);
                    dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(organizationName);
                    navigation.allTabs.get(1).click();
                    dealerOwnerGroupPage.locationCard.getText().then(function (text) {
                        locationValues = text;
                    });
                }
                navigation.customersLink.click();
                navigation.chipFilterSendKeys(transferCustomerEmail);
                customersPage.clickCustomerCheckbox(transferCustomerName);
                navigation.editActionButton.click();
                usersPage.managePreferredDealers.getText().then(function (text) {
                    if (eachUser === dealerOwnerAdmin) {
                        validationUtil.validateTextContainArray(text, locationValues);
                    }
                    else {
                        validationUtil.validateTextContainArray(text, organizationName);
                    }
                });
            });
        });
    });

    it('TC-2087 Transfer to second customer and delete created customer', function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        customerUtil.transferVinToCustomer(vinForTransfer, transferSecondCustomerName);
        customerUtil.deleteCustomer('Customers', transferCustomerName, 1);
        userUtil.deleteUser(testUserForTransfer);
    });

    it('TC-2189 Edit & Transfer Ownership of Vehicles only in the Dealer Network', function () {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.customersLink.click();
        navigation.applyChipFilter(chipFilterMatrix.customers, joinAllCustomerAdminName, 1);
        navigation.vehiclesLink.click();
        vehiclesPage.actionBarMoreOptionsButton.click();
        vehiclesPage.textFromActionDropDown.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                vehiclesPage.addToVehicleGroup,
                vehiclesPage.ownershipHistory
            ]);
            validationUtil.validateTextNotContainArray(text, [
                vehiclesPage.editVehicleEvent,
                vehiclesPage.transferOwnership
            ]);
        });
        vehiclesPage.ownershipHistoryMoreOptionsButton.click();
        navigation.customersLink.click();
        navigation.clearAllFiltersButton.click();
        navigation.applyChipFilter(chipFilterMatrix.customers, preferredCustomer, 1);
        navigation.vehiclesLink.click();
        vehiclesPage.actionBarMoreOptionsButton.click();
        vehiclesPage.textFromActionDropDown.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                vehiclesPage.addToVehicleGroup,
                vehiclesPage.ownershipHistory,
                vehiclesPage.editVehicleEvent,
                vehiclesPage.transferOwnership
            ]);
        });
    });

    it('TC-91 Set Preferred Dealer by star', () => {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        dashboard2.offAllRecommendationLink();
        expect(dashboard2.eyeIcon.isDisplayed()).toBe(false, 'I saw pointers');
        dashboard2.dealersButton.click();
        navigation.applyChipFilter(chipFilterMatrix.dealers, testDealer, 1, 1);
        dashboard2.allPointers.first().click();
        navigation.waitTillElementToBeVisible(dashboard2.popUp);
        dashboard2.preferredStar.getAttribute('aria-hidden')
            .then(attribute => {
                if (attribute === 'false')
                    dashboard2.preferredStar.click();
            });
        dashboard2.nameFromPopUp.click();
        dealersPage.preferredDealerCheckbox.getAttribute('aria-checked')
            .then(attribute => {
                expect(attribute).toBe('true', `Checkbox didn't choose`);
            });
        dealersPage.preferredDealerCheckbox.getAttribute('aria-checked')
            .then(attribute => {
                if (attribute === 'true')
                    dealersPage.preferredDealerCheckbox.click();
            });
    });
});