describe('Validate translation on Remote Diagnostics page -----> ', function () {
    
    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var kenMexUtil = require('../../../utilities/kenMex.util');
    var translation = require('../../../json/kenmex');
    var spanishSuperAdmin = browser.params.testuseremails.kenmexsuperadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-901 Validate text from remote diagnostics page on deactivate and reactivate tab', () => {
        loginPage.login('paccar', spanishSuperAdmin, password);
        navigation.remoteDiagLink.click();
        kenMexUtil.validateRemoteDiagnosticsPage(translation);
    });
});