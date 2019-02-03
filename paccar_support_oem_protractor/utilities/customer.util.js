/**
 * Created by pshrestha on 8/7/2017.
 */

var customerUtil = function () {

    //date time variables
    var moment = require('moment');

    var navigation = require('../pages/navigation.page.js');
    var customersPage = require('../pages/customers.page.js');
    var dealersPage = require('../pages/dealers.page.js');
    var vehiclesPage = require('../pages/vehicles.page.js');
    var usersPage = require('../pages/users.page.js');
    var transferOwnershipPage = require('../pages/TransferOwnership.page.js');
    var validationUtil = require('../utilities/validation.util');
    var environmentURL = browser.params.environment.url;
    this.toastAlert = element(by.css('[role="alert"]'));

    this.addCustomer = function (customerName, customerType) {
        navigation.clickCustomersLink();
        navigation.addActionButton.click();
        //add new test customer
        customersPage.addNewCustomer(customerType, customerName);
        expect(browser.getCurrentUrl()).toContain(environmentURL + "/#/nav/customer/details/",
            'Could not add customer at ' + moment().format('MMMM D, YYYY h:mm:ss a'));
        navigation.customersLink.click();
        navigation.typeInSearchFilter(customerName);
        customersPage.verifyCustomerList(customerName);
    };

    this.deleteCustomer = function (filterType, customerName, suggestionNumber) {
        navigation.clickCustomersLink();
        navigation.applyChipFilter(filterType, customerName, suggestionNumber);
        customersPage.clickCustomerCheckbox(customerName);
        navigation.deleteActionButton.click();
        navigation.deleteDialogButton.click();
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(customerName);
        customersPage.checkForDeletedCustomer(customerName);
    };

    this.preferredDealerEdit = function (dealerCode, action) {
        navigation.clickDealersLink();
        navigation.typeInSearchFilter(dealerCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealerCode);
        if (action === "prefer") {
            dealersPage.checkPreferredDealerCheckbox();
        }
        else if (action === "removePrefer") {
            dealersPage.uncheckPreferredDealerCheckbox();
        }
        navigation.clickDashboardLink();
    };

    this.unassignVehicleFromCustomer = function (portalType, customerName, customerUid, vin) {
        portalType = portalType.toLowerCase();
        if (portalType === 'supportal') {
            navigation.fleetHealthButton.click();
        }
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName, customerUid);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(vin);
        customersPage.unassignVehicle();

    };

    this.editCustomerHelper = function (customerName) {
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerCheckbox(customerName);
        navigation.editActionButton.click();
    };

    this.cannotEdit = function (customerName) {
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerCheckbox(customerName);
        expect(navigation.editActionButton.isDisplayed())
            .toBe(false, 'Dealer roles can still edit join all customer.');
    };

    /* NOTE:
     Edit button element for DOU and DRU is not in the DOM.
     Hence isPresent needs to be used for those users.
     */
    this.nonAdminCannotEdit = function (customerName) {
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerCheckbox(customerName);
        expect(navigation.editActionButton.isPresent())
            .toBe(false, 'Dealer roles can still edit join all customer.');
    };

    this.verifyCustomerInfo = function (address1, address2, cityStateZip, phone, fax, email) {
        expect(customersPage.addressLine1.getText()).toContain(address1);
        expect(customersPage.addressLine2.getText()).toContain(address2);
        expect(customersPage.addressLine3.getText()).toContain(cityStateZip);
        expect(customersPage.primaryPhoneNumber.getText()).toContain(phone);
        expect(customersPage.primaryFaxNumber.getText()).toContain(fax);
        expect(customersPage.primaryEmail.getText()).toContain(email);
    };

    this.goToCustomerDetails = function (customerName, loggedInUser) {
        navigation.clickCustomersLink();
        if (loggedInUser !== browser.params.testuseremails.customeradmin &&
            loggedInUser !== browser.params.testuseremails.customeruser &&
            loggedInUser !== browser.params.testuseremails.preferredcustomeradmin &&
            loggedInUser !== browser.params.testuseremails.preferredcustomeruser) {
            navigation.typeInSearchFilterRecommendation(customerName);
        }
        customersPage.clickCustomerHyperlinkCellSearch(customerName);
    };

    this.viewAvailableVehicles = function () {
        customersPage.filterByDropdown.click();
        browser.sleep(1000);
        customersPage.selectedVehicle.click();
    };

    this.transferOwnership = function (customerName) {
        expect(vehiclesPage.editVehicleActionBarButton.isDisplayed()).toBe(true, 'Edit button is not present.');
        navigation.moreOptionsButton.click();
        expect(vehiclesPage.transferOwnershipBtn.isDisplayed()).toBe(true, 'The button is not present.');
        vehiclesPage.transferOwnershipBtn.click();
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/vehicle/transfer/', 'Transfer ownership page did not load');
        transferOwnershipPage.selectCustomer(customerName);
        browser.sleep(2000);
        transferOwnershipPage.confirmChangeOwner();
        vehiclesPage.validateCustomerName(customerName);
    };

    this.transferVinToCustomer = function (vehicleVin, customerName, type) {
        navigation.vehiclesLink.click();
        navigation.chipFilterSendKeys(vehicleVin);
        vehiclesPage.actionBarMoreOptionsButton.click();
        navigation.waitTillElementToBeClickable(vehiclesPage.transferOwnershipActionButton);
        vehiclesPage.transferOwnershipActionButton.click();
        if (type)
            transferOwnershipPage.CustomerNameField.sendKeys(customerName);
        else
            transferOwnershipPage.CustomerNameField.sendKeys(customerName.substring(0, customerName.length - 1));
        customersPage.suggestionTransferDropDown.click();
        usersPage.saveBtn.click();
        navigation.waitTillElementToBeClickable(transferOwnershipPage.confirmTransferBtn);
        transferOwnershipPage.confirmTransferBtn.click();
    };


    this.validateLinksOnGlobalSearchResultPage = function (row, breadCrumbs, urlPart) {
        expect(navigation.globalSearchResultList.get(row.value).getText()).toContain(row.name);
        navigation.globalSearchResultList.get(row.value).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + urlPart);
        navigation.validateBreadCrumbs(['Dashboard', breadCrumbs]);

    };

    this.verifySqsData = function (body, type) {
        var tag = "peoplenet:customer:";
        if (type === 'edited') {
            expect(body.companyName).toBe(browser.params.editcustomer.name, 'First Name does not match.');
            expect(body.addressLine1).toBe(browser.params.editcustomer.address1, 'First Name does not match.');
        }
        else {
            expect(body.companyName).toBe(browser.params.testcumminscustomer.name, 'Edited Name is different.');
            expect(body.addressLine1).toBe(browser.params.addcustomer.address1, 'Edited Name is different.');
        }
        expect(body.customerID).toBe(tag + browser.params.testcumminscustomer.uid, 'CustomerID does not match.');
    };

    this.validateCaUpdateSqsData = function (body, cusId, userEmail, userId) {
        expect(body.email).toBe(userEmail, 'Customer Name did not match.');
        expect(body.userId).toBe(userId, 'Key did not match.');
        expect(body.truncatedCustomerID).toBe(cusId, 'TruncatedCustomerID did not match.');
        expect(body.customerID).toBe(tag + cusId, 'CustomerID did not match.');
    };

    this.findCustomerWithoutPreferredJoinAll = () => {
        var customersWithoutIcon;
        for (var i = 1; i < 5; i++) {
            customersWithoutIcon = element(by.xpath('//td/span[not(.//md-icon)]'));
            if (!customersWithoutIcon) {
                navigation.nextPageButton.click();
                continue;
            } else {
                break;
            }
        }
        return customersWithoutIcon.getText()
            .then(text => {
                let trimStr = text.replace(/\s+$/, '');
                return trimStr;
            });
    };
};
module.exports = new customerUtil();