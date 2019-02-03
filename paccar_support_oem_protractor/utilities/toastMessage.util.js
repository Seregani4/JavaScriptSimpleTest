/**
 *
 * Created by pshrestha on 8/25/2017.
 */

//TODO: Needs to be implemented throughout the portal for accurate results.
var toastMessageUtil = function(){

    this.toastAlert = element(by.css('[role="alert"]'));

    var incorrectPasswordToast = 'The username or password you entered is not correct. Please try again.';
    var accountLockedToast = 'Your account is locked. Please contact the administrator.';
    var locationUpdatedToast = 'Locations updated.';
    var updateEmailErrorToast = 'Error while changing email.';
    var updateEmailSuccessToast = 'Your email has been updated.';
    var faultLogErrorMessage = 'Error retrieving Fault Log.';

    this.incorrectPasswordMessage  = function () {
        return incorrectPasswordToast;
    };

    this.accountLockedMessage = function () {
        return accountLockedToast;
    };

    this.locationUpdatedMessage = function () {
        return locationUpdatedToast;
    };

    this.updateEmailErrorMessage = function () {
        return updateEmailErrorToast;
    };

    this.updateEmailSuccessMessage = function () {
        return updateEmailSuccessToast;
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

    this.checkForToastAlert = function(){
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(this.toastAlert.getText()).toContain('The username or password you entered is not correct. Please try again.');
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
    };

    this.verifyAccountLockedToastAlert = function(){
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(this.toastAlert.getText()).toContain('Your account is locked. Please contact the administrator.');
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
    };

    this.failedLogin = function(email, password) {
        this.user.clear();
        this.password.clear();
        this.user.sendKeys(email);
        this.password.sendKeys(password);
        this.submitBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/login','This User: '+email+' was able to login successfully');
    };

    //can be used to validate toast messages
    this.verifyToastAlert = function(message){
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        expect(this.toastAlert.getText()).toContain(message);
        browser.sleep(1000);
        browser.ignoreSynchronization = false;
    };

};

module.exports = new toastMessageUtil();