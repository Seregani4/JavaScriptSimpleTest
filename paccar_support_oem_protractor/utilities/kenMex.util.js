/**
 * Created by pshrestha on 8/7/2017.
 */

var kenMexUtil = function () {

    var loginPage = require('../pages/login.page.js');
    var navigation = require('../pages/navigation.page.js');
    var helpPage = require('../pages/help.page.js');
    var vehicles = require('../pages/vehicles.page.js');
    var customers = require('../pages/customers.page.js');
    var dealers = require('../pages/dealers.page.js');
    var usersPage = require('../pages/users.page.js');
    var notifications = require('../pages/notifications.page.js');
    var dealersOwnerGroup = require('../pages/dealerOwnerGroup.page.js');
    var deviceDetailsPage = require('../pages/device.details.page.js');
    var vehicleDetails = require('../pages/vehicledetail.page.js');
    var faultDetail = require('../pages/fault.details.page.js');
    var dashboardPage = require('../pages/dashboard2.page.js');
    var validationUtil = require('../utilities/validation.util');
    var eventsPage = require('../pages/events.page.js');
    var tableUtil = require('../utilities/tables.util.js');
    var toastMessage = require('../utilities/toastMessage.util.js');
    var transferOwnershipPage = require('../pages/TransferOwnership.page.js');
    var remoteDiagnosticsPage = require('../pages/remoteDiagnostics.page.js');
    var translations = require('../json/kenmex.json');
    var failMessage = 'Translation does not match for ->';
    var vin = browser.params.vehicle.vin;
    var environmentURL = browser.params.environment.url;
    var password = browser.params.adduser.password;
    var newPassword = browser.params.adduser.newpassword;
    var testCustomerName = 'test';
    const _ = require('lodash');

    this.validateLoginPage = function (translation) {
        expect(loginPage.emailLabel.getText())
            .toBe((translation.loginPage.emailAddress).toUpperCase(), failMessage + translation.loginPage.emailAddress);
        expect(loginPage.passwordLabel.getText())
            .toBe((translation.loginPage.password).toUpperCase(), failMessage + translation.loginPage.emailAddress);
        expect(loginPage.forgotPassWordButton.getText())
            .toBe((translation.loginPage.forgotPassword).toUpperCase(), failMessage + translation.loginPage.forgotPassword);
        expect(loginPage.submitBtn.getText())
            .toBe((translation.loginPage.login).toUpperCase(), failMessage + translation.loginPage.login);
    };

    this.validateForgotPasswordPage = function (translation) {
        loginPage.forgotPassWordButton.click();
        expect(browser.getCurrentUrl()).toBe(environmentURL + '/#/forgotpassword');
        loginPage.resetMsg.getText().then(function (text) {
            validationUtil.validateTextEqual(text, translation.loginPage.resetMessage)
        });
        loginPage.emailLabel.getText().then(function (text) {
            validationUtil.validateTextEqual(text, (translation.loginPage.emailAddress).toUpperCase());
        });
        loginPage.submitBtn.click();
        loginPage.emailRequired.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, translation.loginPage.emailRequiredToast);
        })
    };

    this.validateDashboardPage = function (translation) {
        expect(browser.getCurrentUrl()).toBe(environmentURL + '/#/nav/dashboard');
        validationUtil.validateTitle(translation.menu.dashboard);
        this.validateDashboardRecommendation(translation);
        this.validateDashboardFiltersText(translation);
    };

    this.validatePrivacyAndTermsPage = function (translation) {
        expect(browser.getCurrentUrl()).toBe(environmentURL + '/#/nav/legal');
        validationUtil.validateTitle(translation.header.PrivacyAndTerms);
        navigation.allTabs.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.privacyAndTerms.privacyUsCanada,
                translation.privacyAndTerms.termsUsCanada,
                translation.privacyAndTerms.privacyMexico,
                translation.privacyAndTerms.termsMexico
            ]);
        })
    };

    this.validateHelpPage = function (translation) {
        validationUtil.validateTitle(translation.header.help);
        navigation.subHeaders.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.help.onlineSupport,
                translation.help.contactUs
            ]);
        });
    };

    this.validateTripAuditPage = function (translation) {
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.vehicles,
            translation.vehicleDetails.vehicleDetailsHeader,
            translation.tripAudit.tripAuditHeader]);
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/vehicle/tripaudit/');
        validationUtil.validateTitle(translation.tripAudit.tripAuditHeader);
        navigation.allLabels.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.tripAudit.tripStartedonOrBefore.toUpperCase(),
                translation.tripAudit.eventTypes.toUpperCase()
            ]);
        });
        vehicles.viewIncludedEventTypeButton.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.tripAudit.viewIncludedEventTypes.toUpperCase());
        });
        vehicles.noTripEventsFoundmessage.isPresent().then(function (isPresent) {
            if (isPresent) {
                vehicles.noTripEventsFoundmessage.getText().then(function (text) {
                    validationUtil.validateTextContain(text, translation.tripAudit.noTripEventsFound);
                });
            }
        });

    };

    this.validateVehiclePage = function (translation) {
        validationUtil.validateTitle(translation.menu.vehicles);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.vehicles]);
        this.validateActionList(navigation.moreOptionsButton, navigation.allFiltersActionsList, navigation.exportButton, [
            translation.actions.export.toUpperCase(),
            translation.actions.configureColumns.toUpperCase()]);
        vehicles.actionBarMoreOptionsButton.click();
        vehicles.allActionsList.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.editVehicleButton,
                translation.vehicles.viewTripAudit,
                translation.vehicles.addToVehicleGroup,
                translation.vehicles.ownershipHistory,
                translation.vehicles.transferOwnership
            ]);
        });
        vehicles.editVehicleMoreOptionsButton.sendKeys(protractor.Key.ESCAPE);
        vehicles.vehicleHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.columns.customer,
                translation.vehicles.columns.unitNumber,
                translation.vehicles.columns.recommendation,
                translation.vehicles.columns.year,
                translation.vehicles.columns.make,
                translation.vehicles.columns.model,
                translation.vehicles.columns.vin,
                translation.vehicles.columns.dsn,
                translation.vehicles.columns.subscriptionEnd,
                translation.vehicles.columns.subscriptionStatus,
                translation.vehicles.columns.description
            ]);
        });
        this.validateRowsPerPageLabel(translation);
    };

    this.validateEditVehiclePage = function (translation, vin) {
        validationUtil.validateTitle(translation.editVehicle.editVehicleHeader);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.vehicles,
            translation.vehicleDetails.vehicleDetailsHeader,
            translation.editVehicle.editVehicleHeader]);
        navigation.allLabels.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.columns.year.toUpperCase(),
                translation.vehicles.columns.make.toUpperCase(),
                translation.vehicles.columns.model.toUpperCase(),
                translation.editVehicle.unitNumber.toUpperCase(),
                translation.vehicles.columns.description.toUpperCase(),
                translation.editVehicle.subsciptionStart.toUpperCase(),
                translation.vehicles.columns.subscriptionEnd.toUpperCase(),
                translation.editVehicle.licenseStatus.toUpperCase(),
                translation.editVehicle.primaryDealer.toUpperCase()
            ]);

        });
        vehicles.saveAndCncelButtonText.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });

    };

    this.validateDeviceDetailspage = function (translation) {
        validationUtil.validateTitle(translation.vehicleDetails.deviceDetails);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.devices,
            translation.vehicleDetails.deviceDetails
        ]);
        vehicles.textFromDeviceDetails.first().getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicleDetails.useProfile,
                translation.menu.permissions,
                translation.vehicleDetails.pmgVersion,
                translation.customers.state,
                translation.vehicleDetails.unit,
                translation.vehicles.columns.vin,
                translation.vehicleDetails.moreInformation.toUpperCase(),
                translation.vehicleDetails.vidFirmwareVersion,
                translation.vehicleDetails.engineModel,
                translation.vehicleDetails.engineMake,
                translation.vehicleDetails.lastLocation,
                translation.vehicleDetails.start,
                translation.vehicleDetails.end,
                translation.vehicleDetails.reason,
                translation.vehicleDetails.result,
                translation.vehicleDetails.timestamp,
                translation.dealers.editDealer.latitude,
                translation.dealers.editDealer.longitude
            ]);
        });
        vehicles.actionBtn.click();
        vehicles.textFromActionDropDown.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.forceCall,
                translation.vehicles.softReboot,
                translation.vehicles.hardReboot,
                translation.vehicles.clearAgentNVRAM,
                translation.vehicles.runDiagnostic,
                translation.vehicles.viewDebugLogs,
                translation.vehicles.disableWifi,
                translation.vehicles.vinDiscovery,
                translation.vehicles.pmgVersionRequest
            ]);
        });
    };


    this.validateVehicleDetailPage = function (translation) {
        validationUtil.validateTitle(translation.vehicleDetails.vehicleDetailsHeader);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.vehicles,
            translation.vehicleDetails.vehicleDetailsHeader]);
        vehicleDetails.subHeaders.getAttribute('innerHTML')
            .then(function (text) {
                validationUtil.validateTextContainArray(text, [
                    translation.vehicleDetails.vehicleDetailsHeader,
                    translation.vehicleDetails.faultLog
                ]);
            });
        navigation.thirdHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.columns.recommendation,
                translation.vehicleDetails.vehicleInformation,
                translation.vehicleDetails.lastLocation
            ]);
        });
        navigation.fourthHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.columns.customer.toUpperCase(),
                translation.vehicleDetails.yearMakeModel.toUpperCase(),
                translation.vehicles.columns.unitNumber.toUpperCase(),
                translation.vehicles.columns.description.toUpperCase(),
                translation.vehicleDetails.engineModel.toUpperCase(),
                translation.vehicleDetails.engineSerialNumber.toUpperCase(),
                translation.vehicleDetails.subsciptionStatus.toUpperCase(),
                translation.vehicles.columns.subscriptionEnd.toUpperCase(),
                translation.vehicleDetails.pmgFirmware.toUpperCase()
            ]);
        });
        navigation.tableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.columns.recommendation,
                translation.vehicles.columns.recommendation,
                translation.vehicleDetails.columns.status,
                translation.vehicleDetails.columns.system,
                translation.vehicleDetails.columns.code,
                translation.vehicles.columns.description,
                translation.vehicleDetails.columns.mileage,
                translation.vehicleDetails.columns.localTime
            ]);
        });

        this.validateActionList(vehicleDetails.openVehicleMenu, vehicleDetails.allMenuIttems, vehicleDetails.lastButtonInList, [
            translation.vehicles.viewTripAudit,
            translation.vehicleDetails.setInRepair,
            translation.vehicleDetails.runDiagnostic,
            translation.vehicleDetails.manageVehicleGroup,
            translation.vehicles.ownershipHistory,
            translation.vehicles.transferOwnership,
            translation.vehicleDetails.autorizedSeviceCenters]
        );
        this.validateActionList(vehicleDetails.faultLogActionsMenu, vehicleDetails.allMenuIttems, vehicleDetails.lastButtonInList, [
            translation.actions.export.toUpperCase(),
            translation.actions.configureColumns.toUpperCase()]
        );
    };

    this.validateOwnershipHistoryPage = function (translation, vin) {
        validationUtil.validateTitle(translation.ownershipHistory.ownershipHistoryHeader + " - VIN: " + vin);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.vehicles,
            translation.vehicleDetails.vehicleDetailsHeader,
            translation.ownershipHistory.ownershipHistoryHeader + " - VIN: " + vin]);
        vehicles.ownershipHistoryTableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.columns.customer,
                translation.ownershipHistory.purchaseDate,
                translation.ownershipHistory.changedBy
            ]);
        })

    };
    this.validateFaultDetailsDetailsTab = function (translation) {
        validationUtil.validateTitle(translation.faultDetails.faultDetailsHeader);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.vehicles,
            translation.vehicleDetails.vehicleDetailsHeader,
            translation.faultDetails.faultDetailsHeader]);
        faultDetail.faultDetailTabs.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.faultDetails.details.toUpperCase(),
                translation.faultDetails.snapshotData.toUpperCase(),
                translation.faultDetails.authorizedDealers.toUpperCase(),
                translation.loginPage.emailAddress.toUpperCase()
            ]);
        });
        faultDetail.faultDetailsHeader.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.faultDetails.faultDetailsHeader);

        });
        navigation.cardContent.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.columns.recommendation,
                translation.faultDetails.eventLocation,
                translation.faultDetails.faultInformatiom,
                translation.vehicles.columns.description.toUpperCase(),
                translation.faultDetails.currentState.toUpperCase(),
                translation.faultDetails.attention.toUpperCase(),
                translation.faultDetails.troubleshooting,
                translation.faultDetails.note.toUpperCase(),
                translation.faultDetails.occurrenceCount.toUpperCase(),
                translation.faultDetails.lampType.toUpperCase(),
                translation.vehicleDetails.columns.system.toUpperCase(),
                translation.faultDetails.mileage.toUpperCase(),
                translation.faultDetails.noteTextFirst,
                translation.faultDetails.noteTextSecond
            ]);

        });
    };


    this.validateFaultDetailsSnapshotDataTab = function (translation) {
        faultDetail.snapShotDataDropDowns.getText().then(function (text) {
            _.flatMap(translation.faultDetails.snapshotGroups).forEach(function (value) {
                validationUtil.validateTextContain(text, value);
            });
        });
        faultDetail.openAllSnapshotGroup();
        navigation.secondHeader.getAttribute('innerHTML').then(function (text) {
            _.flatMap(translation.faultDetails.graphInfo).forEach(function (value) {
                validationUtil.validateTextContain(text, value);
            });
        });
    };
    this.validateFaultDetailsAuthorizedDealerTab = function (translation) {
        navigation.secondHeader.getAttribute('innerHTML').then(function (text) {
            validationUtil.validateTextContain(text, translation.faultDetails.authorizedDealers);
        });
        navigation.thirdHeader.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.faultDetails.authorizedDealersMessage);
        });
        faultDetail.authorizedDealerTableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.faultDetails.hoursOfOperation.toUpperCase(),
                translation.faultDetails.phoneNumber.toUpperCase(),
                translation.faultDetails.aproximateDistance.toUpperCase()
            ]);
        });
        faultDetail.moreDealersButton.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.faultDetails.moreDealers.toUpperCase());
        });
    };

    this.validateFaultDetailsEmailTab = function (translation) {
        navigation.secondHeader.getAttribute('innerHTML').then(function (text) {
            validationUtil.validateTextContain(text, translation.loginPage.emailAddress.toLowerCase());
        });

        navigation.subHeadder.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.faultDetails.noEmailAvailable);
        });

    };

    this.validateFaultDetailPage = function (translation) {
        this.validateFaultDetailsDetailsTab(translation);
        faultDetail.faultDetailTabs.get(1).click();
        this.validateFaultDetailsSnapshotDataTab(translation);
        faultDetail.faultDetailTabs.get(2).click();
        this.validateFaultDetailsAuthorizedDealerTab(translation);
        faultDetail.faultDetailTabs.get(3).click();
        this.validateFaultDetailsEmailTab(translation);

    };

    this.validateTransferOwnershipPage = function (translation, vin) {
        validationUtil.validateTitle(translation.transferOwnership.transferOwnershipHeader + " - VIN: " + vin);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.vehicles,
            translation.vehicleDetails.vehicleDetailsHeader,
            translation.transferOwnership.transferOwnershipHeader + " - VIN: " + vin]);
        transferOwnershipPage.customerInformationCard.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.transferOwnership.newCustomerInformation,
                translation.transferOwnership.customerName.toUpperCase(),
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });
        transferOwnershipPage.typeInSearchFilter(testCustomerName);
        transferOwnershipPage.clickSaveBtn();
        transferOwnershipPage.confirmationPopup.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.transferOwnership.confirmOwnershipTransfer,
                translation.transferOwnership.confirmTransferMessage,
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.transfer.toUpperCase()
            ]);
        });
        transferOwnershipPage.cancelTransferBtn.click();
    };

    this.validateAddToVehicleGroupPopup = function (translation) {
        vehicles.addToVehicleGroupPopupHeader.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.vehicles.addToVehicleGroup);
        });
        vehicles.addToVehicleGroupTableName.getAttribute('innerHTML').then(function (text) {
            validationUtil.validateTextContain(text, translation.vehicles.vehicleGroup);
        });
        vehicles.addToVehicleGroupTableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.vehicles.groupName,
                translation.vehicles.columns.description
            ]);
        });
        this.validateRowsPerPageLabel(translation);
        vehicles.addToVehicleGroupTableActionButtons.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });
        vehicles.addToVehicleGroupTableActionButtons.last().sendKeys(protractor.Key.ESCAPE);
        browser.sleep(500);
    };

    this.validateRowsPerPageLabel = function (translation) {
        navigation.rowsPerPageLabel.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.navigation.rowsPerPageLabel);
        })
    };

    this.validateActionList = function (openActionListElement, allElementsActionList, closeActionElement, array) {
        navigation.waitTillElementToBeClickable(openActionListElement);
        openActionListElement.click();
        browser.sleep(500);
        allElementsActionList.getText().then(function (text) {
            array.forEach(function (eachAction) {
                validationUtil.validateTextContain(text, eachAction)
            });
        });
        navigation.waitTillElementToBeClickable(closeActionElement);
        closeActionElement.sendKeys(protractor.Key.ESCAPE);
    };

    this.validateLeftMenu = function (translation) {
        navigation.leftMenuLinks.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.menu.dashboard,
                translation.menu.dealerOwnerGroup,
                translation.menu.dealersServiceCenters,
                translation.menu.customers,
                translation.menu.users,
                translation.menu.vehicles,
                translation.menu.notifications,
                translation.menu.analytics,
                translation.menu.top10Faults,
                translation.menu.remoteDiagnostics
            ]);
        });
    };

    this.validateDashboardFiltersText = function (translation) {
        dashboardPage.dashboardFilter.getAttribute('placeholder').then(function (text) {
            validationUtil.validateTextEqual(text, translation.dashboard.filterResult)
        });
        dashboardPage.mapFilterHeading.getText().then(function (text) {
            validationUtil.validateTextEqual(text, translation.dashboard.mapFilterHeading)
        });
    };

    this.validateDashboardRecommendation = function (translation) {
        dashboardPage.allRecommendationNames.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dashboard.stopNow,
                translation.dashboard.serviceNow,
                translation.dashboard.serviceSoon,
                translation.dashboard.informational,
                translation.dashboard.noAction,
                translation.dashboard.comingSoon,
                translation.dashboard.inRepair
            ]);
        });
        dashboardPage.allRecommendations.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.menu.vehicles,
                translation.dashboard.ofFleet
            ]);
        });
    };

    this.validateUserPage = function (translation) {
        var translationMap = [
            {
                spanishTranslation: translation.roles.dealerAdministrator,
            }, {
                spanishTranslation: translation.roles.dealerPowerUser,
            }, {
                spanishTranslation: translation.roles.dealerServiceTechnician,
            }, {
                spanishTranslation: translation.roles.factoryWorker,
            }, {
                spanishTranslation: translation.roles.oemAdministrator,
            }, {
                spanishTranslation: translation.roles.oemPowerUser,
            }, {
                spanishTranslation: translation.roles.oemUser,
            }, {
                spanishTranslation: translation.roles.customerService,
            }, {
                spanishTranslation: translation.roles.customerAdministrator,
            }, {
                spanishTranslation: translation.roles.customerUser,
            }, {
                spanishTranslation: translation.roles.dealerOwnerAdmin,
            }, {
                spanishTranslation: translation.roles.dealerOwnerUser,
            }, {
                spanishTranslation: translation.roles.dealerRegionAdmin,
            }, {
                spanishTranslation: translation.roles.dealerRegionUser,
            }
        ];
        tableUtil.verifyCell(1, usersPage.columns.tableStatusColumn, translation.userPage.columns.active);
        usersPage.statusColumnHeader.click();
        tableUtil.verifyCell(1, usersPage.columns.tableStatusColumn, translation.userPage.columns.inactive);
        validationUtil.validateTitle(translation.menu.users);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.users
        ]);
        this.validateColumnsNameTranslation(translation);
        _.forEach(translationMap, function (param) {
            validationUtil.validateFilterResult('Role', usersPage.columns.tableRoleColumn, param['spanishTranslation']);
        });
        this.validateActionList(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.first(), [
            translation.navigation.none,
            translation.navigation.customers,
            translation.navigation.dealers,
            translation.menu.users,
            translation.menu.dealerOwnerGroup,
            translation.navigation.dealerRegions,
            translation.menu.roles
        ]);
    };

    this.validateUserProfilePage = function (translation) {
        this.validateOrganizationsTranslation([
            translation.organization.oem,
            translation.organization.division,
            translation.organization.dealerOwner,
            translation.organization.dealerRegion,
            translation.organization.dealer,
            translation.organization.pfmCustomer,
            translation.organization.service,
            translation.organization.eDriverOrganization
        ]);
    };

    this.validateOrganizationsTranslation = function (translation) {
        usersPage.clickAddUserButton();
        usersPage.orgTypeField.click();
        navigation.waitTillElementToBeClickable(usersPage.orgValues.first());
        usersPage.orgValues.first().getText().then(function (orgValues) {
            validationUtil.validateTextContainArray(orgValues, translation);
        });
    };

    this.validateUserDetails = function (translation) {
        usersPage.userEmailSelector.click();
        validationUtil.validateTitle(translation.navigation.userDetails);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.users,
            translation.navigation.userDetails
        ]);
        this.validateSubPageNames(translation);
    };

    this.validateSubPageNames = function (translation) {
        navigation.allTabs.getText().then(function (sub) {
            validationUtil.validateTextContainArray(sub, [
                translation.userPage.columns.role.toUpperCase(),
                translations.menu.notifications.toUpperCase(),
                translation.vehicles.vehicleGroup.toUpperCase()
            ]);
        });
        usersPage.subTitles.getText().then(function (subT) {
            validationUtil.validateTextContainArray(subT, [
                translation.userPage.details.account,
                translation.userPage.details.userNameEmail.toUpperCase(),
                translation.faultDetails.phoneNumber.toUpperCase(),
                translation.userPage.details.accountStatus.toUpperCase(),
                translation.userPage.details.emailStatus.toUpperCase(),
                translation.userPage.columns.organization,
                translation.userPage.details.organizationType.toUpperCase(),
                translation.userPage.details.organizationName.toUpperCase(),
                translation.userPage.columns.role.toUpperCase()
            ]);
        })
    };

    this.validateUserNotificationPage = function (translation) {
        usersPage.userEmailSelector.click();
        usersPage.userDetailEditButton.click();
        navigation.allTabs.get(2).click();
        navigation.cardContent.getText().then(function (valueN) {
            validationUtil.validateTextContainArray(valueN, [
                translation.notification.emailNotifications,
                translation.notification.all,
                translation.notification.derateActiveWarning,
                translation.notification.derateActive,
                translation.navigation.none,
                translation.notification.subscribedCustomers.toUpperCase(),
                translation.notification.subscribedVehicleGroups.toUpperCase()
            ]);
        })
    };

    this.validateUserVehicleGroupPage = function (translation) {
        usersPage.userEmailSelector.click();
        navigation.allTabs.get(2).click();
        validationUtil.validateTitle(translation.navigation.userDetails);
        navigation.cardContentVehicleGroup.getText().then(function (valueVG) {
            validationUtil.validateTextContainArray(valueVG, [
                translation.vehicles.groupName,
                translation.vehicles.columns.description,
                translation.navigation.amountVehicle,
                translation.navigation.subscribed
            ]);
        })
    };

    this.validateWarningMessageAddUserPage = function (translation) {
        usersPage.emailField.click();
        usersPage.firstNameField.click();
        usersPage.lastNameField.click();
        usersPage.phoneNumberField.click();
        usersPage.selectOrgTypeDropdownItem(translation.organization.division);
        usersPage.orgNameField.click();
        usersPage.orgNameField.sendKeys(protractor.Key.ESCAPE);
        usersPage.orgRoleField.click();
        usersPage.orgRoleField.sendKeys(protractor.Key.ESCAPE);
        browser.sleep(500);
        usersPage.warningMessageAddUserPage.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.userPage.security.emailIsRequired,
                translation.userPage.security.nameIsRequired,
                translation.userPage.security.lastNameIsRequired,
                translation.userPage.security.phoneNumberRequired,
                translation.userPage.security.organizationNameRequired,
                translation.userPage.security.userRoleIsRequired
            ])
        });
        browser.refresh();
        navigation.waitTillElementToBeClickable(usersPage.emailField);
        eventsPage.fillInField(usersPage.emailField, 'testtest.com');
        usersPage.firstNameField.click();
        browser.sleep(500);
        usersPage.warningMessageAddUserPage.getText().then(function (text) {
            validationUtil.validateTextContainArray(text,
                translation.userPage.security.incorrectEmail
            )
        });
        browser.refresh();
        navigation.waitTillElementToBeClickable(usersPage.emailField);
        eventsPage.fillInField(usersPage.emailField, 'test@test\.');
        eventsPage.fillInField(usersPage.firstNameField, 'EnterNameWith25Characters');
        eventsPage.fillInField(usersPage.phoneNumberField, '12345678901234567890');
        eventsPage.fillInField(usersPage.newPasswordField, password);
        eventsPage.fillInField(usersPage.cnfPasswordField, newPassword);
        eventsPage.fillInField(usersPage.lastNameField, 'EnterNameWith50CharactersEnterNameWith50Characters');
        usersPage.orgRoleField.sendKeys(protractor.Key.ENTER);
        browser.sleep(500);
        usersPage.warningMessageAddUserPage.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.userPage.security.incorrectEmail,
                translation.userPage.security.nameCannotBeLongerThan15Characters,
                translation.userPage.security.phoneNumberMustConsistOf10Numbers,
                translation.userPage.security.passwordAndConfirmFieldsAreNotEqual,
                translation.userPage.security.lastNameMustBeLessThan45Characters
            ])
        });
        browser.refresh();
        navigation.waitTillElementToBeClickable(usersPage.firstNameField);
        usersPage.fillOutPartialUserFormInCorrectPass('Pass1', 'Pass1');
        eventsPage.fillInField(usersPage.orgRoleField, browser.params.organizationtypeids.oem);
        usersPage.saveBtn.click();
        toastMessage.verifyToastAlert(translation.userPage.security.passwordMustBeAtLast8Characters);
        eventsPage.fillInField(usersPage.newPasswordField, '123');
        eventsPage.fillInField(usersPage.cnfPasswordField, '123');
        usersPage.saveBtn.click();
        toastMessage.verifyToastAlert(translation.userPage.security.passwordRequirements);
        usersPage.orgRoleField.sendKeys('qwerty');
        usersPage.saveBtn.click();
        toastMessage.verifyToastAlert(translation.userPage.security.providedRolesForUserAreNotLegalForTheirAssignedOrganizations);
    };

    this.validateUserEditPage = function (translation) {
        var _this1 = this;
        usersPage.userEmailSelector.click();
        usersPage.userDetailEditButton.click();
        usersPage.textFromUserEditPage.getText().then(function (valueUEP) {
            validationUtil.validateTextContainArray(valueUEP, [
                translation.loginPage.emailAddress.toUpperCase(),
                translation.customers.name.toUpperCase(),
                translation.userPage.columns.lastName.toUpperCase(),
                translation.faultDetails.phoneNumber.toUpperCase(),
                translation.userPage.dropDown.preferredLanguage.toUpperCase(),
                translation.userPage.dropDown.preferredUnitsOfDistance.toUpperCase(),
                translation.userPage.dropDown.preferredUnitsOfVolume.toUpperCase(),
                translation.userPage.dropDown.preferredUnitsOfTemperature.toUpperCase(),
                translation.userPage.dropDown.preferredUnitsOfPressure.toUpperCase(),
                translation.userPage.dropDown.preferredUnitsOfMass.toUpperCase()
            ]);
        });
        usersPage.textFromCheckBoxes.getText().then(function (valueCB) {
            validationUtil.validateTextContainArray(valueCB, [
                translation.userPage.details.alwaysCollapseNavigationBar,
                translation.userPage.columns.active,
                translation.userPage.details.emailVerified
            ])
        });
        usersPage.checkBoxes.get(1).click();
        usersPage.checkBoxes.get(2).click();
        usersPage.textFromCheckBoxes.getText().then(function (valueCB) {
            validationUtil.validateTextContainArray(valueCB, [
                translation.userPage.columns.inactive,
                translation.userPage.details.emailNotVerified
            ])
        });

        usersPage.buttonsName.getText().then(function (textFromButtons) {
            validationUtil.validateTextContainArray(textFromButtons, [
                translation.navigation.delete.toUpperCase(),
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ])
        });

        var translationMapDropDown = [
            {
                numberOfDropDown: 1,
                values: [translation.userPage.dropDown.canada, translation.userPage.dropDown.unitedStates, translation.userPage.dropDown.mexica]
            },
            {
                numberOfDropDown: 2,
                values: [translation.userPage.dropDown.spanish, translation.userPage.dropDown.english]
            },
            {
                numberOfDropDown: 3,
                values: [translation.userPage.dropDown.kilometers, translation.userPage.dropDown.miles]
            },
            {
                numberOfDropDown: 4,
                values: [translation.userPage.dropDown.liters, translation.userPage.dropDown.gallons]
            },
            {
                numberOfDropDown: 5,
                values: [translation.userPage.dropDown.degreesCelcius, translation.userPage.dropDown.degreesFarenheit]
            },
            {
                numberOfDropDown: 6,
                values: [translation.userPage.dropDown.kilopascals, translation.userPage.dropDown.poundsPerSquareInch]
            },
            {
                numberOfDropDown: 7,
                values: [translation.userPage.dropDown.kilograms, translation.userPage.dropDown.pounds]
            }];

        _.forEach(translationMapDropDown, function (param) {
            _this1.validateActionList(
                usersPage.openDropDowns.get(param.numberOfDropDown),
                usersPage.takeValueFromDropDowns,
                usersPage.takeValueFromDropDowns.first(),
                param.values)
        });
    };

    this.validateUserSecurityPage = function (translation, user) {
        var _this1 = this;
        usersPage.userEmailSelector.click();
        usersPage.userDetailEditButton.click();
        navigation.allTabs.get(1).click();
        usersPage.textFromSecurityPage.getText().then(function (valueSP) {
            validationUtil.validateTextContainArray(valueSP, [
                translation.userPage.security.changeEmail,
                translation.loginPage.emailAddress.toUpperCase(),
                translation.userPage.security.changePassword,
                translation.userPage.security.currentPassword.toUpperCase(),
                translation.userPage.security.newPassword.toUpperCase(),
                translation.userPage.security.changePassword.toUpperCase(),
                translation.userPage.security.changeEmail.toUpperCase(),
                translation.userPage.security.changePassword.toUpperCase()
            ])
        });
        _this1.validateDialogMessageSecurityPage(translation, user);
        navigation.waitTillElementToBeClickable(navigation.allTabs.get(0));
        navigation.allTabs.get(0).click();
        navigation.waitTillElementToBeClickable(usersPage.saveBtn);
        usersPage.saveBtn.click();
    };

    this.validateDialogMessageSecurityPage = function (translation, user) {
        eventsPage.fillInField(usersPage.emailFieldSecurityPage, 'test' + user);
        navigation.dialogBox.getText().then(function (valueD) {
            validationUtil.validateTextContainArray(valueD, [
                translation.userPage.security.saveEmail,
                translation.userPage.security.dialogText,
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ])
        });
        usersPage.saveDialogBtn.click();
        browser.sleep(500);
        toastMessage.verifyToastAlert(translation.userPage.security.yourEmailHasBeenUpdated);
        eventsPage.fillInField(usersPage.emailFieldSecurityPage, user);
        usersPage.saveDialogBtn.click();
        expect(usersPage.emailFieldSecurityPage.getAttribute('value')).toBe(user);
    };

    this.validateWarningMessageSecurityPage = function (translation, tab, fieldForFill, fieldForClick, elmessage, validateText) {
        tab.click();
        fieldForFill.clear();
        //Need to enter any char to the field to enable validation
        if (!validateText) {
            fieldForFill.sendKeys("1")
            fieldForFill.sendKeys(protractor.Key.BACK_SPACE);
        }
        fieldForFill.sendKeys(validateText);
        fieldForClick.click();
        browser.sleep(500);
        expect(elmessage.getText()).toBe(translation, 'Wrong warning message');
    };

    this.validateColumnsNameTranslation = function (translation) {
        navigation.tableHeader.getText().then(function (userNameColumns) {
            validationUtil.validateTextContainArray(userNameColumns, [
                translation.navigation.name,
                translation.userPage.columns.lastName,
                translation.userPage.columns.organization,
                translation.userPage.columns.contact,
                translation.userPage.columns.role,
                translation.userPage.columns.status
            ]);
        });
    };

    this.validateUserActionMenu = function (translation) {
        navigation.userMenuButton.click();
        navigation.allUserMenuItems.getText().then(function (userMenu) {
            validationUtil.validateTextContainArray(userMenu, [
                translation.header.userProfile,
                translation.header.PrivacyAndTerms,
                translation.header.help
            ]);
        });
        navigation.logoutBtn.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.header.logout);
            navigation.logoutBtn.sendKeys(protractor.Key.ESCAPE);
            browser.sleep(1000);
        });
    };

    this.validateCustomerListPage = function (translation) {
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.customers]);
        navigation.secondHeader.getAttribute('innerHTML').then(function (text) {
            validationUtil.validateTextContain(text, translation.menu.customers);
        });
        navigation.tableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.name,
                translation.customers.address,
                translation.faultDetails.phoneNumber,
                translation.customers.email
            ]);
        });
        this.validateActionList(navigation.moreOptionsButton, navigation.allFiltersActionsList, navigation.exportButton, [
            translation.actions.export.toUpperCase(),
            translation.actions.configureColumns.toUpperCase()]);
        this.validateActionList(navigation.manageSearchFilterButton, navigation.allFiltersActionsList, navigation.saveNewFilter, [
            translation.navigation.saveFilter,
            translation.navigation.manageAllSavedFilters]);
        this.validateRowsPerPageLabel(translation);
        this.validateSelectedItemsMessage(translation);
        this.validateConfigureColumnsPopup(translation);
    };

    this.validateCustomerDetailsPage = function (translation) {
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.customers,
            translation.customers.customerDetails]);
        navigation.allTabs.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.contactInfo.toUpperCase(),
                translation.customers.manageVehicles.toUpperCase(),
                translation.vehicles.vehicleGroup.toUpperCase(),
                translation.customers.subscribedUsers.toUpperCase()
            ]);
        });
        this.validateCustomerDetailsContactInfoTab(translation);
        navigation.allTabs.get(1).click();
        this.validateCustomerDetailsManageVehiclesTab(translation);
        navigation.allTabs.get(2).click();
        this.validateCustomerDetailsVehicleGroupTab(translation);
        navigation.allTabs.get(3).click();
        this.validateCustomerDetailsSubscribedUsersTab(translation);
    };

    this.validateCustomerDetailsContactInfoTab = function (translation) {
        navigation.cardContent.get(0).getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.address,
                translation.customers.contact,
                translation.customers.primary,
                translation.customers.fax
            ]);
        })
    };

    this.validateRemoteDiagnosticsPage = function (translation) {
        validationUtil.validateTitle(translation.menu.remoteDiagnostics);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.remoteDiagnostics
        ]);
        remoteDiagnosticsPage.textFromRemoteDiagnoscticsButtons.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.reset.toUpperCase(),
                translation.remoteDiagnostics.deactivate.toUpperCase()
            ]);
        });
        remoteDiagnosticsPage.textFromRemoteDiagnoscticsPage.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.remoteDiagnostics.deactivate.toUpperCase(),
                translation.remoteDiagnostics.reactivate.toUpperCase(),
                translation.remoteDiagnostics.deactivateRemoteDiagnostics,
                translation.remoteDiagnostics.infoMessageDeactivate,
                translation.remoteDiagnostics.enterVin.toUpperCase(),
                translation.remoteDiagnostics.reasonForElimination.toUpperCase(),
                translation.remoteDiagnostics.customerApplication
            ]);
        });
        remoteDiagnosticsPage.reactivateTab.click();
        remoteDiagnosticsPage.textFromRemoteDiagnoscticsPage.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.remoteDiagnostics.deactivate.toUpperCase(),
                translation.remoteDiagnostics.reactivate.toUpperCase(),
                translation.remoteDiagnostics.reactivateRemoteDiagnostics,
                translation.remoteDiagnostics.infoMessageReactivate,
                translation.remoteDiagnostics.enterVin.toUpperCase()
            ]);
        });
    };

    this.validateCustomerDetailsManageVehiclesTab = function (translation) {
        this.validateActionList(customers.allFilterByDropdown.get(0), customers.allSortByOption, customers.defaultVehicle, [
            translation.navigation.default,
            translation.navigation.selected,
            translation.navigation.unselected]);
        navigation.cardContent.get(1).getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.vehicleList.toUpperCase(),
                translation.customers.customerVehicles,
                translation.navigation.filterBy.toUpperCase(),
                translation.customers.vehiclePerPage
            ]);
        })
    };

    this.validateCustomerDetailsVehicleGroupTab = function (translation) {
        navigation.cardContent.get(2).getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.allVehicles,
                translation.customers.addGroup.toUpperCase()
            ]);
        });
        customers.addGroupBtn.click();
        customers.addGroupInput.getAttribute('placeholder').then(function (text) {
            validationUtil.validateTextContain(text, translation.customers.groupName);
        });
        navigation.formContent.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        })
    };

    this.validateCustomerDetailsSubscribedUsersTab = function (translation) {
        this.validateActionList(customers.allFilterByDropdown.get(1), customers.allSortByOption, customers.defaultVehicle, [
            translation.navigation.default,
            translation.navigation.selected,
            translation.navigation.unselected]);
    };

    this.validateSelectedItemsMessage = function (translation) {
        navigation.checkRowInTable(1);
        navigation.itemSelectedMessage.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.navigation.itemSelected.toLowerCase());
        });
        navigation.checkRowInTable(1);
    };

    this.validateEditCustomerPage = function (translation) {
        navigation.validateBreadCrumbs([
            translation.menu.dashboard, translation.menu.customers,
            translation.customers.customerDetails,
            translation.customers.editCustomer.editCustomerHeader]);
        navigation.cardContent.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.name.toUpperCase(),
                translation.loginPage.emailAddress.toUpperCase(),
                translation.customers.address.toUpperCase() + ' 1',
                translation.customers.address.toUpperCase() + ' 2',
                translation.customers.city.toUpperCase(),
                translation.customers.state.toUpperCase(),
                translation.customers.zipCode.toUpperCase(),
                translation.customers.country.toUpperCase(),
                translation.faultDetails.phoneNumber.toUpperCase(),
                translation.customers.fax.toUpperCase(),
                translation.customers.editCustomer.dealerMonitoring,
                translation.customers.editCustomer.editDealerMessage,
                translation.customers.editCustomer.joinThePetterbitMessage,
                translation.navigation.delete.toUpperCase(),
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });

    };

    this.validateDealersListPage = function (translation) {
        validationUtil.validateTitle(translation.dealers.dealersHeader);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.dealers.dealersHeader]);
        navigation.tableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.name,
                translation.vehicleDetails.columns.code,
                translation.customers.address,
                translation.customers.contact
            ]);
        });
        this.validateActionList(navigation.manageSearchFilterButton, navigation.allFiltersActionsList, navigation.saveNewFilter, [
            translation.navigation.saveFilter,
            translation.navigation.manageAllSavedFilters]);
        this.validateActionList(navigation.moreOptionsButton, navigation.allFiltersActionsList, navigation.exportButton, [
            translation.actions.export.toUpperCase(),
            translation.actions.configureColumns.toUpperCase()]);
        dashboardPage.dashboardFilter.getAttribute('placeholder').then(function (text) {
            validationUtil.validateTextEqual(text, translation.dashboard.filterResult);
        });
        navigation.checkRowInTable(1);
        browser.sleep(10000);
        navigation.itemSelectedMessage.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.navigation.itemSelected.toLowerCase());
        });
        navigation.checkRowInTable(1);
    };

    this.dOGListDeletePopUpValidation = function (translation) {
        navigation.dialogBox.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.delete,
                translation.dealersOwnerGroups.confirmDeletionMessage,
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.delete.toUpperCase()
            ]);

        })
    };

    this.validateDOGDetailPage = function (translation, groupName) {
        validationUtil.validateTitle(translation.dealersOwnerGroups.groupDetails);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.dealerOwnerGroup,
            groupName
        ]);
        navigation.allTabs.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealersOwnerGroups.groupInformation.toUpperCase(),
                translation.dealers.editDealer.locations.toUpperCase(),
                translation.dealersOwnerGroups.regions.toUpperCase()
            ])
        });
        navigation.secondHeader.getAttribute('innerHTML').then(function (text) {
            validationUtil.validateTextContain(text, groupName)

        });
        dealersOwnerGroup.groupInfoCard.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealersOwnerGroups.groupInformation,
                translation.vehicles.groupName,
                translation.dealersOwnerGroups.groupDescription
            ])
        });
        navigation.allTabs.get(1).click();
        this.validateEditDOGPageLocationTab(translation);
        navigation.allTabs.get(2).click();
        this.validateEditDOGPageRegionTab(translation)
    };

    this.validateEditDOGPageLocationTab = function (translation) {
        navigation.secondHeader.getAttribute('innerHTML').then(function (text) {
            validationUtil.validateTextContain(text, translation.dealers.editDealer.locations);
        });
        dealersOwnerGroup.addLocationBtn.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.dealers.editDealer.addLocation.toUpperCase());
        })
    };

    this.validateEditDOGPageRegionTab = function (translation) {
        dealersOwnerGroup.addRegionBtn.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.navigation.add.toUpperCase());
        });
    };

    this.validateDealerDetailPage = function (translation, dealerCode, dealerName) {
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.dealers.dealersHeader,
            dealerName + ' ' + dealerCode]);
        navigation.subHeaders.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealers.physicalAddress,
                translation.dealers.phoneNumbers,
                translation.dealers.propertyMap.toUpperCase()
            ]);
        });
    };

    this.validateTagsTab = function (translation) {
        navigation.allTabs.get(2).click();
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.users,
            translation.navigation.userDetails,
            translation.userPage.dropDown.editUserDetails
        ]);
        validationUtil.validateTitle(translation.userPage.dropDown.editUserDetails);
        usersPage.addTagBtn.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, translation.userPage.tags.addTag.toUpperCase());
        });
        usersPage.addTagBtn.click();
        usersPage.textFromButtons.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });
    };

    this.validateDealerEditPage = function (translation) {
        validationUtil.validateTitle(translation.dealers.editDealer.editDealerHeader);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.dealers.dealersHeader,
            translation.dealers.dealersDetailHeader,
            translation.dealers.editDealer.editDealerHeader]);
        navigation.allLabels.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.name.toUpperCase(),
                translation.customers.email.toUpperCase(),
                translation.navigation.id.toUpperCase(),
                translation.dealers.editDealer.latitude.toUpperCase(),
                translation.dealers.editDealer.longitude.toUpperCase()
            ]);
        });
        dealers.editDealerMainActionButtons.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });

        navigation.subHeaders.getText().then(function (text) {

            validationUtil.validateTextContainArray(text, [
                translation.dealers.editDealer.geofences,
                translation.dealers.editDealer.locations,
                translation.dealers.editDealer.phoneNumbers,
                translation.dealers.editDealer.hoursOfService
            ]);
        });
        dealers.allAddEditButtons.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealers.editDealer.addCoordinate.toUpperCase(),
                translation.dealers.editDealer.addLocation.toUpperCase(),
                translation.dealers.editDealer.addPhone.toUpperCase(),
                translation.dealers.editDealer.addHoursOfService.toUpperCase()
            ]);
        });
        this.editDealerPageValidateAddCoordinationTab(translation);
        this.editDealerPageValidateAddLocationTab(translation);
        this.editDealerPageValidateAddPhoneTab(translation);
        this.editDealerPageValidateAddHoursOfServiceTab(translation);
    };

    this.editDealerPageValidateAddCoordinationTab = function (translation) {
        dealers.addCoordinateButton.click();
        dealers.addCoordinateForm.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealers.editDealer.coordinate,
                translation.dealers.editDealer.latitude.toUpperCase(),
                translation.dealers.editDealer.longitude.toUpperCase(),
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.done.toUpperCase()
            ]);
        });
        dealers.addCoordinateCancelButton.click();
    };

    this.editDealerPageValidateAddLocationTab = function (translation) {
        dealers.addLocationButton.click();
        dealers.addLocationForm.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealers.editDealer.newLocation,
                translation.dealers.editDealer.addressType.toUpperCase(),
                translation.dealers.editDealer.addressLine.toUpperCase() + ' 1',
                translation.dealers.editDealer.addressLine.toUpperCase() + ' 2',
                translation.customers.city.toUpperCase(),
                translation.customers.state.toUpperCase(),
                translation.customers.zipCode.toUpperCase(),
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.done.toUpperCase()
            ]);
        });
        dealers.addLocationCancelButton.click();
    };

    this.editDealerPageValidateAddPhoneTab = function (translation) {
        dealers.addPhoneButton.click();
        dealers.addPhoneForm.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealers.editDealer.newPhone,
                translation.faultDetails.phoneNumber.toUpperCase(),
                translation.dealers.editDealer.phoneType.toUpperCase(),
                translation.dealers.editDealer.primary,
                translation.dealers.editDealer.secondary,
                translation.dealers.editDealer.tollFree,
                translation.customers.fax,
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.done.toUpperCase()
            ]);
        });
        dealers.addPhoneCancelButton.click();
    };

    this.editDealerPageValidateAddHoursOfServiceTab = function (translation) {
        dealers.addHoursOfServiceButton.click();
        dealers.addHoursOfServiceForm.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealers.editDealer.newHoursofService,
                translation.dealers.editDealer.serviceType.toUpperCase(),
                translation.dealers.editDealer.open.toUpperCase(),
                translation.dealers.editDealer.close.toUpperCase(),
                translation.dealers.editDealer.dayofweek.toUpperCase(),
                translation.dealers.editDealer.sunday,
                translation.dealers.editDealer.monday,
                translation.dealers.editDealer.tuesday,
                translation.dealers.editDealer.wednesday,
                translation.dealers.editDealer.thursday,
                translation.dealers.editDealer.friday,
                translation.dealers.editDealer.saturday,
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.done.toUpperCase()
            ]);
        });
        dealers.addHoursOfServiceCancelButton.click();
    };

    this.validateDOGListPage = function (translation) {
        validationUtil.validateTitle(translation.menu.dealerOwnerGroup);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.dealerOwnerGroup
        ]);
        navigation.secondHeader.getAttribute('innerHTML').then(function (text) {
            validationUtil.validateTextContain(text, translation.menu.dealerOwnerGroup)
        });
        navigation.tableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.customers.name,
                translation.vehicles.columns.description,
                translation.navigation.updated
            ]);
        });
        this.validateRowsPerPageLabel(translation);
    };

    this.validateCreateDealerOwnerGroupPage = function (translation) {
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.dealerOwnerGroup,
            translation.dealersOwnerGroups.crateGroup
        ]);
        navigation.allLabels.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dealersOwnerGroups.groupInformation,
                translation.vehicles.groupName.toUpperCase(),
                translation.dealersOwnerGroups.groupDescription.toUpperCase()
            ]);
        });
        dealersOwnerGroup.createGroupButtonPanel.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.save.toUpperCase(),
                translation.navigation.cancel.toUpperCase()
            ]);
        });
    };

    this.validateTopTenFaultsListPage = function (translation) {
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.top10Faults]);
        validationUtil.validateTitle(translation.menu.top10Faults);
        navigation.tableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.dashboard.count,
                translation.dashboard.percent
            ]);
        });
    };

    this.validateNotificationPage = function (translation) {
        validationUtil.validateTitle(translation.menu.notificationLogs);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.notificationLogs
        ]);
        notifications.textFromFirstTable.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.notification.recipient,
                translation.notification.dateTime,
                translation.vehicleDetails.columns.status,
                translation.notification.viewDetails.toUpperCase(),
                translation.notification.sent.toUpperCase()
            ]);
        });

        notifications.notificationStatus.first().getText().then(function (text) {
            notifications.vievDetailsButtonsList.first().click();
            navigation.validateBreadCrumbs([
                translation.menu.dashboard,
                translation.menu.notificationLogs,
                translation.notification.notificationsDetails
            ]);
            expect(navigation.allTabs.first().getText()).toBe("HTML");
            expect(navigation.allTabs.last().getText()).toBe("JSON");
            navigation.allTabs.last().click();
            if (text === translations.notification.sent.toUpperCase()) {
                expect(notifications.jsonBodyPreview.getText()).toContain('"status": "SENT"');
            }
            else {
                expect(notifications.jsonBodyPreview.getText()).toContain('"status": "NOT SENT"');
            }
        })
    };

    this.validateFiltersManagement = function (translation) {
        dashboardPage.dashboardFilter.getAttribute('placeholder').then(function (text) {
            validationUtil.validateTextEqual(text, translation.dashboard.filterResult)
        });
        this.validateActionList(navigation.manageSearchFilterButton, navigation.allFiltersActionsList, navigation.saveNewFilter, [
            translation.navigation.saveFilter,
            translation.navigation.manageAllSavedFilters]);
        navigation.clickManageSearchFilterOption();
        navigation.dialogBox.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.manageAllSavedFilters,
                translation.navigation.youDontHaveAnySavedFiltersCurrently,
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });
        navigation.cancelCreationButton.click();
        navigation.clickSaveSearchFilterOption();
        navigation.saveDialogButton.click();
        navigation.dialogBox.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.navigation.saveFilter,
                translation.navigation.filterName.toUpperCase(),
                translation.navigation.filterNameIsRequiredMessage,
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase()
            ]);
        });
        navigation.cancelCreationButton.click();
        navigation.clickSaveSearchFilterOption();
        navigation.nameInputDialog.sendKeys('1');
        navigation.saveDialogButton.click();
        navigation.dialogBox.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.navigation.twoCharractersAreRequiredMessage);
        });
        navigation.cancelCreationButton.click();
    };

    this.validateConfigureColumnsPopup = function (translation) {
        navigation.moreOptionsButton.click();
        navigation.waitTillElementToBeClickable(navigation.configureColumnsButton);
        navigation.configureColumnsButton.click();

        navigation.dialogBox.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.actions.configureColumns,
                translation.navigation.editColumnsPopupMessage,
                translation.navigation.name,
                translation.navigation.order,
                translation.navigation.reset.toUpperCase(),
                translation.navigation.cancel.toUpperCase(),
                translation.navigation.save.toUpperCase(),
            ]);
        });
        navigation.cancelCreationButton.click();
    };

    this.validateHardReboot = translation => {
        navigation.typeInSearchFilter(vin);
        vehicles.clickVehicleHyperlinkCellSearch(vin);
        vehicles.dsnHyperlink.click();
        navigation.waitTillElementToBeClickable(deviceDetailsPage.actionButton);
        deviceDetailsPage.actionButton.click();
        deviceDetailsPage.hardRebootBtn.click();
        deviceDetailsPage.yesButton.click();
        navigation.waitTillElementToBeVisible(deviceDetailsPage.dialogContent);
        deviceDetailsPage.dialogContent.getText()
            .then(text => {
                if (text === translations.userPage.details.dialogContent1) {
                    validationUtil.validateTextContain(text, translation.userPage.details.dialogContent1);
                }
                else {
                    validationUtil.validateTextContain(text, translation.userPage.details.dialogContent2);
                }
            });
    };

    this.validateRunDiagnostic = function (translation) {
        navigation.typeInSearchFilter(vin);
        vehicles.clickVehicleHyperlinkCellSearch(vin);
        vehicles.dsnHyperlink.click();
        navigation.waitTillElementToBeClickable(deviceDetailsPage.actionButton);
        deviceDetailsPage.actionButton.click();
        deviceDetailsPage.runDiagnosticBtn.click();
        deviceDetailsPage.yesButton.click();
        deviceDetailsPage.dialogContent.getText()
            .then(text => {
                if (text === translation.userPage.details.dialogContent3) {
                    validationUtil.validateTextContainArray(text, translation.userPage.details.dialogContent3);
                }
                else {
                    validationUtil.validateTextContainArray(text, [
                        translation.vehicleDetails.diagnostics.diagnostic.toLowerCase(),
                        translation.vehicleDetails.diagnostics.deviceInformation,
                        translation.vehicleDetails.diagnostics.typeOfPMG,
                        translation.vehicleDetails.diagnostics.typeOfRadio,
                        translation.vehicleDetails.diagnostics.pmgUsageProfileMode,
                        translation.vehicleDetails.diagnostics.gpsPosition,
                        translation.dealers.editDealer.latitude,
                        translation.dealers.editDealer.longitude,
                        translation.vehicleDetails.diagnostics.reeferData,
                        translation.faultDetails.details,
                        translation.vehicleDetails.columns.status,
                        translation.vehicleDetails.vehicleInformation,
                        translation.vehicleDetails.columns.mileage,
                        translation.vehicleDetails.diagnostics.switchedOn,
                        translation.vehicleDetails.diagnostics.modify,
                        translation.vehicleDetails.diagnostics.connectivity,
                        translation.vehicleDetails.diagnostics.internet,
                        translation.vehicleDetails.diagnostics.cellPhone,
                        translation.vehicleDetails.diagnostics.technology
                    ]);
                }
            });
    };

    this.validateVinDiscovery = function (translation) {
        navigation.typeInSearchFilter(vin);
        vehicles.clickVehicleHyperlinkCellSearch(vin);
        vehicles.dsnHyperlink.click();
        navigation.waitTillElementToBeClickable(deviceDetailsPage.actionButton);
        deviceDetailsPage.actionButton.click();
        deviceDetailsPage.vinDiscoveryBtn.click();
        toastMessage.verifyToastAlert(translation.userPage.details.vinDiscovery);
    }
};

module.exports = new kenMexUtil();