/**
 * Created by pshrestha on 4/10/2017.
 */

var VehicleGroupPage = function () {

    var toastUtil = require('../utilities/toastMessage.util');

    //////////Elements on the Customer's Vehicle Group Tab////////////
    this.allAvailableVehicles = element.all(by.repeater('vehicle in ctrl.vehicles | filter:filter'));
    this.allGroupVehicles = element.all(by.repeater('vehicle in ctrl.groupVehicles | filter:filter'));
    this.vehicleFilterBar = element(by.model('filter'));
    //this.addVehicleToGroupBtn = element(by.css('[ng-click="ctrl.addToGroup(vehicle)"]'));
    //this.addVehicleToGroupBtn = element(by.css('[ng-click="ctrl.group.addToGroup(vehicle)"]'));
    //this.removeVehicleFromGroupBtn = element(by.css('[ng-click="ctrl.removeFromGroup(vehicle)"]'));
    //this.removeVehicleFromGroupBtn = element(by.css('[ng-click="ctrl.group.removeFromGroup(vehicle)"]'));
    this.doneBtn = element(by.linkText('Done'));
    this.allVehiclesDiv = element(by.css('[ng-hide="group.vehiclesLoaded"]'));

    //////////Elements on the Users's Vehicle Group Tab////////////
    this.vehicleGroupHeading = element(by.cssContainingText(['class="md-title ng-binding ng-scope"'], 'Vehicle Groups'));
    this.vehicleGroupHeader = element.all(by.xpath("(//table)[3]//tr[1]/th"));
    this.allVehicleGroupRows = element.all(by.repeater('row in $ctrl.rows'));
    this.selectAllCheckbox = element(by.css('[aria-label="Select All"]'));

    /////////////////ActionBar//////////////////
    //Main Action Items on Top Right Side of a Page
    this.moreOptionsBtn = element.all(by.cssContainingText('[type="button"]', 'more_vert')).get(0);
    this.addActionBtn = element(by.css('[aria-label="add"]'));
    this.editActionBtn = element(by.buttonText('edit'));

    //Action Bar and Action Button
    this.actionBarVehGrp = element(by.css('[ng-show="$ctrl.listContext.selectedRows.length"]'));

    //Pagination

    this.userVgPageSizeButton = element.all(by.css('[ng-model="$pagination.limit"]')).get(2);
    this.pageTenButton = element.all(by.repeater('option in $pagination.limitOptions')).get(6);
    this.pageTwentyFiveButton = element.all(by.repeater('option in $pagination.limitOptions')).get(7);
    this.pageFiftyButton = element.all(by.repeater('option in $pagination.limitOptions')).get(8);

    //Actions Bar Options
    //this.actionBarMoreOptionsBtn = element.all(by.cssContainingText('[type="button"]', 'more_vert')).get(1);
    this.manageGroup = element(by.cssContainingText('[type="button"]', 'Manage Group'));
    this.deleteGroupBtn = element.all(by.xpath('//button[@ng-click="$ctrl.owner.deleteVehicleGroup($ctrl.vehiclegroup)"]')).last();
    this.subscribeGroup = element(by.cssContainingText('[type="button"]', 'Subscribe'));
    this.unSubscribeGroup = element(by.cssContainingText('[type="button"]', 'Unsubscribe'));
    this.deleteActionBtn = element(by.buttonText('delete'));
    this.deleteDialogBtn = element(by.cssContainingText('[ng-click="dialog.hide()"]', 'Delete'));
    //this.searchFilterButton = element(by.css('[ng-if="$ctrl.toolbarOptions.filterButton"]'));
    this.searchFilterButton = element(by.className('md-icon-button list-filter-button md-button ng-scope md-default-theme md-ink-ripple'));
    this.chipFilter = element.all(by.css('[placeholder="Filter Results"] [type="search"]'));
    this.chipFilterCloseBtn = element(by.css('[ng-if="$mdChipsCtrl.isRemovable()"]'));
    this.allChips = element.all(by.className('md-chip-content'));
    this.chipFilterResults = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]')); //Stores the result of a search on the chip filter in an array.
    this.clearAllFiltersButton = element(by.css('[ng-click="$ctrl.clearChips()"]'));
    this.rowFromVehicleGroup = element.all(by.xpath('(//tbody)[3]//tr/td[1]'));

    /////////Add new group pop-up///////////
    this.popUpForm = element(by.xpath('//md-dialog[@role="dialog"]'));
    this.vehicleGroupName = element(by.model('$ctrl.vehicleGroup.name'));
    this.vehicleGroupDesc = element(by.model('$ctrl.vehicleGroup.description'));
    this.cancelButton = element(by.xpath('//button[@aria-label="cancel"]'));
    this.saveButton = element(by.xpath('//button[@aria-label="save"]'));
    this.errorMessage = element(by.xpath('//ng-message[@when="duplicated"]'));
    this.maxLengthMessage = element(by.xpath('//ng-message[@when="maxlength"]'));

    /////////Vehicle Group Detail//////////
    this.editVehicleGroupBtn = element(by.cssContainingText('[type="button"]', 'edit'));
    this.vehicleGroupMoreOption = element(by.css('[aria-label="Open more menu"]'));
    this.deleteVgButton = element(by.css('[ng-click="$ctrl.confirmDeleteGroup()"]'));
    this.groupSaveButton = element(by.cssContainingText('[type="button"]', 'save'));
    this.addVehicleToGroupBtn = element(by.cssContainingText('[type="button"]', 'add'));
    this.addVinField = element(by.model('$ctrl.vins'));
    this.confirmAddVehicleButton = element(by.cssContainingText('[ng-click="$ctrl.add()"]', 'Add'));

    ////////VIN list in Vehicle Group//////////
    this.allVehicleRows = element.all(by.repeater('row in $ctrl.rows'));
    this.vehicleMoreOptionsBtn = element(by.cssContainingText('[type="button"]', 'more_vert'));
    this.removeFromGroupBtn = element(by.cssContainingText('[type="button"]', 'REMOVE FROM GROUP'));
    this.removeVehicleIcon = element(by.cssContainingText('[type="button"]', 'remove_circle')); //icon to remove VIN through checkbox.
    this.viewVehicleDetailsBtn = element.all(by.cssContainingText('[type="button"]', 'VIEW VEHICLE DETAILS'));
    this.deleteFromGroupButton = element(by.cssContainingText('[type="button"]', 'Yes'));

    // Verify Data
    this.verifyVehicleGroupTableIsVisible = function () {
        //expect(this.selectAllCheckbox.isDisplayed()).toBe(true, 'The Select All Checkbox is missing.');
        expect(this.vehicleGroupHeader.getText()).toContain('Group Name', 'Group Name column is missing.');
        expect(this.vehicleGroupHeader.getText()).toContain('Description', 'Description column is missing.');
        expect(this.vehicleGroupHeader.getText()).toContain('# of Vehicles', '# of Vehicles Time column is missing.');
        expect(this.vehicleGroupHeader.getText()).toContain('Subscribed', 'Subscribed Time column is missing.');
    };

    this.createVehicleGroup = function (groupName, groupDescription) {
        this.addActionBtn.click();
        this.vehicleGroupName.sendKeys(groupName);
        this.vehicleGroupDesc.sendKeys(groupDescription);
        this.saveButton.click();
    };

    this.clickVehicleGroupMoreOptions = function (groupName) {
        this.allVehicleGroupRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(0).getText().then(function (name) {
                return name === groupName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vehicle Group was found by: ' + groupName);
            }
            filteredRows[0].$$('td').get(4).$('button').click();
        });
    };

    this.clickVinCheckbox = function (vin) {
        this.allVehicleGroupRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(6).getText().then(function (name) {
                return name === vin;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vin was found by: ' + vin);
            }
            filteredRows[0].$$('td').get(0).$('md-checkbox').click();
        });
    };

    this.editVehicleGroup = function (newGroupName, newDescription) {
        this.editVehicleGroupBtn.click();
        this.vehicleGroupName.click();
        this.vehicleGroupName.clear();
        this.vehicleGroupName.sendKeys(newGroupName);
        this.vehicleGroupDesc.click();
        this.vehicleGroupDesc.clear();
        this.vehicleGroupDesc.sendKeys(newDescription);
        this.groupSaveButton.click();
    };

    this.addVinToVehicleGroup = function (vin) {
        this.addVinField.sendKeys(vin);
        this.confirmAddVehicleButton.click();
    };

    this.verifygroupIsNotInList = function (groupName) {
        return this.allVehicleGroupRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (name) {
                expect(name).not.toContain(groupName);
            });
        }).then(function () {
        }); //This .then is needed for the function to complete the promise.
    };

    this.verifyCustomerList = function (groupName) {
        return this.allVehicleGroupRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (name) {
                console.log(name);
                expect(name).toContain(groupName);
            });
        }).then(function () {
        }); //This .then is needed for the function to complete the promise.
    };

    this.typeInSearchFilter = function (input) {
        this.chipFilter.get(2).sendKeys(input);
        this.chipFilter.get(2).sendKeys(protractor.Key.ENTER);

    };

    this.typeInSearchFilterRecommendation = function (input) {
        this.chipFilter.get(1).sendKeys(input);
        browser.sleep(2000);
        this.chipFilterResults.get(1).click();
    };

    this.verifyReadAndWritePermission = function (groupName, groupDescription, newGroupName, newDescription, vin) {
        expect(this.addActionBtn.isDisplayed()).toBe(true, 'The Add Group button not is present. (Bug for FactoryWorker)');
        this.createVehicleGroup(groupName, groupDescription);
        browser.sleep(2000);
        this.typeInSearchFilter(groupName);
        this.clickVehicleGroupMoreOptions(groupName);
        expect(this.subscribeGroup.isDisplayed()).toBe(false, 'Subscribe option is present');
        this.manageGroup.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url +
            '/#/nav/vehicleGroup/details/peoplenet:vehiclegroup:');
        this.editVehicleGroup(newGroupName, newDescription);
        this.addVehicleToGroupBtn.click();
        this.addVinToVehicleGroup(vin);
        this.chipFilter.get(0).sendKeys(vin);
        this.chipFilter.get(0).sendKeys(protractor.Key.ENTER);
        this.clickVinCheckbox(vin);
        this.removeVehicleIcon.click();
        this.deleteFromGroupButton.click();
        this.vehicleGroupMoreOption.click();
        expect(this.subscribeGroup.isDisplayed()).toBe(false, 'Subscribe option is present');
        browser.sleep(1000);
        this.deleteVgButton.click();
        this.deleteDialogBtn.click();
    };

    this.verifyReadOnlyPermission = function (groupName) {
        expect(this.addActionBtn.isDisplayed()).toBe(false, 'The Add Group button is present');
        this.typeInSearchFilter(groupName);
        this.clickVehicleGroupMoreOptions(groupName);
        expect(this.deleteGroupBtn.isDisplayed()).toBe(false, 'The Delete Group button is present.');
        expect(this.subscribeGroup.isDisplayed()).toBe(false, 'The Subscribe to Group button is present.');
        this.manageGroup.click();
        expect(this.editVehicleGroupBtn.isPresent()).toBe(false, 'The Edit Vehicle Group button is present.');
    };

    this.deleteVehicleGroup = function (groupName, toastMessage) {
        var _this1 = this;
        this.rowFromVehicleGroup.getText().then(text =>{
            for (var i = 0; i < text.length; i++) {
                if (text[i] === groupName) {
                    _this1.clickDeleteButton(i + 1);
                    toastUtil.verifyToastAlert(toastMessage, `Wrong toast, Vehicle group was't delete`);
                }
            }
        });
    };

    this.clickDeleteButton = rowButton => {
        element(by.xpath('(//vehicle-group-list-actions/md-menu/button[@ng-click="$mdOpenMenu($event)"])[' + rowButton + ']')).click();
        this.deleteGroupBtn.click();
        this.deleteDialogBtn.click();
    }
};

module.exports = new VehicleGroupPage();