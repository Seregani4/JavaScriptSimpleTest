/**
 * Created by pshrestha on 3/1/2017.
 */

var DealerOwnerGroupPage = function () {

    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var DOAEmail = browser.params.testuseremails.dealerowneradmin;
    var DOUEmail = browser.params.testuseremails.dealerowneruser;
    var DRAEmail = browser.params.testuseremails.dealerregionadmin;
    var DRUEmail = browser.params.testuseremails.dealerregionuser;


    this.dogHeaders = element.all(by.tagName('th'));
    this.allDealerGroupRows = element.all(by.repeater('row in $ctrl.rows'));

    this.addGroupBtn = element(by.cssContainingText('[type="button"]', 'add'));
    this.createGroupButtonPanel = element(by.xpath("//md-list-item[contains(@class, 'secondary-button-padding')]"));
    this.chipFilter = element(by.id('input-538'));
    this.chipFilterCloseBtn = element.all(by.css('[md-svg-icon="md-close"]')).get(0);
    this.filterCloseButton = element(by.cssContainingText('[class="ng-scope md-default-theme material-icons"]', 'close'));
    this.refreshButton = element(by.cssContainingText('[class="ng-scope md-default-theme material-icons"]', 'refresh'));
    this.deleteGroupBtn = element.all(by.repeater('rowButton in $ctrl.getRowButtonsByType(row.type)')).get(0);
    this.toastAlert = element(by.css('[role="alert"]'));
    this.localUpdatedTime = element.all(by.xpath('//td[3]/span'));
    this.dogName = element.all(by.xpath('//td[1]/span'));


    //Group Details page
    this.groupInfoCard = element(by.xpath("//md-card[@id='dealer-owner-details']"));
    this.editGroupBtn = element(by.css('[class="ng-scope md-default-theme material-icons"]'));
    this.groupHeading = element(by.css('[class="md-title ng-binding"]'));
    this.groupInfo = element(by.css('[translate="dealerOwnerGroup.dealerOwnerGroupEdit.group_information"]'));
    this.groupName = element(by.css('[translate="dealerOwnerGroup.dealerOwnerGroupEdit.group_name"]'));
    this.groupDesc = element(by.css('[translate="dealerOwnerGroup.dealerOwnerGroupEdit.group_description"]'));

    this.groupInfoTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(0);

    //Location Tab
    this.locationTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(1);
    this.allLocationRows = element.all(by.repeater('row in $ctrl.rows'));
    this.locationsTabHeading = element(by.cssContainingText('[class="md-title ng-binding"]', 'Locations'));
    this.deleteLocationBtn = element.all(by.repeater('[type="button"]', 'delete')).get(0);
    this.addLocationBtn = element(by.xpath("//button[@ng-click = '$ctrl.showAddLocationForm()']"));
    this.locationCard = element.all(by.xpath('//div/span[@ng-bind="location.name"]'));
    this.allLocationNames = element.all(by.xpath("//div[@id = 'location-list-table']//tr/td[2]"));
    //Elements to add location to a DOG
    //this.searchLocation = element(by.css('[for="{{ inputId || \'fl-input-\' + $mdAutocompleteCtrl.id }}"]'));
    this.searchLocation = element(by.css('[ng-model-options="{ allowInvalid: true }"]'));
    this.cancelAddLocationBtn = element(by.buttonText('cancel'));
    this.addLocationToDogBtn = element(by.buttonText('Add'));
    this.removeDialogButton = element(by.buttonText('Remove'));

    //Regions Tab
    this.regionsTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(2);
    this.regionsTabHeading = element(by.xpath("(//div[contains(@class, 'md-toolbar-tools' )])[2]/h2"));
    this.allRegionRows = element.all(by.repeater('region in $ctrl.regions'));
    this.addRegionBtn = element(by.xpath("//button[@ng-click = '$ctrl.showAddDialog()']"));
    this.editRegionBtn = element(by.css('[ng-click="$ctrl.setEditMode(region)"]'));
    //used get() because both save and regionField elements are all on the DOM.
    this.editSaveButton = element.all(by.cssContainingText('[type="submit"]', 'save')).last();
    this.editRegionField = element.all(by.tagName('input')).last();
    this.viewLocationBtn = element(by.cssContainingText('[type="button"]', 'domain'));
    this.deleteRegionBtn = element(by.cssContainingText('[type="button"]', 'delete'));
    this.addRegionDialog = element(by.id('dealer-region-edit-dialog'));
    this.regionNameField = element(by.model('$ctrl.region.name'));
    this.cancelAddRegionButton = element(by.buttonText('cancel'));
    this.nextButton = element(by.buttonText('Next'));
    this.saveButton = element(by.css('[ng-click="$ctrl.save()"]'));
    this.confirmDeleteBtn = element(by.cssContainingText('[type="button"]', 'Yes'));

    //Add locations to Regions
    this.allLocationRowsInRegion = element.all(by.repeater('row in $ctrl.rows'));
    this.locationCheckBox = element(by.css('[type="checkbox"]'));
    this.locationAddCancelBtn = element(by.css('[ng-click="$ctrl.exit()"]'));
    this.locationAddSaveBtn = element(by.css('[ng-click="$ctrl.save()"]'));

    //Add Group Page
    this.nameField = element(by.name('name'));
    this.descriptionField = element(by.name('description'));
    this.saveBtn = element(by.css('[type="submit"]'));
    this.deleteBtn = element(by.css('[ng-href="#/nav/dealerOwnerGroup/list/"]'));

    //Edit Group
    this.editBtn = element(by.cssContainingText('[class="ng-scope md-default-theme material-icons"]', 'edit'));
    this.editDogSaveBtn = element(by.cssContainingText('[type="button"]', 'save'));

    //Dialog Buttons
    this.deleteActionButton = element(by.cssContainingText('[type="button"]', 'Delete'));
    this.cancelActionButton = element(by.cssContainingText('[type="button"]', 'Cancel'));

    //DOG Column Number
    this.columns = {
        nameColumn: {value: 0, name: 'Name Column'},
        descriptionColumn: {value: 1, name: 'Description Column'},
        updatedColumn: {value: 2, name: 'Updated Column'}
    };
    this.assignLocationTableBody = element.all(by.xpath("//div[@class = 'md-dialog-content']//tbody[1]/tr"));
    this.assignLocationColmns = {
      nameColumn:{value: 1, name: 'Name'},
      codeColumn:{value: 2, name: 'Code'}
    };

    this.get = function () {
        browser.get('/#/nav/dealerOwnerGroup/list/');
        browser.sleep(1000);
    };

    this.verifyDealerOwnerGroupListTableDataIsVisible = function () {
        expect(this.dogHeaders.getText()).toContain('Name', 'Name column is missing');
        expect(this.dogHeaders.getText()).toContain('Description', 'Description column is missing');
        expect(this.dogHeaders.getText()).toContain('Updated', 'Updated column is missing');
        this.allDealerGroupRows.count().then(function (count) {
            expect(count).toBeGreaterThan(0, 'There was no Dealer data to be found');
        });
    };

    //Data checks
    this.checkForGroupData = function () {
        this.allDealerGroupRows.count().then(function (count) {
            expect(count).toBeGreaterThan(0, 'There was no Dealer data to be found');
        });
    };

    this.checkForPageCount = function (expectedCount) {
        this.allDealerGroupRows.count().then(function (count) {
            expect(count <= expectedCount).toBe(true);
        });
    };

    this.clickAddBtn = function () {
        this.addBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '#/nav/dealerOwnerGroup/create');
    };

    this.clickDealerGroupHyperlinkCellSearch = function (groupName) {
        return this.allDealerGroupRows.filter(function (row) {
            return row.$$('td').get(0).getText().then(function (name) {
                return name === groupName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No DOG was found by the name:-> ' + groupName);
            } else {
                filteredRows[0].$$('a').get(0).click();
                browser.sleep(5000);
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url +
                    '/#/nav/dealerOwnerGroup/details/peoplenet:dealerowner:');
            }

        });
    };

    this.verifyHeadingName = function (groupName) {
        this.groupHeading.getText().then(function (value) {
            expect(value === groupName);
        });
    };

    this.verifyGroupInfo = function () {
        expect(this.groupInfo.isDisplayed()).toBe(true, 'Group Information Title is Not Displayed');
        expect(this.groupName.isDisplayed()).toBe(true, 'Group Name Title is Not Displayed');
        expect(this.groupDesc.isDisplayed()).toBe(true, 'Group Description Title is Not Displayed');
        expect(this.groupInfoTab.isDisplayed()).toBe(true, 'Group Info Tab Title is Not Displayed');
    };

    this.verifyAddedDog = function (name) {
        this.allDealerGroupRows.filter(function (row) {
            return row.$$('td').get(0).getText().then(function (dogName) {
                expect(dogName).toBe(name, 'The names does not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.checkForDeletedDOG = function (dogName) {
        return this.allDealerGroupRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('td').get(0).getText().then(function (name) {
                expect(name).not.toBe(dogName, 'The DOG is still present on the list.');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyAddLocButtons = function () {
        this.addLocationBtn.click();
        expect(this.searchLocation.isDisplayed()).toBe(true, 'The search field to add locations is missing.');
        expect(this.cancelAddLocationBtn.isDisplayed()).toBe(true, 'Cancel button is missing.');
        expect(this.addLocationToDogBtn.isDisplayed()).toBe(true, 'Add location to DOG button is missing.');
        this.cancelAddLocationBtn.click();
    };

    this.verifyAddRegionButtons = function () {
        this.addRegionBtn.click();
        expect(this.regionNameField.isDisplayed()).toBe(true, 'The search field to add regions is missing.');
        expect(this.cancelAddRegionButton.isDisplayed()).toBe(true, 'Cancel button is missing.');
        expect(this.nextButton.isDisplayed()).toBe(true, 'Add region to DOG button is missing.');
        this.cancelAddRegionButton.click();
    };

    this.addLocation = function (dealerName) {
        this.searchLocation.click();
        this.searchLocation.sendKeys(dealerName);
        element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(0).click();
        this.addLocationToDogBtn.click();
    };

    this.deleteLocation = function (dealerName) {
        this.allLocationRows.filter(function (row) {
            return row.$$('span').get(2).getText().then(function (name) {
                if (dealerName === name) {
                    return name;
                }
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Location was found by the name: ' + dealerName);
            }
            filteredRows[0].$$('button').click();
            browser.sleep(2000);
        });
        this.removeDialogButton.click();
    };

    this.deleteRegion = function (regionName) {
        this.allRegionRows.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                if (regionName === name) {
                    return name;
                }
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Region was found by the name: ' + regionName);
            }
            filteredRows[0].$$('button').get(4).click();
            browser.sleep(2000);
        });
        this.confirmDeleteBtn.click();
    };

    this.editRegionName = function (regionName, newRegionName) {
        this.allRegionRows.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                if (regionName === name) {
                    return name;
                }
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Region was found by the name: ' + regionName);
            }
            filteredRows[0].$$('button').get(2).click();
            browser.sleep(2000);
        });
        this.editRegionField.click();
        this.editRegionField.clear();
        this.editRegionField.sendKeys(newRegionName);
        this.editSaveButton.click();
    };

    this.verifyRegionName = function (regionName) {
        this.allRegionRows.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                if (regionName === name) {
                    return true;
                }
            });
        }).then(function () {

        });
    };

    this.clickViewLocationButton = function (regionName, loggedInUser) {
       return this.allRegionRows.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                if (regionName === name) {
                    return name;
                }
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Region was found by the name: ' + regionName);
            }
            if (loggedInUser === DOUEmail || loggedInUser === DRUEmail || loggedInUser === DRAEmail) {
                filteredRows[0].$$('button').get(0).click();
            } else {
                filteredRows[0].$$('button').get(3).click();
            }
            browser.sleep(2000);
           return true;
        });
    };

    this.addLocationToRegion = function (locationName) {
        this.allLocationRowsInRegion.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                if (locationName === name) {
                    return name;
                }
            });
        }).then(function (filteredName) {
            if (filteredName.length < 1) {
                expect(false).toBe(true, 'No Region was found by the name: ' + locationName);
            }
            filteredName[0].$$('md-checkbox').get(0).getAttribute('aria-checked').then(function (attribute) {
                attribute = attribute.toString();
                if (attribute === 'false') {
                    filteredName[0].$$('md-checkbox').get(0).click();
                }
            })


        });
    };

    this.verifyLocationInRegion = function (locationName) {
        this.allLocationRowsInRegion.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                if (locationName === name) {
                    return name;
                }
            });
        }).then(function (filteredName) {
            expect(filteredName[0].$$('md-checkbox').get(0).getAttribute('aria-checked')).toBe('true',
                'The checkbox was not checked.');
        });
    };

    this.verifyLocationNotInList = function (locationName) {
        this.allLocationRowsInRegion.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                expect(name).not.toBe(locationName, 'The location is still available to add.');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.verifyLocationInList = function (locationName) {
        this.allLocationRowsInRegion.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                return name === locationName;
            });
        }).then(function (filteredRows) {
            expect(filteredRows.length).toEqual(1, 'The location is still not available to add.');
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.removeLocationFromRegion = function (locationName) {
        this.allLocationRowsInRegion.filter(function (row) {
            return row.$$('span').get(0).getText().then(function (name) {
                if (locationName === name) {
                    return name;
                }
            });
        }).then(function (filteredName) {
            if (filteredName.length < 1) {
                expect(false).toBe(true, 'No Region was found by the name: ' + locationName);
            }
            filteredName[0].$$('md-checkbox').get(0).getAttribute('aria-checked').then(function (attribute) {
                attribute = attribute.toString();
                if (attribute === 'true') {
                    filteredName[0].$$('md-checkbox').get(0).click();
                }
                expect(filteredName[0].$$('md-checkbox').get(0).getAttribute('aria-checked')).toBe('false',
                    'The checkbox was not unchecked.');
            })
        });
    };

    this.cannotEditLocationInRegion = function () {
        this.allLocationRowsInRegion.filter(function (row) {
            expect(row.getAttribute('disabled')).toBe('disabled');
        });
    };

    this.editDogName = function (editName, editDescription) {
        this.nameField.clear();
        this.nameField.sendKeys(editName);
        this.descriptionField.clear();
        this.descriptionField.sendKeys(editDescription);
        this.editDogSaveBtn.click();
    };

    this.checkForToastAlert = function (message) {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(this.toastAlert.getText()).toContain(message);
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
    };

};

module.exports = new DealerOwnerGroupPage();
