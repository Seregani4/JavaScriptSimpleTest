var PortalMainPage = function() {

    //User Menu
    this.userMenuButton = element(by.id('user-profile-menu-arrow-icon')); // user menu dropdown
    this.notifMenuButton = element.all(by.css('.dropdown-toggle')).get(0); // notification menu dropdown
    this.userNameLabel = element(by.id('user-profile-menu-name'))//.element(by.css('.ng-binding.ng-scope'));
    this.logoutBtn = element(by.css('[href="#/logout"]'));
    this.userProfileBtn = element(by.repeater('item in nav.userMenuItems').row(0));
    this.changePasswordBtn = element(by.partialLinkText('Change Password'));

    // Filters/search bars
    this.globalSearchBar = element.all(by.css('$mdAutocompleteCtrl.scope.searchText')).get(0);
    this.allFilterResults = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    this.clearGroupFilter = element(by.css('[ng-click="universalFilterCtrl.clearGroup()"]'));

    //Dashboard Link
    this.dashboardLink = element(by.css('[ng-href="#/nav/fleet-health-map"]'));

    //Device Management Links
    this.deviceManagementButton = element(by.partialButtonText('Device Management'));
    //this.devicesLink = element(by.partialLinkText('Devices'));
    this.notificationsLink = element(by.partialLinkText('Notifications'));
    this.otapLink = element(by.partialLinkText('OTAP'));
    this.wifiLink = element(by.partialLinkText('Wi-Fi'));
    //
    //Client Data Links
    this.clientDataButton = element(by.partialButtonText('Client Data'));
    this.applicationsLink = element(by.partialLinkText('Applications'));
    this.dataimportLink = element(by.partialLinkText('Data Import'));
    this.editToolLink = element(by.partialLinkText('Edit Tool'));

    //Reports Links
    this.reportsButton = element(by.partialButtonText('Reports'));
    this.digitalCallHistoryLink = element(by.partialLinkText('Digital Call History'));
    this.eventsLink = element(by.partialLinkText('Events'));
    this.outboundMidsLink = element(by.partialLinkText('Outbound Mids'));
    this.pmgVersionsLink = element(by.partialLinkText('PMG Versions'));

    ////Fleet Health Links
    this.customersLink = element(by.partialLinkText('Customers'));
    this.dealersLink = element(by.partialLinkText('Dealers'));
    this.fleetHealthMapLink = element(by.partialLinkText('Fleet Health Map'));
    this.manufacturersLink = element(by.partialLinkText('Manufacturers'));
    this.oemLink = element(by.partialLinkText('OEMs'));
    this.permissionsLink = element(by.partialLinkText('Permissions'));
    this.rolesLink = element(by.partialLinkText('Roles'));
    this.usersLink = element(by.partialLinkText('Users'));
    this.vehiclesLink = element(by.partialLinkText('Vehicles'));

    this.dealerPopup = element(by.css('[ng-show="popupDealer"]'));

    // Alert popups
    this.mainAlertMsg = element(by.css('[ng-class="{\'md-capsule\': toast.capsule}"]'));

    this.get = function() {
        browser.get('/#/nav/welcome');
        browser.sleep(1000);
    };


};

module.exports = new PortalMainPage();
