var UsersPage = function () {
    //Library to get current time
    var moment = require('moment');
    var request = require('superagent');
    var dateTime = moment().format('MMMM D, YYYY h:mm:ss a');
    var addUserJson = require('../json/user.json');
    var testUserJson = require('../userScurityAttributes/testUser.json');
    var toastMessageUtil = require('../utilities/toastMessage.util.js');
    var navigation = require('../pages/navigation.page.js');
    //////////Conf Variables/////////////
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var cumminsUserEmail = browser.params.testuseremails.cumminsuser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var preferredCustomerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var testUserEmail = browser.params.adduser.email;
    var tsr1 = browser.params.testuseremails.tsr1;
    var tsr2 = browser.params.testuseremails.tsr2;
    var userPswd = browser.params.adduser.password;


    this.userHeaders = element.all(by.tagName('th'));
    // User List elements
    this.allUserRows = element.all(by.repeater('row in $ctrl.rows'));
    this.allUserNamesHiDensity = element.all(by.binding('user.userName'));
    this.allEditBtns = element.all(by.css('[ng-click="ctrl.edit(user)"]'));
    this.addUserButton = element(by.css('[aria-label="add"]'));
    this.orgNameOpts = element(by.name('organization'));//.$$('option');
    this.orgNameDropdownList = element.all(by.repeater('organization in ctrl.organizations'));
    this.userCanEditTag = element(by.css('[ng-show="ctrl.canEdit"]'));

    this.filterSearchBar = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(1);
    this.noUsersMsg = element(by.cssContainingText('[ng-show="ctrl.userData.entities.length < 1 && ctrl.userData.loaded"]', 'There are no users'));
    this.confirmDeleteBtn = element(by.css('[ng-click="dialog.hide()"]'));

    this.cancelDeleteBtn = element(by.css('[ng-click="dialog.abort()"]'));
    this.confirmDeleteMsg = element(by.css('[aria-label="Delete user?"]'));
    this.userMenuListBtn = element.all(by.css('[aria-label="Open more menu"]')).get(0);
    this.actionsMenu = element(by.partialButtonText('Actions'));
    this.exportButton = element(by.buttonText('EXPORT'));
    this.toastAlert = element(by.css('[role="alert"]'));

    //ActionBar Buttons
    this.deleteActionButton = element(by.css('[aria-label="delete"]'));
    this.deleteActionDialogButton = element(by.css('[ng-click="dialog.hide()"]'));
    this.viewDetailsActionButton = element(by.css('[aria-label="info"]'));

    //User Details Page
    this.userNameField = element(by.tagName('h2'));
    this.userDetailOrgTypeField = element(by.cssContainingText('[class="ng-binding ng-scope"]', 'Customer'));
    this.userDetailRoleField = element(by.css('[class="ng-binding ng-scope layout-row"]'));
    this.userDetailEditButton = element(by.css('[ng-if="$ctrl.canEditUser"]'));
    this.deleteUserButton = element(by.buttonText('delete'));
    this.userEmailSelector = element(by.xpath('//tbody//td[2]//span'));
    this.subTitles = element.all(by.xpath('//*[@class="md-subheader-content"]'));
    this.addTagBtn = element(by.xpath('//div[@class="md-actions ng-scope flex"]/div/button[@type="button"]'));
    this.textFromButtons = element.all(by.xpath('//form/button'));
    this.organizationNameField = element.all(by.xpath('//div[@class="ng-binding ng-scope"]')).get(2);
    this.managePreferredDealers = element.all(by.xpath('//div/md-chip-template'));

    //Drop down add user
    this.languageClickable = element(by.css('md-select[ng-model="$ctrl.locale"'));
    this.measureClickable = element(by.css('md-select[ng-model="$ctrl.selectedUnitPreference"'));
    this.distanceClickable = element(by.css('md-select[ng-model="$ctrl.distanceUnit"'));
    this.volumeClickable = element(by.css('md-select[ng-model="$ctrl.volumeUnit"'));
    this.temperatureClickable = element(by.css('md-select[ng-model="$ctrl.temperatureUnit"'));
    this.pressureClickable = element(by.css('md-select[ng-model="$ctrl.pressureUnit"'));
    this.massClickable = element(by.css('md-select[ng-model="$ctrl.massUnit"'));
    //Value from dropdowns
    //measure
    this.usCustomaryValue = element.all(by.xpath('//md-content/md-option[@ng-value="pref"]')).first();
    this.internationalSystemValue = element.all(by.xpath('//md-content/md-option[@ng-value="pref"]')).last();
    //distance
    this.kilometersValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfDistance"]//div[contains(text(),"Kilometers")]|//div[contains(text(),"Kilómetros")]'));
    this.milesValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfDistance"]//div[contains(text(),"Miles")]|//div[contains(text(),"Millas")]'));
    //volume
    this.gallonsValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfVolume"]//div[contains(text(),"Gallons")]|//div[contains(text(),"Galones")]'));
    this.litersValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfVolume"]//div[contains(text(),"Liters")]|//div[contains(text(),"Litros")]'));
    //temperature
    this.celsiusValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfTemperature"]//div[contains(text(),"Celsius")]|//div[contains(text(),"Centígrados")]'));
    this.fahrenheitValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfTemperature"]//div[contains(text(),"Fahrenheit")]'));
    //pressure
    this.kilopascalsValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfPressure"]//div[contains(text(),"Kilopascals")]|//div[contains(text(),"Kilopascales")]'));
    this.inchValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfPressure"]//div[contains(text(),"Inch")]|//div[contains(text(),"Psi")]'));
    //mass
    this.kilogramsValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfMass"]//div[contains(text(),"Kilograms")]|//div[contains(text(),"Kilogramos")]'));
    this.poundsValue = element(by.xpath('//md-content/md-option[@ng-value="unitOfMass"]//div[contains(text(),"Pounds")]|//div[contains(text(),"Libras")]'));

    // Add User elements
    this.firstNameField = element(by.name('firstName'));
    this.lastNameField = element(by.name('lastName'));
    this.emailField = element.all(by.name('email')).get(0);
    this.crntPasswordField = element(by.name('currentPassword'));
    this.newPasswordField = element(by.name('newPassword'));
    this.cnfPasswordField = element(by.name('confirmPassword'));
    this.phoneNumberField = element(by.name('phone'));
    this.extensionField = element(by.name('extension'));
    this.vehicleGroupField = element(by.xpath('(//md-autocomplete-wrap)[4]'));
    this.preferencesSubHeader = element(by.cssContainingText('[class="md-subheader-content"]', 'Preferences'));
    this.organizationName = element(by.cssContainingText('[class="ng-binding md-required"]', 'Organization Name'));
    this.organizationValue = element.all(by.xpath('//div[@class="ng-binding ng-scope"]')).last();
    this.organizationType = element(by.cssContainingText('[class="md-text ng-binding"]', 'Administrative'));
    this.userRole = element(by.cssContainingText('[class="ng-binding md-required"]', 'User Role'));


    this.orgTypeField = element(by.name('curOrgType'));
    this.orgTypePresent = element(by.model('$ctrl.curOrgType'));// ToDo remember to git rid of these orgPresent fields for edit user
    this.orgTypeOpts = element.all(by.repeater('orgType in ctrl.userOrgTypes'));
    this.orgValues = element.all(by.xpath('//div[@class = "md-select-menu-container md-default-theme md-active md-clickable"]'));

    this.dealerOrgType = element.all(by.cssContainingText('[ng-value="orgType"]', browser.params.adduser.organizationtype.dealer)).get(-1);
    this.notificationsPerPage = element.all(by.css('[class="label ng-binding"]'));

    this.orgNameField = element(by.name('organization'));
    this.highlightedSearchText = element(by.xpath("//li[@class = 'ng-scope selected']"));
    this.orgNamePresent = element(by.model('$ctrl.organization'));

    //Notification options Paccar Admin only
    this.notificationTitle = element(by.cssContainingText('[class="md-subheader-inner"]', 'Email Notifications:'));
    this.allNotify = element(by.css('[value="emailNotificationAll"]'));
    this.derateActiveWarning = element(by.css('[value="emailNotificationDerateActiveWarning"]'));
    this.derateActive = element(by.css('[value="emailNotificationDerateActive"]'));
    this.none = element(by.css('[value="none"]'));

    this.verifyNotificationOptions = function () {
        expect(this.notificationTitle.isDisplayed()).toBe(true, 'The title is missing.');
        expect(this.allNotify.isDisplayed()).toBe(true, 'The "All" option is missing.');
        expect(this.derateActiveWarning.isDisplayed()).toBe(true, 'The "Derate Active/Warning" option is missing.');
        expect(this.derateActive.isDisplayed()).toBe(true, 'The "Derate Active" option is missing.');
        expect(this.none.isDisplayed()).toBe(true, 'The "None" option is missing.');
    };

    this.orgRoleField = element(by.name('userRole'));
    this.orgRolePresent = element(by.model('$ctrl.userRole'));
    this.typeAheadOpts = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));

    this.allRoleFields = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    this.allNotifications = element(by.css('[value="emailNotificationAll"]'));
    this.derateWarningNotifications = element(by.css('[value="emailNotificationDerateActiveWarning"]'));
    this.derateActiveNotifications = element(by.css('[value="emailNotificationDerateActive"]'));
    this.noEmailNotifications = element(by.css('[value="none"]'));
    this.warningMessageAddUserPage = element.all(by.xpath('//ng-message'));

    this.checkBox = element(by.css('[ng-model="row.checked"]'));
    this.activeCheckBox = element(by.cssContainingText('[role="checkbox"]', 'Active'));
    this.inactiveCheckBox = element(by.cssContainingText('[role="checkbox"]', 'Inactive'));
    this.verifiedCheckBox = element(by.model('$ctrl.user.userEmails[0][\'verified\']'));

    this.cancelBtn = element(by.cssContainingText('[href="#/nav/user/list/"]', 'cancel'));
    this.saveBtn = element(by.css('[type="submit"]'));
    this.unsubscribeFromAllBtn = element(by.xpath('//button[@ng-click="$ctrl.owner.unsubscribeFromAll()"]'));
    this.finishButton = element(by.css('[ng-click="$ctrl.finishUpdatingNotifications()"]'));
    this.addSuccessMessage = element(by.css('[ng-show="flash"]'));
    this.savedAlert = element(by.css('.ng-binding.ng-scope'));
    this.changeEmail = element(by.linkText('Change'));

    // Add User Validation elements

    this.emailRequiredAlert = element(by.cssContainingText('ng-message', 'Email is required.'));
    this.fNameRequiredAlert = element(by.cssContainingText('ng-message', 'First name required.'));
    this.lNameRequiredAlert = element(by.cssContainingText('ng-message', 'Last name is required.'));
    this.passwordRequiredAlert = element(by.css('[ng-show="ctrl.editUser.password.$error.required"]'));
    this.cnfPasswordRequiredAlert = element(by.css('[ng-show="ctrl.editUser.cnfpassword.$dirty && addUser.cnfpassword.$invalid || addUser.submitted"]'));
    this.phoneRequiredAlert = element(by.cssContainingText('ng-message', 'Phone number required.'));
    this.orgTypeRequiredAlert = element(by.cssContainingText('ng-message', 'Organization Type required.'));
    this.orgNameRequiredAlert = element(by.css('[ng-show="ctrl.editUser.orgname.$error.required"]'));
    this.minFirstNameAlert = element(by.css('[ng-show="ctrl.editUser.firstName.$error.minlength"]'));
    this.emailWarning = element(by.xpath("//ng-messages[@for = '$ctrl.form.email.$error']"));
    this.editEmailWarning = element(by.xpath("//ng-messages[@for = '$ctrl.emailForm.email.$error']"));
    this.warningMessage = element.all(by.xpath('//ng-messages/ng-message[@class="md-input-message-animation ng-binding ng-scope"]'));
    this.maxFirstNameAlert = element(by.cssContainingText('ng-message', 'Name cannot be longer than 15 characters'));
    this.invalidEmailAlert = element(by.cssContainingText('ng-message', 'That is not a valid email. Please input a valid email.'));
    this.phonePatternAlert = element(by.cssContainingText('ng-message', 'Phone number must consist of 10 numbers.'));
    this.passwordEqualityAlert = element(by.cssContainingText('ng-message', 'Password and Confirm Password fields are not equal.'));
    this.passwordFieldErrors = element.all(by.cssContainingText('ng-messages', 'Password should meet at least 3 of these requirements: Contain uppercase letters, lowercase letters, numbers, or symbols.'));

    // User Profile elements

    this.vehicleGroupLabel = element(by.css('[ng-show="group.subscribed && !group.updating && group.tag"]'));
    this.allVehicleGroupLabels = element.all(by.repeater('group in ctrl.groups'));
    this.firstVehicleGroupLabel = element.all(by.repeater('group in ctrl.groups')).get(0);
    this.secondVehicleGroupLabel = element.all(by.repeater('group in ctrl.groups')).get(1);
    this.vehicleGroupUnsubscribe = element(by.css('[ng-click="ctrl.unsubscribe(group)"]'));
    this.vehicleGroupAddBtn = element.all(by.partialLinkText('add')).get(0);
    this.allVehicleAddBtn = element.all(by.partialLinkText('add')).get(1);
    this.allSubscriptionList = element.all(by.repeater('subscription in $ctrl.subscriptions | filter:$ctrl.filter'));
    this.firstSubCheckBox = element.all(by.model('row.checked')).first();
    this.firstCustomerSubCheckBox = element(by.xpath("//div[@id= 'editUserCustomerNotifications']//tbody//md-checkbox"));
    this.subscriptionCheckBox = element.all(by.css('[role="checkbox"]'));
    this.subscribedCustomer = element.all(by.css('[ng-bind="$ctrl.customers[subscription.customerKey].name"]'));
    this.subscribedType = element.all(by.css('[ng-bind="subscription.group"]'));
    this.searchBar = element(by.css('[ng-model="$mdAutocompleteCtrl.scope.searchText"]'));
    this.chipFilter = element.all(by.xpath("//input[@type='search']")).get(1);
    this.subscriptionListBox = element(by.model('$ctrl.filterByType'));
    this.defaultList = element.all(by.repeater('filterByType in $ctrl.filterByTypes')).get(3);
    this.subscribedList = element.all(by.repeater('filterByType in $ctrl.filterByTypes')).get(4);
    this.unsubscribedList = element.all(by.repeater('filterByType in $ctrl.filterByTypes')).get(5);
    this.textFromSubscriptionListBox = element.all(by.xpath('//md-select-menu/md-content/md-option'));
    this.textFromMeasure = element.all(by.xpath('//md-option[@ng-value="pref"]'));

    // User Edit Profile elements
    this.textFromUserEditPage = element.all(by.xpath('//md-input-container/label'));
    this.textFromDetailPage = element.all(by.xpath('//md-select/md-select-value'));
    this.textFromSecurityPage = element.all(by.xpath('//md-card'));
    this.warningMessageText = element(by.xpath('//ng-messages/ng-message[@when="required"]'));
    this.warningCnfPasswordMessage = element(by.xpath('//ng-messages/ng-message[@when="fieldEquality"]'));
    this.textFromCheckBoxes = element.all(by.xpath('//div/md-checkbox/div'));
    this.textFromNotificationTab = element.all(by.xpath('//td/span'));
    this.openDropDowns = element.all(by.xpath('//*[@class="md-select-value"]'));
    this.takeValueFromDropDowns = element.all(by.xpath("//div[contains(@id, 'select_container')][@aria-hidden='false']//md-option"));
    this.checkBoxes = element.all(by.xpath('//md-checkbox[@role="checkbox"]'));
    this.buttonsName = element.all(by.xpath('//*[@class="layout-row"]')).first();

    ///////Paccar Change Email elements///////
    this.emailChangeForm = element(by.name('$ctrl.emailForm'));
    this.changeEmailTitle = element(by.cssContainingText('[class="md-subheader-content"]', 'Change Email'));
    this.changeEmailField = element(by.xpath("//md-input-container/input[@name='email'][@ng-pattern]"));
    this.changeEmailButton = element(by.buttonText('Change Email'));
    this.saveEmailCancelButton = element(by.buttonText('cancel'));
    this.saveEmailButton = element(by.css('[ng-click="dialog.hide()"]'));

    // Change Email page elements (only used in WiFi Portal Automation Tests)
    this.changeEmailNew = element(by.model('ctrl.emailAddress'));
    this.changeEmailCnf = element(by.model('ctrl.emailAddressConfirm'));
    this.changeEmailFieldEqualityError = element(by.cssContainingText('.alert-danger', 'Email Address and Confirm Email Address fields are not equal'));
    this.changeEmailInvalidError = element(by.cssContainingText('.alert-danger', 'Invalid email address.'));
    this.changeEmailSaveBtn = element(by.id('submit'));

    // Edit User/Security Page elements
    this.userNotificationsAllTableRows = element.all(by.xpath('(//tbody)[1]//tr'));
    this.profileTab = element(by.cssContainingText('md-tab-item', 'Profile'));
    this.securityTab = element(by.cssContainingText('md-tab-item', 'Security'));
    this.tagsTab = element(by.cssContainingText('md-tab-item', 'Tags'));
    this.notificationsTab = element(by.cssContainingText('md-tab-item', 'Notifications'));
    this.vehicleGroupTab = element(by.cssContainingText('md-tab-item', 'Vehicle Groups'));
    this.securityHeader = element(by.cssContainingText('.md-subheader-content', 'Log in as this user to change security'));
    this.unlockButton = element(by.buttonText('Unlock'));
    this.currentPasswordField = element(by.name('currentPassword'));
    // this.changePasswordBtn = element(by.cssContainingText('[type="submit"]','Change Password'));
    this.changeEmailBtn = element.all(by.xpath('//button[@type="submit"]')).get(1);
    this.changePasswordBtn = element.all(by.xpath('//button[@type="submit"]')).get(2);
    this.saveDialogBtn = element.all(by.xpath('//md-dialog-actions/button')).get(1);
    this.emailFieldSecurityPage = element.all(by.xpath('//md-input-container/input[@name="email"]')).get(1);
    this.currentPasswordRequiredAlert = element(by.cssContainingText('ng-message', 'Current password is required.'));
    this.newPasswordRequiredAlert = element(by.cssContainingText('ng-message', 'New password cannot be blank.'));
    this.newPasswordDifferentAlert = element(by.cssContainingText('ng-message', 'New password must be different from current password.'));

    //User notifications
    this.notificationsTableRows = element.all(by.xpath("(//tbody)[1]/tr"));
    this.subscriptionFilterDropDown = element(by.xpath("//md-select[contains(@aria-label,'Filter:') ]"));
    this.subscriptionTypeDropDown = element.all(by.repeater("filterByType in $ctrl.filterByTypes"));

    this.mapDropDownsValues = {
        defaultValue: {value: 1, name: 'Default'},
        subscribedValue: {value: 2, name: 'Subscribed'},
        unsubscribedValue: {value: 3, name: 'Unsubscribed'}
    };

    this.userNotificationsColumns = {
        nameColumn: {value: 1, name: 'Name Column'},
    };

    this.columns = {
        tableUserNameColumn: {value: 1, name: 'User Name'},
        tableFirstNameColumn: {value: 2, name: 'First Name'},
        tableLastNameColumn: {value: 3, name: 'Last Name'},
        tableOrganizationColumn: {value: 4, name: 'Organization'},
        tableContactColumn: {value: 5, name: 'Contact'},
        tableRoleColumn: {value: 6, name: 'Role'},
        tableStatusColumn: {value: 7, name: 'Status'}
    };

    ////////////////////////////////Device List Tab/////////////////////////////////
    //Table Headers:th
    //repeater can be used for columns as well. Index changes to 0 if repeater is used.
    //this.userNameColumnHeader = element.all(by.repeater('col in $ctrl.cols')).get(0);

    this.userNameColumnHeader = element.all(by.className('md-column')).get(this.columns.tableUserNameColumn.value);
    this.firstNameColumnHeader = element.all(by.className('md-column')).get(this.columns.tableFirstNameColumn.value);
    this.lastNameColumnHeader = element.all(by.className('md-column')).get(this.columns.tableLastNameColumn.value);
    this.organizationColumnHeader = element.all(by.className('md-column')).get(this.columns.tableOrganizationColumn.value);
    this.contactColumnHeader = element.all(by.className('md-column')).get(this.columns.tableContactColumn.value);
    this.roleColumnHeader = element.all(by.className('md-column')).get(this.columns.tableRoleColumn.value);
    this.statusColumnHeader = element.all(by.className('md-column')).get(this.columns.tableStatusColumn.value);

    this.get = function () {
        browser.get('/#/nav/user/list/');
        browser.sleep(1000);
    };

    this.verifySortingColumns = function () {
        this.userNameColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=userName');
        this.userNameColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=-userName');
        browser.sleep(1000);
        this.firstNameColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=firstName');
        this.firstNameColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=-firstName');
        browser.sleep(1000);
        this.lastNameColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=lastName');
        this.lastNameColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=-lastName');
        browser.sleep(1000);
        this.statusColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=status');
        browser.sleep(1000);
        this.statusColumnHeader.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?sort=-status');
    };

    this.verifyUserListTableDataIsVisible = function () {
        expect(this.userHeaders.getText()).toContain('User Name', 'User Name column is missing');
        expect(this.userHeaders.getText()).toContain('First Name', 'First Name column is missing');
        expect(this.userHeaders.getText()).toContain('Last Name', 'Last Name column is missing');
        expect(this.userHeaders.getText()).toContain('Organization', 'Organization column is missing');
        expect(this.userHeaders.getText()).toContain('Contact', 'Contact column is missing');
        expect(this.userHeaders.getText()).toContain('Role', 'Role column is missing');
        expect(this.userHeaders.getText()).toContain('Status', 'Status column is missing');
        this.allUserRows.count().then(function (count) {
            expect(count).toBeGreaterThan(0, 'There was no Dealer data to be found');
        });
    };
    // Click actions


    this.clickEditActionButton = function () {
        this.editActionButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit');
    };

    this.clickAddUserButton = function () {
        this.addUserButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add');
    };


    this.verifyPasswordChangeBlocked = function () {
        expect(this.securityHeader.isPresent()).toBe(true);
    };

    /////////////////////////////Selected Items Actions///////////////////////////////////

    this.selectUserAction = function (action) {
        this.actionsMenu.click();
        element(by.partialLinkText(action)).click();
    };

    /////////////////////////////Add User///////////////////////////////////

    this.validateAddUserUi = function () {
        expect(this.emailField.isDisplayed()).toBe(true, 'Email Field is Not Displayed');
        expect(this.firstNameField.isDisplayed()).toBe(true, 'First Name Field is Not Displayed');
        expect(this.lastNameField.isDisplayed()).toBe(true, 'Last Name Field is Not Displayed');
        expect(this.phoneNumberField.isDisplayed()).toBe(true, 'Phone Number Field is Not Displayed');
        expect(this.newPasswordField.isDisplayed()).toBe(true, 'Password Field is Not Displayed');
        expect(this.cnfPasswordField.isDisplayed()).toBe(true, 'Confirm Password Field is Not Displayed');
        expect(this.extensionField.isDisplayed()).toBe(true, 'Extension Field is Not Displayed');
        expect(this.preferencesSubHeader.isDisplayed()).toBe(true, 'Preferences Sub Header is Not Displayed');
        expect(this.organizationType.isDisplayed()).toBe(true, 'Org Type Field is Not Displayed');
        expect(this.organizationName.isDisplayed()).toBe(true, 'Org Name Field is Not Displayed');
        expect(this.userRole.isDisplayed()).toBe(true, 'User Role Field is Not Displayed');
        expect(this.activeCheckBox.isDisplayed()).toBe(true, 'Active Check Box  is Not Displayed');
        expect(this.verifiedCheckBox.isDisplayed()).toBe(true, 'Verified Check Box  is Not Displayed');
        expect(this.saveBtn.isDisplayed()).toBe(true, 'Save button is Not Displayed');
        expect(this.cancelBtn.isDisplayed()).toBe(true, 'Cancel button is Not Displayed');
    };

    this.validatePreferredUnits = function (unitsList) {
        unitsList.forEach(function (eachUnit) {
            expect(element.all(by.xpath(".//*[.='" + eachUnit + "'] [@class='md-text ng-binding']")).getText()).toContain(eachUnit, eachUnit + ' not selected by default')
        });
    };

    this.clickCancelBtn = function () {
        this.cancelBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/list/');
    };

    this.selectOrgTypeDropdownItem = function (item) {
        this.orgTypeField.click();
        if (item === browser.params.adduser.organizationtype.dealer) {
            navigation.waitTillElementToBeClickable(element.all(by.cssContainingText('[ng-value="orgType"]', item)).last());
            element.all(by.cssContainingText('[ng-value="orgType"]', item)).last().click();
        } else {
            navigation.waitTillElementToBeClickable(element.all(by.cssContainingText('[ng-value="orgType"]', item)).get(0));
            element.all(by.cssContainingText('[ng-value="orgType"]', item)).get(0).click();
        }
    };

    this.selectUserTab = tabName => {
        element(by.cssContainingText('md-tab-item', tabName)).click();
    };

    this.selectOrgNameDropdownItem = function (item1) {
        this.orgNameField.click();
        this.orgNameField.clear();
        this.orgNameField.sendKeys(item1);
        this.highlightedSearchText.click();
    };

    this.selectOrgRoleDropdownItem = function (item) {
        this.orgRoleField.click();
        navigation.waitTillElementToBeClickable(element(by.cssContainingText('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]', item)));
        element(by.cssContainingText('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]', item)).click();
    };

    this.checkStatusCheckbox = function () {
        this.inactiveCheckBox.click();
    };

    this.uncheckStatusCheckbox = function () {
        this.activeCheckBox.click();
    };

    this.validateDisabledFields = function (portalType) {
        if (portalType === 'wifi portal') {
            expect(this.orgTypeField.getAttribute('disabled')).toBe('true');
            expect(this.orgNameField.getAttribute('disabled')).toBe('true');
            expect(this.orgRoleField.getAttribute('disabled')).toBe('true');
            //expect(this.verifiedCheckBox.getAttribute('disabled')).toBe('true');
        }
        else if (portalType === 'paccar') {
            expect(this.orgNameField.getAttribute('disabled')).toBe('true');
            //expect(this.verifiedCheckBox.getAttribute('disabled')).toBe('true');
        }
    };

    /////////////////////////////Edit User///////////////////////////////

    this.orgTypeFieldIsNotVisible = function () {
        expect(this.orgTypeField.isPresent()).toBe(false);
    };

    this.orgNameFieldIsNotVisible = function () {
        expect(this.orgNameField.isPresent()).toBe(false);
    };

    this.orgRoleFieldIsNotVisible = function () {
        expect(this.orgRoleField.isPresent()).toBe(false);
    };

    this.editFirstName = function (newFirstName) {
        this.firstNameField.clear();
        this.firstNameField.sendKeys(newFirstName);
    };

    this.editLastName = function (newLastName) {
        this.lastNameField.clear();
        this.lastNameField.sendKeys(newLastName);
    };

    this.editPhoneNumber = function (newPhoneNumber) {
        this.phoneNumberField.clear();
        this.phoneNumberField.sendKeys(newPhoneNumber);
    };

    this.editOrgRoleType = function (role) {
        this.orgRoleField.clear();
        this.orgRoleField.sendKeys(role);
        //this.selectOrgRoleDropdownItem(role);
    };

    this.editNewUser = function (isActive) {
        if (isActive === 'active') {
            this.firstNameField.clear();
            this.firstNameField.sendKeys(browser.params.edituser.firstname);
            this.lastNameField.clear();
            this.lastNameField.sendKeys(browser.params.edituser.lastname);
            this.phoneNumberField.clear();
            this.phoneNumberField.sendKeys(browser.params.edituser.phonenumber);
            this.extensionField.clear();
            this.extensionField.sendKeys(browser.params.edituser.extension);
            this.saveBtn.click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/', "I am not on the Edit User Page?");
        }
        else if (isActive === 'inactive') {
            this.firstNameField.clear();
            this.firstNameField.sendKeys(browser.params.edituser.firstname);
            this.lastNameField.clear();
            this.lastNameField.sendKeys(browser.params.edituser.lastname);
            this.phoneNumberField.clear();
            this.phoneNumberField.sendKeys(browser.params.edituser.phonenumber);
            this.extensionField.clear();
            this.extensionField.sendKeys(browser.params.edituser.extension);
            this.activeCheckBox.click();
            this.saveBtn.click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/', "I am not on the Edit User Page?");
        }
    };

    this.editExistingAdmin = function (resetFields) {
        if (resetFields) {
            this.firstNameField.clear();
            this.firstNameField.sendKeys(browser.params.editwifiadmin.firstname);
            this.lastNameField.clear();
            this.lastNameField.sendKeys(browser.params.editwifiadmin.lastname);
            this.phoneNumberField.clear();
            this.phoneNumberField.sendKeys(browser.params.editwifiadmin.phonenumber);
            this.extensionField.clear();
            this.extensionField.sendKeys(browser.params.editwifiadmin.extension);
        }
        else {
            this.firstNameField.clear();
            this.firstNameField.sendKeys(browser.params.edituser.firstname);
            this.lastNameField.clear();
            this.lastNameField.sendKeys(browser.params.edituser.lastname);
            this.phoneNumberField.clear();
            this.phoneNumberField.sendKeys(browser.params.edituser.phonenumber);
            this.extensionField.clear();
            this.extensionField.sendKeys(browser.params.edituser.extension);
        }
        this.saveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/', "I am not on the Edit User Page?");
    };

    this.changeUserPassword = function (oldPw, newPw) {
        this.currentPasswordField.sendKeys(oldPw);
        this.newPasswordField.sendKeys(newPw);
        this.cnfPasswordField.sendKeys(newPw);
        this.changePasswordBtn.click();
        browser.sleep(1000);
    };


    this.checkForUserData = function (density) {
        if (density === 'low') {
            this.allUserRows.count().then(function (count) {
                expect(count).toBeGreaterThan(0, 'There was no User data to be found');
            });
        }
        else if (density === 'high') {
            this.allUserRows.count().then(function (count) {
                expect(count).toBeGreaterThan(0, 'There was no User data to be found');
            });
        }
        else {
            expect(true).toBe(false, 'No density indicated');
        }
    };

    this.checkForPageCount = function (expectedCount) {
        this.allUserRows.count().then(function (count) {
            expect(count <= expectedCount).toBe(true);
        });
    };

    ////////////////////General functions requiring looping through user list data///////////////////////////////////

    this.verifyFullName = function (userEmail, userFirstName, userLastName) {
        return this.allUserRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (email) {
                return email === userEmail;
            });
        }).then(function (filteredRows) {
            expect(filteredRows[0].$$('td').get(2).getText()).toContain(userFirstName);
            expect(filteredRows[0].$$('td').get(3).getText()).toContain(userLastName);
        });

    };

    this.verifyUserID = function (userEmail) {
        return this.allUserRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (email) {
                return email === userEmail;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'Users ID:' + userEmail + ' was not found in on the User List page on ' + dateTime);
            }
            else {
                return filteredRows[0].$$('.ng-binding').get(2).getText();
            }
        });

    };

    this.deleteUserClick = function (density, userEmail) {
        if (density === 'low') {
            return this.allUserRows.filter(function (row) {
                // index 0 for customer names
                return row.$$('.ng-binding').get(2).getText().then(function (email) {
                    //console.log(name);
                    return email === userEmail;
                });
            }).then(function (filteredRows) {
                filteredRows[0].$$('button').get(0).click();
                element.all(by.partialButtonText('DELETE')).get(9).click();
                expect($('md-dialog-actions').isPresent()).toBe(true);
                $('md-dialog-actions').click();
                browser.sleep(1000);
                $('md-dialog-actions').$$('button').get(1).click();
                browser.sleep(1000);
            });
        }
        else if (density === 'high') {
            return this.allUserRows.filter(function (row) {
                // index 0 for customer names
                return row.$$('td').get(1).getText().then(function (email) {
                    //console.log(email);
                    return email === userEmail;
                });
            }).then(function (filteredRows) {
                if (filteredRows.length < 1) {
                    expect(false).toBe(true, 'Edit User Button is not visible on User List page');
                }
                else {
                    filteredRows[0].$$('md-checkbox').get(0).click();
                    element(by.partialButtonText('Actions')).click();
                    element(by.partialButtonText('DELETE')).click();
                    expect($('md-dialog-actions').isPresent()).toBe(true);
                    //$('md-dialog-actions').click();
                    //browser.sleep(1000);
                    $('md-dialog-actions').$$('button').get(1).click();
                    browser.sleep(1000);
                }
            });
        }
        else {
            expect(true).toBe(false, 'No density indicated');
        }
    };

    this.confirmDeleteUserClick = function () {
        return this.allUserRows.filter(function (row) {
            return row.$$('.ng-binding').get(6).getText().then(function (name) {
                // Match by delete text in td visible when clicking initial delete button
                return name.indexOf("DELETE") > -1;
            });
        }).then(function (filteredRows) {
            filteredRows[0].$('[ng-click="dialog.hide()"]').click();
        });
    };

    this.cancelDeleteUserClick = function () {
        return this.allUserRows.filter(function (row) {
            return row.$$('td').get(6).getText().then(function (name) {
                return name.indexOf("Delete") > -1;
            });
        }).then(function (filteredRows) {
            filteredRows[0].$('[ng-click="ctrl.cancelDelete(user)"]').click();
        });
    };

    this.verifyPhoneNumber = function (userEmail, userPhoneNumber) {
        return this.allUserRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (email) {
                return email === userEmail;
            });
        }).then(function (filteredRows) {
            expect(filteredRows[0].$$('td').get(5).getText()).toContain('Primary ' + userPhoneNumber);
        });

    };

    this.verifyActiveStatus = function (userEmail, status) {
        return this.allUserRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (email) {
                return email === userEmail;
            });
        }).then(function (filteredRows) {
            expect(filteredRows[0].$$('td').get(7).getText()).toContain(status);
        });
    };


    this.invalidChangePassword = function (oldPw, newPw, type) {
        if (type === 'omit current password') {
            this.currentPasswordField.sendKeys('');
            this.newPasswordField.sendKeys(newPw);
            this.cnfPasswordField.sendKeys(newPw);
            this.changePasswordBtn.click();
            expect(this.currentPasswordRequiredAlert.isPresent()).toBe(true);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/');
        }
        else if (type === 'omit new password') {
            this.currentPasswordField.sendKeys(oldPw);
            this.newPasswordField.sendKeys('');
            this.cnfPasswordField.sendKeys(newPw);
            this.changePasswordBtn.click();
            expect(this.newPasswordRequiredAlert.isPresent()).toBe(true);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/');
        }
        else if (type === 'omit confirm password') {
            this.currentPasswordField.sendKeys(oldPw);
            this.newPasswordField.sendKeys(newPw);
            this.cnfPasswordField.sendKeys('');
            this.changePasswordBtn.click();
            expect(this.passwordEqualityAlert.isPresent()).toBe(true);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/');
        }
        else if (type === 'new password equals current') {
            this.currentPasswordField.sendKeys(oldPw);
            this.newPasswordField.sendKeys(oldPw);
            this.cnfPasswordField.sendKeys(oldPw);
            this.changePasswordBtn.click();
            expect(this.newPasswordDifferentAlert.isPresent()).toBe(true);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/');
        }
        else if (type === 'new password does not equal confirm password') {
            this.currentPasswordField.sendKeys(oldPw);
            this.newPasswordField.sendKeys(newPw);
            this.cnfPasswordField.sendKeys(oldPw);
            this.changePasswordBtn.click();
            expect(this.passwordEqualityAlert.isPresent()).toBe(true);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/');
        }
        else {
            expect(false).toBe(true, 'Invalid input parameter');
        }
    };

    this.clickSecurityTab = function () {
        this.securityTab.click();
    };

    this.clickSaveBtn = function () {
        this.saveBtn.click();
    };

    //JSON files with security attributes of different users.
    var peoplenetAdminJson = require('../userScurityAttributes/peoplenetadmin.json');
    var paccarAdminJson = require('../userScurityAttributes/paccaradmin.json');
    var cumminsUserJson = require('../userScurityAttributes/cumminsUser.json');
    var dealerOwnerAdminJson = require('../userScurityAttributes/dealerowneradmin.json');
    var dealerRegionAdminJson = require('../userScurityAttributes/dealerregionadmin.json');
    var dealerAdminJson = require('../userScurityAttributes/dealeradmin.json');
    var dealerUserJson = require('../userScurityAttributes/dealeruser.json');
    var customerAdminJson = require('../userScurityAttributes/customeradmin.json');
    var tsr1Json = require('../userScurityAttributes/tsr1.json');
    var tsr2Json = require('../userScurityAttributes/tsr2.json');

    /*
     * We add users of Preferred Customer in customer role for the users to be visible to
     * dealer role users.
     * */
    this.addUserEndpoint = function (addUserAs, userToBeAdded, customEmail) {
        var securityAttribute = this.getSecurityAttribute(addUserAs);
        addUserJson.firstName = browser.params.adduser.firstname;
        addUserJson.lastName = browser.params.adduser.lastname;
        addUserJson.realmId = browser.params.realmids.oem;
        addUserJson.userCredential.username = customEmail || browser.params.adduser.email;
        addUserJson.userName = customEmail || browser.params.adduser.email;
        addUserJson.userEmails[0].emailAddress = customEmail || browser.params.adduser.email;
        if (userToBeAdded === browser.params.roleslabels.peoplenetadmin) {
            this.buildUserJson(
                browser.params.roleids.peoplenetadmin,
                browser.params.roleslabels.peoplenetadmin,
                browser.params.organizationids.administrative,
                browser.params.organizationtypeids.administrative
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.paccaradmin) {
            this.buildUserJson(
                browser.params.roleids.paccaradmin,
                browser.params.roleslabels.paccaradmin,
                browser.params.organizationids.oem,
                browser.params.organizationtypeids.oem
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.paccarpoweruser) {
            this.buildUserJson(
                browser.params.roleids.paccarpoweruser,
                browser.params.roleslabels.paccarpoweruser,
                browser.params.organizationids.oem,
                browser.params.organizationtypeids.oem
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.paccaruser) {
            this.buildUserJson(
                browser.params.roleids.paccaruser,
                browser.params.roleslabels.paccaruser,
                browser.params.organizationids.oem,
                browser.params.organizationtypeids.oem
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.cumminsuser) {
            this.buildUserJson(
                browser.params.roleids.cumminsuser,
                browser.params.roleslabels.cumminsuser,
                browser.params.organizationids.cummins,
                browser.params.organizationtypeids.division
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.dealeradmin) {
            this.buildUserJson(
                browser.params.roleids.dealeradmin,
                browser.params.roleslabels.dealeradmin,
                browser.params.testdealer.id,
                browser.params.organizationtypeids.dealer
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.dealeruser) {
            this.buildUserJson(
                browser.params.roleids.dealeruser,
                browser.params.roleslabels.dealeruser,
                browser.params.testdealer.id,
                browser.params.organizationtypeids.dealer
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.dealertechnician) {
            this.buildUserJson(
                browser.params.roleids.dealertech,
                browser.params.roleslabels.dealertechnician,
                browser.params.testdealer.id,
                browser.params.organizationtypeids.dealer
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerowneradmin) {
            this.buildUserJson(
                browser.params.roleids.dealerowneradmin,
                browser.params.roleslabels.dealerowneradmin,
                browser.params.testdealerOwnerGroup.id,
                browser.params.organizationtypeids.dealerOwner
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerowneruser) {
            this.buildUserJson(
                browser.params.roleids.dealerowneruser,
                browser.params.roleslabels.dealerowneruser,
                browser.params.testdealerOwnerGroup.id,
                browser.params.organizationtypeids.dealerOwner
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerregionadmin) {
            this.buildUserJson(
                browser.params.roleids.dealerregionadmin,
                browser.params.roleslabels.dealerregionadmin,
                browser.params.testdealerRegion.id,
                browser.params.organizationtypeids.dealerRegion
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerregionuser) {
            this.buildUserJson(
                browser.params.roleids.dealerregionuser,
                browser.params.roleslabels.dealerregionuser,
                browser.params.testdealerRegion.id,
                browser.params.organizationtypeids.dealerRegion
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.customeradmin) {
            this.buildUserJson(
                browser.params.roleids.customeradmin,
                browser.params.roleslabels.customeradmin,
                browser.params.testpreferredcustomer.uid,
                browser.params.organizationtypeids.customer
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.customeruser) {
            this.buildUserJson(
                browser.params.roleids.customeruser,
                browser.params.roleslabels.customeruser,
                browser.params.testpreferredcustomer.uid,
                browser.params.organizationtypeids.customer
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.customerservice) {
            this.buildUserJson(
                browser.params.roleids.customerservice,
                browser.params.roleslabels.customerservice,
                browser.params.organizationids.peterbiltdivision,
                browser.params.organizationtypeids.division
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.tsr1) {
            this.buildUserJson(
                browser.params.roleids.tsr1,
                browser.params.roleslabels.tsr1,
                browser.params.organizationids.administrative,
                browser.params.organizationtypeids.administrative
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.tsr2) {
            this.buildUserJson(
                browser.params.roleids.tsr2,
                browser.params.roleslabels.tsr2,
                browser.params.organizationids.administrative,
                browser.params.organizationtypeids.administrative
            );
        }
        else if (userToBeAdded === browser.params.roleslabels.factoryworker) {
            this.buildUserJson(
                browser.params.roleids.factoryworker,
                browser.params.roleslabels.factoryworker,
                browser.params.organizationids.oem,
                browser.params.organizationtypeids.oem
            );
        }
        //DEBUG in case of an error.
        // console.log('Modified json:-> ' + JSON.stringify(addUserJson));
        // console.log('userSecurityAttributes:-> ' + JSON.stringify(securityAttribute));
        //POST to user-security-gateway to add the User
        return request.post(browser.params.environment.userGatewayServiceUrl)
            .set('Content-Type', 'application/json')
            .set('user_security_attributes', securityAttribute)
            .send(addUserJson)
            .then(function (res) {
                expect(res.status).toEqual(200);
                return res.body.id
            })
            .catch((err) => {
                expect(false).toBe(true, "Error message: " + err);
                return err
            });
    };

    this.buildUserJson = function (roleId, name, orgId, orgTypeId) {
        addUserJson.userRoles[0].roleId = roleId;
        addUserJson.userRoles[0].name = name;
        addUserJson.userOrganizations[0].organizationId = this.getOrganizationId(orgTypeId, orgId);
        addUserJson.userOrganizations[0].organizationTypeId = orgTypeId;
    };

    //orgTypeId is needed to create the orgId for entities other than Peoplenet and Paccar.
    this.getOrganizationId = function (orgTypeId, orgId) {
        var requiredId;
        if (orgTypeId !== 'Administrative' && orgTypeId !== 'OEM' && orgTypeId !== 'Manufacturer') {
            requiredId = 'peoplenet:' + orgTypeId.toLowerCase() + ':' + orgId;
        } else {
            requiredId = orgId;
        }
        return requiredId;
    };

    this.getSecurityAttribute = function (email) {
        var securityAttribute;
        switch (email) {
            case peoplenetAdminEmail:
                peoplenetAdminJson.uid = browser.params.testuseruids.peoplenetadmin;
                peoplenetAdminJson.userName = browser.params.testuseremails.peoplenetadmin
                securityAttribute = JSON.stringify(peoplenetAdminJson);
                break;

            case paccarAdminEmail:
                paccarAdminJson.uid = browser.params.testuseruids.paccaradmin;
                paccarAdminJson.userName = browser.params.testuseremails.paccaradmin;
                securityAttribute = JSON.stringify(paccarAdminJson);
                break;

            case dealerOwnerAdmin:
                var doaJson = JSON.parse(JSON.stringify(dealerOwnerAdminJson));
                doaJson.uid = browser.params.testuseruids.dealerowneradmin;
                doaJson.orgId = doaJson.orgId + browser.params.testdealerOwnerGroup.id;
                doaJson.userName = browser.params.testuseremails.dealerowneradmin;
                securityAttribute = JSON.stringify(doaJson);
                break;

            case dealerRegionAdmin:
                var draJson = JSON.parse(JSON.stringify(dealerRegionAdminJson));
                draJson.uid = browser.params.testuseruids.dealerregionadmin;
                draJson.orgId = draJson.orgId + browser.params.testdealerRegion.id;
                draJson.userName = browser.params.testuseremails.dealerregionadmin;
                securityAttribute = JSON.stringify(draJson);
                break;

            case dealerAdminEmail:
                var daJson = JSON.parse(JSON.stringify(dealerAdminJson));
                daJson.uid = browser.params.testuseruids.dealeradmin;
                daJson.orgId = daJson.orgId + browser.params.testdealer.id;
                daJson.userName = browser.params.testuseremails.dealeradmin;
                securityAttribute = JSON.stringify(daJson);
                break;

            case dealerUserEmail:
                dealerUserJson.uid = browser.params.testuseruids.dealeruser;
                dealerUserJson.userName = browser.params.testuseremails.dealeruser;
                securityAttribute = JSON.stringify(dealerUserJson);
                break;

            case customerAdminEmail:
            case preferredCustomerAdminEmail:
                //using preferred customer admin
                var caJson = JSON.parse(JSON.stringify(customerAdminJson));
                caJson.uid = browser.params.testuseruids.preferredcustomeradmin;
                caJson.orgId = caJson.orgId + browser.params.testpreferredcustomer.uid;
                caJson.userName = browser.params.testuseremails.preferredcustomeradmin;
                securityAttribute = JSON.stringify(caJson);
                break;

            case tsr1:
                tsr1Json.uid = browser.params.testuseruids.tsr1;
                securityAttribute = JSON.stringify(tsr1Json);
                break;

            case tsr2:
                tsr2Json.uid = browser.params.testuseruids.tsr2;
                securityAttribute = JSON.stringify(tsr2Json);
                break;

            case cumminsUserEmail:
                cumminsUserJson.uid = browser.params.testuseruids.cumminsuser;
                securityAttribute = JSON.stringify(cumminsUserJson);
                break;
        }
        return securityAttribute;
    };

    /*
     * Note: users UID has to be used since entities other than Administrative or OEM cannot
     * access (GET) the user information with userName.
     * */
    this.editUserEndpoint = function (editUserAs, userId, firstName, lastName, phoneNumber) {
        if (editUserAs === testUserEmail) {
            var userRole;
            var _this = this;
            request.get(browser.params.environment.userGatewayServiceUrl + '/' + userId)
                .set('Content-Type', 'application/json')
                .set('user_security_attributes', this.getSecurityAttribute(peoplenetAdminEmail))
                .end(function (err, res) {
                    var userData = res.body;
                    userRole = userData.userRoles[0].name;
                    console.log(err);
                    expect(res.status).toEqual(200);
                    var securityAttribute = _this.createSecurityAttribute(userRole);
                    request.get(browser.params.environment.userGatewayServiceUrl + '/' + userId)
                        .set('Content-Type', 'application/json')
                        .set('user_security_attributes', securityAttribute)
                        .end(function (err, res) {
                            var userData = res.body;
                            console.log(err);
                            expect(res.status).toEqual(200);
                            userData.firstName = firstName;
                            userData.lastName = lastName;
                            //Change the format of the phone number to POST the data
                            userData.userPhones[0].phone = phoneNumber.replace(/[^A-Z0-9]/ig, "");
                            request.put(browser.params.environment.userGatewayServiceUrl)
                                .set('Content-Type', 'application/json')
                                .set('user_security_attributes', securityAttribute)
                                .send(userData)
                                .end(function (err, response) {
                                    console.log(err);
                                    expect(response.status).toEqual(200);
                                });
                        });
                });
        }
        else {
            var securityAttribute = this.getSecurityAttribute(editUserAs);
            //GET to user-security-gateway to edit the User
            request.get(browser.params.environment.userGatewayServiceUrl + '/' + userId)
                .set('Content-Type', 'application/json')
                .set('user_security_attributes', securityAttribute)
                .end(function (err, res) {
                    var userData = res.body;
                    //console.log(userData);
                    console.log(err);
                    expect(res.status).toEqual(200);
                    userData.firstName = firstName;
                    userData.lastName = lastName;
                    //Change the format of the phone number to POST the data
                    userData.userPhones[0].phone = phoneNumber.replace(/[^A-Z0-9]/ig, "");
                    //console.log(userData);
                    request.put(browser.params.environment.userGatewayServiceUrl)
                        .set('Content-Type', 'application/json')
                        .set('user_security_attributes', securityAttribute)
                        .send(userData)
                        .end(function (err, response) {
                            console.log(err);
                            expect(response.status).toEqual(200);
                        });
                });
        }
    };
//TODO need to rework request logic to return promises
    this.switchUserStatus = function (editUserAs, userToEdit, setStatus) {
        setStatus = setStatus.toLowerCase();
        var securityAttribute = this.getSecurityAttribute(editUserAs);
        //GET to user-security-gateway to edit the User
        request.get(browser.params.environment.userGatewayServiceUrl + '?userName=' + userToEdit)
            .set('Content-Type', 'application/json')
            .set('user_security_attributes', securityAttribute)
            .end(function (err, res) {
                var userData = res.body.data[0];
                //console.log(userData);
                console.log(err);
                expect(res.status).toEqual(200);
                if (setStatus === 'active') {
                    userData.status = 1;
                }
                else if (setStatus === 'inactive') {
                    userData.status = 0;
                }
                //console.log(userData);
                request.put(browser.params.environment.userGatewayServiceUrl)
                    .set('Content-Type', 'application/json')
                    .set('user_security_attributes', securityAttribute)
                    .send(userData)
                    .end(function (err, response) {
                        console.log(err);
                        expect(response.status).toEqual(200);
                    });
            });
    };

    /*
     * Note: Takes in the userId of the user to be deleted.
     */
    this.deleteUserEndpoint = function (deleteUserAs, userToDelete) {
        var securityAttribute = this.getSecurityAttribute(deleteUserAs);
        //GET to user-security-gateway to edit the User
        return request.del(browser.params.environment.userGatewayServiceUrl + '/' + userToDelete)
            .set('Content-Type', 'application/json')
            .set('user_security_attributes', securityAttribute)
            .then(function (res) {
                // console.log(err);
                expect(res.status).toEqual(200);
                return res
            }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    /*
     * Note: For user to edit itself, we need to create the security attribute for the user depending on it's role.
     * */
    this.createSecurityAttribute = function (userRoleAdded) {
        var orgId;
        var orgType;
        var uid = browser.params.testuseruids.testUserUid;
        switch (userRoleAdded) {
            case browser.params.roleslabels.peoplenetadmin:
            case browser.params.roleslabels.tsr1:
            case browser.params.roleslabels.tsr2:
                orgId = browser.params.organizationids.administrative;
                orgType = browser.params.organizationtypeids.administrative;
                break;

            case browser.params.roleslabels.paccaradmin:
            case browser.params.roleslabels.paccaruser:
                orgId = browser.params.organizationids.oem;
                orgType = browser.params.organizationtypeids.oem;
                break;

            case browser.params.roleslabels.dealerowneradmin:
            case browser.params.roleslabels.dealerowneruser:
                orgId = browser.params.testdealerOwnerGroup.id;
                orgType = browser.params.organizationtypeids.dealerOwner;
                break;

            case browser.params.roleslabels.dealerregionadmin:
            case browser.params.roleslabels.dealerregionuser:
                orgId = browser.params.testdealerRegion.id;
                orgType = browser.params.organizationtypeids.dealerRegion;
                break;
            case "Dealer Admin":
            case browser.params.roleslabels.dealeradmin:
            case browser.params.roleslabels.dealeruser:
                orgId = browser.params.testdealer.id;
                orgType = browser.params.organizationtypeids.dealer;
                break;

            case browser.params.roleslabels.customeradmin:
            case browser.params.roleslabels.customeruser:
                orgId = browser.params.testpreferredcustomer.uid;
                orgType = browser.params.organizationtypeids.customer;
                break;
        }
        if (userRoleAdded === browser.params.roleslabels.peoplenetadmin ||
            userRoleAdded === browser.params.roleslabels.paccaradmin) {
            testUserJson.orgId = orgId;
            testUserJson.orgType = orgType;
        } else {
            testUserJson.orgId = "peoplenet:" + orgType.toLowerCase() + ':' + orgId;
            testUserJson.orgType = orgType;
        }
        testUserJson.uid = uid;
        return JSON.stringify(testUserJson);
    };

    this.addNewUser = function (email, userToBeAdded, isActive, loggedInUser) {
        var _this = this;
        this.emailField.sendKeys(email);
        this.firstNameField.sendKeys(browser.params.adduser.firstname);
        this.lastNameField.sendKeys(browser.params.adduser.lastname);
        this.phoneNumberField.sendKeys(browser.params.adduser.phone);
        this.newPasswordField.sendKeys(userPswd);
        this.cnfPasswordField.sendKeys(userPswd);
        var allPrefOptions = element(by.tagName('md-radio-group')).all(by.tagName('md-radio-button'));

        if (userToBeAdded === browser.params.roleslabels.paccaradmin) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.oem);
            if (loggedInUser === paccarAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.paccar);
            }
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.paccaradmin);
        }
        else if (userToBeAdded === browser.params.roleslabels.paccaruser) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.oem);
            if (loggedInUser === paccarAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.paccar);
            }
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.paccaruser);
        }
        else if (userToBeAdded === browser.params.roleslabels.paccarpoweruser) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.oem);
            if (loggedInUser === paccarAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.paccar);
            }
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.paccarpoweruser);
        }
        else if (userToBeAdded === browser.params.roleslabels.cumminsuser) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.division);
            this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.cummins);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.cumminsuser);
        }
        else if (userToBeAdded === browser.params.roleslabels.dealeradmin) {
            this.orgTypeField.click();
            browser.sleep(1000);
            element.all(by.cssContainingText('[ng-value="orgType"]', browser.params.adduser.organizationtype.dealer)).get(-1).click();
            this.selectOrgRoleDropdownItem("Dealer Admin");
            if (loggedInUser === dealerAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.orgNameField.click();
                this.orgNameField.getAttribute('aria-expanded').then(function (expanded) {
                    //console.log(expanded);
                    if (expanded === true || expanded === 'true') {
                        element(by.name('organization')).sendKeys(browser.params.testdealer.name);
                        element(by.className("highlight")).click();
                    }
                });
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.dealeruser) {
            this.orgTypeField.click();
            browser.sleep(1000);
            element.all(by.cssContainingText('[ng-value="orgType"]', browser.params.adduser.organizationtype.dealer)).get(-1).click();
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.dealeruser);
            if (loggedInUser === dealerAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.orgNameField.click();
                this.orgNameField.getAttribute('aria-expanded').then(function (expanded) {
                    console.log(expanded);
                    if (expanded === true || expanded === 'true') {
                        element(by.name('organization')).sendKeys(browser.params.testdealer.name);
                        element(by.className("highlight")).click();
                    }
                });
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.dealertechnician) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.dealer);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.dealertechnician);
            if (loggedInUser === dealerAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.testdealer.name);
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerowneradmin) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.dealerOwner);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.dealerowneradmin);
            if (loggedInUser === dealerOwnerAdmin) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.dealerOwnerGroup);
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerowneruser) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.dealerOwner);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.dealerowneruser);
            if (loggedInUser === dealerOwnerAdmin) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.dealerOwnerGroup);
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerregionadmin) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.dealerRegion);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.dealerregionadmin);
            if (loggedInUser === dealerRegionAdmin) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.dealerRegion);
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.dealerregionuser) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.dealerRegion);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.dealerregionuser);
            if (loggedInUser === dealerRegionAdmin) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.dealerRegion);
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.customeradmin) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.customer);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.customeradmin);
            if (loggedInUser === customerAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.preferredCustomer);
            }
        }
        else if (userToBeAdded === browser.params.roleslabels.customeruser) {
            this.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.customer);
            this.selectOrgRoleDropdownItem(browser.params.roleslabels.customeruser);
            if (loggedInUser === customerAdminEmail) {
                this.validateDisabledFields('paccar');
            } else {
                this.selectOrgNameDropdownItem(browser.params.adduser.organizationname.preferredCustomer);
            }
        }
        if (isActive === 'inactive') {
            this.activeCheckBox.click();
        }
        else if (isActive === 'active') {
            expect(this.activeCheckBox.isPresent()).toBe(true);
        }

        this.verifiedCheckBox.click();
        browser.sleep(5000);
        this.saveBtn.click();
        this.verifyNotificationOptions();
        //Select random preference for the user.
        //PVP-3427 All users adding a user can set it
        allPrefOptions.count().then(function (numberOfItems) {
            //console.log(numberOfItems);
            return Math.floor(Math.random() * numberOfItems);
        }).then(function (randomNumber) {
            //console.log(randomNumber);
            allPrefOptions.get(randomNumber).click();
        }).then(function () {
            navigation.waitTillElementToBeClickable(_this.finishButton);
            _this.finishButton.click();
        });
    };

    this.addNewUser2 = function (email, isActive, orgType, orgName, orgRole, languageType, preferredUnit) {
        this.emailField.sendKeys(email);
        this.firstNameField.sendKeys(browser.params.adduser.firstname);
        this.lastNameField.sendKeys(browser.params.adduser.lastname);
        this.phoneNumberField.sendKeys(browser.params.adduser.phone);
        if (languageType === 'Spanish') {
            this.languageClickable.click();
            navigation.waitTillElementToBeClickable(this.language);
            this.language.click();
            this.saveBtn.click();
        }
        this.newPasswordField.sendKeys(userPswd);
        this.cnfPasswordField.sendKeys(userPswd);
        this.selectOrgTypeDropdownItem(orgType);
        this.selectOrgNameDropdownItem(orgName);
        this.selectOrgRoleDropdownItem(orgRole);
        if (isActive === 'inactive') {
            this.activeCheckBox.click();
        }
        else if (isActive === 'active') {
            expect(this.activeCheckBox.isPresent()).toBe(true);
        }
        if (preferredUnit === 'International System') {
            this.measureClickable.click();
            browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.internationalSystemValue), 10000);
            this.internationalSystemValue.click();
        }
        this.verifiedCheckBox.click();
        navigation.waitTillElementToBeClickable(this.saveBtn);
        this.saveBtn.click();
        //TODO fixed error with verifyNotificationOptions
        // this.verifyNotificationOptions();
        this.finishButton.click();
    };

    this.addNewWifiUser = function (role, userEmail, isActive) {
        this.emailField.sendKeys(userEmail);
        this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
        this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
        this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
        this.selectOrgRoleDropdownItem(role);

        if (isActive === 'inactive') {
            this.activeCheckBox.click();
        }
        else if (isActive === 'active') {
            expect(this.activeCheckBox.isPresent()).toBe(true);
        }

        this.saveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/', "I am not on the User List Page?");
    };

    this.addNewWifiAdmin = function (orgType, orgName, role, userEmail, isActive) {
        this.emailField.sendKeys(userEmail);
        this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
        this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
        this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
        this.newPasswordField.sendKeys('Password1');
        this.cnfPasswordField.sendKeys('Password1');
        this.selectOrgTypeDropdownItem(orgType);
        this.orgNameField.click();
        this.orgNameField.clear();
        this.orgNameField.sendKeys(orgName);
        this.selectOrgRoleDropdownItem(role);

        if (isActive === 'inactive') {
            this.activeCheckBox.click();
        }
        else if (isActive === 'active') {
            expect(this.activeCheckBox.isPresent()).toBe(true);
        }

        this.saveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/edit/', "I am not on the User List Page?");
    };

    this.addNewInvalidWifiUser = function (userEmail, type) {
        if (type === 'duplicate email') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
            this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
            this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
            this.saveBtn.click();
        }
        else if (type === 'invalid first name') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys('InvalidFirstName');
            this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
            this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
            this.saveBtn.click();
            expect(this.maxFirstNameAlert.isPresent()).toBe(true);
        }
        else if (type === 'omit first name') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys('');
            this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
            this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
            this.saveBtn.click();
            expect(this.fNameRequiredAlert.isPresent()).toBe(true);
        }
        else if (type === 'invalid last name') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
            this.lastNameField.sendKeys('InvalidLastNameCharacterMaximumOfFortyFiveExceeded');
            this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
            this.saveBtn.click();
        }
        else if (type === 'omit last name') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
            this.lastNameField.sendKeys('');
            this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
            this.saveBtn.click();
            expect(this.lNameRequiredAlert.isPresent()).toBe(true);
        }
        else if (type === 'invalid phone number') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
            this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
            this.phoneNumberField.sendKeys('12345678901');
            this.saveBtn.click();
            expect(this.phonePatternAlert.isPresent()).toBe(true);
            //expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', "User should stay on Add User screen");
            this.phoneNumberField.clear();
            this.phoneNumberField.sendKeys('12345');
            this.saveBtn.click();
            expect(this.phonePatternAlert.isPresent()).toBe(true);
        }
        else if (type === 'omit phone number') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
            this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
            this.phoneNumberField.sendKeys('');
            this.saveBtn.click();
            expect(this.phoneRequiredAlert.isPresent()).toBe(true);
        }
        else if (type === 'invalid extension') {
            this.emailField.sendKeys(userEmail);
            this.firstNameField.sendKeys(browser.params.addwifiuser1.firstname);
            this.lastNameField.sendKeys(browser.params.addwifiuser1.lastname);
            this.phoneNumberField.sendKeys(browser.params.addwifiuser1.phone);
            this.extensionField.sendKeys('123456789012345678901');
            this.saveBtn.click();
            //no alert message for this case at the moment
        }
        //expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', "User should stay on Add User screen");
    };

    this.verifyUserIsNotInUserList = function (userName) {
        return this.allUserRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (name) {
                return expect(name).not.toContain(userName);
            });
        });
    };

    this.verifyFilteredName = function (name) {
        var regex = new RegExp(name, 'i');
        element.all(by.css('h2')).then(function (users) {
            for (var i = 0; i < users.length; i++) {
                expect(users[i].getText()).toMatch(regex);
            }
        });
    };


    this.verifyFilteredPhoneNumber = function (number) {
        var regex = new RegExp(number, 'i');
        element.all(by.css('[ng-repeat="phone in $ctrl.user.userPhones"]')).then(function (users) {
            for (var i = 0; i < users.length; i++) {
                expect(users[i].getText()).toMatch(regex);
            }
        });
    };

    this.verifyFilteredEmail = function (email) {
        var regex = new RegExp(email, 'i');
        element.all(by.css('.break-word.ng-binding')).then(function (users) {
            for (var i = 0; i < users.length; i++) {
                expect(users[i].getText()).toMatch(regex);
            }
        });
    };


    this.verifyNoFilterResults = function () {
        element.all(by.css('[ng-repeat="user in $ctrl.users"]')).then(function (users) {
            expect(users.length).toBe(0);
        });
    };

    this.verifyUserRoleFieldsFor = function (userName) {
        if (userName === browser.params.roleslabels.paccaradmin) {
            this.orgRoleField.click();
            expect(this.allRoleFields.getText()).toContain('Factory Worker');
            expect(this.allRoleFields.getText()).toContain('OEM Administrator');
            expect(this.allRoleFields.getText()).toContain('OEM Power User');
            expect(this.allRoleFields.getText()).toContain('OEM User');
        }
        else if (userName === browser.params.roleslabels.dealerowneradmin) {
            this.orgRoleField.click();
            expect(this.allRoleFields.getText()).toContain('Dealer Owner Admin');
            expect(this.allRoleFields.getText()).toContain('Dealer Owner User');
        }

        else if (userName === browser.params.roleslabels.dealerregionadmin) {
            this.orgRoleField.click();
            expect(this.allRoleFields.getText()).toContain('Dealer Region Admin');
            expect(this.allRoleFields.getText()).toContain('Dealer Region User');
        }
        else if (userName === browser.params.roleslabels.dealeradmin) {
            this.orgRoleField.click();
            expect(this.allRoleFields.getText()).toContain('Dealer Admin');
            expect(this.allRoleFields.getText()).toContain('Dealer Power User');
            expect(this.allRoleFields.getText()).toContain('Dealer Service Technician');
        }
        else if (userName === browser.params.roleslabels.dealeruser) {
            this.selectOrgTypeDropdownItem('Customer');
            this.orgRoleField.click();
            expect(this.allRoleFields.getText()).toContain('Customer Administrator');
            expect(this.allRoleFields.getText()).toContain('Customer User');
            //expect(this.allRoleFields.getText()).toContain('Wifi Driver Admin');
        }
        else if (userName === browser.params.roleslabels.customeradmin) {
            this.orgRoleField.click();
            expect(this.allRoleFields.getText()).toContain('Customer Administrator');
            expect(this.allRoleFields.getText()).toContain('Customer User');
            //expect(this.allRoleFields.getText()).toContain('Wifi Driver Admin');
        }
        this.orgRoleField.sendKeys(protractor.Key.ESCAPE);
    };

    this.delete = function (user) {
        // POST to grab test user UID
        if (user === 'edit user') {
            this.userEmail = browser.params.edituser.email;
            this.userPswd = browser.params.edituser.password;
        }
        request.post(browser.params.environment.securityGtwyUrl + '/userLogin')
            .set('Content-Type', 'application/json')
            .send('{"username":"' + testUserEmail + '","password":"' + userPswd + '", "clientId":"OEMPortal"}')
            .buffer() // <-- Force the request to buffer via .buffer()
            .end(function (err, res) {
                //console.log(res.status);
                if (res.status === 200) {
                    var responseText = JSON.parse(res.text); // parse string to json object
                    var uid = responseText.idToken.uid; // grab specific key-value from json obj
                    var uidString = JSON.stringify(uid); // convert back to string
                    var formattedUidString = uidString.replace(/"/g, ''); // strip quotes from string
                    //console.log('UID: ' + uidString);
                    // POST to grab pnet admin auth token for DELETE
                    request.post(browser.params.environment.securityGtwyUrl + '/userLogin')
                        .set('Content-Type', 'application/json')
                        .send('{"username":"' + browser.params.testuseremails.peoplenetadmin + '","password":"' + userPswd + '", "clientId":"OEMPortal"}')
                        .buffer()
                        .end(function (err, res) {
                            if (res.status === 200) {
                                var responseText = JSON.parse(res.text); // parse string to json object
                                var token = responseText.encodedToken; // grab token from object
                                var tokenString = JSON.stringify(token); // parse back to string from object
                                //console.log('Pnet token: ' + tokenString);
                                //console.log('UID within delete funct: ' + formattedUidString);
                                // DELETE req (pass in pnetadmin auth token in header)
                                request.del(browser.params.environment.securityGtwyUrl + '/users/' + formattedUidString)
                                    .set('X-Auth-Token', tokenString)
                                    .end();
                            }
                        });
                    //console.log(formattedUidString);
                    //console.log(res.status);
                }
            });
        expect(true);
    };

    this.clickUserCheckbox = function (userEmail) {
        this.allUserRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return name === userEmail;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No User was found by that email: ' + userEmail);
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.verifyDeletedUser = function (userEmail) {
        this.allUserRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                expect(name).not.toBe(userEmail);
            });
        });
    };

    this.checkForDeletedUser = function (customerName) {
        return this.allUserRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('td').get(1).getText().then(function (name) {
                //console.log(name);
                expect(name).not.toBe(customerName);
            });
        });
    };

    this.clickUserEmailHyperLinkCellSearch = userEmail => {
        return this.allUserRows.filter(row => {
            return row.$$('td').get(1).getText()
                .then(email => {
                    return email === userEmail;
                });
        }).then(filteredRows => {
            filteredRows[0].element(by.linkText(userEmail)).click();
            // filteredRows[0].element(by.className('entity-link ng-binding')).click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/details/');
        });
    };

    //this method verifies the role and selects the corresponding email.
    this.selectFilteredUserEmail = function (userRole) {
        return this.allUserRows.filter(function (row) {
            return row.$$('td').get(6).getText().then(function (role) {
                return role === userRole;
            });

        }).then(function (filteredRows) {
            filteredRows[0].$$('a').click();
            //filteredRows[0].element(by.className('entity-link ng-binding')).click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url
                + '/#/nav/user/details/', 'Could not get into the users detail page.');
        });
    };

    this.verifyFilteredUserRole = function (userRole) {
        expect(this.allUserRows.$$('td').get(6).getText()).toBe(userRole, 'The filtered role does not match.');
    };

    this.checkForToastAlert = function () {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of users succeeded.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        }
        else if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of users failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

    this.changPhoneNumber = function (number) {
        this.phoneNumberField.clear();
        this.phoneNumberField.sendKeys(number);
    };

    this.validatePhone = function (newNum) {
        // getText for input field is always empty. Use .getAttribute("value") instead.
        this.phoneNumberField.getAttribute("value").then(function (num) {
            //console.log(num);
            expect(num).toBe(newNum, 'The phone number did not change');
        });
    };

    this.validateUserProfileTabs = function (loggedInUser) {
        this.securityTab.click();
        if (loggedInUser === peoplenetAdminEmail) {
            this.tagsTab.click();
            this.notificationsTab.click();
            this.vehicleGroupTab.click();
        } else {
            this.notificationsTab.click();
            this.vehicleGroupTab.click();
        }
    };

    this.clickUserEmail = function () {
        this.allUserRows.get(0).$$('td').get(1).$$('span').click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/details/');
    };

    this.verifySelectedUserRole = function (role) { //orgType can be validated if needed.
        if (role === browser.params.roleslabels.dealeradmin) {
            role = "Dealer Admin"
        }
        expect(this.userDetailRoleField.getText()).toBe(role, 'The user did not have the expected Role.');
    };

    this.fillOutPartialUserForm = function (userPassword) {
        //fill out the form with appropriate data
        this.firstNameField.sendKeys(browser.params.adduser.firstname);
        this.lastNameField.sendKeys(browser.params.adduser.lastname);
        this.phoneNumberField.sendKeys(browser.params.adduser.phone);
        this.newPasswordField.sendKeys(userPassword);
        this.cnfPasswordField.sendKeys(userPassword);

    };

    this.fillOutPartialUserFormInCorrectPass = function (newPassword, cnfPassword) {
        this.emailField.sendKeys(browser.params.adduser.email);
        this.firstNameField.sendKeys(browser.params.adduser.firstname);
        this.lastNameField.sendKeys(browser.params.adduser.lastname);
        this.phoneNumberField.sendKeys(browser.params.adduser.phone);
        this.newPasswordField.sendKeys(newPassword);
        this.cnfPasswordField.sendKeys(cnfPassword);
    };

    this.addUserSpecialName = function (email, firstName, lastName, userPassword) {
        //fill out the form with special character in Name
        this.emailField.sendKeys(email);
        this.firstNameField.sendKeys(firstName);
        this.lastNameField.sendKeys(lastName);
        this.phoneNumberField.sendKeys(browser.params.adduser.phone);
        this.newPasswordField.sendKeys(userPassword);
        this.cnfPasswordField.sendKeys(userPassword);

        //Selects Paccar User
        this.selectOrgRoleDropdownItem(browser.params.roleslabels.paccaruser);
        this.verifiedCheckBox.click();
        browser.sleep(2000);
        this.saveBtn.click();
        this.finishButton.click();

    };

    this.verifyUserName = function (firstName, lastName) {
        expect(this.userNameField.getText()).toContain(lastName + ', ' + firstName);
        this.userNameField.getText().then(function (text) {
            console.log(text);
        });
    };

    this.validateUserSubscribed = function (customer) {
        this.subscriptionListBox.click();
        browser.sleep(1000);
        this.subscribedList.click();
        browser.sleep(1000);
        this.chipFilter.click();
        this.chipFilter.sendKeys(customer);
        this.chipFilter.sendKeys(protractor.Key.ENTER);
        expect(this.activeCheckBox.isPresent()).toBe(true);
    };

    this.unSubscribeTheUser = function () {
        this.checkBox.click();
        browser.sleep(5000);
    };

    //TODO: method to use after the filter is fixed.
    this.validateUserNotSubscribed = function (customerName) {
        this.subscriptionListBox.click();
        this.defaultList.click();
        browser.sleep(1000);
        this.chipFilter.click();
        this.chipFilter.sendKeys(customerName);
        expect(this.allSubscriptionList.get(0).$$('md-checkbox').get(0).getAttribute('aria-checked')).toBe('false');
    };

    this.goToUserSecurityDetails = function (email) {
        this.clickUserEmailHyperLinkCellSearch(email);
        this.userDetailEditButton.click();
        this.securityTab.click();
    };

    this.verifyChangeEmailElements = function () {
        expect(this.emailChangeForm.isDisplayed()).toBe(true, 'Change Email form is missing');
        expect(this.changeEmailTitle.isDisplayed()).toBe(true, 'Change Email title is missing');
        expect(this.changeEmailField.isDisplayed()).toBe(true, 'The email field is missing');
        expect(this.currentPasswordField.isPresent()).toBe(false, 'The email field is missing');
    };

    this.verifyCannotEditEmail = function (eachUser) {
        expect(this.emailChangeForm.isPresent()).toBe(false, eachUser + ': Can see the change email form.');
    };

    this.verifyCancelButton = function () {
        this.changeEmailButton.click();
        this.saveEmailCancelButton.click();
    };

    this.emailChange = function (email, change) {
        if (change === 'yes') {
            this.changeEmailField.clear();
            this.changeEmailField.sendKeys(email);
        }
        this.changeEmailButton.click();
        this.saveEmailButton.click();
    };

    this.deleteUserFromDetailsPage = function () {
        this.userDetailEditButton.click();
        this.deleteUserButton.click();
        this.deleteActionDialogButton.click();
        toastMessageUtil.verifyToastAlert('User Deleted Successfully!');

    };

    this.subscribeUserToFirstInRow = function () {
        var _this1 = this;
        this.firstSubCheckBox.getAttribute('aria-checked').then(function (attribute) {
            attribute = attribute.toString();
            if (attribute === 'false') {
                _this1.firstSubCheckBox.click();

            }
        })

    };
    this.subscribeUserToFirstCustomerInRow = function (text) {
        var _this1 = this;
        this.firstCustomerSubCheckBox.getAttribute('aria-checked').then(function (attribute) {
            attribute = attribute.toString();
            if (attribute === 'false') {
                _this1.firstSubCheckBox.click();
                toastMessageUtil.verifyToastAlert(text)

            }
        })

    };

    this.unsubscribeUserFromFirstInRow = function () {
        var _this1 = this;
        this.firstSubCheckBox.getAttribute('aria-checked').then(function (attribute) {
            attribute = attribute.toString();
            if (attribute === 'true') {
                _this1.firstSubCheckBox.click();
            }
        });
    };
    this.language = element.all(by.xpath('//md-option[@ng-value="loc"]')).last();

    this.changeLanguage = function (portalType) {
        navigation.clickUserMenu(portalType);
        navigation.clickUserProfileLink();
        this.languageClickable.click();
        navigation.waitTillElementToBeClickable(this.language);
        this.language.click();
        this.saveBtn.click();
    }
};

module.exports = new UsersPage();
