/**
 * Created by Cottomoeller on 3/4/2016.
 */

describe("Peoplenet Admin edits Customer Admin ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var addUserEmail = '000supportalPA@test.com';
    var editUserFirstName = browser.params.edituser.firstname;
    var editUserLastName = browser.params.edituser.lastname;
    var editUserPhoneNumber = browser.params.edituser.formattedphone;
    var password = browser.params.adduser.password;
    var environmentURL = browser.params.environment.url;

    browser.driver.manage().window().maximize();

    beforeEach(function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.fleetHealthButton.click();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
    });

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

     it("As a Peoplenet Admin, I edit a Paccar Admin", function() {
        usersPage.clickUserCheckbox(addUserEmail);
        //usersPage.clickEditBtn('high', addUserEmail);
        navigation.editActionButton.click();
        usersPage.editFirstName(editUserFirstName);
        usersPage.editLastName(editUserLastName);
        usersPage.editPhoneNumber(editUserPhoneNumber);
        usersPage.saveBtn.click();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyFullName(addUserEmail, editUserFirstName, editUserLastName);
        usersPage.verifyPhoneNumber( addUserEmail, editUserPhoneNumber);
        usersPage.verifyActiveStatus( addUserEmail, 'Active');
    });

    it("Change user status from active to inactive",function(){
        usersPage.clickUserCheckbox(addUserEmail);
       navigation.editActionButton.click();
        usersPage.uncheckStatusCheckbox();
        usersPage.saveBtn.click();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyActiveStatus(addUserEmail, 'Inactive');
    });

    it("Change user status from inactive to active", function(){
        usersPage.clickUserCheckbox(addUserEmail);
        navigation.editActionButton.click();
        usersPage.checkStatusCheckbox();
        usersPage.saveBtn.click();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyActiveStatus(addUserEmail, 'Active');
    });

    it("As a Peoplenet Admin, I  undo edited info of Paccar Admin", function() {
        usersPage.clickUserCheckbox(addUserEmail);
        //usersPage.clickEditBtn('high', addUserEmail);
        navigation.editActionButton.click();
        usersPage.editFirstName('AutomationUser');
        usersPage.editLastName('PleaseDoNotEdit');
        usersPage.editPhoneNumber('1234567890');
        usersPage.saveBtn.click();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyPhoneNumber( addUserEmail, '(123) 456-7890');
        usersPage.verifyActiveStatus( addUserEmail, 'Active');
    });


});