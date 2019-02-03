var FleetHealthMapPage = function() {

    //Layers Toolbar and  buttons
    this.layersToolbarButton = element(by.buttonText('layers'));
    this.refreshMapButton = element(by.css('[ng-click="$ctrl.refreshData()"]'));
    this.satelliteButton =  element(by.css('[ng-click="$ctrl.toggleBaseLayer()"]'));
    this.dealersButton = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'Dealers\')"]'));
    this.trafficButton = element(by.css('[ng-if="$ctrl.trafficEnabled"]'));
    this.weatherButton = element(by.css('[ng-if="$ctrl.weatherEnabled"]'));
    this.closeLayersToolbarButton = element(by.css('[translate="fleetHealthMap.dashboard.close"]'));

   this.vehicleClusterMenu = element(by.css('[ng-show="$ctrl.popupVehicleCluster"]'));
   this.fleetHealthMap = element(by.id('map'));

    //Buttons on Fleet Health Map Filter Drop Down
    this.stopNowBtn = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'STOP_NOW\')"]'));
    this.serviceNowBtn = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'SERVICE_NOW\')"]'));
    this.serviceSoonBtn = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'SERVICE_SOON\')"]'));
    this.informationalBtn = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'INFORMATIONAL\')"]'));
    this.noActionBtn = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'NO_ACTION\')"]'));
    this.inRepairBtn = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'IN_REPAIR\')"]'));
    this.comingSoonBtn = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'COMING_SOON\')"]'));



    //Recommendations
    this.comingSoonRecommendationLink =element(by.css('[ng-click="$ctrl.filterVehicleList(\'COMING_SOON\')"]'));
    this.stopNowRecommendationLink =element(by.css('[ng-click="$ctrl.filterVehicleList(\'STOP_NOW\')"]'));
    this.serviceNowRecommendationLink =element(by.css('[ng-click="$ctrl.filterVehicleList(\'SERVICE_NOW\')"]'));
    this.serviceSoonRecommendationLink =element(by.css('[ng-click="$ctrl.filterVehicleList(\'SERVICE_SOON\')"]'));
    this.informationalRecommendationLink =element(by.css('[ng-click="$ctrl.filterVehicleList(\'INFORMATIONAL\')"]'));
    this.noActionRecommendationLink =element(by.css('[ng-click="$ctrl.filterVehicleList(\'NO_ACTION\')"]'));
    this.inRepairRecommendationLink =element(by.css('[ng-click="$ctrl.filterVehicleList(\'IN_REPAIR\')"]'));


    ////////////////////////Filters///////////////////////
    this.fleetHealthDropdown = element(by.cssContainingText("[type='button']", 'Fleet Health'));
    this.filtersDropdown = element(by.cssContainingText("[role='button']", 'Filters'));
    this.filterCustomerInput = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(2);
    this.filterVehicleGroupInput = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(3);
    this.inRepairFilter = element(by.css('.fhm-in-repair-btn'));
    this.vehicleClusterMenuText = element.all(by.css('.ng-binding.flex'));
    this.filterBtn = element(by.buttonText('Filter'));
    this.vehicleGroupInRepairCluster = element(by.css('[stroke-linecap="round"]'));

    //this.vehicleGroupInRepairCluster = element(by.css(browser.params.map.repairvehicle));
    this.nebraskaMapMarker = element(by.css(browser.params.map.dealermarker));

    this.clickFleetHealthMapDropdown = function(){
        this.fleetHealthDropdown.click();
    };

    this.clickFiltersMapDropdown = function() {
        this.filtersDropdown.click();
    };

    this.clickInRepairFilter = function(){
        this.inRepairFilter.click();
        browser.sleep(2000);
    };

    this.clickVehicleGroupInRepairCluster = function() {
        this.vehicleGroupInRepairCluster.click();
        expect(this.vehicleClusterMenu.isDisplayed()).toBe(true);
    };

    this.clickFilterButton = function() {
        this.filterBtn.click();
    };

    this.filterByCustomer = function(customer) {
        this.filterCustomerInput.sendKeys(customer);
        //element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(0).click();
       };

    this.filterByVehicleGroup = function(vehicleGroup) {
        this.filterVehicleGroupInput.sendKeys(vehicleGroup);
    };

    this.validateInRepairVehicle = function(vin) {
        this.vehicleClusterMenuText.getText().then(function(text) {
            expect(text).toContain(vin);
        })
    };

    this.verifyFleetHealthMap = function(header){
        expect(this.fleetHealthMap.isDisplayed()).toBe(true, 'No Fleet Health Map was found');
    }
};

module.exports = new FleetHealthMapPage();
