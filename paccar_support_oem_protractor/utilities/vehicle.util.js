/**
 * Created by Popazov on 8/9/2017.
 */



var vehicleUtil = function () {

    var request = require('superagent');
    const _ = require('lodash');
    const moment = require('moment')
    var navigation = require('../pages/navigation.page.js');
    var vehiclesPage = require('../pages/vehicles.page.js');
    var remoteDiagnosticPage = require('../pages/remoteDiagnostics.page.js');
    var toastMessageUtil = require('../utilities/toastMessage.util.js');
    var vehiclesDetailPage = require('../pages/vehicledetail.page.js');
    var customersPage = require('../pages/customers.page.js');
    var usersPage = require('../pages/users.page.js');
    var dashboard2 = require('../pages/dashboard2.page.js');

    var joinAllCustomer = 'Join All';
    var preferredCustomer = 'Preferred';
    var regularCustomer = 'Regular';

    var inRepairStatus = 'In Repair';
    var noActionStatus = 'No Action';
    var informationalStatus = 'Informational';
    var serviceNowStatus = 'Service Now';
    var serviceSoonStatus = 'Service Soon';
    var stopNowStatus = 'Stop Now';
    var comingSoonStatus = 'Coming Soon';
    var faultStatusArray = [informationalStatus, stopNowStatus, serviceNowStatus, serviceSoonStatus, stopNowStatus];

    var evgStatus = "Enhanced Vehicle Guidance";

    this.getJoinAllCustomer = function () {
        return joinAllCustomer;

    };

    this.getPreferredCustomer = function () {
        return preferredCustomer;

    };

    this.getRegularCustomer = function () {
        return regularCustomer;

    };

    this.getNoActionStatus = function () {
        return noActionStatus;

    };

    this.getInformationalStatus = function () {
        return informationalStatus;

    };

    this.getServiceNowStatus = function () {
        return serviceNowStatus;

    };

    this.getServiceSoonStatus = function () {
        return serviceSoonStatus;

    };

    this.getStopNowStatus = function () {
        return stopNowStatus;

    };

    this.getInRepairStatus = function () {
        return inRepairStatus;

    };

    this.getInComingSoonStatus = function () {
        return comingSoonStatus;

    };

    this.cleanupVehicleStatus = function (status) {
        console.log(status);
        if (status === inRepairStatus) {
            navigation.moreOptionsButton.click();
            vehiclesPage.removeInRepairBtn.click();
            navigation.submitDialogButton.click();
            browser.sleep(5000);
        }
        //if the passed in status is in the array
        if (faultStatusArray.indexOf(status) >= 0) {
            navigation.moreOptionsButton.click();
            vehiclesPage.clearActiveFaultsBtn.click();
            navigation.submitDialogButton.click();
            browser.sleep(5000);
        }
        browser.refresh();
        browser.sleep(2000);
    };

    this.verifyVehicleStatus = function (vin, status) {
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle(status);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage(status);
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage(status);
    };

    this.verifyEvgFaultLog = (vin, status, triggerTime) => {
        vehiclesDetailPage.checkFaultLogsIsNotEmpty()
        vehiclesDetailPage.verifyRowColumn( status, 0, vehiclesDetailPage.columns.tableRecommendationColumn.value)
        vehiclesDetailPage.verifyRowColumn( evgStatus, 0, vehiclesDetailPage.columns.tableStatusColumn.value)
        vehiclesDetailPage.verifyRowColumn( '', 0, vehiclesDetailPage.columns.tableCodeColumn.value)
        vehiclesDetailPage.verifyRowColumn( '', 0, vehiclesDetailPage.columns.tableSPNColumn.value)
        vehiclesDetailPage.verifyRowColumn( '', 0, vehiclesDetailPage.columns.tableFMIColumn.value)
        vehiclesDetailPage.verifyRowColumn( triggerTime, 0, vehiclesDetailPage.columns.tableLocalTimeColumn.value)
    };

    this.verifyEvgUpdateVehicleStatus = (vin, status, triggerTime) => {
        this.sendEVG('paccar', vin, status, triggerTime.utc().format(), true, false)
        this.verifyVehicleStatus(vin, status)
        //adding utcOffset because the trigger time is displayed in Local Time
        this.verifyEvgFaultLog(vin, status, triggerTime.add(moment().utcOffset(), 'minutes').format('MM/DD/YYYY h:mm A'))
    }


    this.verifyExpiredEvgNotUpdateVehicleStatus = (vin, status, lastEvgTriggerTime) => {
        let evgExpiredTime = moment().add(-31, 'days')
        this.sendEVG('paccar', vin, stopNowStatus, evgExpiredTime.utc().format(), true, false)

        this.verifyVehicleStatus(vin, status)
        this.verifyEvgFaultLog(vin, status, lastEvgTriggerTime.format('MM/DD/YYYY h:mm A'))
    }

    this.verifyEvgWhileVehicleIsInRepair = (vin, status) => {
        this.setVehicleInRepair(vin)
        let triggerTime = moment()
        this.sendEVG('paccar', vin, status, triggerTime.utc().format(), true, false)

        this.verifyVehicleStatus(vin, inRepairStatus)

        navigation.moreOptionsButton.click()
        vehiclesDetailPage.removeInRepair()

        vehiclesDetailPage.verifyStatusOnDetailsPage(status)
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage(status)
        this.verifyEvgFaultLog(vin, status, triggerTime.add(moment().utcOffset(), 'minutes').format('MM/DD/YYYY h:mm A'))
    }

    this.verifyEvgsNotRemovedWhenClearingActiveFaults = (vin, status, lastEvgTriggerTime ) => {
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle(status);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage(status);
        vehiclesPage.actionMenu.click();
        vehiclesPage.clearActiveFaultsBtn.click();
        vehiclesPage.confirmBtn.click();
        browser.sleep(2000);
        vehiclesDetailPage.verifyStatusOnDetailsPage(status);
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage(status);
        this.verifyEvgFaultLog(vin, status, lastEvgTriggerTime.format('MM/DD/YYYY h:mm A'))
    }

    this.setVehicleInRepair = (vin) => {
        navigation.clickVehiclesLink()
        navigation.typeInSearchFilter(vin)
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin)
        vehiclesPage.verifyCorrectVehicleDetailPage(vin)
        navigation.moreOptionsButton.click()
        vehiclesDetailPage.setInRepair()
        vehiclesDetailPage.verifyStatusOnDetailsPage(inRepairStatus)
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage(inRepairStatus)
    }

    this.setVehicleStatus = function (portalType, vin, status) {
        portalType = portalType.toLowerCase();
        vehiclesPage.triggerFault(status);
        if (portalType === 'supportal') {
            navigation.fleetHealthButton.click();
        }
        this.verifyVehicleStatus(vin, status);
    };

    this.sendEVG = (portalType, vin, status, triggerTime, portal, notification) => {
        portalType = portalType.toLowerCase()
        vehiclesPage.triggerEVGFault(vin, status, triggerTime, portal, notification)
        if (portalType === 'supportal') {
            navigation.fleetHealthButton.click()
        }
    }

    this.verifyFaultIsCleared = function (portalType, vin, statusBefore) {
        portalType = portalType.toLowerCase();
        if (portalType === 'supportal') {
            navigation.fleetHealthButton.click();
        }
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle(statusBefore);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage(statusBefore);
        vehiclesPage.actionMenu.click();
        vehiclesPage.clearActiveFaultsBtn.click();
        vehiclesPage.confirmBtn.click();
        browser.sleep(2000);
        vehiclesDetailPage.verifyStatusOnDetailsPage(noActionStatus);
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage(noActionStatus);
        if (portalType === 'supportal') {
            navigation.fleetHealthButton.click();
        }
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle(noActionStatus);
    };

    this.goToVehicleDetails = function (vin) {
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
    };

    //can be used for VG search too
    this.vehicleListCustomerSearch = function (cusName) {
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilterRecommendation(cusName);
        vehiclesPage.verifyCustomerName(cusName);
    };

    this.verifyEyeIcon = function (recommendation) {
        if (recommendation !== stopNowStatus) {
            dashboard2.clickRecommendationButton(stopNowStatus);
            dashboard2.clickRecommendationButton(recommendation);
        }
        expect(dashboard2.eyeIcon.isPresent()).toBe(true, "The eye icon is not Present");

    };

    this.goToRecommendation = function (recommendation) {
        dashboard2.clickRecommendationLink(recommendation);
        vehiclesPage.verifyChipFilter(recommendation);
        vehiclesPage.verifyRecommendation(recommendation);
        var urlPart = recommendation.toUpperCase().replace(/ /g, "_");
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/?recommendation=' + urlPart);
    };

    this.verifyVehicleOptions = function (customerType, roleType, loggedInUser) {
        if (customerType === joinAllCustomer) {
            expect(vehiclesPage.editVehicleActionBarButton.isPresent()).toBe(false, 'The edit button is present');
            navigation.moreOptionsButton.click();
            if (roleType === 'Admin') {
                expect(vehiclesPage.setInRepairBtn.isDisplayed())
                    .toBe(true, 'Dealer is not able to see the Set-In Repair Option.');
            } else {
                expect(vehiclesPage.setInRepairBtn.isDisplayed())
                    .toBe(false, 'Dealer is able to see the Set-In Repair Option.');
            }
        } else if (customerType === preferredCustomer) {
            if (roleType === 'Admin') {
                expect(vehiclesPage.editVehicleActionBarButton.isDisplayed()).toBe(true, 'The edit button is not present');
                navigation.moreOptionsButton.click();
                expect(vehiclesPage.setInRepairBtn.isDisplayed())
                    .toBe(true, 'Dealer is not able to see the Set-In Repair Option.');
                    expect(vehiclesPage.transferOwnershipBtn.isDisplayed())
                        .toBe(true, 'Dealer is not able to see the Transfer Ownership Option.');
            } else {
                expect(vehiclesPage.editVehicleActionBarButton.isPresent()).toBe(false, 'The edit button is present');
                navigation.moreOptionsButton.click();
                expect(vehiclesPage.setInRepairBtn.isDisplayed())
                    .toBe(false, 'Dealer is able to see the Set-In Repair Option.');
            }
            expect(vehiclesPage.manageVehicleGroups.isDisplayed())
                .toBe(true, 'Dealer cannot see the Manage Vehicle Group button.');
        } else if (customerType === regularCustomer) {
            expect(vehiclesPage.editVehicleActionBarButton.isPresent()).toBe(false, 'The edit button is present');
            navigation.moreOptionsButton.click();
            if (roleType === 'Admin') {
                expect(vehiclesPage.setInRepairBtn.isDisplayed())
                    .toBe(true, 'Dealer is not able to see the Set-In Repair Option.');
            } else {
                expect(vehiclesPage.setInRepairBtn.isDisplayed())
                    .toBe(false, 'Dealer is able to see the Set-In Repair Option.');
            }
        }
        expect(vehiclesPage.ownershipHistoryBtn.isDisplayed())
            .toBe(true, 'Dealer cannot see the View Ownership History button.');
        expect(vehiclesPage.authorizedServiceCenterBtn.isDisplayed())
            .toBe(true, 'Dealer cannot see the Authorized Service Centers button.');

    };

    this.verifyPrimaryVehicleOptions = function (roleType, loggedInUser) {
        if (roleType === 'Admin') {
            expect(vehiclesPage.editVehicleActionBarButton.isDisplayed()).toBe(true, 'The edit button is not present');
            navigation.moreOptionsButton.click();
            expect(vehiclesPage.setInRepairBtn.isDisplayed())
                .toBe(true, 'Dealer is not able to see the Set-In Repair Option.');
            //Only Dealer Power User do not have permission to transfer ownership.
                expect(vehiclesPage.transferOwnershipBtn.isDisplayed())
                    .toBe(true, 'Dealer is not able to see the Transfer Ownership Option.');
        } else {
            expect(vehiclesPage.editVehicleActionBarButton.isPresent()).toBe(false, 'The edit button is present');
            navigation.moreOptionsButton.click();
            expect(vehiclesPage.setInRepairBtn.isDisplayed())
                .toBe(false, 'Dealer is able to see the Set-In Repair Option.');
        }
        expect(vehiclesPage.viewDealerBtn.isDisplayed()).toBe(true, 'Dealer is not able to see the View Dealer Option.');
        expect(vehiclesPage.manageVehicleGroups.isDisplayed())
            .toBe(true, 'Dealer cannot see the Manage Vehicle Group button.');
        expect(vehiclesPage.ownershipHistoryBtn.isDisplayed())
            .toBe(true, 'Dealer cannot see the View Ownership History button.');
        expect(vehiclesPage.authorizedServiceCenterBtn.isDisplayed())
            .toBe(true, 'Dealer cannot see the Authorized Service Centers button.');

    };

    this.verifyVehicleExist = function (vin) {
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyVIN(vin);
        navigation.chipFilterCloseBtn.click();

    };

    this.verifyVehicleCustomer = function (vin, customer) {
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyCustomerName(customer);
        navigation.chipFilterCloseBtn.click();
    };

    this.verifyVehicleUnassignedFromCustomer = function (vin) {
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyVehicleIsNotInList(vin);
        navigation.chipFilterCloseBtn.click();
    };

    this.deleteVehicleGroup = function (customer, vehicleGroup, loggedInUser) {
        navigation.clickCustomersLink();
        if(loggedInUser !== browser.params.testuseremails.customeradmin &&
            loggedInUser !== browser.params.testuseremails.customeruser &&
            loggedInUser !== browser.params.testuseremails.preferredcustomeradmin &&
            loggedInUser !== browser.params.testuseremails.preferredcustomeruser)
        {
            navigation.typeInSearchFilterRecommendation(customer);
        }
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        customersPage.clickVehicleGroupsTab();
        customersPage.clickVehicleGroupDeleteBtn(vehicleGroup);
        customersPage.confirmDeleteGroup.click();
        browser.sleep(2000); //this sleep is needed to complete the delete request.
    };

    this.removeFaultFromTheVehicle = function (vin) {
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        navigation.moreOptionsButton.click();
        vehiclesPage.clearActiveFaultsBtn.click();
        vehiclesPage.confirmBtn.click();
        vehiclesDetailPage.verifyStatusOnDetailsPage(noActionStatus);
    };

    this.verifyFaultFilter = function (recommendation, column) {
        navigation.typeInSearchFilterRecommendation(recommendation);
        browser.sleep(2000);
        vehiclesDetailPage.verifyColumn(recommendation, column);
        navigation.clearAllFiltersButton.click()
    };

    //param can be used to extend the function in future.
    this.verifyVehicleListMoreOptions = function (loggedInUser) {
        expect(vehiclesPage.configureColumnsButton.isDisplayed()).toBe(true);
        expect(vehiclesPage.exportButton.isPresent()).toBe(false);
        vehiclesPage.configureColumnsButton.sendKeys(protractor.Key.ESCAPE);
    };

    this.cumminsUserVehicleOption = function () {
        navigation.moreOptionsButton.click();
        expect(vehiclesPage.setInRepairBtn.isDisplayed()).toBe(false, 'Set-In-Repair option is present.');
        expect(vehiclesPage.viewTripAuditBtn.isDisplayed()).toBe(false, 'View Trip Audit option is present.');
        expect(vehiclesPage.viewDealerBtn.isDisplayed()).toBe(true, 'View Dealer option is not present.');
        expect(vehiclesPage.authorizedServiceCenterBtn.isDisplayed()).toBe(true, 'Authorized Dealers option is not present.');
    };



    this.verifySqsData = function (body, type, cusId) {
        var tag = "peoplenet:customer:";
        if(type === 'assign') {
            expect(body.customerID).toBe(tag + cusId,'The CustomerID does not match.');
            expect(body.truncatedCustomerID).toBe(cusId, 'The TruncatedCustomerID does not match.');
        }
        else if(type === 'unAssign'){
            expect(body.customerID).toBe('','The CustomerID does not match.');
            expect(body.truncatedCustomerID).toBe('', 'The TruncatedCustomerID does not match.');
        }
        expect(body.vin).toContain(browser.params.vehicle.cumminsvin1,'The VIN does not match.');
        expect(body.key).toContain(browser.params.vehicle.cumminsvin1, 'The key does not match.');
    };

    this.validateVehicleViewPermission = function (loggedInUser) {
        var securityAttribute = usersPage.getSecurityAttribute(loggedInUser);
        request.get(browser.params.environment.entityGatewayServiceUrl + '/vehicles?pageSize=600')
            .set('Content-Type', 'application/json')
            .set('user_security_attributes', securityAttribute)
            .end(function (err, res) {
                //all Vehicle data lives inside response.body.data
                var allVeh = res.body.data;
                _.each(allVeh, function (eachVeh){
                    var engineType = _.get(eachVeh, 'deviceInfo.vinRollCallData[0].componentIdData.make');
                    expect(engineType).toEqual('CMMNS');

                });
                expect(res.status).toEqual(200);
            });
    };
    this.reactivateVehicleTextField = function (vin) {
        remoteDiagnosticPage.reactivateTab.click();
        remoteDiagnosticPage.reactivateVinInput.sendKeys(vin);
        remoteDiagnosticPage.reactivateButton.click();
        remoteDiagnosticPage.popUpCancelnButton.click();
        expect(navigation.toastAlert.isPresent())
            .toBe(false, "Toast alert is present after deactivation was canceled. ");
        remoteDiagnosticPage.reactivateButton.click();
        remoteDiagnosticPage.popUpConfirmationButton.click();
        browser.sleep(500);
        toastMessageUtil.verifyToastAlert("Reactivation succeeded");
    };

    this.reactivateVehicleRowMenu = function (vin) {
        var vinArray = _.castArray(vin);
        vinArray.forEach(function (eachVin) {
            navigation.typeInSearchFilter(eachVin);
        });
        remoteDiagnosticPage.selectAllCheckBox.click();
        remoteDiagnosticPage.reactivateRowMenuButton.click();
        remoteDiagnosticPage.popUpCancelnButton.click();
        expect(navigation.toastAlert.isPresent())
            .toBe(false, "Toast alert is present after deactivation was canceled. ");
        remoteDiagnosticPage.reactivateRowMenuButton.click();
        remoteDiagnosticPage.popUpConfirmationButton.click();
        browser.sleep(500);
        toastMessageUtil.verifyToastAlert("Reactivation succeeded");
    };


    this.deactivateVehicle = function (vin) {
        remoteDiagnosticPage.deactivateVinInput.sendKeys(vin);
        remoteDiagnosticPage.deactivateButton.click();
        remoteDiagnosticPage.popUpCancelnButton.click();
        expect(navigation.toastAlert.isPresent())
            .toBe(false, "Toast alert is present after deactivation was canceled. ");
        remoteDiagnosticPage.deactivateButton.click();
        remoteDiagnosticPage.popUpConfirmationButton.click();
        browser.sleep(500);
        toastMessageUtil.verifyToastAlert("Deactivation succeeded");
    };

    this.deactivateVehicleWithCategory = function(vin, categoryType){
        remoteDiagnosticPage.deactivateVinInput.sendKeys(vin);
        remoteDiagnosticPage.removalCategoryDropDown.click();
        navigation.waitTillElementToBeClickable(categoryType);
        categoryType.click();
        remoteDiagnosticPage.deactivateButton.click();
        remoteDiagnosticPage.confirmDeactivateBtn.click();
    }

};

module.exports = new vehicleUtil();