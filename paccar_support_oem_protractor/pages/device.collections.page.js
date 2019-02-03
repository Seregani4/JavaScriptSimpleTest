/**
 * Created by Cottomoeller on 5/24/2016.
 */
var DevicesPage = function() {
    this.deviceCollectionTableHeaders =  element.all(by.tagName('th'));
    this.allDeviceCollectionsRows = element.all(by.repeater('row in $ctrl.rows'));

     ////////////Action Bar//////////////////////////////
    this.deviceCollectionsActionBar = element(by.css('[chip-filter-options="$ctrl.chipFilterOptions"]'));
    this.actionsList = element.all(by.xpath("//md-menu-item[@ng-repeat = 'textButton in $ctrl.textButtons' ]/button"));
    this.editButton=element(by.cssContainingText('[role="menuitem"]','EDIT'));
    this.vinDiscoveryButton=element(by.cssContainingText('[role="menuitem"]','VIN DISCOVERY'));
    this.pmgVersionRequestButton=element(by.cssContainingText('[role="menuitem"]','PMG VERSION REQUEST'));
    this.forceCallButton =element(by.cssContainingText('[role="menuitem"]','FORCE CALL'));
    this.otapButton =element(by.cssContainingText('[role="menuitem"]','OTAP'));
    this.deleteButton=element(by.cssContainingText('[role="menuitem"]','DELETE'));
    this.deleteDeviceCollectionDialog=element(by.cssContainingText('[type="button"]','Delete'));

    //Creating a New Device Collection Variables
    this.createNewCollectionButton  = element (by.cssContainingText('[type="button"]','CREATE NEW COLLECTION'));
    this.nameInputField =element(by.name('name'));
    this.descriptionInputField =element(by.name('description'));
    this.saveNewCollectionButton=element(by.cssContainingText('[type="submit"]','save'));
    this.cancelNewCollectionButton=element(by.cssContainingText('[type="button"]','cancel'));
    this.nameIsRequiredErrorMessage =element(by.css('[for="$ctrl.form.name.$error"]'));

    //this.editBtn = element(by.partialButtonText('EDIT'));
    //this.deleteBtn = element(by.partialButtonText('DELETE'));
    //this.otapBtn = element(by.partialButtonText('OTAP'));
    //this.vinDiscoveryBtn = element(by.partialButtonText('VIN Discovery'));
    //this.pmgVersionRequestBtn = element(by.partialButtonText('PMG Version Request'));
    //this.forceCallBtn = element(by.partialButtonText('Force Call'));


    ///////////////////////////Device Collections Tab/////////////////////////////////////

    //DeviceCollection Column Number
    this.columns = {
        nameColumn: {value: 1, name: 'Name Column'},
        descriptionColumn: {value: 2, name: 'Description Column'},
        deviceTagsColumn: {value: 3, name: 'Device Tags Column'},
        numberOfDevicesColumn: {value: 4, name: '# Of devices'}
    };

    //Column Header
    this.nameColumnHeader = element.all(by.className('md-column')).get(1);





    this.verifyDeviceCollectionsTableDataIsVisible = function() {
        expect(this.deviceCollectionTableHeaders.getText()).toContain('Name', 'Name column is missing');
        expect(this.deviceCollectionTableHeaders.getText()).toContain('Description', 'Description column is missing');
        expect(this.deviceCollectionTableHeaders.getText()).toContain('Device Tags', 'Device Tags column is missing');
        expect(this.deviceCollectionTableHeaders.getText()).toContain('# Of Devices', '# Of Devices column is missing');
        expect(this.allDeviceCollectionsRows.count()).toBeGreaterThan(0);
    };

    this.checkForPageCount = function(expectedCount) {
        this.allDeviceCollectionsRows.count().then(function(count) {
            expect(count).toBe(expectedCount);
        });
    };

    this.clickDeviceCollectionHyperlinkCellSearch = function (deviceCollectionName) {
        this.allDeviceCollectionsRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return name === deviceCollectionName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Device Collection was found by that name: ' + deviceCollectionName);
            }
            filteredRows[0].element(by.linkText(deviceCollectionName)).click();
            //filteredRows[0].element(by.className('entity-link ng-binding')).click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/?collection');

        });
    };

    this.clickDeviceCollectionCheckbox = function(name){
        this.allDeviceCollectionsRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (selectedName) {
                return selectedName === name;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Device Collection was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.verifyRemovedDeviceCollectionSearch= function(deviceCollectionName){
        var  _this1 = this;
        this.allDeviceCollectionsRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(_this1.columns.nameColumn.value).getText().then(function (name) {
                expect(name).not.toBe(deviceCollectionName);
                //return name === deviceName;
            });
        });
    };
    this.fillOutNewCollectionFields =function(name,description){
        this.nameInputField.sendKeys(name);
        this.descriptionInputField.sendKeys(description);
        this.saveNewCollectionButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/');
    };

};

module.exports = new DevicesPage();
