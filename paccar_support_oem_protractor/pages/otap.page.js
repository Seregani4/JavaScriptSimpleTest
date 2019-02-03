/**
 * Created by Cottomoeller on 12/9/2015.
 */
var OtapPage = function () {
    this.OTAPRequest = element.all(by.cssContainingText('.ng-binding', 'Otap Request')).get(0);
    this.OTAPProfiles = element.all(by.cssContainingText('[ng-click="$mdTabsCtrl.select(tab.getIndex())"]', 'Otap Profiles')).get(0);
    this.otapProfilesTable = element(by.css('[ng-model="$ctrl.selectedRows"]'));
    this.otapProfileRows = element.all(by.repeater('row in $ctrl.rows'));
    this.dsnsField = element(by.name('dsnList'));
    this.triggerType = element(by.name('installTrigger'));
    this.packageField = element(by.model('package.name'));
    this.versionField = element(by.name('packageVersion0'));
    //this.newProfileButton= element(by.css('[ng-repeat="textButton in $ctrl.textButtons"]'));
    this.newProfileButton = element(by.partialButtonText('CREATE OTAP PROFILE'));
    this.saveProfileBtn = element(by.partialButtonText('Save Profile'));
    this.sendBtn = element(by.partialButtonText('Send'));
    //this.editBtn = element(by.partialButtonText('EDIT'));
    this.editBtn = element(by.buttonText('EDIT'));
    this.deleteBtn = element(by.buttonText('DELETE'));


    //Otap Profile Toast Message
    this.toastAlert = element(by.css('[role="alert"]'));

    //Otap Type DropDown
    this.otapType = element(by.name('otapType'));
    this.manualEntryOtapType = element.all(by.css('[value="manual"]'));
    this.profileOtapType = element.all(by.css('[value="profile"]'));

    //Profile DropDown
    this.profileDropDown = element(by.css('[ng-model="$ctrl.profile"]'));
    this.optionOne = element.all(by.repeater('profile in $ctrl.profiles')).get(0);
    this.optionTwo = element.all(by.repeater('ng-repeat="profile in $ctrl.profiles')).get(1);
    this.optionThree = element.all(by.repeater('ng-repeat="profile in $ctrl.profiles')).get(2);

    //Adding a New OTAP Profile Dialog
    this.dsnType = element.all(by.model('$ctrl.dsn_type')).get(1);
    this.optionsList = element(by.css('[class="md-select-menu-container md-active md-clickable"]')).$$('md-option');
    this.nameField = element(by.model('$ctrl.otapProfile.name'));
    this.descriptionField = element(by.model('$ctrl.otapProfile.description'));
    this.triggerTypeField = element(by.model('$ctrl.otapProfile.triggerType'));
    /////TriggerTypeOptions
    this.triggerTypeOptions = element.all(by.css('[class="md-select-menu-container md-active md-clickable"]'));
    this.triggerTypeOptionsNA = element.all(by.cssContainingText('[role="option"]', "N/A")).get(1);
    this.triggerTypeOptionsImmediate = element(by.xpath('//md-option[@value="Immediate"]'));
    this.triggerTypeOptionsIgnitOff = element.all(by.css('[value="Ignition Off"]')).get(1);
    ////
    this.newProfilePackageField = element.all(by.repeater('package in $ctrl.packages')).$$('md-input-container').get(2);
    this.newProfileVersionField = element.all(by.repeater('package in $ctrl.packages')).$$('md-input-container').get(3);
    this.saveNewProfileButton = element(by.cssContainingText('[type="submit"]', 'save'));
    this.cancelButton = element(by.css('[ng-click="$ctrl.cancel()"]'));
    //DSN TYPE option
    this.dsnTypeOptionsPMG = element(by.css('[class="md-select-menu-container md-active md-clickable"]')).$$('md-option').get(0);
    this.dsnTypeOptionsPCG = element(by.css('[class="md-select-menu-container md-active md-clickable"]')).$$('md-option').get(1);

    //Pages
    this.pageDropDown = element(by.css('[ng-model="$pagination.page"]'));
    this.pageOne = element.all(by.repeater('page in $pageSelect.pages')).get(0);
    this.pageTwo = element.all(by.repeater('page in $pageSelect.pages')).get(1);


    this.verifyOTAPRequestData = function () {
        expect(this.OTAPRequest.isDisplayed()).toBe(true, 'OTAP Request Tab is missing');
        expect(this.OTAPProfiles.isDisplayed()).toBe(true, 'OTAP Profiles Tab is missing');
        expect(this.dsnsField.isDisplayed()).toBe(true, 'DSNS field is missing');
        expect(this.otapType.isDisplayed()).toBe(true, 'OTAP type field is missing');
        expect(this.triggerType.isDisplayed()).toBe(true, 'Trigger type is missing');
        expect(this.packageField.isDisplayed()).toBe(true, 'Package field is missing');
        expect(this.versionField.isDisplayed()).toBe(true, 'Version field is missing');
        expect(this.saveProfileBtn.isDisplayed()).toBe(true, 'Save button is missing');
        expect(this.sendBtn.isDisplayed()).toBe(true, 'Send button is missing');
    };

    this.verifyOTAPProfilesData = function () {
        expect(this.otapProfilesTable.isDisplayed()).toBe(true, 'The Profile List is missing');
    };

    this.clickOTAPRequestTab = function () {
        this.OTAPRequest.click();
    };

    this.clickOTAPProfilesTab = function () {
        this.OTAPProfiles.click();
    };

    this.selectDsnOptionByNumber = function (number) {
        this.dsnType.click();
        browser.sleep(1000);
        this.optionsList.get(number).click();
    };

    this.selectPackageOptionByNumber = function (number) {
        this.newProfilePackageField.click();
        browser.sleep(1000);
        this.optionsList.get(number).click();
    };

    this.selectVersionOptionByNumber = function (number) {
        this.newProfileVersionField.click();
        browser.sleep(1000);
        this.optionsList.get(number).click();
    };

    this.verifyOtapProfileTabData = function (name) {
        this.otapProfileRows.filter(function (row) {
            return row.getText().then(function (profileName) {
                expect(profileName.toLowerCase()).toContain(name, 'The Name did not match');
            });
        }).then(function (filteredRows) {
            if (filteredRows.length > 1) {
                expect(false).toBe(true, 'There are more than one Profile with the same Name');
            }
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.clickOtapProfileCheckbox = function (otapProfileName) {
        this.otapProfileRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (otapProfile) {
                return otapProfile === otapProfileName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Otap Profile was found by that name: ' + otapProfileName);
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.deleteOtapProfile = function (OtapProfileName) {
        this.otapProfileRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (profileName) {
                return profileName === OtapProfileName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length > 1) {
                expect(false).toBe(true, 'There are more than one Profile with the same Name');
            }
            filteredRows[0].$$('td').get(4).element(by.css('[ng-click="$ctrl.deleteProfile(profile)"]')).click();
            element(by.css('[ng-click="dialog.hide()"]')).click();
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.verifyNewOtapProfile = function (OtapProfileName) {
        this.otapProfileRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (profileName) {
                expect(profileName).toBe(OtapProfileName);
                return profileName === OtapProfileName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length > 1) {
                expect(false).toBe(true, 'There are more than One Profile with the same Name');
            }
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.verifyDeletedOtapProfile = function (OtapProfileName) {
        this.otapProfileRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                expect(name).not.toBe(OtapProfileName);
                //return name === deviceName;
            });
        });
    };


    this.verifyPageCount = function (expectedCount) {
        this.otapProfileRows.count().then(function (count) {
            expect(count <= expectedCount).toBe(true);
        });
    };

    this.checkForToastAlert = function () {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Request sent.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
            // }else if(this.toastAlert.isDisplayed()){
            //     expect(this.toastAlert.getText()).toContain('Export of dealers Failed.');
            //     browser.sleep(1000);
            //     browser.ignoreSynchronization = false;
            //     return false;
        }
    };

};

module.exports = new OtapPage();