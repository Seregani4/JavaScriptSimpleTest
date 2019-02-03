var PortalLoginPage;
PortalLoginPage = function () {

    //date time variables
    var moment = require('moment');
    var errorUtil = require('../utilities/toastMessage.util.js');

    this.emailLabel = element(by.css("[translate=\"login.common.email_address\"]"));
    this.passwordLabel = element(by.css("[translate=\"login.common.password\"]"));
    this.user = element(by.name('email'));
    this.password = element(by.name('password'));
    this.submitBtn = element(by.css('[type="submit"]'));
    //this.cancelBtn = element(by.cssContainingText('[class="md-cancel md-button md-ink-ripple"]', 'cancel'));
    this.cancelBtn = element(by.css('[href="#/login"]'));
    this.forgotPassWordButton = element(by.css('[href="#/forgotpassword"]'));
    this.sendEmailButton = element(by.css('[type="submit"]'));
    this.toastAlert = element(by.css('[role="alert"]'));

    //Change Password Page
    this.changePasswordButton = element(by.css('[href="#/forgotpassword"]'));
    this.resetMsg = element(by.css("[translate=\"login.reset.initiate_title\"]"));
    this.emailRequired = element(by.css("[for=\"$ctrl.form.email.$error\"]"));
    this.emailButton = element(by.css('[type="submit"]'));

    //Forgot Password
    this.emailField = element(by.xpath('//input[@type="email"]'));
    this.confirmPassword = $('[ng-model="$ctrl.confirmPassword');
    this.resetBtn = element(by.xpath('//button'));

    this.get = function () {
        browser.get('/#/login');
       return expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/login', 'Login page did not load on '
            + moment().format('MMMM D, YYYY h:mm:ss a'));
    };

    this.login = function (portalType, email, password) {
        var _this1 = this;
        var errMsg = 'Was unable to login with this User: ' + email + ' on '
            + moment().format('MMMM D, YYYY h:mm:ss a');
        this.user.sendKeys(email);
        this.password.sendKeys(password);
        this.submitBtn.click();
        if (portalType === 'paccar') {
            this.checkToastDoesNotAppear();
            browser.getCurrentUrl().then(function (value) {
                if (value === browser.params.environment.url + '/#/login') {
                    expect(_this1.submitBtn.isDisplayed()).toBe(true);
                    _this1.submitBtn.click();
                    _this1.checkToastDoesNotAppear();
                    errMsg += ' even after a second click.'
                }
                browser.sleep(2000);
                expect(browser.getCurrentUrl()).toBe(browser.params.environment.url +
                    '/#/nav/dashboard', errMsg);
            });
        }
        else if (portalType === 'supportal') {
            this.checkToastDoesNotAppear();
            browser.getCurrentUrl().then(function (value) {
                if (value === browser.params.environment.url + '/#/login') {
                    expect(_this1.submitBtn.isDisplayed()).toBe(true);
                    _this1.submitBtn.click();
                    _this1.checkToastDoesNotAppear();
                    errMsg += ' even after a second click.'
                }
                expect(browser.getCurrentUrl()).toBe(browser.params.environment.url +
                    '/#/nav/support-dashboard/view', errMsg);
            });
        }
        else if (portalType === 'wifi') {
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url +
                '/#/nav/wifiuser/list/', 'Was unable to login with this User: ' + email + ' on '
                + moment().format('MMMM D, YYYY h:mm:ss a'));
        }
        else if (portalType === 'elogs') {
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/hoursOfService/list');
        }
        else if (portalType === 'developer') {
            browser.sleep('2000');
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/welcome');
        }
        else if (portalType === 'connected fleet') {
            browser.sleep('2000');
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/fleetOverview');
        }
        else {
            expect(false).toBe(true, 'Invalid input parameter');
        }
    };

    this.checkForToastAlert = function () {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(this.toastAlert.getText()).toContain('The username or password you entered is not correct. Please try again.');
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
    };

    this.verifyAccountLockedToastAlert = function () {
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(this.toastAlert.getText()).toContain('Your account is locked. Please contact the administrator.');
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
    };

    this.failedLogin = function (email, password) {
        this.user.clear();
        this.password.clear();
        this.user.sendKeys(email);
        this.password.sendKeys(password);
        this.submitBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/login', 'This User: ' + email + ' was able to login successfully');
    };

    this.fillCredential = function (email, password) {
        this.user.clear();
        this.password.clear();
        this.user.sendKeys(email);
        this.password.sendKeys(password);
        this.submitBtn.click();
    };

    this.checkToastDoesNotAppear = function () {
        var _this1 = this;
        browser.sleep(500);
        browser.ignoreSynchronization = true;
        this.toastAlert.isPresent().then(function (present) {
            if (present) {
                browser.ignoreSynchronization = true;
                expect(_this1.toastAlert.getText()).toBe('<--was the error message');
            }
        });
        browser.ignoreSynchronization = false;
    };

    this.loginToSupportalFromPaccar = function (login, password) {
        browser.driver.get(browser.params.environment.supportalUrl + "/#/login");
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.supportalUrl + "/#/login");
        this.user.sendKeys(login);
        this.password.sendKeys(password);
        this.submitBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.supportalUrl +
            '/#/nav/support-dashboard/view');
    }
};

module.exports = new PortalLoginPage();
