/**
 * Created by Popazov on 8/9/2018.
 */



var loginPage = require('../../../pages/login.page.js');
var navigation = require('../../../pages/navigation.page.js');
var userPage = require('../../../pages/users.page.js');
var faultDetailsPage = require('../../../pages/fault.details.page.js');
var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
var toastUtil = require('../../../utilities/toastMessage.util.js');
var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
var vehiclesPage = require('../../../pages/vehicles.page.js');
var emailUtil = require('../../../utilities/email.util.js')
var password = browser.params.adduser.password;
var faultType = 'cummins fault';
var vin = browser.params.vehicle.cumminsrealvin;
var mailosaurUser = browser.params.testuseremails.mailosaurUser;
var mailosaurSpanishUser = browser.params.testuseremails.mailosaurPaccarAdminKenMex
var emailMap = emailUtil.emailMap
var dsn = "";
var customer = "";
var unitNumber = "";
const _ = require('lodash');

describe('Fault Email validation', () => {

    browser.driver.manage().window().maximize();
    _.forEach(emailUtil.emailMap, (param) => {
        beforeAll((done) => {
            loginPage.get()
            loginPage.login('paccar', param.mailosaurUser, password)
            browser.get(`/#/nav/vehicle/details/${vin}?status=active`);
            vehiclesPage.dsnHyperlink.getText()
                .then((device) => {
                    dsn = device;
                    return vehiclesDetailPage.faultDetailsButton.get(0).isPresent()
                })
                .then((isVisiable) => {
                    if (isVisiable) {
                        return vehiclesDetailPage.cleanupFault()
                    }
                    return true
                })
                .then(() => {
                    return vehiclesPage.unitNumberInfoField.getText()
                })
                .then((uNumber) => {
                    unitNumber = uNumber;
                    return vehiclesPage.customerNameField.getText()
                })
                .then((customerName) => {
                    navigation.clickUserMenu("paccar")
                    navigation.clickUserProfileLink()
                    userPage.selectUserTab(param.notifications)
                    navigation.applyChipFilter(param.chipFilterCustomer, customerName, 1);
                    console.log(customerName)
                    userPage.subscribeUserToFirstCustomerInRow(param.subsriptionUpdateMessage)
                    browser.executeScript('window.localStorage.clear();')
                    return customer = customerName
                })
                .then(() => {
                    return emailUtil.deleteAllEmails()
                })
                .then(() => done());
        });
    });

    afterEach(() => browser.executeScript('window.localStorage.clear();'));

    it(`Cummins fault email validation for ${emailMap[0].mailosaurUser} and  ${emailMap[1].mailosaurUser}`, (done) => {
        loginPage.get()
        loginPage.login('paccar', emailMap[1].mailosaurUser, password)
        browser.get(`/#/nav/vehicle/details/${vin}?status=active`);
        vehiclesPage.dsnHyperlink.getText()
            .then(() => {
                return vehiclesPage.triggerFault(faultType, dsn, vin)
            })
            .then(() => {
                return Promise.all([
                    emailUtil.validateCumminsFaultEmail(`${unitNumber} | Service Now`, emailUtil.logoPaccar, emailMap[0]),
                    emailUtil.validateCumminsFaultEmail(`${unitNumber} | Service Now`, emailUtil.logoPaccar, emailMap[1])
                ])
            })
            .then(() => {
                browser.refresh();
                navigation.waitTillElementToBeVisible(vehiclesDetailPage.faultDetailsButton.get(0))
                vehiclesDetailPage.faultDetailsButton.get(0).click();
                faultDetailsPage.emailTab.click();
                expect(faultDetailsPage.emailHeaders.getText()).toContain(emailMap[1].vehicleLocationInformation, "Email language not Spanish")
            })
            .then(() => done());
    });
});