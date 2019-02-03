var AdminLoginPage = function() {

    this.user = element(by.name('email'));
    this.password = element(by.name('password'));
    this.submitBtn = element(by.css('[ng-click="login()"]'));
    this.errorMessage = element(by.css('[ng-show="loginCtrl.loginErrorMessage"]'));
    this.equalityErrorMsg = element(by.cssContainingText('[ng-show="ctrl.flash"]', 'Passwords do not match'));
    this.validityErrorMsg = element(by.cssContainingText('[ng-show="ctrl.flash"]', 'Password should meet at least 3 of these requirements: Contain uppercase letters, lowercase letters, numbers, or symbols.'));

    this.get = function() {
        browser.get('http://admin-portal-qa.connectedfleet.io/#/login');
        browser.sleep(1000);
    }

};

module.exports = new AdminLoginPage();
