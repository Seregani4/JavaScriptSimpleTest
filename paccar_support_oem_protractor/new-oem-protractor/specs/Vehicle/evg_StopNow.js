/**
 * Created by Nicolas Granja - 2018-07-19
 */

describe("Verify Stop Now EVG is set on vehicle",() => {

    const moment = require('moment')
    const loginPage = require('../../../pages/login.page.js')
    const vehiclePage = require('../../../pages/vehicles.page.js')
    const vehicleUtil = require('../../../utilities/vehicle.util')
    const paccarAdminEmail = browser.params.testuseremails.paccaradmin
    const password = browser.params.adduser.password
    const evgVin = browser.params.vehicle.evgvin
    const stopNowStatus = vehicleUtil.getStopNowStatus()
    let triggerTime = moment()

    browser.driver.manage().window().maximize()

    beforeEach(() => {
        loginPage.get()
        loginPage.login('paccar', paccarAdminEmail, password)
    })

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();')
    })

    afterAll((done) => {
        vehiclePage.clearVehicleFaultLog(evgVin)
            .then(() => done());
    })

    it("TC-2176 Verify Stop Now EVG is displayed and update vehicle status correctly", () => {
        vehicleUtil.verifyEvgUpdateVehicleStatus(evgVin, stopNowStatus, triggerTime)
    })

    it("TC-2178 Verify clear active faults do not remove EVGs",() => {
        vehicleUtil.verifyEvgsNotRemovedWhenClearingActiveFaults(evgVin, stopNowStatus, triggerTime)
    })

    it("TC-2320 Verify Stop Now EVG sent while the vehicle is In Repair is displayed only after removing In Repair Status", () => {
        vehicleUtil.verifyEvgWhileVehicleIsInRepair(evgVin, stopNowStatus)
    })
})