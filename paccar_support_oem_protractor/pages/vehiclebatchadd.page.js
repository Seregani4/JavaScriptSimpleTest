var VehicleBatchAddPage = function () {

    this.allAvailableVehicles = element.all(by.repeater('vehicle in ctrl.dealerVehicles | filter:filter'));
    this.allCustomerVehicles = element.all(by.repeater('vehicle in ctrl.customerVehicles | filter:filter'));
    this.custAddVehicleBtn = element(by.css('[ng-click="ctrl.addToCustomer(vehicle)"]'));
    this.custRemoveVehicleBtn = element(by.css('[ng-click="ctrl.removeFromCustomer(vehicle)"]'));
    this.vehicleFilterBar = element(by.model('filter'));
    this.doneBtn = element(by.linkText('Done'));

};

module.exports = new VehicleBatchAddPage();
