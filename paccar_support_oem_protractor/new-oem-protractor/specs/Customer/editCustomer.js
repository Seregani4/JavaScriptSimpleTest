/**
 * Created by tbui on 2/26/2016.
 */
/**
 * Edited by Pshrestha on 8/10/2017
 * */

describe("Edit a new Customer -----> ", () => {
    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var customersPage = require('../../../pages/customers.page');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var customerUtility = require('../../../utilities/customer.util');
    var toastMessage = require('../../../utilities/toastMessage.util');
    var customerUtil = require('../../../utilities/customer.util');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var password = browser.params.adduser.password;
    var testCustomer = browser.params.testcustomer1.name;
    var testCustomer2 = browser.params.testcustomer3.name;
    var testVin = browser.params.vehicle.vin4;
    var testVin2 = browser.params.vehicle.vin7;

    var randomInt = Math.floor(Math.random() * 999999 + 1000000);
    console.log(randomInt)

    var editCustomer = {};
    editCustomer.name = browser.params.editcustomer.name + randomInt;
    editCustomer.streetAddress = browser.params.editcustomer.address1;
    editCustomer.streetAddress2 = browser.params.editcustomer.address2;
    editCustomer.city = browser.params.editcustomer.city;
    editCustomer.state = browser.params.editcustomer.state;
    editCustomer.zipcode = browser.params.editcustomer.zip;
    editCustomer.country = browser.params.editcustomer.country;
    editCustomer.phone = browser.params.editcustomer.phone;
    editCustomer.phoneNickName = browser.params.editcustomer.phoneNickName;
    editCustomer.fax = browser.params.editcustomer.fax;
    editCustomer.faxNickName = browser.params.editcustomer.faxNickName;
    editCustomer.email = browser.params.editcustomer.email;
    editCustomer.cityStateZip = browser.params.editcustomer.city + ', ' + browser.params.editcustomer.state + ' ' + browser.params.editcustomer.zip;
    editCustomer.formattedTelephone = browser.params.editcustomer.formattedphone;
    editCustomer.formattedFax = browser.params.editcustomer.formattedfax;

    var addCustomer = {};
    addCustomer.name = "";
    addCustomer.streetAddress = browser.params.addcustomer.address1;
    addCustomer.streetAddress2 = browser.params.addcustomer.address2;
    addCustomer.city = browser.params.addcustomer.city;
    addCustomer.state = browser.params.addcustomer.state;
    addCustomer.zipcode = browser.params.addcustomer.zip;
    addCustomer.country = browser.params.addcustomer.country;
    addCustomer.phone = browser.params.addcustomer.phone;
    addCustomer.phoneNickName = browser.params.addcustomer.phoneNickName;
    addCustomer.fax = browser.params.addcustomer.fax;
    addCustomer.faxNickName = browser.params.addcustomer.faxNickName;
    addCustomer.email = browser.params.addcustomer.email;
    addCustomer.cityStateZip = browser.params.addcustomer.city + ', ' + browser.params.addcustomer.state + ' ' + browser.params.addcustomer.zip;
    addCustomer.formattedTelephone = browser.params.addcustomer.formattedphone;
    addCustomer.formattedFax = browser.params.addcustomer.formattedfax;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();')
    });

    it("Adding Customer", () => {
        return customersPage.addNewCustomerEndpoint(paccarAdminEmail, 'join all')
            .then((name) => {
                addCustomer.name = name
            })
            .then(() => {
                loginPage.get();
                loginPage.login('paccar', paccarAdminEmail, password);
                //Validates the customer has been added successfully.
                customerUtility.goToCustomerDetails(addCustomer.name, paccarAdminEmail);
            })

    });

    var canEditUsers = [paccarAdminEmail];
    canEditUsers.forEach((eachUser) => {
        it(eachUser + " can edit a customer", () => {
            //edit the customer and verify
            return customersPage.editCustomerEndpoint(eachUser, addCustomer.name, editCustomer)
                .then(() => {
                    loginPage.get();
                    loginPage.login('paccar', eachUser, password);
                    navigation.clickCustomersLink();
                    navigation.typeInSearchFilter(editCustomer.name);
                    customersPage.clickCustomerHyperlinkCellSearch(editCustomer.name);
                    customerUtility.verifyCustomerInfo(
                        editCustomer.streetAddress,
                        editCustomer.streetAddress2,
                        editCustomer.cityStateZip,
                        editCustomer.formattedTelephone,
                        editCustomer.formattedFax,
                        editCustomer.email
                    );
                })
        });

        it(eachUser + " can edit a customer back to default", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            //Change the info back and verify
            customersPage.editCustomerEndpoint(eachUser, editCustomer.name, addCustomer);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(addCustomer.name);
            customersPage.clickCustomerHyperlinkCellSearch(addCustomer.name);
            customerUtility.verifyCustomerInfo(
                addCustomer.streetAddress,
                addCustomer.streetAddress2,
                addCustomer.cityStateZip,
                addCustomer.formattedTelephone,
                addCustomer.formattedFax,
                addCustomer.email
            );
        });
    });

    var cannotEditUsers = [dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin];
    cannotEditUsers.forEach((eachUser) => {
        it(eachUser + " cannot edit a customer with only join all selected.", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            customerUtility.cannotEdit(addCustomer.name);
        });
    });

    it('Delete Customer', () => {
        loginPage.get();
        customersPage.deleteCustomerEndpoint(paccarAdminEmail, addCustomer.name);
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(addCustomer.name);
        customersPage.verifyCustomerIsNotInList(addCustomer.name);
    });

    it('TC-2249 Dealer Admin can deselect vehicle', () => {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.customersLink.click();
        navigation.typeInSearchFilterRecommendation(testCustomer);
        customersPage.selectCustomerAndFindVehicle(testVin, testCustomer);
        customersPage.vehicleCheckBox.click();
        expect(toastMessage.toastAlert.isPresent()).toBe(false, 'Error message was display');
        customersPage.vehicleCheckBox.click();
        expect(toastMessage.toastAlert.isPresent()).toBe(false, 'Error message was display');
    });

    it('TC-2691-1 Validate vehicle tab functionality', () => {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.customersLink.click();
        navigation.applyChipFilter(chipFilterUtil.customers, testCustomer2, 1);
        customersPage.clickCustomerHyperlinkCellSearch(testCustomer2);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(testVin2);
        customersPage.unassignVehicle();
        customersPage.clickVehicleGroupsTab();
        customersPage.clickManageVehiclesTab();
        expect(customersPage.manageVehicleRows.count()).toBeLessThan(1, `${testVin2} didn't uncheck`)
    });

    it('TC-2691-2 Revert all changes from first test', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        customerUtil.transferVinToCustomer(testVin2, testCustomer2, 1);
        toastMessage.verifyToastAlert(`${testVin2} has been updated.`);
    });
});