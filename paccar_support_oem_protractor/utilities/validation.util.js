/**
 * Created by Popazov on 12/12/2017.
 */


var validationUtil = function () {
    const _ = require('lodash');
    var navigation = require('../pages/navigation.page.js');
    var request = require('superagent');
    var dealerOwnerGroupPage = require('../pages/dealerOwnerGroup.page');
    var usersPage = require('../pages/users.page');
    var vehiclesPage = require('../pages/vehicles.page');
    var eventsPage = require('../pages/events.page');
    var tableUtil = require('../utilities/tables.util.js');
    var chipFilterMatrix = require('../utilities/chipFilterMatrix.utils.js');
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var paccarPowerUserEmail = browser.params.testuseremails.paccarpoweruser;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUserEmail = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUserEmail = browser.params.testuseremails.dealerregionuser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerPowerUserEmail = browser.params.testuseremails.dealeruser;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var userArrayForVehicleGroupFilter = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionUser, paccarAdminEmail, paccarUserEmail, paccarPowerUserEmail,
        dealerOwnerAdminEmail, dealerOwnerUserEmail, dealerRegionAdminEmail, dealerRegionUserEmail, dealerAdminEmail, dealerPowerUserEmail, divisionUserEmail, dealerTechEmail];
    var removalCategoriesSuggestions = ["Invalid VIN", "Customer Requested", "Out of Service", "Subscription Expired"];
    var recomendationsSuggestiosns = ["Stop Now", "No Action", "In Repair", "Service Now", "Service Soon", "Coming Soon", "Informational"];
    var dealerVisibilitySuggestiosns = ["Join All", "Preferred Customers"];
    var vehicleStatesSuggestions = ["Released", "Manufacturing"];
    var factoriesSuggestions = ["Denton", "Renton", "Mexicali", "Montreal", "Chillicothe"];
    var subscriptionSuggestions = ["Active", "Expired", "Expiring Now", "Expiring Soon"];
    var vehicleVisibilityStatuses = ["Vehicles I Sold", "Preferred Customer Vehicles", "Join All Customer Vehicles"];

    //Chips
    var none = chipFilterMatrix.none;
    var customers = chipFilterMatrix.customers;
    var dealers = chipFilterMatrix.dealers;
    var dealerOwnerGroups = chipFilterMatrix.dealerOwnerGroups;
    var dealerRegions = chipFilterMatrix.dealerRegions;
    var manufacturers = chipFilterMatrix.manufacturers;
    var vehicles = chipFilterMatrix.vehicles;
    var userVehicleGroups = chipFilterMatrix.userVehicleGroups;
    var factories = chipFilterMatrix.factories;
    var vehicleStates = chipFilterMatrix.vehicleStates;
    var vehicleVisibility = chipFilterMatrix.vehicleVisibility;
    var customerVehicleGroups = chipFilterMatrix.customerVehicleGroups;
    var dealerVisibility = chipFilterMatrix.dealerVisibility;
    var users = chipFilterMatrix.users;
    var roles = chipFilterMatrix.roles;
    var recomendation = chipFilterMatrix.recommendations;
    var removalCategory = chipFilterMatrix.removalCategory;
    var subscriptionStatus = chipFilterMatrix.subscriptionStatus;


    var failMessage = 'Text does not match for ->';
    var notContainFailMessage = 'Text Present for  ->';
    var maxResultMessage = "Maximum results reached. Recommend adding filters to refine your search or export the data for all entries.";


    this.validateTextContain = function (textFromElement, textToValidate) {
        var expected, actual;
        expected = textFromElement.toString();
        actual = textToValidate;
        expect(expected)
            .toContain(actual, failMessage + textToValidate);
    };

    this.validateTextNotContain = function (textFromElement, textToValidate) {
        var expected, actual;
        expected = textFromElement.toString();
        actual = textToValidate;
        expect(expected).not
            .toContain(actual, notContainFailMessage + textToValidate);
    };

    this.validateTextContainArray = function (textFromElement, textsToValidate) {
        var _this1 = this;
        _.forEach(textsToValidate, function (text) {
            _this1.validateTextContain(textFromElement, text)
        })
    };
    this.validateTextNotContainArray = function (textFromElement, textsToValidate) {
        var _this1 = this;
        _.forEach(textsToValidate, function (text) {
            _this1.validateTextNotContain(textFromElement, text)
        })
    };

    this.validateTextEqual = function (textFromElement, textToValidate) {
        expect(textFromElement.toString())
            .toBe(textToValidate, failMessage + textToValidate);
    };

    this.validateTitle = function (text) {
        expect(navigation.title.getText())
            .toBe(text, failMessage + text);
    };

    this.validateActionList = function (openActionListElement, allElementsActionList, closeActionElement, array) {
        var _this1 = this;
        openActionListElement.click();
        browser.sleep(500);
        allElementsActionList.getText().then(function (text) {
            array.forEach(function (eachAction) {
                _this1.validateTextContain(text, eachAction)
            });
        });
        navigation.waitTillElementToBeClickable(closeActionElement);
        closeActionElement.sendKeys(protractor.Key.ESCAPE);
        browser.sleep(1000)
    };

    this.validateActionListEqual = function (openActionListElement, allElementsActionList, closeActionElement, array) {
        var newText = [];
        openActionListElement.click().then(function () {
            allElementsActionList.getText().then(function (text) {
                text.forEach(function (eachTest) {
                    newText.push(eachTest.substring(eachTest.indexOf(" ") + 1));
                });
                expect(_.isEqual(array.sort(), newText.sort())).toBe(true, "List not correspond requirements for " + _.difference(array, newText) + " " + _.difference(newText, array));
            });
        });
        navigation.waitTillElementToBeClickable(closeActionElement);
        closeActionElement.sendKeys(protractor.Key.ESCAPE);
        browser.sleep(1000)
    };


    this.validateActionListNotContain = function (openActionListElement, allElementsActionList, closeActionElement, array) {
        var _this1 = this;
        openActionListElement.click();
        browser.sleep(500);
        allElementsActionList.getText().then(function (text) {
            array.forEach(function (eachAction) {
                _this1.validateTextNotContain(text, eachAction)
            });
        });
        navigation.waitTillElementToBeClickable(closeActionElement);
        closeActionElement.sendKeys(protractor.Key.ESCAPE);
    };

    this.validateAllTextFromSuggestionsDropDown = function (allActionList, textToValidate, closeElement) {
        var _this1 = this;
        var textBefore = '';
        var newText = [];
        var editedNewText = [];
        var j = 0;
        allActionList.getText()
            .then(function (text) {
                saveCurrentList(text);

                function saveCurrentList(text) {
                    textBefore = text[(text.length) - 1];
                    for (var i = 0; i < text.length; i++) {
                        newText[j++] = text[i];
                    }
                    browser.actions().mouseMove(allActionList.last()).perform();
                    allActionList.getText().then(function (text) {
                        if (textBefore !== text[(text.length) - 1]) {
                            allActionList.getText().then(function (text) {
                                saveCurrentList(text);
                            });
                        }
                        else {
                            newText = newText.filter(_this1.onlyUnique);
                            newText.forEach(function (eachTest) {
                                editedNewText.push(eachTest.substring(eachTest.indexOf(" ") + 1));
                            });
                            _this1.validateTextContainArray(editedNewText, textToValidate);
                            expect(editedNewText.length).toBe(textToValidate.length, "Incorrect rows count from suggestion drop-down menu");
                            closeElement.sendKeys(protractor.Key.ESCAPE);
                        }
                    });
                }
            });
    };

    this.validateAllCountFromSuggestionsDropDown = function (allActionList, count) {
        var _this1 = this;
        var textBefore = '';
        var newText = [];
        var j = 0;
        allActionList.getText()
            .then(function (text) {
                saveCurrentList(text);

                function saveCurrentList(text) {
                    textBefore = text[(text.length) - 1];
                    for (var i = 0; i < text.length; i++) {
                        newText[j++] = text[i];
                    }
                    browser.actions().mouseMove(allActionList.last()).perform();
                    allActionList.getText().then(function (text) {
                        if (textBefore !== text[(text.length) - 1]) {
                            allActionList.getText().then(function (text) {
                                saveCurrentList(text);
                            });
                        }
                        else {
                            newText = newText.filter(_this1.onlyUnique);
                            expect(newText.length).toBe(count, "Incorrect rows count from suggestion drop-down menu");
                        }
                    });
                }
            });
    };

    this.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };


    this.validateChipFilterDropDowns = function (roleEmail) {
        var _this1 = this;
        navigation.chipFilterDropDownButton.click();
        navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.get(0));
        navigation.chipFilterDropDown.getText()
            .then(function (text) {
                var count = 0;
                var newText = [];
                var j = 0;
                text.forEach(function (eachString) {
                    newText[j++] = eachString.substr(eachString.indexOf(' ') + 1);
                });
                count = newText.length;
                navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.first());
                navigation.chipFilterDropDown.first().sendKeys(protractor.Key.ESCAPE);
                for (var i = 1; i < count; i++) {
                    navigation.waitTillElementToBeClickable(navigation.chipFilterDropDownButton);
                    navigation.chipFilterDropDownButton.click();
                    expect(navigation.chipFilterDropDown.first().isDisplayed()).toBe(true, 'Chip filters Drop Down is not Displayed For :   ' + roleEmail);
                    navigation.chipFilterDropDown.get(i).click();
                    if (newText[i] === removalCategory) {
                        _this1.validateAllTextFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, removalCategoriesSuggestions, navigation.chipFilter)
                    }
                    else if (newText[i] === recomendation) {
                        _this1.validateAllTextFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, recomendationsSuggestiosns, navigation.chipFilter)
                    }
                    else if (newText[i] === dealerVisibility) {
                        _this1.validateAllTextFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, dealerVisibilitySuggestiosns, navigation.chipFilter)
                    }
                    else if (newText[i] === vehicleStates) {
                        _this1.validateAllTextFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, vehicleStatesSuggestions, navigation.chipFilter)
                    }
                    else if (newText[i] === factories) {
                        _this1.validateAllTextFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, factoriesSuggestions, navigation.chipFilter)
                    }
                    else if (newText[i] === subscriptionStatus) {
                        _this1.validateSuggestionDropDown(subscriptionSuggestions);
                    }
                    else if (newText[i] === vehicleVisibility) {
                        _this1.validateSuggestionDropDown(vehicleVisibilityStatuses);
                    }
                    else if ((newText[i] !== customerVehicleGroups) &&
                        ((roleEmail !== factoryWorkerEmail) || (newText[i] !== customers)) &&
                        ((roleEmail !== factoryWorkerEmail) || (newText[i] !== dealers)) &&
                        ((roleEmail !== factoryWorkerEmail) || (newText[i] !== users)) &&
                        ((roleEmail !== divisionUserEmail) || (newText[i] !== manufacturers)) &&
                        ((roleEmail !== customerUserEmail) || (newText[i] !== userVehicleGroups)) &&
                        ((roleEmail !== customerAdminEmail) || (newText[i] !== userVehicleGroups)) &&
                        ((roleEmail !== customerUserEmail) || (newText[i] !== dealerOwnerGroups)) &&
                        ((roleEmail !== customerAdminEmail) || (newText[i] !== dealerOwnerGroups))
                    ) {
                        expect(navigation.chipFilterSuggestionDropDown.first().isPresent()).toBe(true, 'Suggestion Drop Down  is not Displayed For Chip:  ' + newText[i]);
                        navigation.waitTillElementToBeClickable(navigation.chipFilterSuggestionDropDown.first());
                        navigation.chipFilter.sendKeys(protractor.Key.ESCAPE);
                    }

                }
            });
    };

    this.validateSuggestionDropDown = function (textArray) {
        var _this1 = this;
        navigation.waitTillElementToBeClickable(navigation.chipFilterSuggestionDropDown.first());
        navigation.chipFilterSuggestionDropDown.getText().then(function (text) {
            _this1.validateTextContainArray(text, textArray);
            navigation.chipFilter.sendKeys(protractor.Key.ESCAPE);
        })

    };


    this.validateUserPermissionForDOGPage = function (userEmail, dealerOwnerGroupNameForSearch) {
        expect(dealerOwnerGroupPage.addGroupBtn.isPresent()).toBe(false, 'Add Button present for ' + userEmail);
        dealerOwnerGroupPage.verifyDealerOwnerGroupListTableDataIsVisible();
        navigation.typeInSearchFilter(dealerOwnerGroupNameForSearch);
        expect(dealerOwnerGroupPage.deleteGroupBtn.isPresent()).toBe(false, 'Delete Button present for ' + userEmail);
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dealerOwnerGroupNameForSearch);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/details/peoplenet:dealerowner:', 'Clicking on the DOG name did not work');
        dealerOwnerGroupPage.verifyHeadingName();
        expect(dealerOwnerGroupPage.editGroupBtn.isDisplayed()).toBe(false, 'Edit button is present for ' + userEmail);
        dealerOwnerGroupPage.verifyGroupInfo();
        //Location Tab
        dealerOwnerGroupPage.locationTab.click();
        expect(dealerOwnerGroupPage.locationsTabHeading.isDisplayed()).toBe(true, 'Locations Heading is Missing.');
        expect(dealerOwnerGroupPage.deleteLocationBtn.isPresent()).toBe(false, 'Delete Location button is present for ' + userEmail);
        expect(dealerOwnerGroupPage.addLocationBtn.isPresent()).toBe(false, 'Add Location button is present for ' + userEmail);
        //Region Tab
        dealerOwnerGroupPage.regionsTab.click();
        if (userEmail === dealerOwnerAdmin) {
            //regionsTabHeading  display: contents; Element not displayed for WebDriver. Use isPresent() for  validation
            expect(dealerOwnerGroupPage.regionsTabHeading.isPresent()).toBe(true, 'Regions Heading is Missing.');
            expect(dealerOwnerGroupPage.addRegionBtn.isDisplayed()).toBe(true, 'Add Regions Button is Missing.');
            expect(dealerOwnerGroupPage.editRegionBtn.isDisplayed()).toBe(true, 'Edit Region Button is Missing');
            expect(dealerOwnerGroupPage.viewLocationBtn.isDisplayed()).toBe(true, 'View Location Button is Missing');
            expect(dealerOwnerGroupPage.deleteRegionBtn.isDisplayed()).toBe(true, 'Delete Region Button is Missing');
        }
        else {
            expect(dealerOwnerGroupPage.regionsTabHeading.isPresent()).toBe(true, 'Regions Heading is Missing.');
            expect(dealerOwnerGroupPage.addRegionBtn.isPresent()).toBe(false, 'Add Regions Button is Missing.');
            expect(dealerOwnerGroupPage.editRegionBtn.isPresent()).toBe(false, 'Edit Region Button is Present');
            expect(dealerOwnerGroupPage.viewLocationBtn.isPresent()).toBe(true, 'View Location Button is Missing');
            expect(dealerOwnerGroupPage.deleteRegionBtn.isPresent()).toBe(false, 'Delete Region Button is Present');
        }
        if ((userEmail === dealerOwnerUser) || (userEmail === dealerRegionUser)) {
            dealerOwnerGroupPage.viewLocationBtn.click();
            browser.sleep(2000);
            expect(dealerOwnerGroupPage.locationCheckBox.getAttribute('aria-disabled')).toEqual('true');
        }
    };

    this.validateCustomerVehicleGroupFilterAppears = function (userEmail) {
        var _this1 = this;
        if (userArrayForVehicleGroupFilter.indexOf(userEmail) > -1) {
            navigation.chipFilterDropDownButton.click().then(function () {
                navigation.chipFilterDropDown.getText().then(function (text) {
                    _this1.validateTextNotContain(text, 'Customer Vehicle Groups');
                })
            });
            navigation.chipFilterCustomersButton.click().then(function () {
                navigation.chipFilterSuggestionDropDown.first().click();
                navigation.chipFilterDropDownButton.click();
                navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.first());
                navigation.chipFilterDropDown.getText().then(function (text) {
                    _this1.validateTextContain(text, 'Customer Vehicle Groups');
                    navigation.chipFilterDropDown.first().sendKeys(protractor.Key.ESCAPE);
                    browser.sleep(1000);
                    navigation.clearAllButton.click();
                })
            });
        }
    };

    this.validateUserNotificationFiltersFunctionality = function () {
        var columnText;
        navigation.chipFilterDropDownButton.click()
            .then(function () {
                return navigation.chipFilterCustomersButton.click()
            })
            .then(function () {
                return navigation.chipFilterSuggestionDropDown.get(0).getText()
            })
            .then(function (text) {
                columnText = text.substring(text.indexOf(" ") + 1);
                return navigation.chipFilterSuggestionDropDown.get(0).click()
            })
            .then(function () {
                expect(usersPage.notificationsTableRows.count()).toBe(1, "Incorrect results count for Customer chip " + columnText);
                tableUtil.verifyColumn(columnText, usersPage.userNotificationsColumns.nameColumn, usersPage.userNotificationsAllTableRows);
                usersPage.subscribeUserToFirstInRow();
                usersPage.subscriptionFilterDropDown.click();
                navigation.waitTillElementToBeClickable(usersPage.subscriptionTypeDropDown.last());
                usersPage.subscriptionTypeDropDown.last().click();
                tableUtil.verifyTableDataIsEmpty(usersPage.userNotificationsAllTableRows);
                usersPage.subscriptionFilterDropDown.click();
                navigation.waitTillElementToBeClickable(usersPage.subscriptionTypeDropDown.get(3));
                usersPage.subscriptionTypeDropDown.get(3).click();
                usersPage.unsubscribeUserFromFirstInRow();
                tableUtil.verifyColumn(columnText, usersPage.userNotificationsColumns.nameColumn, usersPage.userNotificationsAllTableRows)
            })
    };


    this.validateUserSubscribedDataEndPoint = function (getUserAs, userId, arrayToValidate) {
        var _this1 = this;
        var securityAttribute = usersPage.getSecurityAttribute(getUserAs);
        //GET to user-security-gateway to validate subscribed tags data
        return request.get(browser.params.environment.userGatewayServiceUrl + '/' + userId)
            .set('Content-Type', 'application/json')
            .set('user_security_attributes', securityAttribute)
            .end(function (err, res) {
                // console.log(res.body.subscribedTags.toString());
                _this1.validateTextContainArray(res.body.subscribedTags.toString(), arrayToValidate);
                expect(res.body.subscribedTags.length).not.toBeLessThan(arrayToValidate.length, "Incorrect subsribtion count")
            });
    };

    this.validateFilterResult = function (chipName, columnNumber, translation) {
        navigation.chipFilterDropDownButton.click();
        navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.first());
        navigation.selectChipFilterByText(chipName);
        navigation.chipFilterSendKeys(translation);
        tableUtil.verifyColumn(translation, columnNumber);
        navigation.clearAllFiltersButton.click();
    };

    this.getlastEventTime = function (eventLedgerType, emitterType, vin, eventType, date) {
        eventsPage.fillFiltersFields(eventLedgerType, emitterType, vin, eventType);
        eventsPage.typeDate(date);
        return eventsPage.searchBtn.click()
            .then(function () {
                eventsPage.showSearchButton.click();
                if (eventsPage.lastEventTime.isPresent()) {
                    return eventsPage.lastEventTime.getText()
                } else {
                    return '';
                }
            })
    };

    this.validateMaxResultReachedMessage = function () {
        expect(navigation.lastPageButton.isPresent()).toBe(false);
        expect(navigation.firstPageButton.isPresent()).toBe(false);
        expect(navigation.maxResultsReachedMessage.isDisplayed()).toBe(true);
        expect(navigation.maxResultsReachedMessage.getText()).toBe(maxResultMessage);
    };

    this.validateEmailWarningMessage = function (email, shouldPresent, errorMessage) {
        usersPage.emailField.sendKeys(email);
        usersPage.firstNameField.click();
        if (shouldPresent) {
            expect(usersPage.emailWarning.isDisplayed()).toBe(true, 'Email warning message not displayed');
            expect(usersPage.emailWarning.getText()).toEqual(errorMessage);
            browser.refresh();
        } else {
            expect(usersPage.emailWarning.isDisplayed()).toBe(false, 'Email warning message displayed');
        }
    };

    this.validateChipFiltersIsSortedByAsc = function () {
        navigation.activeChipsText.getText().then(function (text) {
            text = text.filter(Boolean);
            for (var i = 0; i < text.length - 1; i++) {
                expect(text[i].toLowerCase() <= text[i + 1].toLowerCase()).toBe(true, 'Chips not Sorted')
            }
        });
    };

    this.validateChipFilterTypesIconsOrdering = textArray => {
        navigation.chipIcons.getText()
            .then(text => {
                for (var i = 0; i < textArray.length; i++) {
                    expect(text[i]).toBe(textArray[i], 'Wrong chip filter ordering for different filter types');
                }
            });
    };

    this.validateDropDownSearchAndFilters = function (chipFromDropDown, testUser, rowNumberZeroBased, columnName, typeValidate) {
        expect(navigation.iconNone.isDisplayed()).toBe(true, 'Wrong default icon');
        navigation.chipFilterDropDownButton.click();
        chipFromDropDown.click();
        this.validateAllCountFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, 10);
        navigation.chipFilter.sendKeys(protractor.Key.ESCAPE);
        navigation.chipFilter.sendKeys(testUser);
        navigation.chipFilterSuggestionDropDown.get(1).click();
        if (typeValidate) {
            expect(tableUtil.getTableCellData(rowNumberZeroBased, columnName)).toBe(testUser, 'Found wrong user');
        }
        else {
            tableUtil.verifyColumn(testUser, columnName);
        }
        navigation.chipFilterCloseBtn.click();
        expect(navigation.iconNone.isDisplayed()).toBe(true, 'Wrong default icon');
    };

    this.validatePrimaryDealerPermission = function (vin, user) {
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        expect(vehiclesPage.editVehicleActionBarButton.isDisplayed())
            .toBe(true, user + "Can't see edit button for  vin: " + vin);
        vehiclesPage.editVehicleActionBarButton.click();
        expect(vehiclesPage.primaryDealerField.getAttribute('disabled')).toBe(null);
    };

    this.generateString = (amount, symbol) => {
        var symbolArray = [];
        for (var i = 1; i <= amount; i++) {
            symbolArray.push(symbol);
        }
        return symbolArray.toString();
    }

};
module.exports = new validationUtil();
