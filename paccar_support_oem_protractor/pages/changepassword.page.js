var ChangePasswordPage = function() {

    this.existingPassword = element(by.model('ctrl.user.currentPassword'));
    this.newPassword = element(by.model('ctrl.user.newPassword'));
    this.newPasswordConfirm = element(by.model('ctrl.user.newPasswordConfirm'));
    this.cancelBtn = element(by.buttonText('Cancel'));
    this.saveBtn = element(by.buttonText('Save'));

    // Validation alerts
    this.incorrectPwdMsg = element(by.cssContainingText('.error-block', ' Password is incorrect.'));
    this.invalidPwdMsg = element(by.cssContainingText('.error-block', ' Password should meet at least 3 of these requirements: Contain uppercase letters, lowercase letters, numbers, or symbols.'));
    this.unequalPwdMsg = element(by.cssContainingText('.alert-danger', 'Password and Confirm Password fields are not equal.'));
};

module.exports = new ChangePasswordPage();
