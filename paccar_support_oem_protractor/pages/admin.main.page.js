var AdminMainPage = function() {

    this.userMenuButton = element.all(by.css('.dropdown-toggle')).get(1); // user menu dropdown
    this.notifMenuButton = element.all(by.css('.dropdown-toggle')).get(0); // notification menu dropdown
    this.userNameLabel = element(by.css('.shrink-menu-right-label.ng-binding'));
    this.logoutBtn = element(by.css('[ng-click="logout()"]'));
    this.userProfileBtn = element(by.partialLinkText('User Profile'));
    this.changePasswordBtn = element(by.partialLinkText('Change Password'));

    // Links
    this.emailLogsLink = element.all(by.linkText('Email Logs'));

    // Alert popups
    this.mainAlertMsg = element(by.css('[ng-hide="flashAlert.flash.cleared"]'));


    this.get = function() {
        browser.get('/#/nav/welcome');
        browser.sleep(1000);
    }
}

module.exports = new AdminMainPage();
