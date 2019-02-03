/**
 * Created by Popazov on 1/19/2018.
 */

var ChipFilterMatrixUtil = function () {

    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var paccarPowerUserEmail = browser.params.testuseremails.paccarpoweruser;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUserEmail = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUserEmail = browser.params.testuseremails.dealerregionuser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerPowerUserEmail = browser.params.testuseremails.dealeruser;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;

    //Roles Suggestions
    var factoryWorker = browser.params.roleslabels.factoryworker; //'Factory Worker';
    var oemAdmin = browser.params.roleslabels.paccaradmin;//'OEM Administrator';
    var oemPowerUser = browser.params.roleslabels.paccarpoweruser;// 'OEM Power User';
    var oemUser = browser.params.roleslabels.paccaruser;// 'OEM User';
    var customerService = browser.params.roleslabels.divisionuser;// 'Customer Service';
    var dealerOwnerAdmin = browser.params.roleslabels.dealerowneradmin;//'Dealer Owner Admin';
    var dealerOwnerUser = browser.params.roleslabels.dealerowneruser; //'Dealer Owner User';
    var dealerRegionAdmin = browser.params.roleslabels.dealerregionadmin; //'Dealer Region Admin';
    var dealerRegionUser = browser.params.roleslabels.dealerregionuser; //'Dealer Region User';
    var dealerAdmin = browser.params.roleslabels.dealeradmin; //'Dealer Admin';
    var dealerPowerUser = browser.params.roleslabels.dealeruser; //'Dealer Power User';
    var dealerServiceTech = browser.params.roleslabels.dealertechnician;// 'Dealer Service Technician';
    var customerAdmin = browser.params.roleslabels.customeradmin; //'Customer Administrator';
    var customerUser = browser.params.roleslabels.customeruser; //'Customer User';
    var cumminsUser = browser.params.roleslabels.cumminsuser; //'Cummins User';
    var vehicleGroupUser = browser.params.roleslabels.vehiclegroupuser; //'Vehicle Group User User';
/////////////////Chip filter matrix
    this.none = 'None';
    this.customers = 'Customers';
    this.dealers = 'Dealers';
    this.dealerOwnerGroups = 'Dealer Owner Groups';
    this.dealerRegions = 'Dealer Regions';
    this.manufacturers = 'Manufacturers';
    this.vehicles = 'VIN';
    this.unitNumber = 'Unit Number';
    this.userVehicleGroups = 'User Vehicle Groups';
    this.factories = 'Factories';
    this.vehicleStates = 'Vehicle States';
    this.customerVehicleGroups = 'Customer Vehicle Groups';
    this.dealerVisibility = 'Dealer Visibility';
    this.vehicleVisibility = 'Vehicle Visibility';
    this.users = 'Users';
    this.roles = 'Roles';
    this.recommendations = 'Recommendations';
    this.removalCategory = 'Removal Categories';
    this.subscriptionStatus = 'Subscription Status';

    this.dashboardPreferred = "Preferred Customer Vehicles";

    this.rolesWithPermissionDashboard = {};
    this.rolesWithPermissionDashboard[dealerOwnerAdminEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.vehicleVisibility];
    this.rolesWithPermissionDashboard[dealerOwnerUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.vehicleVisibility];
    this.rolesWithPermissionDashboard[dealerRegionAdminEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.vehicleVisibility];
    this.rolesWithPermissionDashboard[dealerRegionUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.vehicleVisibility];
    this.rolesWithPermissionDashboard[dealerAdminEmail] = [this.none, this.customers, this.manufacturers, this.vehicles, this.unitNumber, this.vehicleVisibility, this.userVehicleGroups];
    this.rolesWithPermissionDashboard[dealerPowerUserEmail] = [this.none, this.customers, this.manufacturers, this.vehicles, this.unitNumber, this.vehicleVisibility, this.userVehicleGroups];
    this.rolesWithPermissionDashboard[dealerTechEmail] = [this.none, this.customers, this.manufacturers, this.vehicles, this.unitNumber, this.vehicleVisibility, this.userVehicleGroups];
    this.rolesWithPermissionDashboard[paccarAdminEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates, this.vehicleVisibility];
    this.rolesWithPermissionDashboard[paccarPowerUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates];
    this.rolesWithPermissionDashboard[paccarUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates];
    this.rolesWithPermissionDashboard[factoryWorkerEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates];
    this.rolesWithPermissionDashboard[divisionUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates];
    this.rolesWithPermissionDashboard[customerAdminEmail] = [this.none, this.manufacturers, this.vehicles, this.unitNumber, this.customerVehicleGroups];
    this.rolesWithPermissionDashboard[customerUserEmail] = [this.none, this.manufacturers, this.vehicles, this.unitNumber, this.customerVehicleGroups];

    this.rolesWithPermissionCustomers = {};
    this.rolesWithPermissionCustomers[dealerOwnerAdminEmail] = [this.none, this.customers, this.dealers, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionCustomers[dealerOwnerUserEmail] = [this.none, this.customers, this.dealers, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionCustomers[dealerRegionAdminEmail] = [this.none, this.customers, this.dealers, this.dealerVisibility];
    this.rolesWithPermissionCustomers[dealerRegionUserEmail] = [this.none, this.customers, this.dealers, this.dealerVisibility];
    this.rolesWithPermissionCustomers[dealerAdminEmail] = [this.none, this.customers, this.dealerVisibility];
    this.rolesWithPermissionCustomers[dealerPowerUserEmail] = [this.none, this.customers, this.dealerVisibility];
    this.rolesWithPermissionCustomers[dealerTechEmail] = [this.none, this.customers, this.dealerVisibility];
    this.rolesWithPermissionCustomers[paccarAdminEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionCustomers[paccarPowerUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionCustomers[paccarUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionCustomers[divisionUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];


    this.rolesWithPermissionDealers = {};
    this.rolesWithPermissionDealers[dealerOwnerAdminEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[dealerOwnerUserEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[dealerRegionAdminEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[dealerRegionUserEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[dealerAdminEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[dealerPowerUserEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[dealerTechEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[paccarAdminEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[paccarPowerUserEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[paccarUserEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[divisionUserEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[customerAdminEmail] = [this.none, this.dealers, this.dealerOwnerGroups];
    this.rolesWithPermissionDealers[customerUserEmail] = [this.none, this.dealers, this.dealerOwnerGroups];


    this.rolesWithPermissionDOG = {};
    this.rolesWithPermissionDOG[paccarAdminEmail] = [this.none, this.dealerOwnerGroups];
    this.rolesWithPermissionDOG[paccarPowerUserEmail] = [this.none, this.dealerOwnerGroups];
    this.rolesWithPermissionDOG[paccarUserEmail] = [this.none, this.dealerOwnerGroups];
    this.rolesWithPermissionDOG[divisionUserEmail] = [this.none, this.dealerOwnerGroups];


    this.rolesWithPermissionNotifications = {};
    this.rolesWithPermissionNotifications[dealerOwnerAdminEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[dealerOwnerUserEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[dealerRegionAdminEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[dealerRegionUserEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[dealerAdminEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[dealerPowerUserEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[dealerTechEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[paccarAdminEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[paccarPowerUserEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[paccarUserEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[factoryWorkerEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[divisionUserEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[customerAdminEmail] = [this.none, this.users];
    this.rolesWithPermissionNotifications[customerUserEmail] = [this.none, this.users];

    this.rolesWithPermissionRemoteDiagnostic = {};
    this.rolesWithPermissionRemoteDiagnostic[paccarAdminEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.removalCategory];

    this.rolesWithPermissionUserNotifications = {};
    this.rolesWithPermissionUserNotifications[dealerOwnerAdminEmail] = [this.none, this.customers, this.dealers, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[dealerOwnerUserEmail] = [this.none, this.customers, this.dealers, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[dealerRegionAdminEmail] = [this.none, this.customers, this.dealers, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[dealerRegionUserEmail] = [this.none, this.customers, this.dealers, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[dealerAdminEmail] = [this.none, this.customers, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[dealerPowerUserEmail] = [this.none, this.customers, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[dealerTechEmail] = [this.none, this.customers, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[paccarAdminEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[paccarPowerUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[paccarUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];
    this.rolesWithPermissionUserNotifications[divisionUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.dealerVisibility];

    this.rolesWithPermissionUsers = {};
    this.rolesWithPermissionUsers[dealerOwnerAdminEmail] = [this.none, this.customers, this.dealers, this.dealerRegions, this.users, this.roles];
    this.rolesWithPermissionUsers[dealerOwnerUserEmail] = [this.none, this.customers, this.dealers, this.dealerRegions, this.users, this.roles];
    this.rolesWithPermissionUsers[dealerRegionAdminEmail] = [this.none, this.customers, this.dealers, this.users, this.roles];
    this.rolesWithPermissionUsers[dealerRegionUserEmail] = [this.none, this.customers, this.dealers, this.users, this.roles];
    this.rolesWithPermissionUsers[dealerAdminEmail] = [this.none, this.customers, this.users, this.roles];
    this.rolesWithPermissionUsers[dealerPowerUserEmail] = [this.none, this.customers, this.users, this.roles];
    this.rolesWithPermissionUsers[dealerTechEmail] = [this.none, this.customers, this.users, this.roles];
    this.rolesWithPermissionUsers[paccarAdminEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.users, this.roles];
    this.rolesWithPermissionUsers[paccarPowerUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.users, this.roles];
    this.rolesWithPermissionUsers[paccarUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.users, this.roles];
    this.rolesWithPermissionUsers[divisionUserEmail] = [this.none, this.customers, this.dealers, this.dealerOwnerGroups, this.dealerRegions, this.users, this.roles];
    this.rolesWithPermissionUsers[customerAdminEmail] = [this.none, this.users, this.roles];
    this.rolesWithPermissionUsers[customerUserEmail] = [this.none, this.users, this.roles];

    this.rolesWithPermissionVehicles = {};
    this.rolesWithPermissionVehicles[dealerOwnerAdminEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[dealerOwnerUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[dealerRegionAdminEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[dealerRegionUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[dealerAdminEmail] = [this.none, this.customers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[dealerPowerUserEmail] = [this.none, this.customers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[dealerTechEmail] = [this.none, this.customers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[paccarAdminEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates, this.recommendations, this.vehicleVisibility];
    this.rolesWithPermissionVehicles[paccarPowerUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates, this.recommendations];
    this.rolesWithPermissionVehicles[paccarUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates, this.recommendations];
    this.rolesWithPermissionVehicles[factoryWorkerEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates, this.recommendations];
    this.rolesWithPermissionVehicles[divisionUserEmail] = [this.none, this.customers, this.dealers, this.manufacturers, this.vehicles, this.unitNumber, this.userVehicleGroups, this.factories, this.vehicleStates, this.recommendations];
    this.rolesWithPermissionVehicles[customerAdminEmail] = [this.none, this.manufacturers, this.vehicles, this.unitNumber, this.customerVehicleGroups, this.recommendations];
    this.rolesWithPermissionVehicles[customerUserEmail] = [this.none, this.manufacturers, this.vehicles, this.unitNumber, this.customerVehicleGroups, this.recommendations];


    this.UserToUserRolesMapping = {};
    this.UserToUserRolesMapping[dealerOwnerAdminEmail] = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[dealerOwnerUserEmail] = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[dealerRegionAdminEmail] = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[dealerRegionUserEmail] = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[dealerAdminEmail] = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[dealerPowerUserEmail] = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[dealerTechEmail] = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[paccarAdminEmail] = [factoryWorker, oemAdmin, oemPowerUser, oemUser, customerService, dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser, cumminsUser];
    this.UserToUserRolesMapping[paccarPowerUserEmail] = [factoryWorker, oemAdmin, oemPowerUser, oemUser, customerService, dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser, cumminsUser];
    this.UserToUserRolesMapping[paccarUserEmail] = [factoryWorker, oemAdmin, oemPowerUser, oemUser, customerService, dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser, cumminsUser];
    this.UserToUserRolesMapping[divisionUserEmail] = [factoryWorker, oemAdmin, oemPowerUser, oemUser, customerService, dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser, dealerAdmin, dealerPowerUser, dealerServiceTech, customerAdmin, customerUser, vehicleGroupUser, cumminsUser];
    this.UserToUserRolesMapping[customerAdminEmail] = [customerAdmin, customerUser, vehicleGroupUser];
    this.UserToUserRolesMapping[customerUserEmail] = [customerAdmin, customerUser, vehicleGroupUser];

    this.rolesWithPermissionSubscriptions = {};
    this.rolesWithPermissionSubscriptions[paccarAdminEmail] = [this.none, this.customers, this.manufacturers, this.vehicles, this.subscriptionStatus, this.vehicleVisibility];
};

module.exports = new ChipFilterMatrixUtil();