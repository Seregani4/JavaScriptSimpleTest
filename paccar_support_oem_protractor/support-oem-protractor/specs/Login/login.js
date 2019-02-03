/**
 * Created by Cottomoeller on 6/6/2016.
 */

describe('Verify Login and Logout is functional ----- ',function(){
    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();
    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Login and Logout as a PeopleNet Admin', function(){
        loginPage.get();
        loginPage.login('supportal',peoplenetAdminEmail,password);
        navigation.logOut();
    });

    //it('Login and Logout as a Dealer Admin', function(){
    //    loginPage.get();
    //    loginPage.login('supportal',dealerAdminEmail,password);
    //    navigation.logOut();
    //});
    //
    //it('Login and Logout as a Dealer User', function(){
    //    loginPage.get();
    //    loginPage.login('supportal',dealerUserEmail,password);
    //    navigation.logOut();
    //});
    //
    //it('Login and Logout as a Customer Admin', function(){
    //    loginPage.get();
    //    loginPage.login('supportal',customerAdminEmail,password);
    //    navigation.logOut();
    //});
    //it('Login and Logout as a Customer User', function(){
    //    loginPage.get();
    //    loginPage.login('supportal',customerUserEmail,password);
    //    navigation.logOut();
    //});



});
