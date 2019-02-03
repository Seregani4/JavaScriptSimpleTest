/**
 * Created by jelliott on 7/20/2016.
 */
/**
 * Edited by pshrestha on 7/20/2016.
 */

var DetailsPage = function () {

    this.dsn = element(by.cssContainingText('.ng-binding'), browser.params.vehicle.vin);

    /////////////////////////Reports////////////////////////////////////////////////////
    this.softwareVersionHistoryButton = element.all(by.css('[class="md-primary md-fab md-mini md-button md-default-theme md-ink-ripple"]')).get(3);
    this.eventsButton = element.all(by.css('[class="md-primary md-fab md-mini md-button md-default-theme md-ink-ripple"]')).get(0);

    ////////////////////////Device Details Card/////////////////////////////////////////
    this.allDeviceDetailRows = element.all(by.xpath('//md-card-content/div[@ng-hide]/div//tr/td[1]'));

    ////////////////////////Last call card//////////////////////////////////////////////
    this.lastCallCard = element(by.css('[class="last-call-card _md md-default-theme flex-gt-sm-50 flex-auto"]'));
    this.lastLocationCard = element(by.css('[class="last-location-card _md md-default-theme flex-auto"]'));
    this.lastCallCardTitle = element(by.cssContainingText('[class="md-title ng-binding"]', 'Last Call'));
    this.lastLocationCardTitle = element(by.cssContainingText('[class="md-title ng-binding"]', 'Last Location'));
    this.lastCallCardInfo = element(by.css('[ng-show="$ctrl.device.deviceRecord"]'));
    this.lastLocationCardInfo = element(by.css('[class="geo-coordinates"]'));
    this.lastLocationMap = element(by.css('[class="thumbnail-container hide-xs"]'));
    this.mapModal= element(by.css('[id="map"]'));
    this.mapModalCloseButton = element(by.css('[ng-click="$ctrl.closeMap()"]'));
    this.callStart = element(by.cssContainingText('[class="ng-binding"]', 'Start:'));
    this.callStartResult = element.all(by.css('[title="Local Time"]')).get(0);
    this.callEnd = element(by.xpath('//device-details//div[1]//md-card-content/div/table/tbody/tr[2]'));
    this.callEndResult = element.all(by.css('[title="Local Time"]')).get(1);
    this.callReason = element(by.cssContainingText('[class="ng-binding"]', 'Reason:'));
    this.callReasonResult = element.all(by.css('[class="ng-binding"]')).get(13);
    this.callResult = element(by.cssContainingText('[class="ng-binding"]', 'Result:'));
    this.callResultText = element.all(by.css('[class="ng-binding"]')).get(4);
    this.actionButton = element(by.css('[aria-label="Open Device Action Menu"]'));
    this.forceCallButton = element(by.xpath('//md-menu-item/button[@ng-click="$ctrl.device.forceCall()"]'));
    this.softRebootBtn = element(by.xpath('//md-menu-item/button[@ng-click="$ctrl.device.softReboot()"]'));
    this.hardRebootBtn = element(by.xpath('//md-menu-item/button[@ng-click="$ctrl.device.hardReboot()"]'));
    this.clearNVRAMBtn = element(by.partialButtonText('Clear Agent NVRAM'));
    this.viewDebugLogsBtn = element(by.partialButtonText('View Debug Logs'));
    this.enableWiFiBtn = element(by.partialButtonText('Enable Wi-Fi'));
    this.disableWiFiBtn = element(by.partialButtonText('Disable Wi-Fi'));
    this.vinDiscoveryBtn = element(by.partialButtonText('VIN Discovery'));
    this.pmgVersionRequestBtn = element(by.partialButtonText('PMG Version Request'));
    this.runDiagnosticBtn = element(by.xpath('//md-menu-item/button[@ng-click="$ctrl.device.diagnostics()"]'));
    this.yesButton = element(by.xpath('//md-dialog-actions/button[@ng-click="dialog.hide()"]'));
    //this.closeButton = element(by.cssContainingText('[type="button"]', 'Close'));
    this.closeButton = element(by.buttonText('Close'));
    this.successMessage = element(by.cssContainingText('[class="ng-binding"]', 'request sent'));
    this.diagnosticModal = element(by.css('[aria-label="Diagnostic Device ..."]'));
    this.wifiStatus = element.all(by.css('[class="details-card _md md-default-theme')).$$('table').get(2).$$('tr').get(8).$$('td').get(1);
    this.dialogContent = element(by.xpath('//md-dialog-content'));

    this.verifyLastCallCardInfo = function () {
        expect(this.lastCallCard.isDisplayed()).toBe(true, 'The last call card is missing.');
        expect(this.lastCallCardInfo.isDisplayed()).toBe(true, 'The last call card is blank.');
        expect(this.callStart.isDisplayed()).toBe(true, 'The call Start title is missing.');
        expect(this.callEnd.isDisplayed()).toBe(true, 'The call End title is missing.');
    };

    this.verifyLastLocationCardInfo = function () {
        expect(this.lastLocationCard.isDisplayed()).toBe(true, 'The last location card is missing.');
        expect(this.lastLocationCardTitle.isDisplayed()).toBe(true, 'The last location title is blank.');
        expect(this.lastLocationCardInfo.isDisplayed()).toBe(true, 'The last location card is blank.');
    };

    this.verifyCallStartData = function () {
        //this can be used to grab the exact element from the DOM
        //this.lastCallCardInfo.$$('tbody').$$('tr').get(0).$$('td').get(1).getText().then(function (text) {
        this.callStartResult.getText().then(function (text) {
            // console.log(text);
            // console.log(text.length);
            expect(text.length).not.toEqual(0, 'Call start field is blank.');
        });
    };

    this.verifyCallEndData = function () {
        //this can be used to grab the exact element from the DOM
        //this.lastCallCardInfo.$$('tbody').$$('tr').get(1).$$('td').get(1).getText().then(function (text) {
        this.callEndResult.getText().then(function (text) {
            // console.log(text);
            // console.log(text.length);
            expect(text.length).not.toEqual(0, 'Call end result field is blank.');
        });

    };

    this.verifyCallReasonData = function () {
        this.lastCallCardInfo.$$('tbody').$$('tr').get(2).$$('td').get(1).getText().then(function (text) {
            // console.log(text);
            // console.log(text.length);
            expect(text.length).not.toEqual(0, 'Call reason field is blank.');
        });
    };

    this.verifyCallResultData = function () {
        this.lastCallCardInfo.$$('tbody').$$('tr').get(3).$$('td').get(1).getText().then(function (text) {
            // console.log(text);
            // console.log(text.length);
            expect(text.length).not.toEqual(0, 'Call result field is blank.');
        });
    };

    this.verifyLastLocationTimeStampData = function () {
        this.lastLocationCardInfo.$$('table').$$('tbody').$$('tr').get(0).$$('td').get(1).getText().then(function (text) {
            // console.log(text);
            // console.log(text.length);
            expect(text.length).not.toEqual(0, 'TimeStamp field is blank.');
        });
    };

    this.verifyLastLocationLatitudeData = function () {
        this.lastLocationCardInfo.$$('table').$$('tbody').$$('tr').get(1).$$('td').get(1).getText().then(function (text) {
            // console.log(text);
            // console.log(text.length);
            expect(text.length).not.toEqual(0, 'Latitude field is blank');
        });
    };

    this.verifyLastLocationLongitudeData = function () {
        this.lastLocationCardInfo.$$('table').$$('tbody').$$('tr').get(2).$$('td').get(1).getText().then(function (text) {
            // console.log(text);
            // console.log(text.length);
            expect(text.length).not.toEqual(0, 'Longitude field is blank.');
        });
    };

    this.verifyLastLocationMap = function () {
        expect(this.lastLocationMap.isDisplayed()).toBe(true, 'The map is missing.');
        this.lastLocationMap.click();
        expect(this.mapModal.isDisplayed()).toBe(true, 'The enlarged map did not load.');
        this.mapModalCloseButton.click();
    };

    this.verifyDeviceDetailsForOEM = function (user) {
        this.verifyLastCallCardInfo();
        this.verifyLastLocationCardInfo();
        this.verifyLastLocationTimeStampData();
        this.verifyLastLocationLatitudeData();
        this.verifyLastLocationLongitudeData();
        this.actionButton.click();
        if (user === browser.params.testuseremails.paccaradmin) {
            expect(this.forceCallButton.isDisplayed()).toBe(true, 'Force call menu option is not  displayed for ' + user);
        } else {
            expect(this.forceCallButton.isDisplayed()).toBe(false, 'Force call menu option is displayed for ' + user);
        }
        expect(this.softRebootBtn.isDisplayed()).toBe(false, 'Soft Reboot menu option is displayed for ' + user);
        expect(this.hardRebootBtn.isDisplayed()).toBe(true, 'Hard Reboot menu option is not displayed for ' + user);
        expect(this.clearNVRAMBtn.isDisplayed()).toBe(false, 'Clear NVRAM menu option is displayed for ' + user);
        expect(this.runDiagnosticBtn.isDisplayed())
            .toBe(true, 'Run Diagnostic menu option is not displayed for ' + user);
        expect(this.viewDebugLogsBtn.isDisplayed())
            .toBe(false, 'View Debug Logs menu option displayed for ' + user);
        expect(this.enableWiFiBtn.isPresent()).toBe(false, 'Enable Wi-Fi menu option is displayed for ' + user);
        expect(this.vinDiscoveryBtn.isDisplayed())
            .toBe(true, 'VIN Discovery menu option is not displayed for ' + user);
        expect(this.pmgVersionRequestBtn.isDisplayed())
            .toBe(false, 'PMG Version Request menu option is displayed for ' + user);
    };

    this.performAction = function (action) {
        var actionName = element(by.cssContainingText('[type="button"]', action));
        this.actionButton.click();
        actionName.click();
        this.yesButton.click();
        var ec = protractor.ExpectedConditions;
        browser.wait(ec.elementToBeClickable(this.successMessage), 10000);
        this.closeButton.click();
    };

    this.performDiagnosticsAction = function () {
        this.actionButton.click();
        this.runDiagnosticBtn.click();
        this.yesButton.click();
        var ec = protractor.ExpectedConditions;
        browser.wait(ec.elementToBeClickable(this.diagnosticModal), 5000);
        this.closeButton.click();
    };

    // Verify Fields on the device details page.
    this.verifyDeviceDetailCard = function(userEmail) {
        if (userEmail === browser.params.testuseremails.peoplenetadmin ||
            userEmail === browser.params.testuseremails.tsr1 ||
            userEmail === browser.params.testuseremails.tsr2) {
            expect(this.allDeviceDetailRows.getText()).toEqual([ 'Use Profile:', 'Licenses:', 'Device Version:',
                'Kernel Version:', 'Uboot Version:','State:', 'Unit #:', 'VIN:', 'Wi-Fi Status:', 'CID:',
                'PFM Customer:', 'VID Firmware Version:', 'VID MCF:', 'MDN:', 'ICCID:', 'IMSI:', 'MSISDN:', 'IMEI:',
                'MEID:', 'Engine Model:', 'Engine Make:' ]);
        }else{
            expect(this.allDeviceDetailRows.getText()).
            toEqual([ 'Use Profile:', 'Licenses:', 'Device Version:', 'State:', 'Unit #:', 'VIN:', 'VID Firmware Version:',
                'Engine Model:', 'Engine Make:' ]);
        }
    };

    this.clickVinDiscoButton = function () {
        this.actionButton.click();
        this.vinDiscoveryBtn.click();
    };

    this.validateHardReboot = function (dsnValue) {
        browser.get(browser.params.environment.webServicesUrl + dsnValue + '#/');
        browser.sleep(3000);
        expect(element(by.tagName('h3')).getText()).toBe('504 - Gateway Timeout');
        expect(element(by.tagName('pre')).getText()).toContain('Failed to connect to the device');
    };

};

module.exports = new DetailsPage();
