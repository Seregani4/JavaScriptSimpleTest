/**
 * Created by Popazov on 7/28/2017.
 */
var UsersUtil = function () {

    //date time variables
    var moment = require('moment');

    var navigation = require('../pages/navigation.page.js');
    var usersPage = require('../pages/users.page.js');
    var devicesPage = require('../pages/devices.page.js');
    var tableUtil = require('../utilities/tables.util');
    var dropDownMatrix = require('../utilities/dropDownMatrix.util');
    var validationUtil = require('../utilities/validation.util');
    var userProfileColumn = devicesPage.columns.userProfileColumn;
    var licenseColumn = devicesPage.columns.licenseColumn;
    var pmgVerColumn = devicesPage.columns.pmgVerColumn;
    var environmentURL = browser.params.environment.url;
    this.toastAlert = element(by.css('[role="alert"]'));
    var activeStatus = "Active";
    var inactiveStatus = "Inactive";
    this.customerSubscribedTagsArray = browser.params.customersubscribedarray;
    this.dealerSubscribedTagsArray = browser.params.dealersubscribedarray;
    this.dealerOwnerSubscribedTagsArray = browser.params.dealerownersubscribedarray;


    this.getActiveStatus = function () {
        return activeStatus;
    };

    this.getInactiveStatus = function () {
        return inactiveStatus;
    };

    this.navigateToUsersListPage = function () {
        navigation.fleetHealthButton.isPresent().then(function (result) {
            if (result) {
                navigation.fleetHealthButton.click();
            }
        });
        navigation.clickUsersLink();
    };

    this.deleteUser = function (testUserEmail) {
        this.navigateToUsersListPage();
        navigation.clearAllFiltersButton.click()
        navigation.typeInSearchFilter(testUserEmail);
        usersPage.clickUserCheckbox(testUserEmail);
        usersPage.deleteActionButton.click();
        usersPage.deleteActionDialogButton.click();
        navigation.chipFilterCloseBtn.click();
        navigation.typeInSearchFilter(testUserEmail);
        usersPage.verifyDeletedUser(testUserEmail);
    };

    this.verifyLinkVisibility = function (loggedInUser) {
        if (loggedInUser === browser.params.roleslabels.paccaradmin || loggedInUser === browser.params.roleslabels.paccaruser) {
            expect(navigation.analyticsLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the analyticsLink.');
            expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the topTenFaultsLink');
            expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the fleetHealthMapLink');
        }
        else if (loggedInUser === browser.params.roleslabels.customeradmin || loggedInUser === browser.params.roleslabels.customeruser) {
            expect(navigation.analyticsLink.isDisplayed()).toBe(false, +loggedInUser + ' can see the analyticsLink.');
            expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false, +loggedInUser + ' can see the topTenFaultsLink');
            expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(false, +loggedInUser + ' can see the fleetHealthMapLink');
        }
        else if (loggedInUser === browser.params.roleslabels.dealerowneradmin || loggedInUser === browser.params.roleslabels.dealerowneruser
            || loggedInUser === browser.params.roleslabels.dealerregionadmin || loggedInUser === browser.params.roleslabels.dealerregionuser
            || loggedInUser === browser.params.roleslabels.dealeradmin || loggedInUser === browser.params.roleslabels.dealeruser) {
            expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true, +loggedInUser + ' can see the fleetHealthMapLink');
        }
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the fleetHealthMapLink');
        expect(navigation.dealersLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the dealersLink.');
        expect(navigation.customersLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the customersLink.');
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false, +loggedInUser + ' can see the manufacturersLink');
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the vehiclesLink');
        expect(navigation.exportLink.isDisplayed()).toBe(false, +loggedInUser + ' can see the exportLink');
        expect(navigation.notificationsLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the notificationsLink');
        expect(navigation.rolesLink.isDisplayed()).toBe(false, +loggedInUser + ' can see the rolesLink');
        expect(navigation.usersLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the usersLink');
    };

    this.verifyMenuAccessCummins = function (loggedInUser) {
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the fleetHealthMapLink');
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true, +loggedInUser + ' cannot see the vehiclesLink');
    };

    this.verifyAddedUser = function (userEmail) {
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/user/details/', 'Could not add the user on '
            + moment().format('MMMM D, YYYY h:mm:ss a'));
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(userEmail);
        usersPage.verifyUserID(userEmail);
    };

    this.deleteUserPP = function (userEmail) {
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(userEmail);
        usersPage.clickUserCheckbox(userEmail);
        navigation.deleteActionButton.click();
        navigation.deleteDialogButton.click();
        navigation.clearAllFiltersButton.click();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(userEmail);
        usersPage.verifyUserIsNotInUserList(userEmail);
    };

    this.verifyUserDeletion = function (userEmail) {
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(userEmail);
        usersPage.verifyUserIsNotInUserList(userEmail);
    };

    this.changeUserStatus = function (email, statusTo) {
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(email);
        usersPage.verifyUserID(email);
        usersPage.clickUserCheckbox(email);
        navigation.editActionButton.click();
        if (statusTo === 'Active') {
            usersPage.checkStatusCheckbox();
        }
        else if (statusTo === 'Inactive') {
            usersPage.uncheckStatusCheckbox();
        }
        usersPage.saveBtn.click();
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/user/details/', 'Could not save edited user on '
            + moment().format('MMMM D, YYYY h:mm:ss a'));
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(email);
        if (statusTo === 'Active') {
            usersPage.verifyActiveStatus(email, 'Active');
        }
        else if (statusTo === 'Inactive') {
            usersPage.verifyActiveStatus(email, 'Inactive');
        }
    };

    this.verifyUserDetails = function (userEmail, firstName, lastName, phoneNumber) {
        this.navigateToUsersListPage();
        navigation.typeInSearchFilter(userEmail);
        usersPage.verifyFullName(userEmail, firstName, lastName);
        usersPage.verifyPhoneNumber(userEmail, phoneNumber);
        usersPage.verifyActiveStatus(userEmail, 'Active');
    };


    this.editUserInfo = function (email, firstName, lastName, phoneNumber) {
        this.navigateToUsersListPage();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(email);
        usersPage.verifyUserID(email);
        usersPage.clickUserCheckbox(email);
        navigation.editActionButton.click();
        usersPage.editFirstName(firstName);
        usersPage.editLastName(lastName);
        usersPage.editPhoneNumber(phoneNumber);
        usersPage.saveBtn.click();
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/user/details/', 'Could not save edited user on '
            + moment().format('MMMM D, YYYY h:mm:ss a'));
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(email);
        usersPage.verifyFullName(email, firstName, lastName);
        usersPage.verifyPhoneNumber(email, phoneNumber);
        usersPage.verifyActiveStatus(email, 'Active');
    };

    this.userEditOwnInfo = function (userEmail, userFirstName, userLastName, userPhone) {
        //edit own profile through User Profile.
        navigation.userMenuButton.click();
        navigation.allUserMenuItems.get(0).click();
        usersPage.orgTypeFieldIsNotVisible();
        usersPage.orgNameFieldIsNotVisible();
        usersPage.orgRoleFieldIsNotVisible();
        usersPage.editFirstName(userFirstName);
        usersPage.editLastName(userLastName);
        usersPage.editPhoneNumber(userPhone);
        usersPage.clickSaveBtn();
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/user/details/', 'Could not edit the user on '
            + moment().format('MMMM D, YYYY h:mm:ss a'));
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(userEmail);
        usersPage.verifyFullName(userEmail, userFirstName, userLastName);
        usersPage.verifyPhoneNumber(userEmail, userPhone);
        usersPage.verifyActiveStatus(userEmail, 'Active');
    };

    this.cannotEditUserInfo = function (userEmail) {
        //verify user does not have edit permission
        this.navigateToUsersListPage();
        navigation.clickUsersLink();
        usersPage.verifyUserID(userEmail);
        navigation.typeInSearchFilter(userEmail);
        usersPage.verifyUserID(userEmail);
        usersPage.clickUserCheckbox(userEmail);
        expect(navigation.editActionButton.isPresent()).toBe(false, 'Edit icon is Present.');
    };

    this.canEditUserInfo = function (userEmail) {
        //verify user does not have edit permission
        navigation.fleetHealthButton.isPresent().then(function (result) {
            if (result) {
                navigation.fleetHealthButton.click();
            }
        });
        navigation.clickUsersLink();
        usersPage.verifyUserID(userEmail);
        navigation.typeInSearchFilter(userEmail);
        usersPage.verifyUserID(userEmail);
        usersPage.clickUserCheckbox(userEmail);
        expect(navigation.editActionButton.isPresent()).toBe(true, 'Edit icon is not Present.');
    };

    /*Define email to be used, orgType, role and name for the user to be added.*/
    this.addSpecificUser = function (userEmail, userOrgType, userRole, orgName) {
        var userid
        this.navigateToUsersListPage();
        navigation.addActionButton.click();
        usersPage.emailField.sendKeys(userEmail);
        usersPage.firstNameField.sendKeys(browser.params.adduser.firstname);
        usersPage.lastNameField.sendKeys(browser.params.adduser.lastname);
        usersPage.phoneNumberField.sendKeys(browser.params.adduser.phone);
        usersPage.newPasswordField.sendKeys(browser.params.adduser.password);
        usersPage.cnfPasswordField.sendKeys(browser.params.adduser.password);
        usersPage.selectOrgTypeDropdownItem(userOrgType);
        usersPage.selectOrgRoleDropdownItem(userRole);
        usersPage.orgNameField.click();
        usersPage.orgNameField.sendKeys(orgName);
        usersPage.orgNameField.sendKeys(protractor.Key.TAB);
        browser.sleep(1000);
        usersPage.verifiedCheckBox.click();
        usersPage.saveBtn.click();
        expect(usersPage.allNotifications.getAttribute('class')).toContain("checked", "All Email Notification not selected ");
        browser.sleep(2000);
        return usersPage.finishButton.click()
            .then(() => {
                return browser.getCurrentUrl()
            })
            .then((url) => {
                userid = url.substring(url.lastIndexOf("/") + 1);
                browser.sleep(2000);
                navigation.clickUsersLink();
                navigation.typeInSearchFilter(userEmail);
                usersPage.verifyUserID(userEmail);
                return userid
            })


    };

    this.validateRole = function (role) {
        navigation.typeInSearchFilterRecommendation(role);
        browser.sleep(1000);
        usersPage.clickUserEmail();
        if (role === "Dealer Administrator") {
            role = "Dealer Admin"
        }
        usersPage.verifySelectedUserRole(role);
        navigation.clickUsersLink();
        navigation.chipFilterCloseBtn.click();
    };

    //Validates the filter options drop down does not contain Roles option.
    this.validateCannotSeeRole = function (role) {
        navigation.chipFilter.sendKeys(role);
        browser.sleep(1000);
        return navigation.allFilterResults.filter(function (rows) {
            return rows.getText().then(function (text) {
                return text === 'people_outline ' + role;
            });
        }).then(function (filteredRow) {
            expect(filteredRow.length).toBe(0, 'The searched role is listed on the results.');
            navigation.clickDashboardLink();
        });
    };

    //added visibility='yes/no' parameter to use it for both positive and negative filters.
    this.validateDeviceFilter = function (type, filteredColumn, visibility) {
        if (type === "!9.0.18" || type === '9.0.18') {
            navigation.typeInSearchFilter(type);
        } else {
            navigation.typeInSearchFilterRecommendation(type);
        }
        if (visibility === 'no') {
            if (type === '!Type:OEM' || type === '!Type:Cat') {
                //bug on device list page not sure about the difference between Type and Profile
                devicesPage.useProfileColumnHeader.click();
                tableUtil.verifyNotColumn(filteredColumn, userProfileColumn);
            } else if (type === '!Type:MultiMode' || type === '!Type:Standard') {
                devicesPage.useProfileColumnHeader.click();
                tableUtil.verifyNotColumn(filteredColumn, userProfileColumn);
            } else if (type === '!License: OEM(Exclusive)' || type === '!License: PFM(Exclusive)') {
                devicesPage.licenseColumnHeader.click();
                tableUtil.verifyNotColumn(filteredColumn, licenseColumn);
            } else {
                devicesPage.pmgVerColumnHeader.click();
                tableUtil.verifyNotColumn(filteredColumn, pmgVerColumn);
            }
        }
        else if (visibility === 'yes') {
            if (type === 'Type:OEM' || type === 'Type:Cat') {
                devicesPage.useProfileColumnHeader.click();
                tableUtil.verifyColumn(filteredColumn, userProfileColumn);
            } else if (type === 'Type:MultiMode' || type === 'Type:Standard') {
                devicesPage.useProfileColumnHeader.click();
                tableUtil.verifyColumn(filteredColumn, userProfileColumn);
            } else if (type === 'License: OEM(Exclusive)' || type === 'License: PFM(Exclusive)') {
                devicesPage.licenseColumnHeader.click();
                tableUtil.verifyColumn(filteredColumn, licenseColumn);
            } else {
                devicesPage.pmgVerColumnHeader.click();
                tableUtil.verifyColumn(filteredColumn, pmgVerColumn);
            }
        }
        navigation.clearAllFiltersButton.click();
    };

    this.navigateToUserDetailPage = function (userEmail) {
        this.navigateToUsersListPage();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(userEmail);
        usersPage.clickUserEmailHyperLinkCellSearch(userEmail);

    };

    this.navigateToUserDetailPageById = (userId) => {
        browser.get(`${browser.params.environment.url}/#/nav/user/details/${userId}`)
    };

    this.validateSqsData = function (body, type) {
        var tag = "peoplenet:customer:";
        if (type === 'edited' || type === 'deleted') {
            expect(body.firstName).toBe(browser.params.edituser.firstname, 'First Name did not match.');
            expect(body.lastName).toBe(browser.params.edituser.lastname, 'Last Name did not match.');
        }
        else {
            expect(body.firstName).toBe(browser.params.adduser.firstname, 'First Name did not match.');
            expect(body.lastName).toBe(browser.params.adduser.lastname, 'Last Name did not match.');
        }
        expect(body.userId).toBe(browser.params.adduser.uid, 'User ID did not match.');
        expect(body.email).toBe(browser.params.adduser.email, 'Email did not match.');
        //this validates the field is present
        expect(body.truncatedCustomerID).toBe(browser.params.testcumminscustomer.uid, 'TruncatedCustomerID did not match.');
        expect(body.customerID).toBe(tag + browser.params.testcumminscustomer.uid, 'CustomerID did not match.');
    };

    this.selectAnyValueFromDropDown = function (portalType, numberOfDropDown, option) {
        var options = element(by.xpath('(//md-option[@ng-repeat="loc in $ctrl.locales"])[' + option + ']'));
        navigation.clickUserMenu(portalType);
        navigation.clickUserProfileLink();
        usersPage.openDropDowns.get(numberOfDropDown).click();
        navigation.waitTillElementToBeClickable(options);
        options.click();
        usersPage.saveBtn.click();
    };

    this.validatePreference = (preferredParam) => {
        usersPage.textFromDetailPage.getText()
            .then(text => {
                if (preferredParam === dropDownMatrix.internationalSystem) {
                    validationUtil.validateTextContainArray(text, [
                        dropDownMatrix.kilometers,
                        dropDownMatrix.liters,
                        dropDownMatrix.degreesCelsius,
                        dropDownMatrix.kilopascals,
                        dropDownMatrix.kilograms,
                    ]);
                } else {
                    validationUtil.validateTextContainArray(text, [
                        dropDownMatrix.miles,
                        dropDownMatrix.gallons,
                        dropDownMatrix.degreesFahrenheit,
                        dropDownMatrix.poundsPerSquareInch,
                        dropDownMatrix.pounds,
                    ]);
                }
            });
    };

    this.getUidNumber = () => {
        var uid;
        return browser.getCurrentUrl()
            .then(url => {
                uid = url.split("/").pop();
                console.log(uid);
                return uid
            });
    }
};

module.exports = new UsersUtil();
