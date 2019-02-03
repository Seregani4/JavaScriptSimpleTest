/**
 * Created by Cottomoeller on 4/21/2016.
 */

describe('Logging into the portal ------ ', function(){

    var loginPage = require('../../../pages/login.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('As a Peoplenet Admin', function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password)
    });

    it('As a Paccar Admin', function(){
        loginPage.get();
        loginPage.failedLogin('supportal', paccarAdminEmail, password)
    });

    it('As a Paccar User', function(){
        loginPage.get();
        loginPage.failedLogin('supportal', paccarUserEmail, password)
    });

    it('As a Dealer Admin', function(){
        loginPage.get();
        loginPage.failedLogin('supportal', dealerAdminEmail, password)
    });

    it('As a Dealer User', function(){
        loginPage.get();
        loginPage.failedLogin('supportal', dealerUserEmail, password)
    });

    it('As a Customer Admin', function(){
        loginPage.get();
        loginPage.failedLogin('supportal', customerAdminEmail, password)
    });

    it('As a Customer User', function(){
        loginPage.get();
        loginPage.failedLogin('supportal', customerUserEmail, password)
    });

    // it('Login with An Incorrect Password and Validate Alert Appears', function(){
    //     loginPage.get();
    //     browser.refresh();
    //     loginPage.user.sendKeys(peoplenetAdminEmail);
    //     loginPage.password.sendKeys(password+password);
    //     loginPage.submitBtn.click();
    //     var displayed = loginPage.wrongPassworderrorMessageAlert;
    //     //displayed.click();
    //     expect(displayed.getText()).toBe('OK');
    //     expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/login');
    // });
});