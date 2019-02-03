/**
 * Created by pshrestha on 3/24/2017.
 */

describe("Verify Permission to view Trip Audit on Vehicle Details Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser1;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUserEmail = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUserEmail = browser.params.testuseremails.dealerregionuser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var password = browser.params.adduser.password;
    var realVin = browser.params.vehicle.realdatavin;
    var vin = '1NKZXKTX9GJ104366';
    var ownerId = browser.params.testcustomer.uid; //has no preferred dealers.
    var vin2 = browser.params.vehicle.vin;
    var jsonText;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail, paccarUserEmail, divisionUserEmail];
    loginUserArray.filter(function (eachUser) {
        it("Verify " + eachUser + " are able to see Trip Audit option", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
            navigation.moreOptionsButton.click();
            if (eachUser === paccarUserEmail) {
                expect(vehiclesPage.viewTripAuditBtn.isDisplayed()).toBe(true, eachUser + ' cannot see the Trip Audit button.');
                expect(vehiclesPage.ownershipHistoryBtn.isDisplayed()).toBe(true, eachUser + ' cannot see the View Ownership History button.');
            }
            else {
                expect(vehiclesPage.viewTripAuditBtn.isDisplayed()).toBe(true, eachUser + ' cannot see the Trip Audit button.');
                expect(vehiclesPage.ownershipHistoryBtn.isDisplayed()).toBe(true, eachUser + ' can see the View Ownership History button.');
            }
        });
    });

    it("Transfer vehicle ownership to the test customer", function (done) {
        loginPage.get();
        vehiclesPage.clearOwnershipHistoryAssignCustomer(vin, ownerId)
            .then(() => {
                    done()
                }
            )
    });

    var loginUserArrayOne = [customerAdminEmail, customerUserEmail, dealerAdminEmail, dealerTechEmail,
        dealerOwnerAdminEmail, dealerOwnerUserEmail, dealerRegionAdminEmail, dealerRegionUserEmail];
    loginUserArrayOne.filter(function (eachUser) {
        it("Verify " + eachUser + " aren't able to see Trip Audit option", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
            navigation.moreOptionsButton.click();
            if (eachUser === customerUserEmail || eachUser === customerAdminEmail) {
                expect(vehiclesPage.viewTripAuditBtn.isDisplayed()).toBe(false, eachUser + ' can see the Trip Audit button.');
                expect(vehiclesPage.ownershipHistoryBtn.isPresent()).toBe(false, eachUser + ' can see the View Ownership History button.');
            }
            else if (eachUser === dealerTechEmail || eachUser === dealerOwnerUserEmail || eachUser === dealerRegionUserEmail) {
                expect(vehiclesPage.viewTripAuditBtn.isDisplayed()).toBe(false, eachUser + ' can see the Trip Audit button.');
                expect(vehiclesPage.ownershipHistoryBtn.isPresent()).toBe(true, eachUser + ' cannot see the View Ownership History button.');
            }
            else {
                expect(vehiclesPage.viewTripAuditBtn.isDisplayed()).toBe(false, eachUser + ' can see the Trip Audit button.');
                expect(vehiclesPage.ownershipHistoryBtn.isDisplayed()).toBe(true, eachUser + ' cannot see the View Ownership History button.');
            }
        });

    });

    it('TC-1012 Trip Audit – Filter by Trip Event', function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(realVin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(realVin);
        navigation.moreOptionsButton.click();
        vehiclesPage.viewTripAuditBtn.click();
        vehiclesPage.eventTypeDropdown.click();
        vehiclesPage.valueFromEventTypeDropdown.getText().then(function (values) {
            validationUtil.validateTextContainArray(values, [
                vehiclesPage.allEventsType,
                vehiclesPage.oemTripStartEventsType,
                vehiclesPage.oemTripEndEventsType,
                vehiclesPage.oemTripPeriodicEventsType,
                vehiclesPage.oemFaultCodeEventsType,
                vehiclesPage.oemClearFaultsEventsType,
                vehiclesPage.oemFaultRemovedEventsType,
                vehiclesPage.oemDiagnosticToolStatusEventsType,
                vehiclesPage.vinDiscoveryEventsType
            ]);
        });
        vehiclesPage.oemTripStart.click();
        vehiclesPage.searchButton.click();
        vehiclesPage.eventTypeFromTable.getText().then(function (eventType) {
            validationUtil.validateTextContainArray(eventType, 'TRIPSTART');
        });
    });

    it("TC-1015 Validate Trip Audit - Copy to clipboard functionality ", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin2);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin2);
        navigation.moreOptionsButton.click();
        vehiclesPage.viewTripAuditBtn.click();
        vehiclesPage.showEventJsonButtons.first().click();
        expect(vehiclesPage.tripAuditJsonData.isDisplayed()).toBe(true, "Json Data not displayed");
        expect(vehiclesPage.copyToClipboardButtom.isDisplayed()).toBe(true, "Copy to clipboard button not displayed");
        expect(vehiclesPage.copyToClipboardButtom.getAttribute('data-clipboard-target')).toBe('#tripAuditJSON');
        vehiclesPage.tripAuditJsonData.getText()
            .then((text) => {
                jsonText = text.replace(/\s/g, '');
            })
            .then(() => {
                vehiclesPage.copyToClipboardButtom.click();
                vehiclesPage.okButtom.click();
                vehiclesPage.vinInput.clear();
                vehiclesPage.vinInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "v"));
                vehiclesPage.vinInput.getAttribute('value')
                    .then((value) => {
                        expect(value.toString().replace(/\s/g, '')).toBe(jsonText, 'Error text');
                    })
            });
    })
});
