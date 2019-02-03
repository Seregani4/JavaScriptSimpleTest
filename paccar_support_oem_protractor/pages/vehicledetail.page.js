var VehicleDetailPage = function() {


    //Unique Filters  on the Vehicle Details Page
    this.searchFilterButton =element.all(by.css('[ng-click="$ctrl.showFilter(true)"]')).get(0);
    this.searchFilterMenuButton =element.all(by.css('[ng-click="$mdOpenMenu($event)"]')).get(1);
    this.saveFilter = element(by.css('[ng-click="$ctrl.saveNewFilter()"]'));
    this.manageAllSavedFilters = element(by.css('[ng-click="$ctrl.manageFilters()"]'));

    this.faultLogHeaders = element.all(by.repeater('col in $ctrl.cols'));
    //this.allfaultLogRows =element.all(by.repeater('row in $ctrl.rows'));
    this.allfaultLogRows = element.all(by.xpath('//standard-card//tr[@ng-repeat=\'row in $ctrl.rows\']'));
    this.subHeaders = element.all(by.className('md-title ng-binding'));
    this.faultDetailsButton = element.all(by.cssContainingText('[type="button"]','info_outline'));
    this.descriptionSection = element.all(by.css('.vehicle-detail-data-column')).get(0);
    this.unitNumberSection = element.all(by.css('[ng-show="::ctrl.vehicle.basicInfo.unitNumber"]')).get(1);
    this.unitNumber = element(by.xpath("(//div[@class = 'vehicle-details-data ng-binding'])[2]"));
    this.faultLogActionsMenu = element.all(by.cssContainingText('[type="button"]', 'more_vert')).get(1);
    this.faultLogInfoButtons = element.all(by.xpath("//button[@aria-label = 'More Info']"));
    this.editVehicleLink = element(by.css('[ng-href="/#/nav/vehicle/edit/' + browser.params.vehicle.vin + '"]'));
    this.setInRepairBtn = element(by.buttonText('Set In Repair'));
    this.removeInRepairBtn = element(by.buttonText('Remove In Repair'));
    this.confirmBtn = element(by.buttonText('OK'));
    this.dealerInfoSection = element(by.css('[ng-show="ctrl.owner.addresses[0]"]'));
    this.customerInfoSection = element(by.css('[ng-show="ctrl.owner.addresses[0]"]'));
    this.openVehicleMenu = element(by.css('[ng-click="$mdOpenMenu($event)"]'));
    this.allMenuIttems = element.all(by.xpath("//md-menu-content[@class='md-default-theme']")).last();
    this.lastButtonInList = element.all(by.className('md-button md-default-theme md-ink-ripple')).last();
    //Fault Messages
    this.serviceNowFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Service Now'));
    this.noActionFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'No Action'));
    this.informationalFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Informational'));
    this.serviceSoonFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Service Soon'));
    this.stopNowFaultMsg = element(by.cssContainingText('.vehicle-detail-header', 'Stop Now'));
    this.inRepairFaultMsg= element(by.cssContainingText('.vehicle-detail-header', 'In Repair'));
    this.remoteDiagnosticsDisabledMsg = element(by.xpath("//div[@ng-if = '$ctrl.hasRemovalCategory']"));

    //value from table
    this.statusFromFaultLog = element.all(by.xpath('//td[3]/span'));

    this.verifyStatusOnDetailsPage = function(status){
        status = status.toLowerCase();
        if(status === 'no action'){
            expect(this.noActionFaultMsg.isPresent()).toBe(true, 'There was no status available on the Vehicle Details page');
        } else if (status === 'informational'){
            expect(this.informationalFaultMsg.isPresent()).toBe(true, 'There was no status available on the Vehicle Details page');
        } else if (status === 'stop now'){
            expect(this.stopNowFaultMsg.isPresent()).toBe(true, 'There was no status available on the Vehicle Details page');
        } else if (status === 'service soon'){
            expect(this.serviceSoonFaultMsg.isPresent()).toBe(true, 'There was no status available on the Vehicle Details page');
        } else if (status === 'service now'){
            expect(this.serviceNowFaultMsg.isPresent()).toBe(true, 'There was no status available on the Vehicle Details page');
        } else if (status === 'in repair'){
            expect(this.inRepairFaultMsg.isPresent()).toBe(true, 'There was no status available on the Vehicle Details page');
        }
    };
    this.allTableRows = element.all(by.xpath("//tbody/tr"));

    this.columns = {
        tableRecommendationColumn: {value: 0, name: 'Recommendation'},
        tableStatusColumn: {value: 1, name: 'Status'},
        tableSystemColumn: {value: 2, name: 'System'},
        tableCodeColumn: {value: 3, name: 'Code'},
        tableDescriptionColumn: {value: 4, name: 'Description'},
        tableMileageColumn: {value: 5, name: 'Mileage'},
        tableSPNColumn: {value: 6, name: 'SPN'},
        tableFMIColumn: {value: 7, name: 'FMI'},
        tableLocalTimeColumn: {value: 8, name: 'Local Time'}

    };


    this.cleanupFault = function () {
        this.openVehicleMenu.click();
        browser.sleep(500);
        this.clearFaultsBtn.click();
        this.okVerificationBtn.click();
        browser.sleep(2000);
    };

    //Fault Icons
    this.noActionIcon = element(by.css('[class="vehicle-disposition-icon no-action"]'));
    this.informationalIcon = element(by.css('[class="vehicle-disposition-icon informational"]'));
    this.stopNowIcon = element(by.css('[class="vehicle-disposition-icon stop-now"]'));
    this.serviceSoonIcon = element(by.css('[class="vehicle-disposition-icon service-soon"]'));
    this.serviceNowIcon = element(by.css('[class="vehicle-disposition-icon service-now"]'));
    this.inRepairIcon = element(by.css('[class="vehicle-disposition-icon in-repair"]'));

    this.clearFaultsBtn = element(by.css('[ng-click="$ctrl.clearActiveFaults(event)"]'));
    this.okVerificationBtn = element(by.css('[ng-click="dialog.hide()"]'));

    this.verifyStatusIconOnVehicleDetailsPage = function(status){
        status = status.toLowerCase();
        if(status === 'no action') {
            expect(this.noActionIcon.isPresent()).toBe(true, 'There was no Icon available on Vehicle Details page');
        } else if (status === 'informational'){
            expect(this.informationalIcon.isPresent()).toBe(true, 'There was no Icon available on Vehicle Details page');
        } else if (status === 'stop now'){
            expect(this.stopNowIcon.isPresent()).toBe(true, 'There was no Icon available on Vehicle Details page');
        } else if (status === 'service soon'){
            expect(this.serviceSoonIcon.isPresent()).toBe(true, 'There was no Icon available on Vehicle Details page');
        } else if (status === 'service now'){
            expect(this.serviceNowIcon.isPresent()).toBe(true, 'There was no Icon available on Vehicle Details page');
        }else if (status === 'in repair'){
            expect(this.inRepairIcon.isPresent()).toBe(true, 'There was no Icon available on Vehicle Details page');
        }
    };

    //Map Modal
    this.mapModalLink = element(by.css('[ng-click="$ctrl.showSimpleMapPopup($event)"]'));
    this.mapModal= element(by.css('[id="map"]'));
    this.mapModalCloseButton = element(by.css('[ng-click="$ctrl.closeMap()"]'));

    //More Options Actions
    this.setInRepair = function(){
        this.setInRepairBtn.click();
        this.confirmBtn.click();
        browser.sleep(10000);
    };

    this.removeInRepair = function(){
        expect(this.removeInRepairBtn.isPresent()).toBe(true);
        this.removeInRepairBtn.click();
        this.confirmBtn.click();
        expect(this.setInRepairBtn.isPresent()).toBe(true);
    };

    // Verify Data
    this.verifyVehicleDetailFaultLogListTableDataIsVisible = function() {
        expect(this.faultLogHeaders.getText()).toContain('Message Type', 'Message Type column is missing');
        expect(this.faultLogHeaders.getText()).toContain('Recommendation', 'Recommendation column is missing');
        expect(this.faultLogHeaders.getText()).toContain('Status', 'Status column is missing');
        expect(this.faultLogHeaders.getText()).toContain('System', 'System column is missing');
        expect(this.faultLogHeaders.getText()).toContain('Code', 'Code column is missing');
        expect(this.faultLogHeaders.getText()).toContain('Description', 'Description column is missing');
        expect(this.faultLogHeaders.getText()).toContain('Mileage', 'Mileage column is missing');
        expect(this.faultLogHeaders.getText()).toContain('SPN', 'SPN column is missing');
        expect(this.faultLogHeaders.getText()).toContain('FMI', 'FMI column is missing');
        expect(this.faultLogHeaders.getText()).toContain('Local Time', 'Local Time column is missing');
    };

    this.verifyNoDuplicateFaultsPresent = function() {
        var faultCodeArray =[];
        //var duplicatArray =[];
        this.allfaultLogRows.filter(function (row) {
            row.$$('td').get(4).getText().then(function (code) {
                faultCodeArray.push(code);

            });
        });
        console.log(faultCodeArray);
        faultCodeArray.filter(function(value,index,self){ if (self.indexOf(value) !== index ) console.log(value)});
        //console.log(duplicatArray);


    };

    this.checkForPageCount = function(expectedCount) {
        this.allfaultLogRows.count().then(function(count) {
            if(count<=expectedCount){
                expect(true).toBe(true);
            }
            else{
                expect(false).toBe(true,"The Expected Count on Vehicle Details Page Fault Log is Incorrect");
            }
        });
    };

    this.checkFaultLogsIsNotEmpty = () => {
        this.allfaultLogRows.count().then(count => {
            if(count > 0){
                expect(true).toBe(true)
            }
            else{
                expect(false).toBe(true, "The Expected Count on Vehicle Details Page Fault Log is Incorrect");
            }
        })
    }

    this.verifyColumn = function(desiredValue,whichColumn) {
        this.allfaultLogRows.filter(function (row) {
            return row.$$('td').get(whichColumn).getText().then(function (value) {
                console.log(value);
                expect(value).toContain(desiredValue, 'The types did not match');
            });
        }).then(function(){});
    };

    this.verifyRowColumn = (desiredValue, row, column) => {
        return this.allfaultLogRows.get(row).$$('td').get(column).getText().then( value => {
            expect(value).toMatch(desiredValue, `The expected value in row: ${row} and column: ${column} is incorrect`)
        })
    }
};

module.exports = new VehicleDetailPage();
