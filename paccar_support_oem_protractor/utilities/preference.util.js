
var mapUtil = function () {

    var usersPage = require('../pages/users.page.js');
    var dropDownMatrix = require('../utilities/dropDownMatrix.util.js');
    var usCustomaryEmail = 'usCustomaryEmail@test.com';
    var internationalSystemEmail = 'internationalSystemEmail@test.com';
    var orgNameCustomerUS = 'united States (DO NOT EDIT';
    var orgNameCustomerMX = 'mexico (DO NOT EDIT';
    var orgNameCustomerCA = 'canada (DO NOT EDIT';
    var orgNameDealerUS = 'Allstate Peterbilt Group of Glencoe';
    var orgNameDealerMX = 'Kenworth del Noroeste - Mexicali';
    var orgNameDealerCA = 'GreatWest Kenworth - Calgary';
    var orgNameDealerOwner = 'Automation-DealerOwnerGroup (Do Not Edit)';
    var orgNameDealerRegion = 'Automation-Region1 (Do Not Edit)';

    this.dropDownMap = [
        {
            dropDownClickable: usersPage.distanceClickable,
            internationalValue: usersPage.kilometersValue,
            usCustomaryValue: usersPage.milesValue,
            usCustomaryText: dropDownMatrix.miles,
            internationalText: dropDownMatrix.kilometers
        },
        {
            dropDownClickable: usersPage.volumeClickable,
            internationalValue: usersPage.litersValue,
            usCustomaryValue: usersPage.gallonsValue,
            usCustomaryText: dropDownMatrix.gallons,
            internationalText: dropDownMatrix.liters
        },
        {
            dropDownClickable: usersPage.temperatureClickable,
            internationalValue: usersPage.celsiusValue,
            usCustomaryValue: usersPage.fahrenheitValue,
            usCustomaryText: dropDownMatrix.degreesFahrenheit,
            internationalText: dropDownMatrix.degreesCelsius
        },
        {
            dropDownClickable: usersPage.pressureClickable,
            internationalValue: usersPage.kilopascalsValue,
            usCustomaryValue: usersPage.inchValue,
            usCustomaryText: dropDownMatrix.poundsPerSquareInch,
            internationalText: dropDownMatrix.kilopascals
        },
        {
            dropDownClickable: usersPage.massClickable,
            internationalValue: usersPage.kilogramsValue,
            usCustomaryValue: usersPage.poundsValue,
            usCustomaryText: dropDownMatrix.pounds,
            internationalText: dropDownMatrix.kilograms
        }
    ];

    this.createUserMap = [
        {
            preferredUnit: dropDownMatrix.internationalSystem,
            email: internationalSystemEmail
        },
        {
            preferredUnit: dropDownMatrix.usCustomary,
            email: usCustomaryEmail
        }
    ];

    this.customerMap = [
        {
            orgType: browser.params.adduser.organizationtype.customer,
            orgName: orgNameCustomerCA,
            preferredUnit: dropDownMatrix.internationalSystem,
        },
        {
            orgType: browser.params.adduser.organizationtype.customer,
            orgName: orgNameCustomerUS,
            preferredUnit: dropDownMatrix.usCustomary,

        },
        {
            orgType: browser.params.adduser.organizationtype.customer,
            orgName: orgNameCustomerMX,
            preferredUnit: dropDownMatrix.internationalSystem,
        },
        {
            orgType: browser.params.adduser.organizationtype.dealer,
            orgName: orgNameDealerCA,
            preferredUnit: dropDownMatrix.internationalSystem,
        },
        {
            orgType: browser.params.adduser.organizationtype.dealer,
            orgName: orgNameDealerUS,
            preferredUnit: dropDownMatrix.usCustomary,

        },
        {
            orgType: browser.params.adduser.organizationtype.dealer,
            orgName: orgNameDealerMX,
            preferredUnit: dropDownMatrix.internationalSystem,
        },
        {

            orgType: browser.params.adduser.organizationtype.dealerOwner,
            orgName: orgNameDealerOwner,
            preferredUnit: dropDownMatrix.usCustomary,
        },
        {

            orgType: browser.params.adduser.organizationtype.dealerRegion,
            orgName: orgNameDealerRegion,
            preferredUnit: dropDownMatrix.usCustomary,
        }
    ];

};

module.exports = new mapUtil();