var ActivationPage = function() {

    this.password = element.all(by.model('ctrl.user.password'));
    this.cnfPassword = element(by.model('ctrl.confirmpassword'));
    this.cancelBtn = element(by.buttonText('Cancel'));
    this.activateBtn = element(by.buttonText('Activate Account'));

};

module.exports = new ActivationPage();