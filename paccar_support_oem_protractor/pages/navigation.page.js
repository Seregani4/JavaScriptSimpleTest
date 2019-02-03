var navigation = function () {
    var envURL = browser.params.environment.url;
    /////////////////////////Dashboard////////////////////////////////////
    this.dashboardLink = element(by.css('[href="#/nav/dashboard"]'));
    //////////////////////////////////////Dialog Buttons//////////////////////////////////////
    this.dialogBox = element(by.xpath('//md-dialog'));
    this.submitDialogButton = element(by.css('[ng-click="dialog.hide()"]'));
    this.saveDialogButton = element(by.css('[ng-click="$ctrl.form.$valid && $ctrl.save()"]'));
    this.cancelDialogButton = element(by.css('[ng-click="dialog.abort()"]'));
    this.cancelCreationButton = element(by.css('[ng-click="$ctrl.cancel()"]'));
    this.nameInputDialog = element(by.xpath("//input[@name = 'name']"));

    ///////////////////////////////////////////login////////////////////////////////////
    this.wrongPassworderrorMessageAlert = element(by.className('md-action md-button ng-scope md-warn-theme md-ink-ripple'));

    //////////////////////////////BreadCrumb//////////////////////////////////////////////
    this.breadCrumbs = element(by.css('[states="$ctrl.breadcrumbStates"]'));

    //////////////////////////////Toast Alert//////////////////////////////////////////////
    this.toastAlert = element(by.css('[role="alert"]'));
//////////////////////////////Item Selected message//////////////////////////////////////////////
    this.itemSelectedMessage = element(by.xpath("(//div[@class = 'md-toolbar-tools list-toolbar-tools']/span)[1]"));

    ////////////////////////////Titles////////////////////////////////////////////////////
    this.tableHeader = element(by.xpath('//thead'));
    this.title = element(by.css('[ng-bind="$ctrl.title"]'));
    this.subtitle = element(by.css('[ng-show="$ctrl.subtitle"]'));
    this.subHeaders = element.all(by.className('md-subheader-content'));
    this.allTabs = element.all(by.xpath('//md-tab-item'));
    this.allLabels = element.all(by.xpath('//label'));
    ////////////////////////////All Left menu links////////////////////////////////////////////////////
    this.leftMenuLinks = element.all(by.className("main-navigation ng-isolate-scope"));

    /////////////////ActionBar////////////////////////////////////////////////////////////
    //Main Action Items on Top Right Side of a Page
    this.moreOptionsButton = element.all(by.cssContainingText('[type="button"]', 'more_vert')).get(0);
    this.allFiltersActionsList = element.all(by.xpath("//md-menu-content[@class='md-default-theme']//button"));
    this.savedFiltersList = element.all(by.repeater("contextFilter in $ctrl.contextFilters"));
    this.saveNewFilter = element.all(by.css('[ng-click="$ctrl.saveNewFilter()"]')).last();
    this.manageAllFilters = element.all(by.css('[ng-click="$ctrl.manageFilters()"]')).last();
    this.configureColumnsButton = element(by.css('[ng-click="$ctrl.configureColumns($event)"]'));
    this.addActionButton = element(by.css('[aria-label="add"]'));
    this.editActionButton = element(by.buttonText('edit'));
    this.chipFilterDropDownButton = element.all(by.xpath("//filter-type-menu[contains(@class,'desktop')]//md-icon[contains(@ng-if, '$ctrl.filterType.icon')]")).first();
    this.chipFilterDropDownButtonMap = element.all(by.xpath("//filter-type-menu[contains(@class,'desktop')]//md-icon[contains(@ng-if, '$ctrl.filterType.icon')]")).last();
    this.chipFilterUsersButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Users")).last();
    this.chipFilterDealerButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Dealers")).last();
    this.chipFilterDealerOwnerGroupButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Dealer Owner Groups")).last();
    this.chipFilterVehiclesButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "VIN")).last();
    this.chipFilterRolesButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Roles")).last();
    this.chipFilterCustomersButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Customers")).last();
    this.chipFilterRecommendationsButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Recommendations")).last();
    this.chipFilterDealerVisibility = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Dealer Visibility")).last();
    this.chipFilterLastFromDropDown = element.all(by.xpath('//ul/li[@ng-click="$mdAutocompleteCtrl.select($index)"]')).last();
    this.chipFilterFirstFromDropDown = element.all(by.xpath('//ul/li[@ng-click="$mdAutocompleteCtrl.select($index)"]')).first();
    this.chipFilterServiceNowButton = element.all(by.xpath('//ul/li[@ng-click="$mdAutocompleteCtrl.select($index)"]')).get(1);
    this.chipFilterServiceSoonButton = element.all(by.xpath('//ul/li[@ng-click="$mdAutocompleteCtrl.select($index)"]')).get(2);
    this.chipFilterStatusesButton = element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', "Statuses")).last();
    this.chipFilterInactiveButton = element.all(by.cssContainingText('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]', "Inactive")).last();
    this.chipFilterActiveButton = element.all(by.cssContainingText('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]', "Active")).last();
    this.chipFilterDropDown = element.all(by.xpath("//div[contains(@id,'menu_container') and @aria-hidden = 'false']//button"));
    this.chipFilterSuggestionDropDown = element.all(by.xpath("//li[@md-virtual-repeat]"));
    this.chipFilterEmailFromSuggestion = element(by.css('[class="highlight"]'));
    this.firstElementSuggestionDropDown = element(by.xpath("(//li[@md-virtual-repeat])[1]"));
    this.secondElementSuggestionDropDown = element(by.xpath("(//li[@md-virtual-repeat])[2]"));
    this.activeChips = element.all(by.css('chip-filter:not(.hide-xs) md-chip'));
    this.activeChipsText = element.all(by.xpath("//span[@class = 'chipText ng-binding']"));
    this.notAllPersistentChipsAppliedMessage = element.all(by.xpath("//div[contains(@class, 'persistent-message')]"));
    this.chipIcons = element.all(by.xpath("//md-chip//md-icon[contains(@class, 'chipIcon')]"));
    this.iconNone = element(by.xpath("(//md-icon[@ng-if = '$ctrl.filterType.icon && $ctrl.filterType.isSvg'])[2]"));
    this.rolesValue = element.all(by.xpath('//ul/li[@md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    //this.exportButton = element(by.buttonText('EXPORT'));
    this.exportButton = element.all(by.css('[ng-click="textButton.click($event, $ctrl)"]')).get(0);
    this.importButton = element.all(by.css('[ng-click="textButton.click($event, $ctrl)"]')).get(1);
    this.refreshActionButton = element(by.css('[ng-click="$ctrl.refresh()"]'));
    this.textFromRolesDropDown = element.all(by.xpath('//ul/li[@ng-class="{ selected: $index === $mdAutocompleteCtrl.index }"]'));
    //Action Bar and Action Button
    this.actionBar = element(by.css('[ng-show="$ctrl.listContext.selectedRows.length"]'));
    //Actions Bar Options
    this.actionBarMoreOptionsButton = element.all(by.cssContainingText('[type="button"]', 'more_vert')).get(1);
    this.deleteActionButton = element(by.buttonText('delete'));
    this.deleteDialogButton = element(by.cssContainingText('[ng-click="dialog.hide()"]', 'Delete'));

    /////////////////////////////
    //TODO duplicate of this.globalSearchResultList
    this.globalSearchResults = element.all(by.repeater('(type, result) in $ctrl.results'));
    this.textFromGlobalSuggestions = element(by.xpath('//div/ul'));
    this.noResult = element(by.cssContainingText('[class="md-subheader-content"]', 'No search results found'));

    ////////////////////Fleet Health Links///////////////////////////
    this.fleetHealthMapLink = element(by.css('[href="#/nav/dashboard"]'));
    this.dashboard2Link = element(by.css('[href="#/nav/newDashboard"]'));
    this.customersLink = element(by.css('[href="#/nav/customer/list/"]'));
    this.dealersLink = element(by.css('[href="#/nav/dealer/list/"]'));
    this.vehiclesLink = element(by.css('[href="#/nav/vehicle/list/"]'));
    this.dealerOwnerGroupsLink = element(by.css('[href="#/nav/dealerOwnerGroup/list/"]'));
    this.remoteDiagLink = element(by.css('[href="#/nav/remoteDiagnostics/deactivate/"]'));
    this.subscriptionsLink = element.all(by.css('[href="#/nav/subscription/list/"]')).get(0);
    this.otaSubscriptionLink = element(by.css('[href="#/nav/otaSubscription/list/"]'));

    ///////////////Admin Links/////////////////////////////////////////
    this.analyticsLink = element(by.css('[href="#/nav/analytics"]'));
    this.exportLink = element(by.css('[href="#/nav/export/jobs"]'));
    this.devicesLink = element(by.css('[href="#/nav/device/list/"]'));
    this.deviceCollectionsLink = element(by.css('[href="#/nav/deviceCollection/list/"]'));
    this.manufacturersLink = element(by.css('[href="#/nav/manufacturer/list/"]'));
    this.notificationsLink = element(by.css('[href="#/nav/ttm-notification/list/"]'));
    this.oemsLink = element(by.css('[href="#/nav/oem/list/"]'));
    this.permissionsLink = element(by.css('[ng-href="#/nav/permission/list/"]'));
    this.rolesLink = element(by.css('[href="#/nav/role/list/"]'));
    this.topTenFaultsLink = element(by.css('[href="#/nav/topten"]'));
    this.usersLink = element.all(by.css('[href="#/nav/user/list/"]')).get(0); // the cancel button when editing the user also has the href link
    this.wifiUsersLink = element.all(by.css('[href="#/nav/wifiuser/list/"]')).get(0); // the cancel button when editing the user also has the href link
    this.googleAnalyticsLink = element(by.css('[href="#/nav/analytics/google"]'));

    /////////////////////User Menu///////////////////////////////////////
    this.userMenuButton = element(by.id('user-profile-menu-arrow-icon')); // user menu dropdown
    this.allUserMenuItems = element.all(by.repeater('item in $ctrl.userMenuItems'));
    // ***** What's New is now just Change Logs ***** //
    //this.whatsNewLink = element(by.css('[href="#/nav/changelogs/view"]')); // TODO - Change to changeLogs once deployed to Wifi Portal
    this.logoutBtn = element(by.css('[href="#/logout"]'));
    ////////////////////Filters/search bars/////////////////////////////////
    this.globalSearchBar = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(0);

    //SearchFilerButton and Filters
    this.globalSearchResultList = element.all(by.repeater('(type, result) in $ctrl.results'));
    //this.searchFilterButton = element(by.css('[ng-if="$ctrl.toolbarOptions.filterButton"]'));
    this.manageSearchFilterButton = element(by.xpath("//div[@class = 'menu-wrapper']//md-icon[@class = 'arrow-icon ng-scope md-default-theme material-icons']"));
    this.textFromManageSearchFilterDropDown = element(by.xpath("//div[contains(@class, '_md md-open-menu-container')][@aria-hidden = 'false']/md-menu-content"));
    this.saveSearchFilter = element.all(by.css('[ng-click="$ctrl.saveNewFilter()"]')).last();
    this.manageSearchFilter = element.all(by.css('[ng-click="$ctrl.manageFilters()"]')).last();
    this.searchFilterButton = element(by.className('md-chips md-removable'));
    this.allFilterResults = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    this.clearAllButton = element(by.cssContainingText('[ng-click="$ctrl.clearFiltersAndRefreshData()"]', 'close'));
    this.searchResultsContainer = element(by.css('.seach-results-container')); //TODO typo in the html
    this.persistentMessage = element(by.xpath('//div[@class="persistent-message ng-binding ng-scope"]'));
    this.inputFilterName = element(by.xpath('//md-input-container/input'));
    this.saveFilterForm = element(by.xpath("//form[@name = '$ctrl.form']"));
    this.vehicleContent = element(by.id("vehicle-list-table"));
    //this.chipFilter = element(by.css('[placeholder="Filter Results"] [type="search"]'));
    this.chipFilter = element.all(by.xpath("//input[@type='search']")).get(1);
    this.chipFilterMap = element.all(by.xpath("//input[@type='search']")).get(2);
    this.suggestionsSearchIcon = element(by.xpath("//md-icon[.='search']"));
    this.chipFilterCloseBtnArray = element.all(by.cssContainingText('[class="md-default-theme material-icons"]', 'close'));
    this.chipFilterCloseBtn = element(by.css('[ng-if="$mdChipsCtrl.isRemovable()"]'));
    this.allChips = element.all(by.className('md-chip-content'));
    this.chipFilterResults = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]')); //Stores the result of a search on the chip filter in an array.
    this.clearAllFiltersButton = element(by.css('[ng-click="$ctrl.clearChips()"]'));

    this.clickResultInTable = function (rowNumber, columnNumber) {
        element(by.xpath('//tbody/tr[' + rowNumber + ']/td[' + columnNumber + ']/span')).click();
    };

    this.checkRowInTable = function (rowNumber) {
        element(by.xpath("//tbody/tr[" + rowNumber + "]/td[1]/md-checkbox")).click();
    };
    //Pagination/High Density
    this.firstPageButton = element(by.css('[aria-label="First"]'));
    this.lastPageButton = element(by.css('[aria-label="Last"]'));
    this.nextPageButton = element(by.css('[md-svg-icon="navigate-next.svg"]'));
    this.previousPageButton = element(by.css('[md-svg-icon="navigate-before.svg"]'));
    this.totalNumber = element(by.xpath('//div/md-card//md-table-pagination/div[@class=\'buttons\']/div'));

    //Page Size//High Density
    ////////////////////Filters/search bars/////////////////////////////////
    this.densityToggleBtn = element(by.css('[ng-if="$ctrl.toolbarOptions.settingsButton"]'));
    this.pageSizeButton = element(by.css('[ng-model="$pagination.limit"]'));

    ///////////Rows per page only all list page/////////////
    this.pageTenButton = element.all(by.repeater('option in $pagination.limitOptions')).get(0);
    this.pageTwentyFiveButton = element.all(by.repeater('option in $pagination.limitOptions')).get(1);
    this.pageFiftyButton = element.all(by.repeater('option in $pagination.limitOptions')).get(2);
    this.globalRowsCount = element.all(by.css('[class="label ng-binding"]')).get(1);

    ///////////Rows per page only for Device list page/////////////
    this.pageSizeFiftyButton = element.all(by.repeater('option in $pagination.limitOptions')).get(0);
    this.pageSizeHundredButton = element.all(by.repeater('option in $pagination.limitOptions')).get(1);
    this.pageSizeOneFiftyButton = element.all(by.repeater('option in $pagination.limitOptions')).get(2);
    ///////Paccar Portal has not changed yet//////
    this.pageSizeFiveHundredButton = element.all(by.repeater('option in $pagination.limitOptions')).get(2);
    //Table on list pages "high density view"
    this.tableHeader = element.all(by.className('md-head')).get(0);
    this.tableHeaders = element.all(by.tagName('th'));
    this.sortingArrow = element(by.xpath('//th//md-icon'));
    this.allTableRows = element.all(by.repeater('row in $ctrl.rows'));
    this.rowsPerPageLabel = element.all(by.className('limit-select ng-scope')).last();
    this.rowsPerPage = element.all(by.xpath('//div[@class="label ng-binding"]')).last();
    this.maxResultsReachedMessage = element(by.xpath("//span[@translate = 'core.list.maximumReached']"));
    /////////Get Headers//////
    this.secondHeader = element.all(by.xpath('//h2')); // use getAttribute('innerHTML') to validate text
    this.thirdHeader = element.all(by.xpath('//h3'));
    this.fourthHeader = element.all(by.xpath('//h4'));
    this.subHeadder = element.all(by.xpath("//div[@class = 'md-subheader-content']"));

    ///////Get Card Content /////////////////
    this.cardContent = element.all(by.xpath('//md-card-content'));
    this.cardContentVehicleGroup = element.all(by.xpath('//thead/tr/th'));
    ///////Get Form Content /////////////////
    this.formContent = element.all(by.xpath('//form'));


    ///////////////////////Supportal Unique Commands/Variables->->/////////////////////////////////////////////////////////////////////////////////////


    //Client Data
    this.clientDataButton = element(by.partialButtonText('Client Data'));
    this.applicationsLink = element(by.partialLinkText('Applications'));
    this.dataExportLink = element(by.partialLinkText('Data Export'));
    this.dataimportLink = element(by.partialLinkText('Data Import'));

    //Data Subscriptions
    this.dataSubscriptionsButton = element(by.partialButtonText('Data Subscriptions'));
    this.organizationsLink = element(by.partialLinkText('Organizations'));
    this.subscribersLink = element(by.partialLinkText('Subscribers'));
    this.endpointsLink = element(by.partialLinkText('Endpoints'));

    //Device Management
    this.deviceManagementButton = element(by.partialButtonText('Device Management'));
    this.otapLink = element(by.partialLinkText('OTAP'));
    this.wifiLink = element(by.partialLinkText('Wi-Fi'));
    this.dataLoggerLink = element(by.partialLinkText('Data Logger'));

    this.fleetHealthButton = element(by.partialButtonText('Fleet Health'));

    //Kafka Consumers Link
    this.kafkaConsumersLink = element(by.partialLinkText('Kafka Consumers'));

    //Reports
    this.reportsButton = element(by.partialButtonText('Reports'));
    this.digitalCallHistoryLink = element(by.partialLinkText('Digital Call History'));
    this.eventsLink = element(by.partialLinkText('Events'));
    this.outboundMidsLink = element(by.partialLinkText('Outbound Mids'));
    this.pcgDeviceSoftwareVersionHistoryLink = element(by.partialLinkText('PCG Device Software Version History'));
    this.connectionHistoryReportLink = element(by.partialLinkText('Connection History Report'));
    this.pmgVersionsLink = element(by.partialLinkText('PMG Versions'));

    this.clickReportsButton = function () {
        this.reportsButton.click();
    };

    this.clickPMGVersionLink = function () {
        this.pmgVersionsLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/reports/device-pmg-versions/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickPcgDeviceSoftwareVersionHistoryLink = function () {
        this.pcgDeviceSoftwareVersionHistoryLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/reports/device-pcg-version-history/', 'Error: Got kicked out to dashboard page.');
    };

    //Reports Links
    this.clickDigitalCallHistoryLink = function () {
        this.digitalCallHistoryLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/digitalSession/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickEventsLink = function () {
        this.eventsLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/event/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickOutboundMidsLink = function () {
        this.outboundMidsLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/outbound-mids/list/', 'Error: Got kicked out to dashboard page.');
    };

    //Client Data Links
    this.clickApplicationsLink = function () {
        this.applicationsLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/application/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickDataExportLink = function () {
        this.dataExportLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/export/jobs', 'Error: Got kicked out to dashboard page.');
    };

    this.clickDataImportLink = function () {
        this.dataimportLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/import/jobs', 'Error: Got kicked out to dashboard page.');
    };

    this.clickOrganizationsLink = function () {
        this.organizationsLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/organization/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickSubscribersLink = function () {
        this.subscribersLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/dataSubscriber/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickEndpointsLink = function () {
        this.endpointsLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/endpoint/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickKafkaConsumbersLink = function () {
        this.kafkaConsumersLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/kafka-consumers', 'Error: Got kicked out to dashboard page.');
    };

    this.clickOTAPLink = function () {
        this.otapLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/otap/request/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickDataloggerLink = function () {
        this.dataLoggerLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/dataLogger/configurationManagement/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickWiFiLink = function () {
        this.wifiLink.click();
        expect(browser.getCurrentUrl()).toBe(envURL + '/#/nav/wifi/request', 'Error: Got kicked out to dashboard page.');
    };

    this.clickConnectionHistoryReportLink = function () {
        this.connectionHistoryReportLink.click();
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/reports/device-pcg-connection-history/', 'Error: Got kicked out to dashboard page.');
    };
    //////////////////Button Clicks///////////////////////
    this.clickDeviceManagementButton = function () {
        this.deviceManagementButton.click();
    };

    ///////////////////////<-<-Supportal Unique Variables/////////////////////////////////////////////////////////////////////////////////////

    this.get = function () {
        browser.get('/#/nav/welcome');
        browser.sleep(1000);
    };

    this.logOut = function () {
        var ec = protractor.ExpectedConditions;
        browser.wait(ec.elementToBeClickable(this.userMenuButton), 5000);
        this.userMenuButton.click();
        browser.wait(ec.elementToBeClickable(this.logoutBtn), 5000);
        this.logoutBtn.click();
        browser.executeScript('window.localStorage.clear();');
    };
    this.clickSubscriptionsLink = function () {
        this.subscriptionsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/subscription/list/', 'Error: Got kicked out to dashboard page.');
        // BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Subscriptions']);
    };

    this.clickOtaSubscriptionLink = function () {
        this.otaSubscriptionLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/otaSubscription/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'OTA Subscription']);
    };

    this.clickCustomersLink = function () {
        this.customersLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/customer/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Customers']);
    };

    this.clickDealersLink = function () {
        this.dealersLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/dealer/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Dealers']);
    };

    this.clickDashboardLink = function () {
        this.dashboardLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/dashboard', 'Error: Got kicked out to dashboard page.');
    };

    this.clickDashboardSupportalLink = function () {
        this.dashboardLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/support-dashboard/view', 'Error: Got kicked out to dashboard page.');
    };

    this.clickDealerOwnerGroupsLink = function () {
        this.dealerOwnerGroupsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/dealerOwnerGroup/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickManufacturersLink = function () {
        this.manufacturersLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/manufacturer/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Manufacturers']);

    };

    this.clickOEMsLink = function () {
        this.oemsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/oem/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'OEMs']);
    };

    this.clickPermissionsLink = function () {
        this.permissionsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/permission/list/', 'Error: Got kicked out to dashboard page.');
        this.validateBreadCrumbs(['Dashboard', 'Permissions']);
    };

    this.clickRolesLink = function () {
        this.rolesLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/role/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs
        this.validateBreadCrumbs(['Dashboard', 'Roles']);
    };

    this.clickUsersLink = function () {
        this.usersLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/user/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs
        this.validateBreadCrumbs(['Dashboard', 'Users']);
    };

    this.clickWifiUsersLink = function () {
        this.wifiUsersLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/wifiuser/list/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickVehiclesLink = function () {
        this.vehiclesLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/vehicle/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Vehicles']);
    };

    this.clickDataExportLink = function () {
        this.exportLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/export/jobs', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Export Data']);
    };

    this.clickDevicesLink = function () {
        this.devicesLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/device/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Devices']);
    };

    this.clickDeviceCollectionsLink = function () {
        this.deviceCollectionsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/deviceCollection/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Device Collections']);
    };

    this.clickNotificationsLink = function () {
        this.notificationsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/ttm-notification/list/', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Notification Logs']);
    };

    this.clickTopTenFaultsLink = function () {
        this.topTenFaultsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/topten', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Top 10 Faults']);
    };

    this.clickGoogleAnalyticsLink = function () {
        this.googleAnalyticsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/analytics/google', 'Error: Got kicked out to dashboard page.');
        //BreadCrumbs Validation
        this.validateBreadCrumbs(['Dashboard', 'Google Analytics Report']);
    };


    this.clickAnalyticsLink = function () {
        this.analyticsLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/analytics', 'Error: Got kicked out to dashboard page.');
    };

    this.clickRemoteDiagLink = function () {
        this.remoteDiagLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/remoteDiagnostics/deactivate/', 'Error: Got kicked out to dashboard page.');
    };


    this.clickUserMenu = function (portalType) {
        if (portalType === 'paccar') {
            this.userMenuButton.click();
            this.allUserMenuItems.count().then(function (count) {
                expect(count).toBeGreaterThan(2);
            });
        }
        else if (portalType === 'wifi') {
            this.userMenuButton.click();
            //TODO - Waiting on deployment of new portal core code
            // this.allUserMenuItems.count().then(function (count) {
            //     expect(count).toBe(3);
            // });
        }
        else if (portalType === 'developer') {
            this.userMenuButton.click();
            this.allUserMenuItems.count().then(function (count) {
                expect(count).toBeGreaterThan(0);
            });
        }
        else {
            expect(false).toBe(true, 'Invalid input parameter used');
        }
    };

    ///User Profile Links
    this.clickUserProfileLink = function () {
        this.allUserMenuItems.get(0).click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/user/edit/', 'Error: Got kicked out to dashboard page.');
    };

    this.clickChangeLogsLink = function () {
        this.allUserMenuItems.get(1).click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/changelogs', 'Error: Got kicked out to dashboard page.');
    };
    this.clickReleaseNotesLink = function () {
        this.allUserMenuItems.get(2).click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/releasenotes', 'Error: Got kicked out to dashboard page.');
    };

    this.clickPrivacyAndTermsLink = function () {
        this.allUserMenuItems.get(3).click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/legal', 'Error: Got kicked out to dashboard page.');
    };
    this.clickHelpLink = function () {
        this.allUserMenuItems.get(4).click();
        expect(browser.getCurrentUrl()).toContain(envURL + '/#/nav/help', 'Error: Got kicked out to dashboard page.');
    };

    this.goToDifferentPageAndComeBack = function () {
        this.clickUserMenu('paccar');
        this.clickHelpLink();
        this.clickUserMenu('paccar');
        this.clickUserProfileLink();
    };

    //Chip Filter
    this.chipFilterSendKeys = function (input) {
        this.chipFilter.sendKeys(input);
        this.chipFilter.sendKeys(protractor.Key.ENTER);
        browser.sleep(1000);
    };

    this.removeChipFilter = function () {
        this.chipFilterCloseBtn.click();
    };

    this.chipFilterSelectResultFromSuggestionsByContainText = function (inputText) {
        element(by.cssContainingText('[role="button"]', inputText)).click()
    };

    this.verifyChipFilter = function (chipFilter) {
        expect(element(by.cssContainingText('[class="chipText ng-binding"]', chipFilter)).isDisplayed()).toBe(true, 'The chip is not present.');
    };

    //Save and manage saved filters
    this.saveNewCustomFilter = function (filterName) {
        this.typeInSearchFilter(filterName);
        this.manageSearchFilterButton.click();
        this.saveNewFilter.click();
        this.inputFilterName.sendKeys(filterName);
        this.saveDialogButton.click();
    };

    // Global Search Bar
    this.globalSearchSendKeys = function (input) {
        this.globalSearchBar.clear();
        this.globalSearchBar.sendKeys(input);
        this.globalSearchBar.sendKeys(protractor.Key.ENTER);
    };


    this.clickThisGlobalSearchResult = function (stringSearch, stringType, index) {
        var newIndex = index || 0; //device collections appeared in global search result
        var _this1 = this;
        this.globalSearchBar.clear();
        this.globalSearchBar.sendKeys(stringSearch);
        this.globalSearchBar.sendKeys(protractor.Key.ENTER);
        //browser.sleep(10000);
        browser.getCurrentUrl().then(function (text) {
            if (text.indexOf('nav/search') >= 0) {
                _this1.globalSearchResultList.filter(function (row) {
                    // index 2 for user names
                    return row.getText().then(function (name) {
                        //console.log(name);
                        return name.indexOf(stringType) >= 0;
                    });
                }).then(function (filteredRows) {
                    if (filteredRows.length < 1) {
                        expect(false).toBe(true, 'Did not find a search item with these parameters');
                    } else {
                        filteredRows[newIndex].click();
                    }
                });
            } else {
                expect(text)
                    .toContain(envURL + '/#/nav/' + stringType.toLowerCase(), 'Error: Got kicked out to dashboard page.');
            }
        });
    };

    /*
    * Note: Use this search method to validate the search item shows up on the top of the search result.
    */
    this.clickGlobalSearchResultSuggestions = function (stringSearch, entity) {
        this.globalSearchBar.clear();
        this.globalSearchBar.sendKeys(stringSearch);
        this.chipFilterResults.get(1).click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/' + entity + '/details', 'Error: Got kicked out to dashboard page.');
    };

    this.globalSearchResultNotFound = function (searchString) {
        this.globalSearchBar.clear();
        this.globalSearchBar.sendKeys(searchString);
        this.globalSearchBar.sendKeys(protractor.Key.ENTER);
        expect(this.noResult.isDisplayed()).toBe(true, searchString + ' is visible.');
        expect(browser.getCurrentUrl())
            .toBe(envURL + '/#/nav/search/' + searchString, 'Error: Got kicked out to dashboard page.');
    };

    this.verifyGlobalSearchResult = function (searchString, bool) {
        this.globalSearchBar.clear();
        this.globalSearchBar.sendKeys(searchString);
        this.waitTillElementToBeClickable(this.allFilterResults.first());
        return this.allFilterResults.filter(function (rows) {
            return rows.getText().then(function (text) {
                //console.log(text);
                return text === searchString;
            });
        }).then(function (filteredRow) {
            if (bool === true) {
                expect(filteredRow.length).not.toBe(0, 'The search text is not listed on the results.');
            } else {
                expect(filteredRow.length).toBe(0, 'The search text is listed ont the results.');
            }
        });
    };


    //Page Density
    this.togglePageDensity = function (type) {
        this.densityToggleBtn.click();
        element(by.partialButtonText(type)).click();
    };

    this.typeInSearchFilter = function (input) {
        this.chipFilter.sendKeys(input);
        this.chipFilter.sendKeys(protractor.Key.ENTER);
    };


    this.typeInSearchFilterRecommendation = function (input) {
        this.chipFilter.sendKeys(input);
        this.waitTillElementToBeClickable(this.chipFilterResults.first())
        this.chipFilterResults.get(1).click();
    };

    this.typeInSearchFilterDevice = function (input) {
        this.chipFilter.sendKeys(input);
        browser.sleep(1000);
        this.chipFilterResults.get(1).click();
    };

    this.validateBreadCrumbs = function (arrayBreadCrumbs) {
        this.breadCrumbs.isDisplayed().then(function (bool) {
            if (bool === true) {
                for (var i = 0; i < arrayBreadCrumbs.length; i++) {
                    expect(element(by.css('[states="$ctrl.breadcrumbStates"]')).$$('li').get(i).getText()).toContain(arrayBreadCrumbs[i]);

                }
            }
        });
    };
    //Check page count for any table with pagination
    this.checkForPageCount = function (expectedCount) {
        this.allTableRows.count().then(function (count) {
            expect(count).toBeLessThanOrEqual(expectedCount);
        });
    };

    this.dataExport = function (entity) {
        if (entity === 'dealers') {
            this.clickDealersLink();
        } else if (entity === 'customers') {
            this.clickCustomersLink();
        } else if (entity === 'users') {
            this.clickUsersLink();
        } else {
            this.clickVehiclesLink();
        }
        this.moreOptionsButton.click();
        this.exportButton.click();
        expect(this.checkForToastAlert(entity)).toBe(true);
    };

    this.checkForToastAlert = function (entity) {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of ' + entity + ' succeeded.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        } else if (this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('Export of ' + entity + ' failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

    this.getUrl = function (entity, searchParam) {
        browser.getCurrentUrl().then(function (url) {
            var newUrl = url.slice(0, -9);
            browser.get(newUrl + entity + "/list/?q=" + searchParam);
        });
    };

    this.validateTotalNumber = function (prevNum) {
        this.totalNumber.getText().then(function (afterNum) {
            prevNum.then(function (num) {
                expect(afterNum).toBe(num, 'The total number of Customers changed.');
            });
        });
    };


    this.waitTillElementToBeClickable = function (element) {
        var ec = protractor.ExpectedConditions;
        browser.wait(ec.elementToBeClickable(element), 10000);
    };

    this.waitTillElementToBeVisible = function (element) {
        var ec = protractor.ExpectedConditions;
        return browser.wait(ec.visibilityOf(element), 5000);
    };

    this.waitTillElementToDisappear = function (element) {
        var ec = protractor.ExpectedConditions;
        browser.wait(ec.presenceOf(element), 5000);
    };


    this.verifyToolTipText = function (text) {
        var toolTip = element(by.cssContainingText('[role="tooltip"]', text));
        expect(toolTip.isDisplayed()).toBe(true, 'The tooltip for ' + text + ' is missing');
    };

    this.moveMouseToAndVerifyTooltip = function (element, toolTipText) {
        browser.actions().mouseMove(element).perform();
        this.verifyToolTipText(toolTipText);
    };

    this.clickManageSearchFilterOption = function () {
        this.manageSearchFilterButton.click();
        this.waitTillElementToBeClickable(this.manageSearchFilter);
        this.manageSearchFilter.click();

    };

    this.clickSaveSearchFilterOption = function () {
        this.manageSearchFilterButton.click();
        this.waitTillElementToBeClickable(this.saveSearchFilter);
        this.saveSearchFilter.click();
    };

    this.selectChipFilterByText = function (valueName) {
        element.all(by.cssContainingText('[class="md-button md-default-theme md-ink-ripple"]', valueName)).last().click();
    };

    this.applyChipFilter = (filerType, text, suggestionNumber, dashboardSecondChipFilterFlag) => {
        var chipSelector
        var chipFilterSelector
        if (dashboardSecondChipFilterFlag) {
            chipSelector = this.chipFilterDropDownButtonMap
            chipFilterSelector = this.chipFilterMap
        } else {
            chipSelector = this.chipFilterDropDownButton
            chipFilterSelector = this.chipFilter
        }
        chipSelector.click();
        this.waitTillElementToBeClickable(this.chipFilterDropDown.get(0));
        this.selectChipFilterByText(filerType);
        return chipFilterSelector.sendKeys(text)
            .then(() => {
                return  this.suggestionsSearchIcon.isPresent()
            })
            .then(result => {
                if (!result) {
                     suggestionNumber--
                }
                return this.chipFilterSuggestionDropDown.get(suggestionNumber).click()
            });
    };

    this.getTextFromSuggestionDropDown = function (filerType, text, suggestionNumber) {
        var _this1 = this;
        var textFromSuggestion;
        this.chipFilterDropDownButton.click();
        this.waitTillElementToBeClickable(this.chipFilterDropDown.get(0));
        this.selectChipFilterByText(filerType);
        return this.chipFilter.sendKeys(text).then(function () {
            return _this1.suggestionsSearchIcon.isPresent().then(function (result) {
                if (!result) {
                    suggestionNumber = suggestionNumber - 1
                }
                textFromSuggestion = _this1.chipFilterSuggestionDropDown.get(suggestionNumber).getText();
                _this1.chipFilter.sendKeys(protractor.Key.ESCAPE);
                return textFromSuggestion;
            });
        })
    };

    this.applyChipFilterIfSuggestionExist = function (filerType, text, suggestionNumber) {
        var _this1 = this;
        this.chipFilterDropDownButton.click();
        this.waitTillElementToBeClickable(this.chipFilterDropDown.get(0));
        this.selectChipFilterByText(filerType);
        return this.chipFilter.sendKeys(text).then(function () {
            return _this1.suggestionsSearchIcon.isPresent().then(function (result) {
                if (!result) {
                    suggestionNumber = suggestionNumber - 1
                }
                return _this1.chipFilterSuggestionDropDown.first().isPresent().then(function (isPresent) {
                    if (isPresent) {
                        _this1.chipFilterSuggestionDropDown.get(suggestionNumber).click();
                        return true
                    } else
                        return false
                });
            });
        })
    };

    this.getRowsPerPageNumber = function () {
        return this.rowsPerPage.getText().then(function (text) {
            return parseInt(text.substring(10));
        })
    };
};

module.exports = new navigation();
