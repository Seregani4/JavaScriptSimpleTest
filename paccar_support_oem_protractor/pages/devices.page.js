/**
 * Created by Cottomoeller on 12/8/2015.
 */
var DevicesPage = function() {
    //Device List Header
    this.deviceCollectionHeader = element(by.className('page-header-title'));
    this.allDevicesCheckBox = element(by.css('[ng-click="toggleAll()"]'));
    this.devicesCheckboxSelected = element.all(by.css('[checked="checked"]'));
    //User Menu
    this.allDeviceRows = element.all(by.repeater('row in $ctrl.rows'));
    this.deviceListTableHeader = element(by.xpath('//thead'))
    //Device List Page
    this.refreshBtn = element(by.css('[ng-click="$ctrl.refresh()"]'));
    this.addCollectionBtn = element(by.css('[ng-click="$ctrl.addAllToNewCollection()"]'));
    this.exportCSVBtn = element(by.css('[ng-click="$ctrl.exportFileData()"]'));
    this.toastAlert = element(by.css('[role="alert"]'));

    this.vinDiscoveryBtn = element(by.partialButtonText('VIN Discovery'));
    this.pmgVersionRequestBtn = element(by.partialButtonText('PMG Version Request'));
    this.forceCallBtn = element(by.partialButtonText('Force Call'));

    //Device collection pop-up
    this.allCollecitonRow = element.all(by.repeater('row in $ctrl.rows'));

    //Export Button
    this.exportButton = element(by.cssContainingText('[type="button"]','file_download'));

    //Action Bar and Action Button
    //Actions Drop-Down
    this.exportButtonActionBar = element(by.cssContainingText('[role="menuitem"]','EXPORT'));
    this.addAllToCollectionActionBar = element(by.cssContainingText('[role="menuitem"]','ADD SELECTED TO A NEW COLLECTION'));
    this.addAllToAnExistingCollectionActionBar= element(by.cssContainingText('[role="menuitem"]','ADD SELECTED TO AN EXISTING COLLECTION'));
    this.forceCallActionButton = element(by.cssContainingText('[role="menuitem"]','FORCE CALL'));
    this.vinDiscoveryBtn = element(by.cssContainingText('[role="menuitem"]','VIN DISCOVERY'));
    this.pmgVersionRequestBtn = element(by.cssContainingText('[role="menuitem"]','PMG VERSION REQUEST'));
    this.deviceCollectionSearch =element(by.name('collectionSearch'));
    this.saveDeviceToDeviceCollectionButton =element(by.cssContainingText('[type="submit"]','save'));
    this.deviceDeleteAction=element(by.cssContainingText('[ng-click="textButton.click($event, $ctrl, $ctrl.getSelectedRows())"]','REMOVE'));
    this.addAllToCollection = element(by.cssContainingText('[type="button"]','ADD ALL TO A NEW COLLECTION'));
    this.addAllToAnExistingCollection= element(by.cssContainingText('[type="button"]','ADD ALL TO AN EXISTING COLLECTION'));
    this.addToCollecitonOkBtn = element(by.buttonText('OK'));

    //Creating a New Device Collection From Device List Page(Drop-Down
    this.addSelectedToCollectionButton =element(by.cssContainingText('[type="button"]','ADD SELECTED TO A NEW COLLECTION'));
    this.createNewCollectionButton =element(by.css('[ng-click="$ctrl.addSelectedToCollection()"]'));
    this.nameInputField =element(by.name('name'));
    this.collectionDescriptionInputField =element(by.name('description'));
    this.saveNewCollectionBtn=element(by.cssContainingText('[type="submit"]','save'));
    this.cancelNewCollectionButton=element(by.cssContainingText('[type="button"]','cancel'));

    //Search filter elements - repeated component from the element defined on Navigation page.
    this.searchFilterButton = element.all(by.cssContainingText('[type="button"]', 'filter_list'));
    this.chipFilter = element.all(by.css('[placeholder="Filter Results"] [type="search"]'));


    this.columns = {
        dsnColumn: {value: 1, name: 'Dsn Column'},
        deviceTypeColumn: {value: 2, name: 'Device Type Column'},
        userProfileColumn: {value: 3, name: 'User Profile Column'},
        licenseColumn: {value: 4, name: 'License Column'},
        vinColumnNumber: {value: 5, name: 'VIN Column'},
        pmgVerColumn: {value: 6, name: 'Device Version Column'},
        platformVerColumn: {value: 7, name: 'Platform Version Column'},
        engineMakeColumn: {value: 8, name: 'Engine Make Column'},
        engineModelColumn: {value: 9, name: 'Engine Module Column'},
        cidColumn: {value: 10, name: 'CID Column'},
        pfmCustomerColumn: {value: 11, name: 'PFM Customer Column'},
        customerColumn: {value: 12, name: 'Customer'},
        icapidColumn: {value: 13, name: 'icap id'},
        icapDeviceTypeColumn: {value: 14, name: 'icap device Type'},
        wifistatusColumn: {value: 15, name: 'WI-FI Status Column'},
        vidFirmwareVersionColumn: {value: 16, name: 'VID Firmware Version'},
        vidMcfColumn: {value: 17, name: 'VID MCF'},
        lastLocationDateColumn: {value: 18, name: 'Last Location Date'},
        lastCallEndTimeColumn: {value: 19, name: 'Last Call End Time'},
        lastUpdateColumn: {value: 20, name: 'Last Update'},
        stateColumn: {value: 21, name: 'State'}
    };



    ////////////////////////////////Device List Tab/////////////////////////////////
    //Table Headers:th
    var allColumns = element.all(by.className('md-column'));
    this.dsnColumnHeader = allColumns.get(this.columns.dsnColumn.value);
    this.typeColumnHeader = allColumns.get(this.columns.deviceTypeColumn.value);
    this.useProfileColumnHeader = allColumns.get(this.columns.userProfileColumn.value);
    this.licenseColumnHeader = allColumns.get(this.columns.licenseColumn.value);
    this.vinColumnHeader = allColumns.get(this.columns.vinColumnNumber.value);
    this.pmgVerColumnHeader = allColumns.get(this.columns.pmgVerColumn.value);
    this.engineMakeColumnHeader = allColumns.get(this.columns.engineMakeColumn.value);
    this.engineModelColumnHeader = allColumns.get(this.columns.engineModelColumn.value);
    this.cidColumnHeader = allColumns.get(this.columns.cidColumn.value);
    this.pfmCustomerColumnHeader = allColumns.get(this.columns.pfmCustomerColumn.value);
    this.customerColumnHeader = allColumns.get(this.columns.customerColumn.value);
    this.icapidColumnHeader = allColumns.get(this.columns.icapidColumn.value);
    this.icapDeviceTypeColumnHeader = allColumns.get(this.columns.icapDeviceTypeColumn.value);
    this.wifistatusColumnHeader = allColumns.get(this.columns.wifistatusColumn.value);
    this.vidFirmwareVersionColumnHeader = allColumns.get(this.columns.vidFirmwareVersionColumn.value);
    this.vidMcfColumnHeader = allColumns.get(this.columns.vidMcfColumn.value);
    this.lastLocationDateColumnHeader = allColumns.get(this.columns.lastLocationDateColumn.value);
    this.lastCallEndTimeColumnHeader = allColumns.get(this.columns.lastCallEndTimeColumn.value);
    this.lastUpdateColumnHeader = allColumns.get(this.columns.lastUpdateColumn.value);
    this.stateColumnHeader = allColumns.get(this.columns.stateColumn.value);


    this.checkForPageCount = function(expectedCount) {
        this.allDeviceRows.count().then(function(count) {
            expect(count).toBe(expectedCount);
        });
    };

    this.fillOutNewCollectionFields =function(name,description){
        this.nameInputField.sendKeys(name);
        this.collectionDescriptionInputField.sendKeys(description);
        this.saveNewCollectionBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/');
    };

    this.verifyDeviceCollectionHeader = function(header){
        expect(this.deviceCollectionHeader.getText()).toContain(header,'The Device List Header does not Match!')
    };

    this.clickDeviceCheckbox = function(DSN){
        this.allDeviceRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (selectedDSN) {
                return selectedDSN === DSN;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No DSN was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.clickFirstDeviceCheckbox = () => {
        this.allDeviceRows.filter(row => {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (selectedDSN) {
                return selectedDSN;
            });
        }).then(filteredRows => {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No device displayed');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.clickDsnUrl = function (dsn) {
        this.allDeviceRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (selectedDSN) {
                return selectedDSN === dsn;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No DSN was found by that name');
            }
            filteredRows[0].$$('a[ng-href="/#/nav/device/details/' + dsn + '"]').get(0).click();

        });
    };

    this.clickCollectionCheckbox = function(collectionName){
        this.allCollecitonRow.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (selectedName) {
                return selectedName === collectionName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No DSN was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.clickDeviceHyperlinkCellSearch = function (deviceName) {
        var _this1 = this;
        this.allDeviceRows.filter(function (row) {
            // index 2 for user names
            console.log(_this1.columns.dsnColumn.value);
            return row.$$('td').get(_this1.columns.dsnColumn.value).getText().then(function (name) {
                return name === deviceName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Device was found by that name: ' + deviceName);
            }
            filteredRows[0].element(by.linkText(deviceName)).click();
            //filteredRows[0].element(by.className('entity-link ng-binding')).click();
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/details/' + deviceName);

        });
    };

    // Verify Data
    this.verifyDeviceListTableDataIsVisible = function() {
        expect(this.deviceListTableHeader.getText()).toContain('DSN', 'DSN column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Device Type', 'Device Type column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Use Profile', 'Use Profile column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Licenses', 'Licenses column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('VIN', 'VIN column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Device Version', 'Device Version column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Engine Make', 'Engine Make column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Engine Model', 'Engine Model column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('CID', 'CID column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('PFM Customer', 'PFM Customer column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Customer', 'Customer column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('IcapId', 'IcapId column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Icap Device Type', 'Icap Device Type column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('WiFi Status', 'WiFi Status column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('VID Firmware Version', 'VID Firmware Version column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('VID MCF', 'VID MCF column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Last Location Date', 'Last Location Date column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Last Call End Time', 'Last Call End Time column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('Last Update', 'Last Update column is missing');
        expect(this.deviceListTableHeader.getText()).toContain('State', 'State column is missing');
        expect(this.allDeviceRows.count()).toBeGreaterThan(0);
    };

    //Column Verification
    this.verifyLastCallEndTimeColumnDsnSearch = function(firstData,secondData,firstColumn,secondColumn){
        this.allDeviceRows.filter(function (row) {
            return row.$$('td').get(firstColumn.value).getText().then(function (name) {
                return name === firstData;
            });
        }).then(function (filteredRows) {
            var secondColumnText = filteredRows[0].$$('td').get(secondColumn.value).getText();
            expect(secondColumnText).toContain(secondData,'The '+secondColumn.name+' are not similar.');
            //The "then" is needed so the filter function can complete the promise
        });
    };



    this.verifyVersionFromPmgVersionPage= function(data,column){//This Method is Used to Validate the Version Listed from the PMG Version Page
        this.allDeviceRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(column.value).getText().then(function (name) {
                expect(data).toContain(name,"The "+column.name+" Does not Match");
                //return name === deviceName;
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.verifyRemovedDeviceSearch= function(deviceName){
        this.allDeviceRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                expect(name).not.toBe(deviceName);
                //return name === deviceName;
            });


        });
    };

    this.verifyDeviceSearch = function(deviceName){
        this.allDeviceRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                expect(name).toBe(deviceName);
                return name === deviceName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Device was found by that name');
            }

        });
    };

    this.checkForToastAlert = function(){
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if(this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('The requested data will be sent to your email address.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        }else if(this.toastAlert.isDisplayed()){
            expect(this.toastAlert.getText()).toContain('Export of devices Failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

    this.typeInPopUpSearchFilter = function(name){
        //accessing the filter button on the pop up menu
        this.searchFilterButton.click();
        this.chipFilter.get(1).sendKeys(name);
        this.chipFilter.get(1).sendKeys(protractor.Key.ENTER);
    };
    this.getColumnHeadSelector = function (columnName) {
        return element(by.css('[md-order-by="' + columnName + '"]'));

    };

    this.verifySorting = function (columnNameArray) {
        var _this1 = this;
        columnNameArray.forEach(function (sortedBy) {
            var columnHead = _this1.getColumnHeadSelector(sortedBy);
            columnHead.click();
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/list/?page=0&pageSize=50&sort=' + sortedBy, 'It failed on this array Item: ' + sortedBy);
            _this1.verifyDeviceListTableDataIsVisible();
            columnHead.click();
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/list/?page=0&pageSize=50&sort=-' + sortedBy, 'It failed on this array Item: ' + sortedBy);
            _this1.verifyDeviceListTableDataIsVisible();
        });
    };

    this.clickVehicleHyperlinkCellSearch = function (vin) {
        var this1 = this;
        this.allDeviceRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(this1.columns.vinColumnNumber.value).getText().then(function (name) {
                return name === vin;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vehicle was found by that vin: ' + vin);
            } else {
                filteredRows[0].element(by.linkText(vin)).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vin);
            }
        });
    };
};

module.exports = new DevicesPage();
