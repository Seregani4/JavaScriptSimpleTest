var VehiclesPage = function () {

    //Fault Code Requirements
    var request = require('superagent');
    var moment = require('moment');
    var binary = require('jbinary');
    var informationalFault = require('../json/informational.json');
    var serviceNowFault = require('../json/serviceNow.json');
    var serviceSoonFault = require('../json/serviceSoon.json');
    var stopNowFault = require('../json/stopNow.json');
    var evgFault = require('../json/evg.json');
    var cumminsFault1 = require('../json/cumminsFault1.json');
    var cumminsFault2 = require('../json/cumminsFault2.json');
    var cumminsFault3 = require('../json/cumminsFault3.json');
    var ownershipHistory = require('../json/ownershipHistory.json');
    var tripStartJson = require('../json/oemTripStart.json');
    var tripEndJson = require('../json/oemTripEnd.json');
    var tripPeriodicJson = require('../json/tripPeriodic.json');
    var vinDiscoveryJson = require('../json/vinDiscovery.json');

    //Action Bar
    this.editVehicleActionBarButton = element(by.cssContainingText('[ng-if="$ctrl.canWriteVehicles"]', 'edit'));

    this.vehicleHeader = element.all(by.tagName('th'));
    //Vehicle List Page
    this.faultTitle = element(by.css('[class="vehicle-detail-header ng-binding"]'));
    this.allVehicleRows = element.all(by.repeater('row in $ctrl.rows'));
    this.vinColumn = element.all(by.binding('vehicle.vin'));
    //Add to Vehicle Group Popup
    this.addToVehicleGroupPopupHeader = element(by.className('md-subtitle md-subheader'));
    this.addToVehicleGroupTableName = element(by.xpath("//md-dialog[@id='add-to-vehicle-group-dialog']//h2"));
    this.addToVehicleGroupTableHeader = element.all(by.xpath("//md-dialog[@id='add-to-vehicle-group-dialog']//th"));
    this.addToVehicleGroupTableActionButtons = element.all(by.xpath("//md-dialog[@id='add-to-vehicle-group-dialog']//md-dialog-actions/button"));
    this.addToVehicleGroupChipFilterList = element.all(by.xpath("//md-dialog//div[@class = 'md-toolbar-tools list-toolbar-tools']//div[@class = 'md-chip-content']"));
    //SearchFilerButton and Filters
    this.searchFilterButton = element(by.css('[ng-click="$ctrl.showFilter(true)"]'));
    this.exportButton = element(by.buttonText('EXPORT'));
    this.exportBtn = element.all(by.xpath('//button[@ng-click="textButton.click($event, $ctrl)"]')).last();
    this.configureColumnsButton = element(by.css('[ng-click="$ctrl.configureColumns($event)"]'));
    this.toastAlert = element(by.css('[role="alert"]'));

    //edit vehicle page
    this.vinField = element(by.model('$ctrl.vehicle.vin'));
    this.yearField = element(by.model('$ctrl.vehicle.chassisInfo.chassisModelYear'));
    this.makeField = element(by.model('$ctrl.vehicle.chassisInfo.make'));
    this.modelField = element(by.model('$ctrl.vehicle.chassisDetailInfo.model'));
    this.dsnField = element(by.model('$ctrl.vehicle.deviceInfo.deviceKey'));
    this.unitNumberField = element(by.model('$ctrl.vehicle.basicInfo.unitNumber'));
    this.descriptionField = element(by.model('$ctrl.vehicle.basicInfo.description'));
    this.subscriptionStartField = element(by.model('$ctrl.subscriptionStart'));
    this.subscriptionEndField = element(by.model('$ctrl.subscriptionEnd'));
    this.warrantyField = element(by.css('[translate="vehicle.common.warranty"]'));
    this.extendedWarrantyField = element(by.css('[translate="vehicle.common.extended_warranty"]'));
    this.licenseStatusField = element(by.css('[translate="vehicle.common.license_status"]'));
    this.primaryDealerField = element(by.css('[ng-model-options="{ allowInvalid: true }"]'));
    this.primaryDealerFieldText = element(by.xpath('//input[@name="dealer"]'));
    this.disabledPrimaryDealerField = element(by.css('[placeholder="Not Available"]'));
    this.dealerOptions = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    this.saveAndCncelButtonText = element(by.xpath("//div[@class='layout-align-end-start layout-row']"));
    this.textFromDeviceDetails = element.all(by.xpath('//div[@class="device-details-container standard-padding"]'));
    this.textFromVinRows = element.all(by.xpath('//span/a[@ng-href]'));
    this.actionBtn = element.all(by.xpath('//md-menu/button[@type="button"]')).last();
    this.textFromActionDropDown = element.all(by.xpath('//div/md-menu-content'));
    this.textFromSuggestions = element.all(by.xpath("//li[@md-virtual-repeat]/md-autocomplete-parent-scope/span"));
    this.otaSubscriptionField = element(by.model('$ctrl.otaSubscriptionStatusSelected'));
    this.activeOtaSubscriptionButton = element.all(by.repeater('option in $ctrl.otaSubscriptionStatusOptions')).get(0);
    this.inactiveOtaSubscriptionButton = element.all(by.repeater('option in $ctrl.otaSubscriptionStatusOptions')).get(1);
    this.saveButton = element(by.buttonText('save'));

    //value from vehicleDetails
    this.recommendationValue = element(by.xpath('//div[@ng-if="$ctrl.hasRemovalCategory"]'));

    //this.dealerTypeAhead = element(by.css('[aria-label="Primary Dealer"]'));
    this.dealerTypeAhead = element(by.css('[type="search"]'));
    this.allDealerSuggestions = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    this.vehicleSaveBtn = element(by.css('[type="submit"]'));
    this.cancelBtn = element(by.cssContainingText('[type="button"]', 'cancel'));
    this.vehicleMenuBtn = element(by.css('[ng-click="$mdOpenMenu($event)"]'));

    this.chipFilter = element(by.css('[placeholder="Filter Results"] [type="search"]'));
    this.chipFilterCloseBtn = element.all(by.css('[md-svg-icon="md-close"]')).get(0);

    ////////////////vehicle detail page//////////////////////////
    this.vehicleData = element.all(by.css('[class="vehicle-details-data ng-binding"]'));
    //this.descriptionSection = element(by.css('[class="vehicle-details-data ng-binding"]'));
    //this.unitNumberSection = element.all(by.css('[class="vehicle-details-data ng-binding"]'));
    this.customerInfoSection = element(by.css('[ng-if="$ctrl.owner && ($ctrl.canReadDealers || $ctrl.canReadCustomers)"]'));
    this.customerNameField = element(by.className('vehicle-details-data'));
    this.unitNumberInfoField = element(by.xpath("//div/h4[@translate= 'vehicle.vehicleDetails.unit_number']/following-sibling::div"));
    this.dsnHyperlink = element.all(by.className('vehicle-details-data')).$$('a').get(1);
    this.iconRepair = element(by.className('vehicle-disposition-icon in-repair'));

    ///////////////Vehicle Details More options Button///////////////////
    this.clearActiveFaultsBtn = element(by.partialButtonText('Clear Active Faults'));
    //this.viewTripAuditBtn = element(by.partialLinkText('View Trip Audit'));
    this.viewTripAuditBtn = element(by.css('[ng-show="$ctrl.canViewTripAudit"]'));
    this.setInRepairBtn = element(by.css('[ng-click="$ctrl.setInRepair($event, true)"]'));
    this.viewDealerBtn = element(by.partialLinkText('View Dealer'));
    this.removeInRepairBtn = element(by.partialButtonText('Remove In Repair'));
    this.runDiagnosticBtn = element(by.partialButtonText('Run Diagnostic'));
    this.ownershipHistoryBtn = element(by.partialLinkText('Ownership History'));
    this.transferOwnershipBtn = element(by.partialLinkText('Transfer Ownership'));
    this.authorizedServiceCenterBtn = element(by.partialLinkText('Authorized Service Centers'));
    this.manageVehicleGroups = element(by.partialButtonText('Manage Vehicle Groups'));

    this.confirmBtn = element(by.buttonText('OK'));

    this.actionMenu = element(by.css('.user-card-actions-menu'));

    //Trip Audit page
    this.eventTypeDropdown = element(by.model('$ctrl.eventType'));
    this.valueFromEventTypeDropdown = element.all(by.xpath('//md-select-menu/md-content/md-option'));
    this.allEventType = element(by.css('[ng-value="$ctrl.tripAuditEvents.eventTypes"]'));
    this.oemTripStart = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(0);
    this.oemTripEnd = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(1);
    this.oemTripPeriodic = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(2);
    this.oemFaultCode = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(3);
    this.oemClearFaults = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(4);
    this.oemFaultRemoved = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(5);
    this.oemDiagnosticToolStatus = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(6);
    this.vinDiscovery = element.all(by.repeater('eventType in $ctrl.tripAuditEvents.eventTypes')).get(7);
    this.viewIncludedEventTypeButton = element(by.xpath("//button[@ng-click = '$ctrl.form.$valid && $ctrl.showEventTypes($event)']"));
    this.noTripEventsFoundmessage = element(By.xpath("//h3"));
    this.allEventRows = element.all(by.css('[md-virtual-repeat="event in $ctrl.dynamicItems"]'));
    this.searchButton = element(by.css('[type="submit"]'));
    this.eventTypeFromTable = element.all(by.xpath('//tr/td[2]'));
    this.vinInput = element(by.xpath("//input[@name = 'vin']"));

    //Trip audit page
    this.showEventJsonButtons = element.all(by.xpath("//button[@ng-click='$ctrl.showJson(event, $event)']"));
    this.tripAuditJsonData = element(by.id("tripAuditJSON"));
    this.copyToClipboardButtom = element(by.id("clipboardBtn"));
    this.okButtom = element(by.xpath("//button[@ng-click='dialogCtrl.closeDialog()']"));

    this.tripAuditcolumns = {
        tripIdColumn: {value: 1, name: 'Trip id'},
        tripEventColumn: {value: 1, name: 'Trip Event'},
        DsnColumn: {value: 1, name: 'DSN'},
        triggerDataColumn: {value: 1, name: 'Trigger Data'},
        SpnColumn: {value: 1, name: 'SPN'},
        FmiColumn: {value: 1, name: 'FMI'},
        latLonColumn: {value: 1, name: 'Lat, Lon'},
        altitudeColumn: {value: 1, name: 'Altitude'},
        headingColumn: {value: 1, name: 'Heading'},
    };

    this.allEventsType = 'All';
    this.oemTripStartEventsType = 'OEM_TRIP_START';
    this.oemTripEndEventsType = 'OEM_TRIP_END';
    this.oemTripPeriodicEventsType = 'OEM_TRIP_PERIODIC';
    this.oemFaultCodeEventsType = 'OEM_FAULT_CODE';
    this.oemClearFaultsEventsType = 'OEM_CLEAR_FAULTS';
    this.oemFaultRemovedEventsType = 'OEM_FAULT_REMOVED';
    this.oemDiagnosticToolStatusEventsType = 'OEM_DIAGNOSTIC_TOOL_STATUS';
    this.vinDiscoveryEventsType = 'VIN_DISCOVERY';

    this.addToVehicleGroup = 'Add to Vehicle Group';
    this.ownershipHistory = 'Ownership History';
    this.editVehicleEvent = 'Edit Vehicle';
    this.transferOwnership = 'Transfer Ownership';


    this.columns = {
        tableCustomerColumn: {value: 1, name: 'Customer'},
        tableUnitNumberColumn: {value: 2, name: 'Unit Number'},
        tableRecommendationColumn: {value: 3, name: 'Recommendation'},
        tableYearColumn: {value: 4, name: 'Year'},
        tableMakeColumn: {value: 5, name: 'Make'},
        tableModelColumn: {value: 6, name: 'Model'},
        tableVinColumn: {value: 7, name: 'VIN'},
        tableMillageColumn: {value: 8, name: 'Millage'},
        tableDsnColumn: {value: 9, name: 'DSN'},
        tableSubscriptionEndColumn: {value: 10, name: 'Subscription End'},
        tableSubscriptionStatusColumn: {value: 11, name: 'Subscription Status'},
        tableDescriptionColumn: {value: 12, name: 'Description'},
        tableMoreOptionsButton: {value: 13, name: ''}
    };

    //Ownership History Page
    this.ownershipHistoryTableHeader = element(by.className('ownership-history-header'));

    //Fault Messages
    //this.recommendation = element(by.css('[class="vehicle-detail-disposition-section layout-column flex-auto"]'));
    this.recommendation = element(by.css('[class="vehicle-detail-header ng-binding"]'));

    //this.noActionFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'no action'));
    this.noActionFaultMsg = element(by.cssContainingText('[ng-bind="$ctrl.dispositions[$ctrl.vehicle.recommendation.faultGuidance.RecommendedAction].title"]', 'No Action'));
    this.noActionCardStatus = element(by.css('[class="vehicle-disposition-chip no-action"]'));

    this.informationalFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Informational'));
    this.informationalCardStatus = element(by.css('[class="vehicle-disposition-chip informational"]'));

    this.stopNowFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Stop Now'));
    this.stopNowCardStatus = element(by.css('[class="vehicle-disposition-chip stop-now"]'));

    this.serviceSoonFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Service Soon'));
    this.serviceSoonCardStatus = element(by.css('[class="vehicle-disposition-chip service-soon"]'));

    this.serviceNowFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Service Now'));
    this.serviceNowCardStatus = element(by.css('[class="vehicle-disposition-chip service-now"]'));

    this.inRepairFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'In Repair'));
    this.inRepairCardStatus = element(by.css('[class="vehicle-disposition-chip in-repair"]'));


    //Fault Icons
    this.noActionIcon = element(by.css('[class="vehicle-disposition-icon no-action"]'));
    this.informationalIcon = element(by.css('[class="vehicle-disposition-icon informational"]'));
    this.stopNowIcon = element(by.css('[class="vehicle-disposition-icon stop-now"]'));
    this.serviceSoonIcon = element(by.css('[class="vehicle-disposition-icon service-soon"]'));
    this.serviceNowIcon = element(by.css('[class="vehicle-disposition-icon service-now"]'));
    this.inRepairIcon = element(by.css('[class="vehicle-disposition-icon in-repair"]'));

    //More Options Menu Buttons Vehicle List Page
    this.actionBarMoreOptionsButton = element.all(by.xpath('//md-menu[@ng-if="$ctrl.owner.canViewActionMenu($ctrl.currentuser)"]')).get(0);
    this.allActionsList = element.all(by.xpath("//div[@class='_md md-open-menu-container md-whiteframe-z2 md-default-theme md-active md-clickable']//button"));
    this.editMoreOptionsButton = element(by.cssContainingText('[ng-click="$ctrl.owner.editVehicle($ctrl.vehicle, $event)"]', 'Edit Vehicle'));
    this.editVehicleMoreOptionsButton = this.allActionsList.get(0);
    this.viewTripAuditMoreOptionsButton = this.allActionsList.get(1);
    this.addToVehicleGroupMoreOptionsButton = this.allActionsList.get(2);
    this.ownershipHistoryMoreOptionsButton = this.allActionsList.get(3);
    this.transferOwnershipActionButton = this.allActionsList.get(4);

    //Chip filters
    this.stopNowChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'Stop Now'));
    this.serviceNowChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'Service Now'));
    this.serviceSoonChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'Service Soon'));
    this.informationalChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'Informational'));
    this.noActionChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'No Action'));
    this.inRepairChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'In Repair'));


    this.get = function () {
        browser.get('/#/nav/vehicle/list/');
    };

    this.verifyVehicleListTableDataIsVisible = function () {

        expect(this.vehicleHeader.getText()).toContain('Unit Number', 'Unit Number column is missing');
        expect(this.vehicleHeader.getText()).toContain('Recommendation', 'Recommendation column is missing');
        expect(this.vehicleHeader.getText()).toContain('Year', 'Year column is missing');
        expect(this.vehicleHeader.getText()).toContain('Make', 'Make column is missing');

        expect(this.vehicleHeader.getText()).toContain('Model', 'Model column is missing');
        expect(this.vehicleHeader.getText()).toContain('VIN', 'Vin column is missing');
        expect(this.vehicleHeader.getText()).toContain('DSN', 'DSN column is missing');
        //expect(this.vehicleHeader.getText()).toContain('PMG Software', 'PMG Software column is missing');

        expect(this.vehicleHeader.getText()).toContain('Subscription End', 'Subscription End column is missing');
        expect(this.vehicleHeader.getText()).toContain('Subscription Status', 'Subscription Status column is missing');
        //expect(this.vehicleHeader.getText()).toContain('License Status', 'License Status column is missing');
        expect(this.vehicleHeader.getText()).toContain('Description', 'Description column is missing');

        this.allVehicleRows.count().then(function (count) {
            expect(count).toBeGreaterThan(0, 'There was no Vehicle data to be found');
        });

    };
    this.verifyChipFilter = function (chipFilter) {
        expect(element(by.cssContainingText('[class="chipText ng-binding"]', chipFilter)).isDisplayed()).toBe(true, 'The chip is not present.');
    };

    this.filterVehicleFaultByType = function (type) {
        this.searchFilterButton.click();
        this.chipFilter.sendKeys(type);
        element.all(by.cssContainingText('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]', type)).get(1).click();
        expect(this.allVehicleRows.count()).toBeGreaterThan(0, 'There was no results found');

    };

    //Data checks
    this.checkForPageCount = function (expectedCount) {
        this.allVehicleRows.count().then(function (count) {
            expect(count <= expectedCount).toBe(true);
        });
    };

    this.checkForUserData = function () {
        this.allVehicleRows.count().then(function (count) {
            expect(count).toBeGreaterThan(0, 'There was no Vehicle data to be found');
        });
    };

    /*
     customerName: name of customer to be validated
     validity: ('yes'/'no') do you expect to see the customer info section set?
     */
    this.validateCustomerInfo = function (customerName, validity) {
        if (validity.toUpperCase() !== 'NO') {
            expect(this.customerInfoSection.isDisplayed()).toBe(true);
            expect(this.customerInfoSection.$$('.vehicle-detail-text').get(0).getText()).toBe(customerName);
        }
        else {
            expect(this.customerInfoSection.isPresent()).toBe(false);
        }
    };

    /*
     dealerName: name of dealership to be validated
     validity: ('yes'/'no') do you expect to see the dealer info section set?
     */
    this.validateDealerInfo = function (dealerName, validity) {
        if (validity.toUpperCase() !== 'NO') {
            expect(this.customerInfoSection.isDisplayed()).toBe(true);
            expect(this.customerInfoSection.$$('.vehicle-detail-text').get(0).getText()).toBe(dealerName);
        }
        else {
            expect(this.customerInfoSection.isPresent()).toBe(false);
        }
    };

    this.verifyCorrectVehicleDetailPage = function (vin) {
        expect(this.vehicleData.getText()).toContain(vin, 'I can not find the correct VIN in the Vehicle Description');
    };
    ////////////////////////Vehicle Fault Codes/////////////////////////////////
    this.verifyStatusOnVehicle = function (status) {
        this.allVehicleRows.filter(function (row) {
            return row.$$('td').get(3).getText().then(function (vehicleStatus) {
                console.log(vehicleStatus);
                expect(vehicleStatus).toBe(status, 'The types do not match');
            });
        }).then(function () {
        }); //The "then" is needed so the filter function can complete the promise
    };

    this.factoryWorkerVerifyStatusOnVehicle = function (status) {
        this.allVehicleRows.filter(function (row) {
            return row.$$('td').get(2).getText().then(function (vehicleStatus) {
                console.log(vehicleStatus);
                expect(vehicleStatus).toBe(status, 'The types match');
            });
        }).then(function () {
        }); //The "then" is needed so the filter function can complete the promise
    };

    //Trigger a vehicle Fault Event
    this.triggerFault = function (fault, dsn, vin) {
        fault = fault.toLowerCase();
        if (fault === 'service now') {
            //Reformatting the date and time in the json file
            var newDateTime = moment().add(1, 'minute').format('YYYY-M-DTh:mm:ss');
            serviceNowFault.miscHeader.triggerTime = newDateTime;
            serviceNowFault.dsn = dsn || browser.params.vehicle.dsn;
            serviceNowFault.miscHeader.vin = vin || browser.params.vehicle.vin;
            //console.log(' newDate '+ JSON.stringify(faultCodeBody));
            //POST to trigger a fault on the test vehicle
            return this.postFaultRequest(serviceNowFault);
        } else if (fault === 'service soon') {
            //Reformatting the date and time in the json file
            var newDateTime = moment().add(1, 'minute').format('YYYY-M-DTh:mm:ss');
            serviceSoonFault.miscHeader.triggerTime = newDateTime;
            serviceSoonFault.dsn = dsn || browser.params.vehicle.dsn;
            serviceSoonFault.miscHeader.vin = vin || browser.params.vehicle.vin;
            //POST to trigger a fault on the test vehicle
            return this.postFaultRequest(serviceSoonFault);
        } else if (fault === 'informational') {
            //Reformatting the date and time in the json file
            var newDateTime = moment().add(1, 'minute').format('YYYY-M-DTh:mm:ss');
            informationalFault.miscHeader.triggerTime = newDateTime;
            informationalFault.dsn = dsn || browser.params.vehicle.dsn;
            informationalFault.miscHeader.vin = vin || browser.params.vehicle.vin;
            //POST to trigger a fault on the test vehicle
            return this.postFaultRequest(informationalFault);
        } else if (fault === 'stop now') {
            //Reformatting the date and time in the json file
            var newDateTime = moment().add(1, 'minute').format('YYYY-M-DTh:mm:ss');
            stopNowFault.miscHeader.triggerTime = newDateTime;
            stopNowFault.dsn = dsn || browser.params.vehicle.dsn;
            stopNowFault.miscHeader.vin = vin || browser.params.vehicle.vin;
            return this.postFaultRequest(stopNowFault);

        }
        /*
         Note: is not very useful in QA since there is no guidance from cummins.
         But can be used to test faults go through.
         */
        else if (fault === 'cummins fault') {
            const uuidV1 = require('uuid/v1');
             var id = uuidV1()
            var  code = Math.floor(Math.random() * 8999) + 1000;
            //Reformatting the date and time in the json files
            var newDateTime = moment().add(1, 'minute').format('YYYY-M-DTh:mm:ss');
            var jsonFileArray = [cumminsFault1, cumminsFault2];
            jsonFileArray.forEach(function (jsonFile) {
                jsonFile.eventId = id;
                jsonFile.faultGuidance.DTCCode = code;
                jsonFile.faultHeader.suspectParameterNumber = code;
                jsonFile.snapshots.samples.sampleTime = newDateTime;
                jsonFile.miscHeader.triggerTime = newDateTime;
                jsonFile.dsn = dsn || browser.params.vehicle.dsn;
                jsonFile.miscHeader.vin = vin || browser.params.vehicle.vin;
            });
            return this.postFaultRequest(cumminsFault1)
                .then(() => {
                 return   this.putFaultRequest(cumminsFault1, dsn, vin, id);
                })

        }
    };

    this.triggerEVGFault = (vin, status, triggerTime, portal, notification) => {
        evgFault.dsn = browser.params.vehicle.dsn
        evgFault.miscHeader.vin = vin
        evgFault.faultGuidance.RecommendedAction = status
        //set a 'unique" (per second) fmi to avoid duplicates evgs
        evgFault.faultHeader.failureModeIdentifier = parseInt(new Date().getTime() / 1000)
        evgFault.miscHeader.triggerTime = triggerTime.replace('Z', '')
        //POST to trigger a fault on the test vehicle
        if (portal) {
            this.postGuidanceRequest(evgFault)
        }
        if (notification) {
            this.postGuidanceNotificationRequest(evgFault)
        }
    };

    this.getEvgEmailSubject = () => {
        this.evgEmailSubject = 'AUTOMATION (DO NOT EDIT) | '
        return this.evgEmailSubject.concat(evgFault.faultGuidance.RecommendedAction, ' | ', evgFault.faultGuidance.DTCCode)
    }

    this.getEvgSpanishEmailSubject = () => {
        this.evgSpanishEmailSubject = 'AUTOMATION (DO NOT EDIT) | '
        if(evgFault.faultGuidance.RecommendedAction.includes('Stop Now')) {
            this.evgSpanishEmailSubject = this.evgSpanishEmailSubject.concat('Detenerse | ', evgFault.faultGuidance.DTCCode)
        } else if (evgFault.faultGuidance.RecommendedAction.includes('Service Now')) {
            this.evgSpanishEmailSubject = this.evgSpanishEmailSubject.concat('Servicio Inmediato | ', evgFault.faultGuidance.DTCCode)
        }
        return this.evgSpanishEmailSubject
    }

    this.postGuidanceNotificationRequest = (fileName) => {
        request.post(browser.params.environment.vehicleNotificationUrl)
            .set('Content-Type', 'application/json')
            .send(fileName)
            .then((err, res) => {
                expect(true).toEqual(true)
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });
    };

    this.postGuidanceRequest = (fileName) => {
        request.post(browser.params.environment.vehicleGuidanceUrl)
            .set('Content-Type', 'application/json')
            .send(fileName)
            .then((err, res) => {
                expect(true).toEqual(true)
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });
    };

    this.postFaultRequest = (fileName) => {
        return request.post(browser.params.environment.vehicleFaultCodeUrl)
            .set('Content-Type', 'application/json')
            .send(fileName)
            .then((res) => {
                //expect(res.status).toBe(200);
                expect(true).toEqual(true);
                return res
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });
    };


    this.putFaultRequest = function (fileName, dsn, vin, id) {
        return request.put(browser.params.environment.eventLedgerServiceConsul + "/events/VEHICLE/" + vin + "/" + id + "?eventType=GUIDANCE_ACTIONABLE")
            .set('Content-Type', 'application/json')
            .send(fileName)
            .then((res) => {
                console.log(res)
                expect(res.status).toBe(200);
                expect(true).toEqual(true);
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });
    };

    //Clear ownership history from a VIN
    this.clearOwnershipHistory = function (vin) {
        //Set a new timestamp on the json file
        var newDateTime = moment().add(1, 'minute').toISOString();
        ownershipHistory.timestamp = newDateTime;
        ownershipHistory.data.timestamp = newDateTime;
        //Update the VIN on Json
        ownershipHistory.key = vin;
        //console.log(' newDate= '+newDateTime);
        //console.log(' newDate '+ JSON.stringify(ownershipHistory));

        //POST to clear out the history (1XKYDP9XXGJ474000 from the json file but any VIN can be used)
        request.put(browser.params.environment.updateVehicleInfoUrl)
            .set('Content-Type', 'application/json')
            .send(ownershipHistory)
            .then((res) => {
                //console.log(err);
                //console.log(res);
                expect(res.status).toEqual(200);
                expect(true).toEqual(true);
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });

    };

    var newDateTime = moment().add(1, 'minute').toISOString();

    this.clearOwnershipHistoryDynamic = function (vin, description, unitNumber) {
        //get the Vehicle data from entity-service
        request.get(browser.params.environment.entityUrl + '/vehicles/' + vin)
            .set('Content-Type', 'application/json')
            .then((response) => {
                console.log(response.body)
                var resBody = response.body
                //anything from the json body can be updated here.
                resBody.basicInfo.description = description
                resBody.basicInfo.unitNumber = unitNumber
                resBody.basicInfo.timestamp = newDateTime
                resBody.basicInfo.ownershipRecords = []
                resBody.basicInfo.tags = []
                delete resBody.basicInfo.customerKey
                resBody.timestamp = newDateTime
                // console.log(response.body); //debug
                return resBody
            })
            .then(modifiedData => {
                return request.put(browser.params.environment.entitySearchUrl + '/vehicles/' + vin)
                    .set('Content-Type', 'application/json')
                    .send(modifiedData)
            })
            .then((response) => {
                expect(response.status).toEqual(200)
                expect(true).toEqual(true)
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err)
                return err
            })
    };

    this.clearOwnershipHistoryAssignCustomer = (vin, customerId) => {
        //get the Vehicle data from entity-service
        return request.get(browser.params.environment.entityUrl + '/vehicles/' + vin)
            .set('Content-Type', 'application/json')
            .then((response) => {
                // console.log(response.body);
                var resBody = response.body;
                //anything from the json body can be updated here.
                resBody.basicInfo.timestamp = newDateTime;
                resBody.basicInfo.ownershipRecords = []; //clear history
                resBody.basicInfo.tags = [];
                resBody.basicInfo.customerKey = `peoplenet:customer:${customerId}`; //set customer
                resBody.timestamp = newDateTime;
                // console.log('edited :'+JSON.stringify(resBody)); //debug
                return resBody
            })
            .then((data) => {
                return request.put(browser.params.environment.entitySearchUrl + '/vehicles/' + vin)
                    .set('Content-Type', 'application/json')
                    .send(data)
            })
            .then((response) => {
                expect(response.status).toEqual(200);
                return response
            }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.clearVehicleFaultLog = (vin) => {
        //get the Vehicle data from entity-service
        return request.get(browser.params.environment.entityUrl + '/vehicles/' + vin)
            .set('Content-Type', 'application/json')
            .then((response) => {
                var resBody = response.body;
                resBody.basicInfo.timestamp = newDateTime;
                delete resBody.health; //clear faulCodes
                resBody.recommendation = {
                    "faultGuidance": {
                        "RecommendedAction": "NO_ACTION",
                        "localizations": [],
                        "source": "PEOPLENET"
                    }
                }; //clear Guidance
                resBody.timestamp = newDateTime;
                return resBody
            })
            .then((data) => {
                return request.put(browser.params.environment.entitySearchUrl + '/vehicles/' + vin)
                    .set('Content-Type', 'application/json')
                    .send(data)
            })
            .then((response) => {
                expect(response.status).toEqual(200);
                return response
            }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    //////////////////Events////////////////
    var tripStartEvent = 'OEM_TRIP_START';
    var tripEndEvent = 'OEM_TRIP_END';
    var tripPeriodicEvent = 'OEM_TRIP_PERIODIC';
    var vinDiscoveryEvent = 'VIN_DISCOVERY_UNDECORATED';


    this.oemTripStartEvent = (vin, dsn) => {
        var newDateTime = moment().add(1, 'minute').toISOString();
        const uuidV1 = require('uuid/v1');
        //console.log('uuid---> ' + uuidV1());
        tripStartJson.eventId = uuidV1();
        tripStartJson.miscHeader.triggerTime = newDateTime;
        tripStartJson.miscHeader.vin = vin;
        tripStartJson.dsn = dsn;
        request.post(browser.params.environment.eventProcessorUrl +
            '/' + tripStartEvent + '?emitterId= ' + vin + '&emitterType=VEHICLE')
            .set('Content-Type', 'application/json')
            .send(tripStartJson)
            .then((response) => {
                // console.log(err);
                // console.log(response);
                // console.log(JSON.stringify(response.body));
                expect(response.status).toEqual(200);
                expect(true).toEqual(true);
                return response;
            }).catch((err) => {
            expect(false).toBe(true, "Error message: " + err);
            return err
        });

    };

    this.oemTripEndEvent = (vin, dsn, lat, lon) => {
        var newDateTime = moment().add(1, 'minute').toISOString();
        const uuidV1 = require('uuid/v1');
        //console.log('uuid---> ' + uuidV1());
        tripEndJson.eventId = uuidV1();
        tripEndJson.miscHeader.triggerTime = newDateTime;
        tripEndJson.miscHeader.vin = vin;
        tripEndJson.dsn = dsn;
        tripEndJson.miscHeader.latitude = lat;
        tripEndJson.miscHeader.longitude = lon;
        tripEndJson.syntheticData.tripRunTime = '6000';
        request.post(browser.params.environment.eventProcessorUrl +
            '/' + tripEndEvent + '?emitterId= ' + vin + '&emitterType=VEHICLE')
            .set('Content-Type', 'application/json')
            .send(tripEndJson)
            .then((response) => {
                // console.log(err);
                // console.log(response);
                // console.log(JSON.stringify(tripEndJson));
                expect(response.status).toEqual(200);
                expect(true).toEqual(true);
                return response;
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });

    };

    this.validateOemLicenseStatus = (vin, status) => {
        request.get(browser.params.environment.entityUrl + '/vehicles/' + vin)
            .set('Content-Type', 'application/json')
            .then((response) => {
                expect(response.status).toEqual(200);
                expect(response.body.licenseInfo.disabledOemLicense).toBe(status, 'Status is invalid for ' + vin)
                return response;
            }).catch((err) => {
            expect(false).toBe(true, "Error message: " + err);
            return err
        });
    };

    this.vinDiscoveryEvent = (dsn, vin) => {
        var newDateTime = moment().add(1, 'minute').toISOString();
        vinDiscoveryJson.miscHeader.triggerTime = newDateTime;
        vinDiscoveryJson.eventHeader.occurred = newDateTime;
        vinDiscoveryJson.miscHeader.vin = vin;
        vinDiscoveryJson.eventHeader.emitterId = vin;
        vinDiscoveryJson.dsn = dsn;
        vinDiscoveryJson.pmgInfo.pmgDsn = dsn;
        request.post(browser.params.environment.eventProcessorUrl +
            '/' + vinDiscoveryEvent + '?emitterId=' + vin + '&emitterType=VEHICLE')
            .set('Content-Type', 'application/json')
            .send(vinDiscoveryJson)
            .then((response) => {
                // console.log(err);
                // console.log(response);
                // console.log(JSON.stringify(vinDiscoveryJson));
                expect(response.status).toEqual(200);
                expect(true).toEqual(true);
            }).catch((err) => {
            expect(false).toBe(true, "Error message: " + err);
            return err
        });
    };

    //pass in lat and lon to define the location and tripRunTime > 3540 to change repair state
    this.oemTripPeriodicEvent = (vin, dsn, lat, lon) => {
        var newDateTime = moment().add(1, 'minute').toISOString();
        const uuidV1 = require('uuid/v1');
        //console.log('---------------uuid---> ' + uuidV1() + '--------------------------------');
        //console.log('---------timeStamp---> ' + newDateTime + '--------------------------------');
        tripPeriodicJson.eventId = uuidV1();
        tripPeriodicJson.miscHeader.triggerTime = newDateTime;
        tripPeriodicJson.miscHeader.vin = vin;
        tripPeriodicJson.dsn = dsn;
        tripPeriodicJson.miscHeader.latitude = lat;
        tripPeriodicJson.miscHeader.longitude = lon;
        tripPeriodicJson.syntheticData.tripRunTime = '6000';

        request.post(browser.params.environment.eventProcessorUrl +
            '/' + tripPeriodicEvent + '?emitterId= ' + vin + '&emitterType=VEHICLE')
            .set('Content-Type', 'application/json')
            .send(tripPeriodicJson)
            .then((response) => {
                // console.log(err);
                // console.log(response);
                // console.log(JSON.stringify(tripPeriodicJson));
                expect(true).toEqual(true);
                expect(response.status).toEqual(200);
            }).catch((err) => {
            expect(false).toBe(true, "Error message: " + err);
            return err
        });
    };


    this.readMidFile = () => {
        var fs = require('fs');
        var BUFFER_SIZE = 1654;
        const pathFileIn = "../DataFile/vinDiscovery.dat";
        const pathFileOut = '../DataFile/vinDiscovery-modified.dat';
        var newDateTime = moment().add(2, 'minute').unix();

        //read the file
        fs.open(pathFileIn, 'r', function (status, fd) {
            if (status) {
                console.log(status.message);
                return;
            }
            //print the buffer array
            var buffer = new Buffer(BUFFER_SIZE);
            fs.read(fd, buffer, 0, BUFFER_SIZE, 0, function (err, num) {
                //console.log(buffer.toString('utf8', 0, num));
                //console.log(buffer);
                var data = buffer.toString('utf8', 0, num);
                console.log(data);
                var dataArray = data.split("");
                //console.log(dataArray);
                //Replace the DSN and VIN bytes
                var dsnArray = ["5", "C", "1", "9", "7", "D"];
                var vinArray = ["3", "1", "5", "8", "4", "b", "5", "9", "4", "4", "5", "0", "3", "9", "5", "8",
                    "3", "2", "4", "7", "4", "a", "3", "9", "3", "8", "3", "0", "3", "1", "3", "3", "3", "1"];

                //Replace one character at a time.
                var modifiedDSN = dataArray.splice(2, 6, "5", "C", "1", "9", "7", "D");
                var modifiedVIN = dataArray.splice(42, 34, "3", "1", "5", "8", "4", "b", "5", "9", "4", "4", "5",
                    "0", "3", "9", "5", "8", "3", "2", "4", "7", "4", "a", "3", "9", "3", "8", "3", "0", "3", "1",
                    "3", "3", "3", "1");

                // //Replace the whole thing with the array.
                // var modifiedDSN = dataArray.splice(2, 6, dsnArray.join(""));
                // var modifiedVIN = dataArray.splice(37, 34, vinArray.join(""));

                //convert current unix timeStamp to HEX
                var hexTimeStampArray = newDateTime.toString(16).split("");
                var modifiedTimeStamp = dataArray.splice(90, 8, hexTimeStampArray.join(""));

                console.log('Original DSN: ' + modifiedDSN.join(""));
                console.log('Modified DSN: ' + dsnArray.join(""));
                console.log('Original VIN: ' + modifiedVIN.join(""));
                console.log('Modified VIN: ' + vinArray.join(""));
                console.log('Original Time: ' + modifiedTimeStamp.join(""));
                console.log('Modified Time: ' + hexTimeStampArray.join(""));

                //saving final modified data
                var modifiedData = dataArray.join("");
                fs.writeFile(pathFileOut, modifiedData, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(modifiedData);
                    console.log("The file was saved!");
                });

            });

        });

        // POST the file to mid-parser
        request.post(browser.params.environment.midParserUrl)
            .set('Content-Type', 'application/octet-stream')
            .send('../DataFile/vinDiscovery-modified.dat')
            .then((response, done) => {
                // console.log(err);
                //console.log(response);
                expect(true).toEqual(true);
                expect(response.status).toEqual(200);
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });

    };

    //////////////////////////////Button clicks///////////////////////////////////
    this.clickClearActiveFaultsBtn = () => {
        this.clearActiveFaultsBtn.click();
        this.confirmBtn.click();
    };

    this.clickVehiclesCheckbox = (testvin) => {//Vehicle List Page does not have any Checkboxes
        this.allVehicleRows.filter((row) => {
            // index 2 for user names
            return row.$$('td').get(1).getText().then((vin) => {
                return vin === testvin;
            });
        }).then((filteredRows) => {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No VIN was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.clickVehicleDetailsBtn = (VIN) => {
        element(by.css('[href="/#/nav/vehicle/details/' + VIN + '"]')).click();
    };

    this.clickVehicleHyperlinkCellSearch = (vehicleDSN) => {
        var this1 = this;
        this.allVehicleRows.filter((row) => {
            // index 2 for user names
            return row.$$('td').get(this1.columns.tableVinColumn.value).getText().then((name) => {
                return name === vehicleDSN;
            });
        }).then((filteredRows) => {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vehicle was found by that vin: ' + vehicleDSN);
            } else {
                filteredRows[0].element(by.linkText(vehicleDSN)).click();
                //filteredRows[0].element(by.className('entity-link ng-binding')).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vehicleDSN);
            }
        });
    };

    this.factoryWorkerClickVehicleHyperlink = (vehicleDSN) => {
        this.allVehicleRows.filter((row) => {
            // index 2 for user names
            return row.$$('td').get(6).getText().then((name) => {
                return name === vehicleDSN;
            });
        }).then((filteredRows) => {
            if (filteredRows.length > 1) {
                expect(false).toBe(true, 'No Vehicle was found by that vin: ' + vehicleDSN);
            } else {
                filteredRows[0].element(by.linkText(vehicleDSN)).click();
                //filteredRows[0].element(by.className('entity-link ng-binding')).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vehicleDSN);
            }
        });
    };


    //There are three places with an edit button. this one is on the vehicle details page
    this.clickEditVehicleBtn = (vin) => {
        this.editVehicleActionBarButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/vehicle/edit/' + vin, 'Expected to be on the Vehicle Edit page');
    };

    this.clickSaveBtn = (vin) => {
        this.vehicleSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vin);
    };


    ///////////////////////Edit vehicle fields//////////////////////////////
    this.verifyEditVehicleFields = () => {
        expect(this.vinField.isDisplayed()).toBe(true, "The VIN Field on the Edit Vehicle page could not be found");
        expect(this.yearField.isDisplayed()).toBe(true, "The Year Field on the Edit Vehicle page could not be found");
        expect(this.makeField.isDisplayed()).toBe(true, "The Make Field on the Edit Vehicle page could not be found");
        expect(this.modelField.isDisplayed()).toBe(true, "The Model Field on the Edit Vehicle page could not be found");
        expect(this.dsnField.isDisplayed()).toBe(true, "The DSN Field on the Edit Vehicle page could not be found");
        expect(this.unitNumberField.isDisplayed()).toBe(true, "The Unit Number Field on the Edit Vehicle page could not be found");
        expect(this.descriptionField.isDisplayed()).toBe(true, "The Description Field on the Edit Vehicle page could not be found");
        expect(this.subscriptionStartField.isDisplayed()).toBe(true, "The Subscription Start Field on the Edit Vehicle page could not be found");
        expect(this.subscriptionEndField.isDisplayed()).toBe(true, "The Subscription End Field on the Edit Vehicle page could not be found");
        //Warranty End and Extended Warranty fields were removed on 9/6/2017 from edit vehicle page.
        expect(this.disabledPrimaryDealerField.isDisplayed()).toBe(true, "The Primary Dealer Field on the Edit Vehicle page could not be found");
    };

    this.editUnitNumber = (unitNumber) => {
        this.unitNumberField.clear();
        this.unitNumberField.sendKeys(unitNumber);
    };

    this.editDescription = (description) => {
        this.descriptionField.clear();
        this.descriptionField.sendKeys(description);
    };

    this.setPrimaryDealer = (dealer) => {
        this.primaryDealerField.sendKeys(dealer);
        this.dealerOptions.get(0).click();
    };

    this.cannotSetPrimaryDealer = () => {
        expect(this.disabledPrimaryDealerField.getAttribute('disabled')).toBe('true');
    };

    this.editPrimaryDealer = (dealer) => {
        this.primaryDealerField.clear();
        this.primaryDealerField.sendKeys(dealer);
        this.dealerOptions.get(0).click();
    };

    this.clearPrimaryDealer = () => {
        this.dealerTypeAhead.clear();
    };

    this.validateEditedFields = (description, unitNumber) => {
        expect(this.vehicleData.getText()).toContain(description);
        expect(this.vehicleData.getText()).toContain(unitNumber);
        this.vehicleData.getText().then((text) => {
            console.log(text);
        });
    };

    ///////////////////Looping/filtering functions//////////////////////////////////
    this.chipFilterSendKeys = (input) => {
        this.chipFilter.clear();
        this.chipFilter.sendKeys(input);
        this.chipFilter.sendKeys(protractor.Key.ENTER);
    };


    this.verifyVehicleIsNotInList = (vin) => {
        return this.allVehicleRows.filter((row) => {
            // Match initially on VIN h2 value
            return row.$('h2').getText().then((name) => {
                return name === vin;
            });
        }).then((filteredRows) => {
            expect(filteredRows.length).toEqual(0, 'This vehicle is not suppose to be in this list');
        });
    };


    this.verifyVIN = (vehicleID) => {
        var vehicleArray = [];
        return this.allVehicleRows.filter((row) => {
            return row.$$('td').get(6).getText().then((name) => {
                //name === vehicleID;
                vehicleArray.push(name).then((array) => {
                    expect(array).toConatain(vehicleID);
                });

            });
        });
    };

    this.verifyUnitNumber = (vehicleID) => {
        return this.allVehicleRows.filter((row) => {
            return row.$$('td').get(5).getText().then((name) => {
                return name === vehicleID;
            });
        }).then((filteredRows) => {
            return filteredRows[0].$$('td').get(0).getText();
        });
    };

    this.verifyDescription = (vehicleID) => {
        return this.allVehicleRows.filter((row) => {
            return row.$$('td').get(6).getText().then((name) => {
                return name === vehicleID;
            });
        }).then((filteredRows) => {
            return filteredRows[0].$$('td').get(9).getText();
        });
    };

    this.editVehicle = (vehicleID) => {
        return this.allVehicleRows.filter((row) => {
            // index 3 for VIN
            return row.$$('td').get(6).getText().then((name) => {
                return name === vehicleID;
            });
        }).then((filteredRows) => {
            filteredRows[0].$$('a').get(1).click();
        });
    };

    this.verifyRecommendation = (vehicleRecommendation) => {
        return this.allVehicleRows.filter((row) => {
            return row.$$('td').get(3).getText().then((name) => {
                expect(name).toBe(vehicleRecommendation, 'Recommendations does not match up');
            });
        }).then((filteredRows) => {

        });
    };

    this.verifyCustomerName = (customerName) => {
        return this.allVehicleRows.filter((row) => {
            return row.$$('td').get(1).getText().then((name) => {
                expect(name).toBe(customerName, 'Customer name does not match up or is empty.');
            });
        }).then(function (filteredRows) {

        });
    };

    this.clickVehicleMoreOptions = (vehicleVIN) => {
        this.allVehicleRows.filter((row) => {
            // index 2 for user names
            return row.$$('td').get(this.columns.tableVinColumn.value).getText().then((name) => {
                return name === vehicleVIN;
            });
        }).then((filteredRows) => {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vehicle Vin was found by: ' + vehicleVIN);
            }
            filteredRows[0].$$('td').get(this.columns.tableMoreOptionsButton.value).$('button').click();
        });
    };

    this.verifyColumn = (desiredValue, whichColumn) => {
        this.allVehicleRows.filter((row) => {
            return row.$$('td').get(whichColumn).getText().then((value) => {
                expect(value).toContain(desiredValue, 'The types did not match');
            });
        }).then((filteredRows) => {
        });
    };

    this.checkForToastAlert = () => {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of vehicles succeeded.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        } else if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of vehicles failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

    this.validateEventType = (eventType) => {
        var this1 = this;
        this.allEventRows.filter((row) => {
            return row.$$('td').get(this1.tripAuditcolumns.tripEventColumn.value).getText().then((value) => {
                //console.log(value); //For debugging
                expect(value).toContain(eventType, 'The filtered event type did not match');
            });
        }).then((filteredRows) => {
        });
    };

    this.validateCustomerName = (customerName) => {
        this.customerNameField.getText().then((name) => {
            console.log(name);
            expect(name).toBe(customerName, 'The names did not match up.');
        });
    };

    this.editVehicleFields = (unitNumber, description, vehicleVin) => {
        this.editVehicleActionBarButton.click();
        this.editUnitNumber(unitNumber);
        this.editDescription(description);
        this.clickSaveBtn(vehicleVin);
        this.validateEditedFields(description, unitNumber);
    };

    this.clickDsnDeviceDetails = (user) => {
        this.dsnHyperlink.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + "/#/nav/device/details/", 'Could not navigate to Device Details page as ' + user);
    };

    this.cannotClickOnCustomerName = () => {
        this.customerNameField.click();
        expect(this.customerNameField.$$('a').getAttribute('ng-hide')).toEqual(['$ctrl.hideCustomerDetailsLink()']);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/');
    };

    this.verifyEvgChip = function (vin) {
        this.verifyChipFilter('Enhanced Vehicle Guidance');
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vin + '?status=active&status=evg');
    };

};

module.exports = new VehiclesPage();
