/**
 * Created by pshrestha on 3/21/2017.
 */

var RemoteDiagnosticsPage = function() {

    this.navigationPage = require('../pages/navigation.page.js');
    this.vinHeaders = element.all(by.tagName('th'));
    this.allVinRows = element.all(by.repeater('row in $ctrl.rows'));
    this.toastAlert = element(by.css('[role="alert"]'));
    this.preferredDealerCheckbox = element(by.id('dealer-details-preferred-dealer-checkbox'));
    this.chipFilter = element(by.css('[placeholder="Filter Results"] [type="search"]'));
    this.chipFilterCloseBtn = element.all(by.css('[md-svg-icon="md-close"]')).get(0);
    this.exportButton = element(by.css('[ng-show="!iconButton.visible || iconButton.visible()"]'));
    this.reactivateTab = element.all(by.xpath("//md-tab-item")).last();
    this.deactivateTab = element.all(by.xpath("//md-tab-item")).first();
    this.vinsLimitMessage = element.all(by.xpath("//ng-message[@when = 'vins_limit']"));
    this.deactivateVinInput = element(by.xpath("//textarea[@name = 'vinsToDeactivate']"));
    this.reactivateVinInput = element(by.xpath("//textarea[@name = 'vinsToReactivate']"));
    this.deactivateButton = element(by.xpath("//button[@ng-disabled = '!$ctrl.vinsToDeactivate']"));
    this.confirmDeactivateBtn = element(by.xpath('//button[@ng-click="dialog.hide()"]'));
    this.reactivateButton = element(by.xpath("//button[@ng-disabled = '!$ctrl.vinsToReactivate']"));
    this.deactivateResetButton = element(by.xpath("//button[@ng-click = '$ctrl.resetDeactivateForm()']"));
    this.reactivateResetButton = element(by.xpath("//button[@ng-click = '$ctrl.resetReactivateForm()']"));
    this.popUpConfirmationButton = element(by.css('[ng-click="dialog.hide()"]'));
    this.popUpCancelnButton = element(by.css('[ng-click="dialog.abort()"]'));
    this.reactivateRowMenuButton = element(by.css('[ng-click="iconButton.click($event, $ctrl, $ctrl.getSelectedRows())"]'));
    this.selectAllCheckBox = element(by.xpath("//md-checkbox[@ng-checked = 'allSelected()']"));
    this.textFromRemoteDiagnoscticsPage = element.all(by.xpath('//div[@id="remote-diagnostics-deactivate-actions"]'));
    this.textFromRemoteDiagnoscticsButtons = element.all(by.xpath('//div[@layout-align="end start"]'));

    //Actions Drop-Down
    this.viewDetailsActionButton= element(by.css('[aria-label="info"]'));
    this.deleteActionButton= element(by.css('[aria-label="delete"]'));

    //Removal Category from drop-down menu
    this.removalCategoryDropDown = element(by.xpath('//md-select-value'));
    this.customerRequested = element.all(by.xpath('//md-option[@ng-repeat="removalCategory in $ctrl.removalCategories"]')).get(0);
    this.outOfService = element.all(by.xpath('//md-option[@ng-repeat="removalCategory in $ctrl.removalCategories"]')).get(1);
    this.subscriptionExpired = element.all(by.xpath('//md-option[@ng-repeat="removalCategory in $ctrl.removalCategories"]')).get(2);
    this.invalidVin = element.all(by.xpath('//md-option[@ng-repeat="removalCategory in $ctrl.removalCategories"]')).get(3);

    //Chip filters removal category
    this.chipFilterRemoval = element.all(by.xpath('//li[@md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    // get(0) - invalidVin
    // get(1) - Out of Service
    // get(2) - Customer Requested
    // get(3) - Subscription Expired

    //Value from tabel
    this.vinColumn = element.all(by.xpath('//tr/td[2]'));
    this.dsnColumn = element.all(by.xpath('//tr/td[3]'));
    this.makeColumn = element.all(by.xpath('//tr/td[4]'));
    this.removalCategoryColumn = element.all(by.xpath('//tr/td[5]'));
    this.deactivationDateColumn = element.all(by.xpath('//tr/td[6]'));

    //Reactivate Page
    // this.addDealerBtn = element(by.css('[ng-href="/#/nav/dealer/add"]'));
    // this.nameField = element(by.name('name'));
    // this.emailField = element(by.name('email'));
    // this.idField = element(by.name('id'));
    // this.latitudeField = element(by.name('lat'));
    // this.longitudeField = element(by.name('lon'));
    // this.geofencesHeader = element(by.cssContainingText('.md-subheader-content', 'Geofences'));
    // this.locationsHeader = element(by.cssContainingText('.md-subheader-content', 'Locations'));
    // this.phoneNumbersHeader = element(by.cssContainingText('.md-subheader-content', 'Phone Numbers'));
    // this.hoursOfServiceHeader = element(by.cssContainingText('.md-subheader-content', 'Hours of Service'));
    // this.cancelBtn = element(by.cssContainingText('[type="button"]', 'cancel'));
    // this.saveBtn = element(by.css('[type="submit"]'));

    this.columns = {
        vinColumn: {value: 1, name: 'vin'},
        dsnColumn: {value: 2, name: 'dsn'},
        makeColumn: {value: 3, name: 'Make'},
        removalCategoryColumn: {value: 4, name: 'Removal Category'},
        deactivationDateColumn: {value: 5, name: 'Deactivation Date'},
    };



    this.get = function() {
        browser.get('/#/nav/remoteDiagnostics/deactivate/');
        browser.sleep(1000);
    };

    this.checkForToastAlert = function(){
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if(this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of vehicles with deactivated remote diagnostics succeeded.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        }else if(this.toastAlert.isDisplayed()){
            expect(this.toastAlert.getText()).toContain('Export of vehicles with deactivated remote diagnostics Failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

    this.clickVinHyperlinkCellSearch = function (VIN) {
        this.allVinRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return name === VIN;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vehicle was found by that vin: ' + VIN);
            } else {
                filteredRows[0].element(by.linkText(VIN)).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + VIN);
            }
        });
    };

};

module.exports = new RemoteDiagnosticsPage();