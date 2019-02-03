var DealersPage = function() {
    var request = require('superagent');
    const _ = require('lodash');
    var cumminsDistributorJson = require('../json/cumminsDistributors.json');
    var cumminsDistributorHoursJson = require('../json/cumminsDealerHours.json');

    this.dealerHeaders = element.all(by.tagName('th'));
    this.allDealerRows = element.all(by.repeater('row in $ctrl.rows'));
    this.prefDealerSelected = element.all(by.css('[aria-checked="true"]')).get(0);
    this.prefDealerUnselected = element.all(by.css('[aria-checked="false"]')).get(0);
    this.nameColumn = element.all(by.binding('dealer.name'));
    this.toastAlert = element(by.css('[role="alert"]'));
    this.contactData = element(by.css('[ng-if="$ctrl.dealer.phoneNumbers.length > 0 || $ctrl.dealer.emailAddresses.length > 0"]'));
    this.serviceHoursData = element.all(by.repeater('hourNickName in $ctrl.hourNickNames'));

    //High Density List Page
    this.allDealerRowsHiDensity = element.all(by.repeater('dealer in $ctrl.dealers'));
    this.addBtn = element(by.css('[href="/#/nav/dealer/add"]'));

    this.preferredDealerCheckbox = element(by.id('dealer-details-preferred-dealer-checkbox'));
    this.chipFilter = element(by.css('[placeholder="Filter Results"] [type="search"]'));
    this.chipFilterCloseBtn = element.all(by.css('[md-svg-icon="md-close"]')).get(0);
    this.exportButton = element(by.buttonText('EXPORT'));

    //Actions Drop-Down
    this.viewDetailsActionButton= element(by.css('[aria-label="info"]'));
    this.deleteActionButton= element(by.css('[aria-label="delete"]'));

    //Add/Edit Dealer Page
    this.addDealerBtn = element(by.css('[ng-href="/#/nav/dealer/add"]'));
    this.nameField = element(by.name('name'));
    this.emailField = element(by.name('email'));
    this.idField = element(by.name('id'));
    this.latitudeField = element(by.name('lat'));
    this.longitudeField = element(by.name('lon'));
    this.geofencesHeader = element(by.cssContainingText('.md-subheader-content', 'Geofences'));
    this.locationsHeader = element(by.cssContainingText('.md-subheader-content', 'Locations'));
    this.phoneNumbersHeader = element(by.cssContainingText('.md-subheader-content', 'Phone Numbers'));
    this.hoursOfServiceHeader = element(by.cssContainingText('.md-subheader-content', 'Hours of Service'));
    this.cancelBtn = element(by.cssContainingText('[type="button"]', 'cancel'));
    this.saveBtn = element(by.css('[type="submit"]'));
    this.editDealerMainActionButtons= element.all(by.xpath("//div[@layout-align = 'start center']")).last();

    this.allAddEditButtons = element.all(by.xpath("//button[@ng-show= '!$ctrl.editInProgress']"));
    this.addCoordinateButton = element(by.xpath("//button[contains(@ng-click, '$ctrl.addDynamicRecord($ctrl.dealer.geofences')]"));
    this.addLocationButton = element(by.xpath("//button[contains(@ng-click, '$ctrl.addDynamicRecord($ctrl.dealer.addresses')]"));
    this.addPhoneButton = element(by.xpath("//button[contains(@ng-click, '$ctrl.addDynamicRecord($ctrl.dealer.phoneNumber')]"));
    this.addHoursOfServiceButton = element(by.xpath("//button[contains(@ng-click, '$ctrl.addDynamicRecord($ctrl.dealer.hours')]"));

    this.addCoordinateCancelButton= element(by.xpath("//button[contains(@ng-click, '$ctrl.cancel($ctrl.dealer.geofences')]"));
    this.addLocationCancelButton= element(by.xpath("//button[contains(@ng-click, '$ctrl.cancel($ctrl.dealer.addresses')]"));
    this.addPhoneCancelButton= element(by.xpath("//button[contains(@ng-click, '$ctrl.cancel($ctrl.dealer.phoneNumbers')]"));
    this.addHoursOfServiceCancelButton= element(by.xpath("//button[contains(@ng-click, '$ctrl.cancel($ctrl.dealer.hours')]"));

    this.addCoordinateForm = element.all(by.xpath("//div[contains(@ng-show, '$ctrl.editingGeofence')]"));
    this.addLocationForm = element.all(by.xpath("//div[contains(@ng-show, '$ctrl.editingAddress')]"));
    this.addPhoneForm = element.all(by.xpath("//div[contains(@ng-show, '$ctrl.editingPhone')]"));
    this.addHoursOfServiceForm = element.all(by.xpath("//div[contains(@ng-show, '$ctrl.editingServiceHour')]"));

    //Edit dealership elements
    //Phone number index
    var primary = 0;
    var secondary= 1;
    var tollFree= 2;
    var fax = 3;
    //Days of the week index
    var sunday = 0;
    var monday = 1;
    var tuesday = 2;
    var wednesday = 3;
    var thursday = 4;
    var friday = 5;
    var saturday = 6;

    /////////////Add/Edit Contact//////////////
    this.addPhoneBtn = element(by.cssContainingText('[type="button"]','Add Phone'));

    //when multiple contact info is present
    this.addPhoneNumberField = element.all(by.model('phone.number'));

    //this.phoneTypeRadioBtn = element.all(by.repeater('type in $ctrl.phoneType')); //Is not useful since this repeater is repeated in several Contact forms.

    this.addPhoneDoneBtn = element(by.css('[ng-click="$ctrl.done($ctrl.dealer.phoneNumbers, \'editingPhone\')"]'));

    //Repeater used to list all available phone numbers.
    this.phoneNumberList = element.all(by.repeater('phone in $ctrl.dealer.phoneNumbers'));
    this.bugElement = element(by.cssContainingText('[ng-repeat="phone in $ctrl.phoneNumbers"]', 'dealer.dealerDetails.:'));

    //Radio buttons on add phone number form
    //-----define radioButtons by cssContainingText-----
    this.primaryPhone = element.all(by.cssContainingText('[value="Primary"]', 'Primary'));
    //this.primaryPhone = this.phoneTypeRadioBtn.get(primary); //can be used for single contact numbers.
    this.secondaryPhone = element.all(by.cssContainingText('[value="Secondary"]', 'Secondary'));
    this.tollFreePhone = element.all(by.cssContainingText('[value="Toll Free"]', 'Toll Free'));
    this.faxNumber = element.all(by.cssContainingText('[value="Fax"]', 'Fax'));

    //Edit and Delete buttons
    this.editContactBtn = element(by.css('[ng-click="$ctrl.edit(phone, \'editingPhone\')"]'));
    this.deleteContactBtn = element(by.css('[ng-click="$ctrl.confirmDelete($ctrl.res[\'dealer.dealerEdit.phone\'], $ctrl.dealer.phoneNumbers, phone,$event)"]'));

    ////////////Add/Edit Service Hours/////////////
    this.addServiceHoursBtn = element(by.cssContainingText('[type="button"]','Add Hours of Service'));
    this.serviceTypeField = element(by.model('serviceHour.nickName'));
    this.openHourField = element(by.model('serviceHour.open'));
    this.closeHourField = element(by.model('serviceHour.close'));

    this.dayOfTheWeekCheckbox = element(by.model('phone.number'));
    this.daysOfTheWeekCheckbox = element.all(by.repeater('weekday in $ctrl.weekdays'));
    this.addHoursDoneBtn = element(by.css('[ng-click="$ctrl.done($ctrl.dealer.hours, \'editingServiceHour\')"]'));

    //Repeater used to list all available hours.
    this.serviceHoursList = element.all(by.repeater('serviceHour in $ctrl.dealer.hours'));

    //Days of the week checkboxes
    this.checkSunday = this.daysOfTheWeekCheckbox.get(sunday);
    this.checkMonday = this.daysOfTheWeekCheckbox.get(monday);
    this.checkTuesday = this.daysOfTheWeekCheckbox.get(tuesday);
    this.checkWednesday = this.daysOfTheWeekCheckbox.get(wednesday);
    this.checkThursday = this.daysOfTheWeekCheckbox.get(thursday);
    this.checkFriday = this.daysOfTheWeekCheckbox.get(friday);
    this.checkSaturday = this.daysOfTheWeekCheckbox.get(saturday);

    this.editDealerSaveBtn = element(by.cssContainingText('[type="submit"]', 'save'));

    //Edit, Delete and confirm buttons
    this.editHourOfServiceBtn = element(by.css('[ng-click="$ctrl.edit(serviceHour, \'editingServiceHour\')"]'));
    this.deleteHourOfServiceBtn = element(by.css('[ng-click="$ctrl.confirmDelete($ctrl.res[\'dealer.dealerEdit.hours_of_service\'],$ctrl.dealer.hours,serviceHour,$event)"]'));
    this.confirmCancelBtn = element(by.cssContainingText('[type="button"]', 'Cancel'));
    this.confirmDeleteBtn = element(by.cssContainingText('[type="button"]', 'Delete'));

    //////////ColumnNumbers for Dealer List page///////////
    this.columns = {
        nameColumn: {value: 1, name: 'Name Column'},
        codeColumn: {value: 2, name: 'Code Column'},
        addressColumn: {value: 3, name: 'Address Column'},
        contactColumn: {value: 4, name: 'Contact Column'}
    };

    this.get = function() {
        browser.get('/#/nav/dealer/list/');
        browser.sleep(1000);
    };

    this.verifyDealerListTableDataIsVisible= function() {
        expect(this.dealerHeaders.getText()).toContain('Name', 'Name column is missing');
        expect(this.dealerHeaders.getText()).toContain('Address', 'Address column is missing');
        expect(this.dealerHeaders.getText()).toContain('Code', 'Code column is missing');
        expect(this.dealerHeaders.getText()).toContain('Contact', 'Contact column is missing');
        this.allDealerRows.count().then(function(count) {
            expect(count).toBeGreaterThan(0, 'There was no Dealer data to be found');
        });
    };

    //Data checks
    this.checkForUserData = function() {
        this.allDealerRows.count().then(function(count) {
            expect(count).toBeGreaterThan(0, 'There was no Dealer data to be found');
        });
    };

    this.checkForPageCount = function(expectedCount) {
        this.allDealerRows.count().then(function(count) {
            expect(count<=expectedCount).toBe(true);
        });
    };

    //Dealer List Page
    this.clickViewDetailsBtn = function(density, dealerName) {
        if (density === 'low') {
            return this.allDealerRows.filter(function (row) {
                // index 2 for user names
                return row.$$('h2').get(0).getText().then(function (name) {
                    return name === dealerName;
                });
            }).then(function (filteredRows) {
                if (filteredRows.length < 1) {
                    expect(false).toBe(true, 'Dealer not found on page ----- The Chip Filter Did not work correctly');
                }
                filteredRows[0].element(by.linkText('VIEW DETAILS')).click();
            });
        }
        else if (density === 'high') {
            return this.allDealerRows.filter(function (row) {
                // index 2 for user names
                return row.$$('td').get(1).getText().then(function (name) {
                    return name === dealerName;
                });
            }).then(function (filteredRows) {
                if (filteredRows.length < 1) {
                    expect(false).toBe(true, 'Dealer not found on page');
                }
                filteredRows[0].$$('md-checkbox').get(0).click();
                element(by.partialButtonText('Actions')).click();
                element(by.partialLinkText('VIEW DETAILS')).click();
            });
        }
        else {
            expect(true).toBe(false, 'Incorrect or No Parameter given');
        }
    };

    this.clickAddBtn = function() {
        this.addDealerBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/dealer/add');
    };

    this.clickDealerCheckbox = function(dealerNameId){
        var _this1 = this;
        this.allDealerRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(_this1.columns.codeColumn.value).getText().then(function (name) {
                return  name===(dealerNameId);
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Dealer was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    //Dealers Details Page
    this.checkPreferredDealerCheckbox = function() {
        this.preferredDealerCheckbox.getAttribute('aria-checked').then(function(state){//Only Click CheckBox when it is NOT checked
                //console.log(state);
                if(state ==='false'){
                    element(by.model('$ctrl.preferred')).click();
                }
            });
            // aria-checked html attribute signifies whether or not item is selected!
            expect(this.preferredDealerCheckbox.getAttribute('aria-checked')).toBe('true', 'The assign vehicle box was not checked');
    };

    this.uncheckPreferredDealerCheckbox = function() {
        this.preferredDealerCheckbox.getAttribute('aria-checked').then(function(state){//Only Click CheckBox when it is NOT checked
            //console.log(state);
            if(state ==='true'){
                element(by.model('$ctrl.preferred')).click();
            }
        });
        // aria-checked html attribute signifies whether or not item is selected!
        expect(this.preferredDealerCheckbox.getAttribute('aria-checked')).toBe('false', 'The assign vehicle box was not un-checked');
    };



    this.clickDealerHyperlinkCellSearch = function(dealerCode) {
        var _this1 = this;
        return this.allDealerRows.filter(function(row) {
            // index 0 for customer names
            return row.$$('td').get(_this1.columns.codeColumn.value).getText().then(function(code) {
                return code === dealerCode;
            });
        }).then(function(filteredRows) {
            filteredRows[0].$$('a').get(0).click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/details/peoplenet:dealer:');
        });
    };

    this.checkForToastAlert = function(){
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if(this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of dealers succeeded.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        }else if(this.toastAlert.isDisplayed()){
            expect(this.toastAlert.getText()).toContain('Export of dealers Failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

    //Edit dealership page
    this.addServiceHours = function(serviceTypeName, openHour, closeHour){
        //this.addServiceHoursBtn.click();
        //add service name
        this.serviceTypeField.click();
        this.serviceTypeField.clear();
        this.serviceTypeField.sendKeys(serviceTypeName);
        //add opening time
        this.openHourField.click();
        this.openHourField.clear();
        this.openHourField.sendKeys(openHour);
        //add closing time
        this.closeHourField.click();
        this.closeHourField.clear();
        this.closeHourField.sendKeys(closeHour);
    };

    this.checkWeekDays = function(){
        this.checkMonday.click();
        this.checkTuesday.click();
        this.checkWednesday.click();
        this.checkThursday.click();
        this.checkFriday.click();

    };

    this.validateHoursOfServiceData = function(serviceTypeName, openHour) {
        expect(this.serviceHoursData.get(0).getText()).toContain(serviceTypeName);
        expect(this.serviceHoursData.get(0).getText()).toContain(openHour);
        this.serviceHoursData.get(0).getText().then(function(text){
            console.log(text);
        });
    };

    this.deleteServiceHours = function(){
        //filter can be used if more than one service hours are to be listed. (eg. delete vehicle groups)
        //dealersPage.serviceHoursList.get(0).$$('button').get(1).click();

        this.deleteHourOfServiceBtn.click();
        this.confirmDeleteBtn.click();
    };

    this.deleteContact = function(){
        this.phoneNumberList.get(0).$$('button').get(1).click();
        browser.sleep(1000);
        this.confirmDeleteBtn.click();
    };

    this.getAndValidateDistributor = function (distributorCode, distributorStreetAddress, distributorCity, distributorName) {
        request.get(browser.params.environment.oemSiteServiceUrl + '/' + distributorCode)
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                var data = res.body;
                expect(data.dealerCode).toEqual(distributorCode, 'Distributor Code does not match up.');
                expect(data.address.streetAddress).toEqual(distributorStreetAddress, 'Distributor Street Address does not match up.');
                expect(data.address.city).toEqual(distributorCity, 'Distributor CityName does not match up.');
                expect(data.name).toEqual(distributorName, 'Distributor Name does not match up.');
                console.log(err);
            });
    };

    this.getAndValidateDistributorHours = function (distributorCode, numHourType, partsCloseTime, serviceCloseTime) {
        request.get(browser.params.environment.oemSiteServiceUrl + '/' + distributorCode)
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                var data = res.body;
                var hourTypeCount = data.hours.length;
                var emergencyHours = _.find(data.hours, {nickName: 'Emergency'});
                var partsHours = _.find(data.hours, {nickName: 'Parts'});
                var serviceHours = _.find(data.hours, {nickName: 'Service'});
                //Validate hours information...
                expect(data.hasOwnProperty('hours')).toBe(true, 'Hours are not present on the Dist. information.');
                expect(hourTypeCount).toBe(numHourType, 'The number of Hour Types does not match.');
                //only if the hours exists
                if (emergencyHours) expect(emergencyHours.close).toEqual('00:30:00.000', 'Emergency Closing Hours do not match');
                if (partsHours) expect(partsHours.close).toEqual(partsCloseTime + ':00.000', 'Parts Closing Hours do not match');
                if (serviceHours) expect(serviceHours.close).toEqual(serviceCloseTime + ':00.000', 'Service Closing Hours do not match');
                console.log(err);
            });
    };

    //Note: Dealer Code cannot be updated.
    this.editCumminsDistributor = function (distCode, distStreetAddress, distCityToEdit, distNameToEdit) {
        var distributorCount = Object.keys(cumminsDistributorJson).length;
        for (var i = 0; i < distributorCount; i++) {
            if(cumminsDistributorJson[i].dealerCode === distCode){
                cumminsDistributorJson[i].address.streetAddress = distStreetAddress;
                cumminsDistributorJson[i].address.city = distCityToEdit;
                cumminsDistributorJson[i].name = distNameToEdit;
                request.post(browser.params.environment.oemSiteServiceUrl + '/add')
                    .set('Content-Type', 'application/json')
                    .send([cumminsDistributorJson[i]])
                    .end(function (err, res) {
                        console.log(err);
                    });
            }
        }

    };

    //Note: takes in boolean value to determine if service type hours is to be deleted.
    this.editCumminsDistributorHours = function (distCode, partsCloseTime, serviceCloseTime, deleteHourType) {
        var originalJson = JSON.parse(JSON.stringify(cumminsDistributorHoursJson));
        var distributorHourCount = originalJson.length;
        for (var i = 0; i < distributorHourCount; i++){
            if(originalJson[i].dealerCode === distCode) {
                var partsHours = _.find(originalJson[i].hours, {nickName: 'Parts'});
                var emergencyHours = _.find(originalJson[i].hours, {nickName: 'Emergency'});
                var serviceHours = _.find(originalJson[i].hours, {nickName: 'Service'});
                if (deleteHourType === true) {
                    _.pull(originalJson[i].hours, emergencyHours);
                }
                partsHours.close = partsCloseTime;
                serviceHours.close = serviceCloseTime;
                request.post(browser.params.environment.oemSiteServiceUrl + '/hoursOfOperation/add')
                    .set('Content-Type', 'application/json')
                    .send([originalJson[i]])
                    .end(function (err, res) {
                        console.log(err);
                    });
            }
        }
    };

    this.resetCumminsDistributorHours = function (distCode) {
        var originalJson = JSON.parse(JSON.stringify(cumminsDistributorHoursJson));
        var distributorHourCount = originalJson.length;
        for (var i = 0; i < distributorHourCount; i++) {
            if (originalJson[i].dealerCode === distCode) {
                request.post(browser.params.environment.oemSiteServiceUrl + '/hoursOfOperation/add')
                    .set('Content-Type', 'application/json')
                    .send([originalJson[i]])
                    .end(function (err, res) {
                        console.log(err);
                    });
            }
        }
    };

};

module.exports = new DealersPage();
