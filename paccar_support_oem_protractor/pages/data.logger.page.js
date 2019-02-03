/**
 * Created by Popazov on 7/11/2017.
 */


var DataLoggerPage = function () {

    this.activateTabButton = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(0);
    this.deactivateTabButton = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(1);
    this.dataLoggerConfigManagementTitle = element(by.className('page-header-title'));
    this.activeDevicesListTableHeader = $('tr').$$('th');
    this.allActiveDevicesRows = element.all(by.repeater('row in $ctrl.rows'));
    this.vinsToActivateInput = element(by.name('vinsToActivate'));
    this.vinsToDeactivateInput = element(by.name('vinsToDeactivate'));
    this.resetButton = element(by.buttonText('Reset'));
    this.activateButton = element(by.buttonText('Activate'));
    this.deactivateButton = element(by.buttonText('Deactivate'));

    //ColumnNumbers
    var vinColumn = 1;
    var dsnColumn = 2;
    var deviceTypeColumn = 3;
    var activationDateColumn = 4;

    this.verifyIsDataInTablePresent = function () {
        expect(this.allActiveDevicesRows.count()).toBeGreaterThan(0, 'Table Data is missing');
    };

    this.verifyAllElementsPresentOnPage = function () {
        expect(this.activateTabButton.isDisplayed()).toBe(true, 'Activate tab is missing');
        expect(this.deactivateTabButton.isDisplayed()).toBe(true, ' Deactivate tab is missing');
        expect(this.dataLoggerConfigManagementTitle.getText()).toBe('Data Logger Configuration Management', '');
        expect(this.vinsToActivateInput.isDisplayed()).toBe(true, 'Vins to activate input field is missing');
        expect(this.resetButton.isDisplayed()).toBe(true, 'Reset button is missing');
        expect(this.activateButton.isDisplayed()).toBe(true, 'Activate button is missing');
    };

    this.verifyActiveDeviceListTableDataIsVisible = function () {
        var tableText = this.activeDevicesListTableHeader.getText();
        expect(tableText).toContain('VIN', 'VIN column is missing');
        expect(tableText).toContain('DSN', 'DSN column is missing');
        expect(tableText).toContain('DEVICE TYPE', 'DEVICE TYPE column is missing');
        expect(tableText).toContain('ACTIVATION DATE', 'ACTIVATION DATE column is missing');
        this.verifyIsDataInTablePresent();
    };


    this.verifyVinColumn = function (vin) {
        this.verifyIsDataInTablePresent();
        this.allActiveDevicesRows.filter(function (row) {
            return row.$$('td').get(vinColumn).getText().then(function (vinId) {
                expect(vinId).toContain(vin, 'The Ids did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.verifyDsnColumn = function (dsn) {
        this.verifyIsDataInTablePresent();
        this.allActiveDevicesRows.filter(function (row) {
            return row.$$('td').get(dsnColumn).getText().then(function (dsnId) {
                expect(dsnId).toContain(dsn, 'The Ids did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };


    this.verifyDeviceTypeColumn = function (type) {
        this.verifyIsDataInTablePresent();
        this.allActiveDevicesRows.filter(function (row) {
            return row.$$('td').get(deviceTypeColumn).getText().then(function (deviceType) {
                expect(deviceType).toContain(type, 'The Types did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.verifyActivationDateColumn = function (date) {
        this.verifyIsDataInTablePresent();
        this.allActiveDevicesRows.filter(function (row) {
            return row.$$('td').get(activationDateColumn).getText().then(function (activationDate) {
                expect(activationDate).toContain(date, 'The Dates did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };


};

module.exports = new DataLoggerPage();