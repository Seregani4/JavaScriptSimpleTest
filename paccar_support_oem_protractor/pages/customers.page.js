var CustomersPage = function () {
    var moment = require('moment');
    var request = require('superagent');
    var addCustomerJson = require('../json/customer.json');
    var usersPage = require('../pages/users.page.js');
    const _ = require('lodash');

    //////////Conf Variables/////////////
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUser = browser.params.testuseremails.paccaruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var preferredCustomerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    //Dealer User role has write permission
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var dealerTech = browser.params.testuseremails.dealertech;
    var testUserEmail = browser.params.adduser.email;
    var tsr1 = browser.params.testuseremails.tsr1;
    var tsr2 = browser.params.testuseremails.tsr2;
    var userEmail = browser.params.adduser.email;
    var userPswd = browser.params.adduser.password;

    var peoplenetAdminUid = browser.params.testuseruids.peoplenetadmin;
    var paccarAdminUid = browser.params.testuseruids.paccaradmin;
    var dealerOwnerAdminUid = browser.params.testuseruids.dealerowneradmin;
    var dealerRegionAdminUid = browser.params.testuseruids.dealerregionadmin;
    var dealerAdminUid = browser.params.testuseruids.dealeradmin;
    var dealerUserUid = browser.params.testuseruids.dealeruser;

    var adminRoles = [paccarAdminEmail, dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin, preferredCustomerAdminEmail];

    // List Page
    // this.deleteButton = element(by.cssContainingText('h2', browser.params.addcustomer.name)).element(by.css('[ng-click="ctrl.confirmDelete(customer, $event)"]'));
    this.customerPageHeaders = element.all(by.tagName('th'));

    /////Action Bar
    this.addCustomerButton = element(by.css('[ng-click="iconButton.click($event, $ctrl)"]'));
    this.exportButton = element(by.buttonText('EXPORT'));
    this.customerDropDown = element.all(by.css('[]'));
    //Action Bar and Action Button
    //Actions Drop-Down
    this.viewDetailsActionButton = element(by.css('[aria-label="info"]'));
    this.editActionButton = element(by.css('[aria-label="edit"]'));
    this.deleteActionButton = element(by.css('[aria-label="delete"]'));
    this.confirmDeleteBtn = element(by.css('[ng-click="dialog.hide()"]'));
    this.confirmDeleteMsg = element(by.css('[aria-label="Delete customer?"]'));

    this.confirmDeleteMsg = element(by.css('[ng-if="::!dialog.mdHtmlContent"]'));
    this.allCustomerRows = element.all(by.repeater('row in $ctrl.rows'));
    this.joinAllIcon = element(by.css('[ng-if="row.allDealersCanView && true"]'));
    this.preferredDealerIcon = element(by.css('[ng-if="row.isCurrentUserPreferred && true"]'));
    this.deleteBtn = element(by.cssContainingText('[type="button"]', 'Delete'));
    this.chipFilter = element(by.css('[placeholder="Filter Results"] [type="search"]'));
    this.chipFilterCloseBtn = element.all(by.css('[md-svg-icon="md-close"]')).get(0);
    this.toastAlert = element(by.css('[role="alert"]'));

    // Add Customer Page
    this.dealerField = element.all(by.model('dealerName'));
    this.dealerTypeAhead = element.all(by.repeater('match in matches track by $index')).first();
    this.customerIdField = element(by.model('customer.customerId'));
    this.nameField = element(by.css('[name="name"]'));
    this.emailField = element(by.css('[name="email"]'));
    this.addressField1 = element(by.css('[name="address.line1"]'));
    this.addressField2 = element(by.css('[name="address.line2"]'));
    this.cityField = element(by.css('[name="city"]'));
    this.stateField = element(by.model('$ctrl.customer.addresses[0].state'));
    this.zipField = element(by.css('[name="zip"]'));
    this.countryField = element(by.model('$ctrl.customer.addresses[0].countryCode'));
    this.phoneField = element(by.css('[name="phone"]'));
    this.faxField = element(by.css('[name="fax"]'));
    this.saveBtn = element(by.css('[type="submit"]'));
    this.cancelBtn = element(by.cssContainingText('[type="button"]', 'cancel'));
    this.savedAlert = element(by.css('.ng-binding.ng-scope'));

    this.dealerNetworkCheckBox = element(by.css('[aria-label="Join the Peterbilt and Kenworth Dealer Network"]'));
    this.confirmBtn = element(by.buttonText('Confirm'));
    this.duplicateCustomerWarning = element.all(by.css('[when="duplicate"]'));

    // Customer Details Page
    this.customerBreadCrumb = element.all(by.linkText('Customers')).get(1);
    this.customerHeader = element(by.className('page-header-title'));
    this.newGroupBtn = element(by.css('[ng-click="ctrl.addingTag = true"]'));
    this.addVehicleBtn = element(by.linkText('Manage Vehicles'));
    this.editVehicleLink = element(by.css('[ng-show="hasPermission(\'ROLE_CUSTOMER_WRITE\')"]'));
    this.suggestionTransferDropDown = element(by.xpath('//safe-address[@value="item.addresses[0]"]'));
    this.preferredIcon = element.all(by.xpath('//td/span/md-icon[@ng-if="row.isCurrentUserPreferred && true"]')).first();

    //Contact Info Tab
    this.contactInfoTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(0);
    this.contactInfoData = element.all(by.css('.customer-details-container.ng-scope'));
    this.addressLine1 = element(by.css('[ng-if="$ctrl.value.streetAddress"]'));
    this.addressLine2 = element(by.css('[ng-if="$ctrl.value.streetAddress2"]'));
    this.addressLine3 = element(by.css('[ng-if="$ctrl.value.city || $ctrl.value.state || $ctrl.value.zipcode"]'));
    this.primaryPhoneNumber = element(by.css('[ng-show="$ctrl.primaryPhone"]'));
    this.primaryFaxNumber = element(by.css('[ng-show="$ctrl.fax"]'));
    this.primaryEmail = element(by.css('[ng-repeat="email in $ctrl.customer.emailAddresses"]'));
    this.infoTabEditBtn = element(by.cssContainingText('[class="ng-scope md-default-theme material-icons"]', 'edit'));

    //Manage Vehicles Tab
    this.manageVehiclesTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(1);
    this.vehicleList = element.all(by.binding('vehicle.vin'));
    this.filterByDropdown = element(by.model('$ctrl.sortByType'));
    this.allFilterByDropdown = element.all(by.model('$ctrl.sortByType'));
    //using repeaters did not work for dropDown items
    this.allSortByOption = element.all(by.xpath("//div[@class = 'md-select-menu-container md-default-theme md-active md-clickable']//md-option"));
    this.defaultVehicle = element(by.css('[class="md-select-menu-container md-default-theme md-active md-clickable"]')).$$('md-option').get(0);
    this.selectedVehicle = element(by.css('[class="md-select-menu-container md-default-theme md-active md-clickable"]')).$$('md-option').get(1);
    this.unselectedVehicle = element(by.css('[class="md-select-menu-container md-default-theme md-active md-clickable"]')).$$('md-option').get(3);
    this.vehicleSearchField = element.all(by.css('[aria-label="Search"]')).get(1);
    this.allVehicleRows = element.all(by.repeater('vehicle in $ctrl.vehicles'));
    this.vehicleSearchBar = element.all(by.model('$ctrl.searchText')).get(0); //for some reason, [0] is not global search...
    this.searchedVehicle = element.all(by.repeater('vehicle in $ctrl.vehicles')).get(0).element(by.binding('vehicle.vin'));
    this.manageVehicleRows = element.all(by.xpath('//div[@ng-repeat="vehicle in $ctrl.vehicles"]'));
    this.vehicleCheckBox = element(by.model('vehicle.checked'));
    this.vehicleListDropdown = element(by.model('$ctrl.vehicleListType'));
    this.vehicleListTypes = element.all(by.repeater('vehicleListType in $ctrl.vehicleListTypes'));
    //this.errorToast = element(by.cssContainingText('.md-toast-content', 'Error updating vehicle'));

    //Vehicle Groups Tab
    //Customer Vehicle group page has different elements than rest of the pages.
    //Page Size
    this.allVehiclesLabel = element(by.xpath("//span[@ng-bind = 'vehicleGroup.name']"));
    this.pageSizeButton = element.all(by.css('[role="listbox"]')).get(3);
    this.pageTenButton = element.all(by.repeater('pageSizeOption in $ctrl.pageSizeOptions')).get(6);
    this.pageTwentyFiveButton = element.all(by.repeater('pageSizeOption in $ctrl.pageSizeOptions')).get(7);
    this.pageFiftyButton = element.all(by.repeater('pageSizeOption in $ctrl.pageSizeOptions')).get(8);
    //Pagination/High Density
    this.firstPageButton = element.all(by.buttonText('skip_previous')).get(1);
    this.lastPageButton = element.all(by.css('[aria-label="Last Page"]')).get(1);
    this.nextPageButton = element.all(by.buttonText('chevron_right')).get(1);
    this.previousPageButton = element.all(by.buttonText('chevron_left')).get(1);

    this.vehicleGroupsTab = element(by.cssContainingText('[ng-repeat="tab in $mdTabsCtrl.tabs"]', 'Vehicle Groups'));
    this.vehicleGroupList = element.all(by.repeater('vehicleGroup in $ctrl.vehicleGroups'));

    //Subscribed and un subscribed buttons
    this.isNotSubscribeBtn = element.all(by.css('[class="md-fab md-mini md-button md-default-theme md-ink-ripple button-disabled"]'));
    this.isSubscribeBtn = element(by.css('[class="md-fab md-mini md-button md-default-theme md-ink-ripple button-enabled"]'));

    this.vehicleGroupsData = element.all(by.binding('vehicleGroup.name'));
    this.searchResultsList = element.all(by.xpath('//li[@md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    this.addGroupInput = element(by.model('$ctrl.newGroupName'));
    this.addGroupBtn = element(by.css('[ng-click="$ctrl.addingGroup = true"]'));
    this.saveGroupBtn = element(by.cssContainingText('[type="submit"]', 'save'));
    this.editVgBtn = element(by.cssContainingText('[type="button"]', 'edit'));
    this.deleteVgBtn = element(by.cssContainingText('[type="button"]', 'delete'));
    this.confirmDeleteGroupBtns = element.all(by.css('[ng-click="ctrl.delete(group)"]'));
    this.allVehicleGroupRows = element.all(by.repeater('vehicleGroup in $ctrl.vehicleGroups'));
    this.allVehicleGroupNames = element.all(by.xpath('//div/span[@ng-bind="vehicleGroup.name"]'));
    this.confirmDeleteGroup = element(by.cssContainingText('[ng-click="dialog.hide()"]', 'Delete'));
    this.duplicateErrorMessage = element(by.xpath('//ng-message[@when="duplicated"]'));
    this.nameErrorMessage = element(by.xpath('//ng-message[@when="duplicate"]'));
    this.matchErrorMessage = element.all(by.xpath('//ng-message[@when="match"]'));
    this.similarErrorMessage = element(by.xpath('//ng-message[@when="similar"]'));
    this.similarPopUp = element(by.xpath('//md-dialog[@id="customerWarningDialog"]'));
    this.customerWrapper = element.all(by.repeater('item in $ctrl.warningCustomers track by $index'));
    this.similarSaveBtn = element(by.xpath('//button[@ng-click="$ctrl.save()"]'));

    //Subscribed Users Tab
    this.subscribedUsersTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(3);
    this.subscribedUsersData = element.all(by.repeater('user in $ctrl.users'));

    this.columns = {
        nameColumn: {value: 1, name: 'Name Column'},
        codeColumn: {value: 2, name: 'Address Column'},
        addressColumn: {value: 3, name: 'Phone Column'},
        contactColumn: {value: 4, name: 'Email Column'}
    };

    this.get = function () {
        browser.get('/#/nav/customer/list/');
        browser.sleep(1000);
    };


    // Verify Data
    this.verifyCustomerListTableDataIsVisible = function () {
        expect(this.customerPageHeaders.getText()).toContain('Name', 'Name column is missing');
        expect(this.customerPageHeaders.getText()).toContain('Address', 'Address column is missing');
        expect(this.customerPageHeaders.getText()).toContain('Phone', 'Phone column is missing');
        expect(this.customerPageHeaders.getText()).toContain('Email', 'Email column is missing');
        this.allCustomerRows.count().then(function (count) {
            expect(count).toBeGreaterThan(0, 'There was no Customer data to be found');
        });

    };

    this.clickContactInfoTab = function () {
        this.contactInfoTab.click();
        //Check to ensure proper phone #, addresses
        expect(this.addressLine1.isPresent()).toBe(true);
        expect(this.addressLine2.isPresent()).toBe(true);
        expect(this.addressLine3.isPresent()).toBe(true);
        expect(this.primaryPhoneNumber.isPresent()).toBe(true, 'The phone number is not in order.');
        expect(this.primaryFaxNumber.isPresent()).toBe(true, 'The fax number is not in order.');
        expect(this.primaryEmail.isPresent()).toBe(true, 'The email is not in order.');
    };

    this.clickManageVehiclesTab = function () {
        this.manageVehiclesTab.click();
    };

    this.clickVehicleGroupsTab = function () {
        this.vehicleGroupsTab.click();
        this.vehicleGroupsData.count().then(function (count) {
            expect(count).toBeGreaterThan(0);
        });
    };

    this.clickSubscribedUsersTab = function () {
        this.subscribedUsersTab.click();
        this.subscribedUsersData.count().then(function (count) {
            expect(count).toBeGreaterThan(0);
        });
    };

    this.clickAddGroupBtn = function () {
        this.addGroupBtn.click();
    };

    this.clickVehicleGroupSaveBtn = function (groupName) {
        this.saveBtn.click();
        //assert new vehicle group created in list
        //var names = this.allVehicleGroupRows.get(1).getText();
        //expect(names).toContain(groupName);
        var vehicleGroupsNames = [];
        return this.allVehicleGroupRows.filter(function (row) {
            // Match initially on vehicle group name
            return row.$$('span').get(0).getText().then(function (name) {
                vehicleGroupsNames.push(name);
                //console.log(vehicleGroupsNames);
            });
        }).then(function () {
            expect(vehicleGroupsNames).toContain(groupName);
        });
    };

    this.selectCustomerAndFindVehicle = function (vin, customerName) {
        this.clickCustomerHyperlinkCellSearch(customerName);
        this.clickManageVehiclesTab();
        this.manageVehiclesSearch(vin);

    };


    this.assignVehicleToCustomer = function (vin, customerName) {
        this.selectCustomerAndFindVehicle(vin, customerName);
        this.assignVehicle();
    };


    this.unassignVehicleFromCustomer = function (vin, customerName) {
        this.selectCustomerAndFindVehicle(vin, customerName);
        this.unassignVehicle();
    };

    this.clickVehicleGroupEditBtn = function (groupName) {
        return this.allVehicleGroupRows.filter(function (row) {
            // Match initially on vehicle group name
            return row.$$('span').get(0).getText().then(function (name) {
                return name === groupName;
            });
        }).first().element(by.cssContainingText('[ng-click="$ctrl.editGroup(vehicleGroup)"]', 'edit')).click();
    };

    this.clickVehicleGroupDeleteBtn = function (groupName) {
        return this.allVehicleGroupRows.filter(function (row) {
            // Match initially on vehicle group name
            return row.$$('span').get(0).getText().then(function (name) {
                return name === groupName;
            });
        }).first().element(by.css('[ng-click="$ctrl.removeGroup(vehicleGroup, $event)"]')).click();
    };

    this.deleteVehicleGroup = function (groupName) {
        this.allVehicleGroupNames.getText().then(function (text) {
            for (var i = 0; i < text.length; i++) {
                if (text[i] === groupName) {
                    element(by.xpath('(//button[@ng-click="$ctrl.removeGroup(vehicleGroup, $event)"])[' + i + ']')).click();
                    element(by.css('[ng-click="dialog.hide()"]')).click();
                }
            }
        });
    };

    // Data inputs
    this.addGroupSendKeys = function (groupName) {
        this.addGroupInput.clear();
        this.addGroupInput.sendKeys(groupName);
    };

    this.addVehicleGroup = groupName => {
        this.addGroupBtn.click();
        this.addGroupInput.clear();
        this.addGroupInput.sendKeys(groupName);
        this.saveBtn.click();
    };

    // Data checks
    this.checkForPageCount = function (expectedCount) {
        this.allCustomerRows.count().then(function (count) {
            expect(count <= expectedCount).toBe(true);
        });
    };

    this.checkForData = function (density) {
        if (density === 'low') {
            this.allCustomerRows.count().then(function (count) {
                expect(count).toBeGreaterThan(0, 'There was no Customer data to be found');
            });
        } else if ('high') {
            this.allCustomerRows.count().then(function (count) {
                expect(count).toBeGreaterThan(0, 'There was no Customer data to be found');
            });
        }
    };


    this.checkForNoVehicleData = function (veh1, veh2) {
        this.vehicleList.getText().then(function (text) {
            expect(text).not.toContain(veh1, "Test Vehicle was still assigned to customer");
            expect(text).not.toContain(veh2, "Test Vehicle was still assigned to customer");
        });
    };

    this.verifyCustomerInList = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // need to get $$('a') because of the icons on the list and spaces on the DOM.
            return row.$$('td').$$('a').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'Customer:' + customerName + ' name was not found in the Customer List page');
            }
            else {
                return filteredRows[0].$$('.ng-binding').get(2).getText();
            }
        });

    };

    this.verifyCustomerIsNotInList = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // need to get $$('a') because of the icons on the list and spaces on the DOM.
            return row.$$('td').$$('a').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            //test to see why it fails on the VM. Will remove it once DONE.
            console.log(filteredRows.length);
            if (filteredRows.length > 0) {
                expect(false).toBe(true,
                    'Customer: ' + customerName + 'name was found in the Customer List page. ' + filteredRows.length);
            }
            else {
                expect(filteredRows.length).toBe(0, customerName + ' is still visible.');
            }
        });
    };

    this.verifyCustomerList = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (name) {
                console.log(name);
                expect(name).toContain(customerName);
            });
        }).then(function () {
        }); //This .then is needed for the function to complete the promise.
    };

    //TODO: add filteredRow[] after db latency is fixed
    this.checkForDeletedCustomer = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('td').get(1).getText().then(function (name) {
                //console.log(name);
                expect(name).not.toBe(customerName);
            });
        });
    };

    this.checkForDeletedVehicleGroup = function (groupName) {
        this.vehicleListDropdown.click();
        expect(this.vehicleListTypes.getText()).not.toContain('Group: ' + groupName);
    };

    // Specific customer menu selections
    this.deleteCustomer = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('h2').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            filteredRows[0].$$('[type="button"]').get(0).click();
            expect(element(by.cssContainingText('.md-clickable', 'DELETE')).isPresent()).toBe(true);
            element(by.cssContainingText('.md-clickable', 'DELETE')).click();
            expect($('md-dialog-actions').isPresent()).toBe(true);
            browser.sleep(2000);
            element(by.cssContainingText('[type="button"]', 'Delete')).click();
            browser.sleep(2000);
        });
    };

    this.clickCustomerHyperlinkCellSearch = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('td').get(1).getText().then(function (name) {
                if (name.indexOf(customerName) >= 0) {
                    return name;
                }
            });
        }).then(function (filteredRows) {
            filteredRows[0].$$('a').get(0).click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/details/peoplenet:customer:');

        });
    };

    // Customer Details actions
    this.manageVehiclesSearch = function (vin) {
        this.vehicleSearchBar.clear();
        this.vehicleSearchBar.sendKeys(vin);
        this.vehicleSearchBar.sendKeys(protractor.Key.ENTER);
        expect(this.searchedVehicle.getText()).toBe(vin);
    };

    this.cannotAssignVehicle = function (vin) {
        this.vehicleSearchBar.clear();
        this.vehicleSearchBar.sendKeys(vin);
        this.vehicleSearchBar.sendKeys(protractor.Key.ENTER);
        expect(this.allVehicleRows.count()).toBe(0, 'There are still vehicles available.');
    };

    this.assignVehicle = function () {
        this.vehicleCheckBox.getAttribute('aria-checked').then(function (state) {//Only Click CheckBox when it is NOT checked
            //console.log(state);
            if (state === 'false') {
                element(by.model('vehicle.checked')).click();
            }
        });
        // aria-checked html attribute signifies whether or not item is selected!
        expect(this.vehicleCheckBox.getAttribute('aria-checked')).toBe('true', 'The assign vehicle box was not checked');
    };

    this.assignInvalidVehicle = function () {
        this.vehicleCheckBox.click();
        //validate the error toast message
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(this.toastAlert.getText()).toContain('Error updating vehicle');
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
        // aria-checked html attribute signifies whether or not item is selected!
        expect(this.vehicleCheckBox.getAttribute('aria-checked')).toBe('false');
    };

    this.unassignVehicle = function () {
        this.vehicleCheckBox.getAttribute('aria-checked').then(function (state) {//Only Click CheckBox when it is NOT checked
            //console.log(state);
            if (state === 'true') {
                element(by.model('vehicle.checked')).click();
            }
        });
    };

    //Add new customer through the endpoint
    this.addNewCustomerEndpoint = function (addCustomerAs, type) {
        type = type.toLowerCase();
        var newDateTime = moment().add(1, 'minute').toISOString();
        var userRole;
        if (type === 'join all') {
            addCustomerJson.allDealersCanView = true;
        }
        //Note: All params on the json do not need to be changed since it matches the params
        //on the config files.
        var randomInt = Math.floor(Math.random() * 999999 + 1000000);
        console.log(randomInt)
        addCustomerJson.name = browser.params.addcustomer.name + randomInt;
        addCustomerJson.timestamp = newDateTime;
        if (addCustomerAs !== peoplenetAdminEmail && addCustomerAs !== paccarAdminEmail) {
            return request.get(browser.params.environment.userGatewayServiceUrl + '/' + this.getUid(addCustomerAs))
                .set('Content-Type', 'application/json')
                .set('user_security_attributes', usersPage.getSecurityAttribute(peoplenetAdminEmail))
                .then(function (res) {
                    var userData = res.body;
                    userRole = userData.userRoles[0].name;
                    expect(res.status).toEqual(200);
                    var securityAttribute = usersPage.createSecurityAttribute(userRole);
                    return request.post(browser.params.environment.entityGatewayServiceUrl + '/customers')
                        .set('Content-Type', 'application/json')
                        .set('user_security_attributes', securityAttribute)
                        .send(addCustomerJson)

                }).then(function (res) {
                    expect(res.status).toEqual(200);
                    console.log("RES " + JSON.stringify(res));
                    return addCustomerJson.name
                }).catch((err) => {
                    expect(false).toBe(true, "Error message: " + err);
                    return err
                })
        } else {
            var securityAttribute = usersPage.getSecurityAttribute(addCustomerAs);
            return request.post(browser.params.environment.entityGatewayServiceUrl + '/customers')
                .set('Content-Type', 'application/json')
                .set('user_security_attributes', securityAttribute)
                .send(addCustomerJson)
                .then(function (res) {
                    console.log("RES " + JSON.stringify(res));
                    expect(res.status).toEqual(200);
                    return addCustomerJson.name
                }).catch((err) => {
                    expect(false).toBe(true, "Error message: " + err);
                    return err
                });
        }
    };

    this.getUid = function (userEmail) {
        switch (userEmail) {
            case peoplenetAdminEmail:
                return peoplenetAdminUid;
                break;

            case paccarAdminEmail:
                return paccarAdminUid;
                break;

            case dealerOwnerAdmin:
                return dealerOwnerAdminUid;
                break;

            case dealerRegionAdmin:
                return dealerRegionAdminUid;
                break;

            case dealerAdminEmail:
                return dealerAdminUid;
                break;

            case dealerUserEmail:
                return dealerUserUid;
                break;
        }
    };

    this.editCustomerEndpoint = function (editCustomerAs, customerName, customer) {
        var newDateTime = moment().add(1, 'minute').toISOString();
        var securityAttribute = usersPage.getSecurityAttribute(editCustomerAs);
        //get the Customer data from entity-gateway
       return request.get(browser.params.environment.entityUrl + '/customers?name=' + customerName)
            .set('Content-Type', 'application/json')
            .then(function (response) {
                var customerData = response.body.data[0];
                // console.log('Original Data: ' + JSON.stringify(customerData));
                // console.log('Security Attribute: ' + securityAttribute);
                customerData.name = customer.name;
                customerData.addresses[0].streetAddress = customer.streetAddress;
                customerData.addresses[0].streetAddress2 = customer.streetAddress2;
                customerData.addresses[0].city = customer.city;
                customerData.addresses[0].state = customer.state;
                customerData.addresses[0].zipcode = customer.zipcode;
                customerData.addresses[0].country = customer.country;
                customerData.phoneNumbers[0].number = customer.phone;
                customerData.phoneNumbers[1].number = customer.fax;
                customerData.emailAddresses[0].address = customer.email;
                customerData.phoneNumbers[0].nickName = customer.phoneNickName;
                customerData.phoneNumbers[1].nickName = customer.faxNickName;
                customerData.timestamp = newDateTime;
                // console.log('This is what I got AFTER:---' + JSON.stringify(customerData));
                //POST to entity-gateway to edit the Customer
               return request.put(browser.params.environment.entityGatewayServiceUrl + '/customers')
                    .set('Content-Type', 'application/json')
                    .set('user_security_attributes', securityAttribute)
                    .send(customerData)
                    .then(function (response) {
                        expect(response.status).toEqual(200);
                        return customerData.name
                    }).catch((err) => {
                    expect(false).toBe(true, "Error message: " + err);
                    return err
                });
            });
    };

    this.setCustomerPreferredDealersEndpoint = function (editCustomerAs, customerName, customer) {
        var newDateTime = moment().add(1, 'minute').toISOString();
        var securityAttribute = usersPage.getSecurityAttribute(editCustomerAs);
        //get the Customer data from entity-gateway
        request.get(browser.params.environment.entityUrl + '/customers?name=' + customerName)
            .set('Content-Type', 'application/json')
            .end(function (err, response) {
                var customerData = response.body.data[0];
                // console.log('Original Data: ' + JSON.stringify(customerData));
                // console.log('Security Attribute: ' + securityAttribute);
                customerData.dealerKeys = customer.dealerKeys;
                // console.log('This is what I got AFTER:---' + JSON.stringify(customerData));
                //POST to entity-gateway to edit the Customer
                request.put(browser.params.environment.entityGatewayServiceUrl + '/customers')
                    .set('Content-Type', 'application/json')
                    .set('user_security_attributes', securityAttribute)
                    .send(customerData)
                    .end(function (err, response) {
                        console.log(err);
                        expect(response.status).toEqual(200);
                    });
            });
    };

    this.deleteCustomerEndpoint = function (deleteCusAs, cusToDelete) {
        var securityAttribute = usersPage.getSecurityAttribute(deleteCusAs);
        var cusId;
        //get the Customer data from entity-gateway
        return request.get(browser.params.environment.entityUrl + '/customers?name=' + cusToDelete)
            .set('Content-Type', 'application/json')
            .then(function (response) {
                var customerData = response.body.data[0];
                cusId = customerData.key;
                //POST to entity-gateway to delete the Customer
                return request.del(browser.params.environment.entityGatewayServiceUrl + "/customers/" + cusId)
                    .set('Content-Type', 'application/json')
                    .set('user_security_attributes', securityAttribute)
                    .send(customerData)
                    .then(function (response) {
                        expect(response.status).toEqual(200);
                        return response
                    })
            })
            .catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    // Add new customer
    this.addNewCustomer = function (customerType,name) {
        var customerName = name || browser.params.addcustomer.name
        this.nameField.sendKeys(customerName);
        this.addressField1.sendKeys(browser.params.addcustomer.address1);
        this.addressField2.sendKeys(browser.params.addcustomer.address2);
        this.cityField.sendKeys(browser.params.addcustomer.city);
        this.stateField.click();
        browser.sleep(1000);
        this.selectStateDropdownItem(browser.params.addcustomer.state);
        this.zipField.sendKeys(browser.params.addcustomer.zip);
        this.countryField.click();
        this.selectCountryDropdownItem(browser.params.addcustomer.country);
        this.phoneField.sendKeys(browser.params.addcustomer.phone);
        this.faxField.sendKeys(browser.params.addcustomer.fax);
        this.emailField.sendKeys(browser.params.addcustomer.email);
        this.emailField.sendKeys(protractor.Key.PAGE_DOWN);
        browser.sleep(2000);
        if (customerType === browser.params.customertype.joinall) {
            this.checkDealerNetworkCheckbox();
            browser.sleep(3000);
        }
        this.saveBtn.click();
        this.similarPopUp.isPresent()
            .then((result) => {
                if (result) {
                    this.similarSaveBtn.click();
                }
            })

    };

    this.addNewCustomerForTransfer = function (customerType, name, email) {
        var customName = name || browser.params.addcustomer.name;
        var customEmail = email || browser.params.addcustomer.email;
        this.nameField.sendKeys(customName);
        this.addressField1.sendKeys(browser.params.addcustomer.address1);
        this.addressField2.sendKeys(browser.params.addcustomer.address2);
        this.cityField.sendKeys(browser.params.addcustomer.city);
        this.stateField.click();
        browser.sleep(1000);
        this.selectStateDropdownItem(browser.params.addcustomer.state);
        this.zipField.sendKeys(browser.params.addcustomer.zip);
        this.countryField.click();
        browser.sleep(1000);
        this.selectCountryDropdownItem(browser.params.addcustomer.country);
        this.phoneField.sendKeys(browser.params.addcustomer.phone);
        this.faxField.sendKeys(browser.params.addcustomer.fax);
        this.emailField.sendKeys(customEmail);
        this.emailField.sendKeys(protractor.Key.PAGE_DOWN);
        browser.sleep(2000);
        if (customerType === browser.params.customertype.joinall) {
            this.checkDealerNetworkCheckbox();
            browser.sleep(3000);
        }
        this.saveBtn.click();
        this.similarPopUp.isPresent()
            .then((result) => {
                if (result) {
                    this.similarSaveBtn.click();
                    browser.sleep(3000);
                }
            })
    };

    this.editCustomer = function (name) {
        var customerName = name|| browser.params.editcustomer.name
        this.nameField.clear();
        this.nameField.sendKeys(customerName);

        this.addressField1.clear();
        this.addressField1.sendKeys(browser.params.editcustomer.address1);

        this.addressField2.clear();
        this.addressField2.sendKeys(browser.params.editcustomer.address2);

        this.cityField.clear();
        this.cityField.sendKeys(browser.params.editcustomer.city);

        this.stateField.click();
        browser.sleep(1000);
        this.selectStateDropdownItem(browser.params.editcustomer.state);

        this.zipField.clear();
        this.zipField.sendKeys(browser.params.editcustomer.zip);

        this.countryField.click();
        this.selectCountryDropdownItem(browser.params.editcustomer.country);

        this.phoneField.clear();
        this.phoneField.sendKeys(browser.params.editcustomer.phone);

        this.faxField.clear();
        this.faxField.sendKeys(browser.params.editcustomer.fax);

        this.emailField.clear();
        this.emailField.sendKeys(browser.params.editcustomer.email);

        this.emailField.sendKeys(protractor.Key.PAGE_DOWN);
        browser.sleep(4000);
        this.saveBtn.click();
        browser.sleep(4000);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/details/peoplenet:customer:');
    };

    this.resetCustomerInfo = function (type,name) {

        if (type === 'cummins') {
            this.nameField.clear();
            this.nameField.sendKeys(browser.params.testcumminscustomer.name);

            this.emailField.clear();
            this.emailField.sendKeys(browser.params.testcumminscustomer.email);
        }
        else {
            var customerName = name || browser.params.addcustomer.name
            this.nameField.clear();
            this.nameField.sendKeys(customerName);

            this.emailField.clear();
            this.emailField.sendKeys(browser.params.addcustomer.email);
        }
        this.addressField1.clear();
        this.addressField1.sendKeys(browser.params.addcustomer.address1);

        this.addressField2.clear();
        this.addressField2.sendKeys(browser.params.addcustomer.address2);

        this.cityField.clear();
        this.cityField.sendKeys(browser.params.addcustomer.city);

        this.stateField.click();
        browser.sleep(1000);
        this.selectStateDropdownItem(browser.params.addcustomer.state);

        this.zipField.clear();
        this.zipField.sendKeys(browser.params.addcustomer.zip);

        this.countryField.click();
        this.selectCountryDropdownItem(browser.params.addcustomer.country);

        this.phoneField.clear();
        this.phoneField.sendKeys(browser.params.addcustomer.phone);

        this.faxField.clear();
        this.faxField.sendKeys(browser.params.addcustomer.fax);

        this.emailField.sendKeys(protractor.Key.PAGE_DOWN);
        browser.sleep(3000);
        this.saveBtn.click();
        browser.sleep(3000);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/details');
    };

    this.selectStateDropdownItem = function (item) {
        element(by.cssContainingText('[ng-value="state.abbreviation"]', item)).click();
    };

    this.selectCountryDropdownItem = function (item) {
        element(by.cssContainingText('[ng-value="country.abbreviation"]', item)).click();
    };

    this.clickCustomersDetailsLink = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 2 for user names
            return row.$$('h2').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            filteredRows[0].element(by.linkText('VIEW DETAILS')).click();
        });
    };

    this.verifyName = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            return row.$$('h2').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            return filteredRows[0].$$('h2').get(0).getText();
        });
    };

    this.verifyAddress = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('h2').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            return filteredRows[0].$$('[value="ctrl.customer.addresses[0]"]').get(0).getText();
        });
    };

    this.verifyPhone = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('h2').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            return filteredRows[0].$$('[ng-repeat="phone in ctrl.customer.phoneNumbers"]').get(0).getText();
        });
    };

    this.verifyFax = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('h2').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            return filteredRows[0].$$('[ng-repeat="phone in customer.phoneNumbers"]').get(1).getText();
        });
    };

    this.verifyEmail = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 0 for customer names
            return row.$$('h2').get(0).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            return filteredRows[0].$$('.ng-binding').get(10).getText();
        });
    };

    this.verifyPreferredIcon = function () {
        expect(this.preferredDealerIcon.isDisplayed()).toBe(true, 'The preferred customer icon is missing.');
    };

    this.verifyJoinAllIcon = function () {
        expect(this.joinAllIcon.isDisplayed()).toBe(true, 'The join all customer icon is missing.');
    };

    this.clickEditCustomerBtn = function (density, customerName) {
        if (density === 'low') {
            return this.allCustomerRows.filter(function (row) {
                // index 2 for user names
                return row.$$('h2').get(0).getText().then(function (name) {
                    return name === customerName;
                });
            }).then(function (filteredRows) {
                filteredRows[0].element(by.linkText('EDIT')).click();
            });
        }
        else if (density === 'high') {
            return this.allCustomerRows.filter(function (row) {
                // index 2 for user names
                return row.$$('td').get(1).getText().then(function (name) {
                    return name === customerName;
                });
            }).then(function (filteredRows) {
                if (filteredRows.length < 1) {
                    expect(false).toBe(true, 'Edit Customer Button is not visible on User List page');
                }
                filteredRows[0].$$('md-checkbox').get(0).click();
                element(by.partialButtonText('Actions')).click();
                element(by.partialLinkText('EDIT')).click();
            });
        }
        else {
            expect(true).toBe(false, 'No density indicated');
        }
    };

    this.checkDealerNetworkCheckbox = function () {
        this.dealerNetworkCheckBox.getAttribute('aria-checked').then(function (state) {//Only Click CheckBox when it is NOT checked
            //console.log(state);
            if (state === 'false') {
                element(by.model('$ctrl.customer.allDealersCanView')).click();
            }
        });
        // aria-checked html attribute signifies whether or not item is selected!
        expect(this.dealerNetworkCheckBox.getAttribute('aria-checked')).toBe('true', 'The assign vehicle box was not checked');
    };


    this.uncheckDealerNetworkCheckbox = function () {
        this.dealerNetworkCheckBox.getAttribute('aria-checked').then(function (state) {//Only Click CheckBox when it is NOT checked
            //console.log(state);
            if (state === 'true') {
                element(by.model('$ctrl.customer.allDealersCanView')).click();
            }
        });
        // aria-checked html attribute signifies whether or not item is selected!
        expect(this.dealerNetworkCheckBox.getAttribute('aria-checked')).toBe('false', 'The assign vehicle box was not Un-Checked');
    };

    this.cancelDeleteCustomer = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 4 for deletion confirmation message
            return row.$$('td').get(4).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            filteredRows[0].$('[ng-click="ctrl.cancelDelete(customer)"]').click();
        });
    };

    this.verifyCannotDelete = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 4 for deletion confirmation message
            return row.$$('td').get(4).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            return filteredRows[0].$$('td').get(4).getText();
        });
    };

    this.getConfirmDeleteBtn = function (customerName) {
        return this.allCustomerRows.filter(function (row) {
            // index 4 for deletion confirmation message
            return row.$$('td').get(4).getText().then(function (name) {
                return name === customerName;
            });
        }).then(function (filteredRows) {
            return filteredRows[0].$('[ng-click="ctrl.delete(customer)"]').isDisplayed();
        });
    };

    //Table Verification
    this.verifyNameColumn = function (name) {
        this.allCustomerRows.filter(function (row) {
            return row.$$('td').get(1).getText().then(function (customerName) {
                expect(customerName).toBe(name, 'The names does not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.clickCustomerCheckbox = function (customerName) {
        this.allCustomerRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                if (name.indexOf(customerName) >= 0) {
                    return name;
                }
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 0) {
                expect(false).toBe(true, 'No customer was found by that name: ' + customerName);
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.checkForToastAlert = function () {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of customers succeeded.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        }
        else if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of customers failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

    this.subscribeToAllVehicles = function () {
        this.allVehicleGroupRows.get(0).$$('button').click();
    };

    this.verifySubscribedIcon = function () {
        expect(this.isSubscribeBtn.isDisplayed()).toBe(true, 'The user did not get subscribed to all.');
        expect(this.allVehicleGroupRows.get(1).$$('button').get(0).getAttribute('class')).toBe('md-fab md-mini md-button md-default-theme md-ink-ripple button-disabled', 'The icon is  green.'); //PVP-3722
    };

    this.verifyNotSubscribedIcon = function () {
        expect(this.isSubscribeBtn.isPresent()).toBe(false, 'The user is still subscribed to all.');
        expect(this.allVehicleGroupRows.get(0).$$('button').get(0).getAttribute('class')).toBe('md-fab md-mini md-button md-default-theme md-ink-ripple button-disabled', 'The icon is still green.');
    };
    this.findVehicle = function (vin) {
        this.clickManageVehiclesTab();
        this.manageVehiclesSearch(vin);

    };

    this.findAndAssignVehicleToCustomer = function (vin) {
        this.findVehicle(vin);
        this.assignVehicle();
    };

    this.findAndUnassignVehicleFromCustomer = function (vin) {
        this.findVehicle(vin);
        this.unassignVehicle();
    };

    this.verifyVgPermission = function (eachUser, customerType) {
        if (customerType === browser.params.customertype.preferred && adminRoles.indexOf(eachUser) >= 0) {
            expect(this.addGroupBtn.isDisplayed()).toBe(true, 'The button is missing.');
            expect(this.editVgBtn.isDisplayed()).toBe(true, 'The button is missing.');
            expect(this.deleteVgBtn.isDisplayed()).toBe(true, 'The button is missing.');
        }
        else if (customerType === browser.params.customertype.joinall && eachUser === paccarAdminEmail ||
            eachUser === customerAdminEmail) {
            expect(this.addGroupBtn.isDisplayed()).toBe(true, 'The button is missing.');
            expect(this.editVgBtn.isDisplayed()).toBe(true, 'The button is missing.');
            expect(this.deleteVgBtn.isDisplayed()).toBe(true, 'The button is missing.');
        }
        else {
            expect(this.addGroupBtn.isPresent()).toBe(false, 'The button is present.');
            expect(this.editVgBtn.isPresent()).toBe(false, 'The button is present.');
            expect(this.deleteVgBtn.isPresent()).toBe(false, 'The button is present.');
        }
    };

};

module.exports = new CustomersPage();
