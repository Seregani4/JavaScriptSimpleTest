/**
 * Created by pshrestha on 6/12/2017.
 */

describe("Validate email format check when adding a User -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var peoplenetAdmin = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var userPassword = 'testPassword1';

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    var invalidEmailArray = ['deleteMe', 'deleteMe@', 'deleteMe@c', 'deleteMe@c.com', 'deleteMe@co.u'];
    var validEmailArray = ['deleteMe@goof.co', 'deleteMe@go.pro', 'deleteMe+12@coolIt.ok', 'deleteMe11+23@justDoIt.go', '112552@justNum.add'];

    //PVP-178
    it("Paccar admin adds a user with invalid email", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.fillOutPartialUserForm(userPassword);
        //select the Org Type, Name and Role
        usersPage.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.oem);
        usersPage.selectOrgRoleDropdownItem(browser.params.roleslabels.paccaradmin);
        //filter through different invalid emails
        invalidEmailArray.forEach((eachEmail) => {
            usersPage.emailField.clear();
            usersPage.emailField.sendKeys(eachEmail);
            usersPage.saveBtn.click();
            if (eachEmail === 'deleteMe') {
                expect(usersPage.invalidEmailAlert.isDisplayed()).toBe(true, 'The invalid email message did not show up.');
            }
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', 'The User got added with invalid email.');
        });
    });

    //Add a test for a valid email user and delete it.
    it("Paccar admin adds a user with valid email", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.fillOutPartialUserForm(userPassword);
        //filter through different invalid emails
        validEmailArray.forEach((eachEmail) => {
            usersPage.emailField.clear();
            usersPage.emailField.sendKeys(eachEmail);
            browser.sleep(1000);
            usersPage.firstNameField.click();
            expect(usersPage.invalidEmailAlert.isPresent()).toBe(false, 'The invalid email message showed up.');
        });
    });

//PVP-3806 + updated according to PVP-3999, PVP-4305
    it("Validate Existing Email Address Warning displayed", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        validationUtil.validateEmailWarningMessage('paccaradmin-automation+300@test.com', false);
        browser.refresh();
        validationUtil.validateEmailWarningMessage('newuser@test-.com', true, 'That is not a valid email. Please input a valid email.');
        browser.refresh();
        validationUtil.validateEmailWarningMessage(peoplenetAdmin, true, 'Email address already in use');
        browser.refresh();
        validationUtil.validateEmailWarningMessage('asdf1234', true, 'That is not a valid email. Please input a valid email.');
        browser.refresh();
        validationUtil.validateEmailWarningMessage('paccaradmin-automation+300@q.com', false);
    });
});
