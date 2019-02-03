/**
 * Created by Nicolas Granja - 2018-07-19
 */

describe("Verify Informational EVG is set on vehicle",() => {

    const moment = require('moment');
    const loginPage = require('../../../pages/login.page.js');
    const vehiclePage = require('../../../pages/vehicles.page.js');
    const vehicleUtil = require('../../../utilities/vehicle.util');
    const paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    const password = browser.params.adduser.password;
    const evgVin2 = browser.params.vehicle.evgvin2;
    const informationalStatus = vehicleUtil.getInformationalStatus();
    let triggerTime = moment();

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();')
    });

    afterAll((done) => {
        vehiclePage.clearVehicleFaultLog(evgVin2)
            .then(() => done());
    });

    it("TC-2176 Verify Informational EVG is displayed and update vehicle status correctly",() => {
        vehicleUtil.verifyEvgUpdateVehicleStatus(evgVin2, informationalStatus, triggerTime)
    });

    it("TC-2233 Verify expired Stop Now EVG is NOT displayed in the vehicle and not update vehicle status", () => {
        vehicleUtil.verifyExpiredEvgNotUpdateVehicleStatus(evgVin2, informationalStatus, triggerTime)
    });

    it("TC-2178 Verify clear active faults do not remove EVGs",() => {
        vehicleUtil.verifyEvgsNotRemovedWhenClearingActiveFaults(evgVin2, informationalStatus, triggerTime)
    })

    it("TC-2320 Verify Informational EVG sent while the vehicle is In Repair is displayed only after removing In Repair Status",() => {
        vehicleUtil.verifyEvgWhileVehicleIsInRepair(evgVin2, informationalStatus)
    })
});