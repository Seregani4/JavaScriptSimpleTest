const _ = require('lodash');
const moment = require('moment')
const vehicleUtil = require('../../../utilities/vehicle.util')
const vehiclePage = require('../../../pages/vehicles.page.js')
const emailUtil = require('../../../utilities/email.util.js')
const evgVin = browser.params.vehicle.evgvin2
const stopNowStatus = vehicleUtil.getStopNowStatus()
const serviceNowStatus = vehicleUtil.getServiceNowStatus()
const mailosaurEvgUser = browser.params.testuseremails.mailosaurEvgUser
const mailosaurSpanishEvgUser = browser.params.testuseremails.mailosaurSpanishEvgUser
let triggerTime = moment()

describe('EVG emails validation', function () {

    beforeEach(done => {
        emailUtil.deleteAllEmails()
            .then(() => done());
    });

    it("Send EVG Stop Now Notification", done => {
        vehicleUtil.sendEVG('paccar', evgVin, stopNowStatus, triggerTime.utc().format(), false, true)
        emailUtil.waitForEmail(vehiclePage.getEvgEmailSubject(), mailosaurEvgUser)
            .then(() => emailUtil.validateEvgNotificationEmail(vehiclePage.getEvgEmailSubject(), emailUtil.logoPaccar, mailosaurEvgUser, stopNowStatus))
            .then(() => done());
    })

    it("Send EVG Service Now Notification", done => {
        vehicleUtil.sendEVG('paccar', evgVin, serviceNowStatus, triggerTime.utc().format(), false, true)
        emailUtil.waitForEmail(vehiclePage.getEvgEmailSubject(), mailosaurEvgUser)
            .then(() => emailUtil.validateEvgNotificationEmail(vehiclePage.getEvgEmailSubject(), emailUtil.logoPaccar, mailosaurEvgUser, serviceNowStatus))
            .then(() => done());
    })

    it("Send EVG Service Now Spanish Notification", done => {
        vehicleUtil.sendEVG('paccar', evgVin, serviceNowStatus, triggerTime.utc().format(), false, true)
        emailUtil.waitForEmail(vehiclePage.getEvgSpanishEmailSubject(), mailosaurSpanishEvgUser)
            .then(() => emailUtil.validateEvgNotificationEmail(vehiclePage.getEvgSpanishEmailSubject(), emailUtil.logoPaccar, mailosaurSpanishEvgUser, serviceNowStatus))
            .then(() => done());
    })

    it("Send EVG Stop Now Spanish Notification", done => {
        vehicleUtil.sendEVG('paccar', evgVin, stopNowStatus, triggerTime.utc().format(), false, true)
        emailUtil.waitForEmail(vehiclePage.getEvgSpanishEmailSubject(), mailosaurSpanishEvgUser)
            .then(() => emailUtil.validateEvgNotificationEmail(vehiclePage.getEvgSpanishEmailSubject(), emailUtil.logoPaccar, mailosaurSpanishEvgUser, stopNowStatus))
            .then(() => done());
    })

})