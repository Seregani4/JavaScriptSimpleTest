/**
 * Created by pshrestha on 2/17/2017.
 */

var Dashboard2 = function () {

        //////////Layers Toolbar and  buttons//////////////
        this.layersToolbarButton = element(by.buttonText('layers'));
        this.refreshMapButton = element(by.css('[ng-click="$ctrl.refreshDataAll()"]'));
        this.satelliteButton = element(by.css('[ng-click="$ctrl.toggleBaseLayer()"]'));
        this.dealersButton = element(by.css('[ng-click="$ctrl.toggleLayerVisibility(\'Dealers\')"]'));
        this.cumminsButton = element(by.css('[aria-label="View Cummins Distributors"]'));
        this.cumminsRedButton = element(by.css('[md-svg-src="./images/icon_cummins_logo_red.01c7d39.svg"]'));
        this.closeLayersToolbarButton = element(by.css('[translate="fleetHealthMap.dashboard.close"]'));
        this.zoomControlButtons = element(by.css('[id="zoom-controls"]'));
        this.vehicleClusterMenu = element(by.css('[ng-show="$ctrl.popupVehicleCluster"]'));
        this.fleetHealthMap = element(by.id('map'));

        //////////////Buttons on Dashboard recommendation table////////////////////
        this.allRecommendationNames = element.all(by.xpath("//td/div[@class='recommendation-action-block']"));
        this.allRecommendations = element.all(by.xpath("//div[@class='recommendation-body-content']/span[@class='recommendation-row']"));
        this.stopNowBtn = element(by.css('[translate="vehicle.dispositionsFactory.stop_now_title"]'));
        this.serviceNowBtn = element(by.css('[translate="vehicle.dispositionsFactory.service_now_title"]'));
        this.serviceSoonBtn = element(by.css('[translate="vehicle.dispositionsFactory.service_soon_title"]'));
        this.informationalBtn = element(by.css('[translate="vehicle.dispositionsFactory.informational_title"]'));
        this.noActionBtn = element(by.css('[translate="vehicle.dispositionsFactory.no_action_title"]'));
        this.inRepairBtn = element(by.css('[translate="vehicle.dispositionsFactory.in_repair_title"]'));
        this.comingSoonBtn = element(by.css('[translate="vehicle.dispositionsFactory.coming_soon_title"]'));
        this.eyeIcon = element(by.className("md-default-theme material-icons recommendation-visibility-icon"));
        this.statusRecommendation = element.all(by.xpath('//span/md-icon'));

        //count of vehicle from no action field
        this.valueFromNoAction = element(by.xpath('(//span[@class="recommendation-number ng-binding"])[5]'));

        //This element grabs the number of vehicles present so that we can validate page refresh after chip clear.
        this.stopNowNoOfVehicle = element.all(by.css('[class="recommendation-body recommendation-overlay ng-scope"]')).get(0).$$('span').$$('span').get(0);
        this.serviceNowNoOfVehicle = element.all(by.css('[class="recommendation-body recommendation-overlay ng-scope"]')).get(1).$$('span').$$('span').get(0);
        this.serviceSoonNoOfVehicle = element.all(by.css('[class="recommendation-body recommendation-overlay ng-scope"]')).get(2).$$('span').$$('span').get(0);
        this.informationalNoOfVehicle = element.all(by.css('[class="recommendation-body recommendation-overlay ng-scope"]')).get(3).$$('span').$$('span').get(0);
        //getText spits out the Number of Vehicles in noAction recommendation.
        this.noActionNoOfVehicle = element.all(by.css('[class="recommendation-body recommendation-overlay ng-scope"]')).get(4).$$('span').$$('span').get(0);
        this.comingSoonNoOfVehicle = element.all(by.css('[class="recommendation-body recommendation-overlay ng-scope"]')).get(5).$$('span').$$('span').get(0);
        this.inRepairNoOfVehicle = element.all(by.css('[class="recommendation-body recommendation-overlay ng-scope"]')).get(6).$$('span').$$('span').get(0);

        /////////////////////////////Map Filter/////////////////////////////
        this.mapFilterHeading = element(by.className('md-title chip-title hide-sm hide-xs'));
        this.dashboardFilter = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(1);
        this.vehicleChip = element(by.cssContainingText('[class="chipText ng-binding"]', browser.params.vehicle.vin));
        this.dealerChip = element(by.cssContainingText('[class="chipText ng-binding"]', browser.params.testdealer.name));
        this.customerChip = element(by.cssContainingText('[class="chipText ng-binding"]', browser.params.testcustomer.name));
        this.vehicleGrpChip = element(by.cssContainingText('[class="chipText ng-binding"]', browser.params.vehiclegroup.name0));
        this.manufacturerChip = element(by.cssContainingText('[class="chipText ng-binding"]', browser.params.manufacturer.name));
        this.factoryChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'Chillicothe'));
        this.statusChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'Manufacturing'));
        this.preferredChip = element(by.cssContainingText('[class="chipText ng-binding"]', 'Preferred Customer Vehicles'));
        this.chipFilterCloseBtn = element.all(by.cssContainingText('[class="md-default-theme material-icons"]', 'close'));
        this.allChips = element.all(by.className('md-chip-content'));
        this.chipFilterResults = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
        this.clearAllFiltersButton = element(by.css('[ng-click="$ctrl.clearChips()"]'));
        this.locationIcon = element(by.cssContainingText('[ng-click="$ctrl.zoomToFactory()"]', 'location_on'));

        ///////////////////////////Map's selectors////////////////////////////
        this.allPointers = element.all(by.css('[cursor="pointer"]'));
        this.popUp = element(by.css('[id="FramedCloud_FrameDecorationImg_0"]'));
        this.textFropPopUp = element(by.xpath('//div[@id="FramedCloud_contentDiv"]'));
        this.popUpCloseBtn = element(by.css('[class="olPopupCloseBox"]'));
        this.preferredStar = element(by.xpath('//a/i[@ng-hide="$ctrl.lastDealer.attributes.preferred"]'));
        this.nameFromPopUp = element(by.xpath('//a[@ng-click="$ctrl.showDealer()"]'));
        this.linkToVehicles = element.all(by.xpath("//a[contains(@ng-click, '$ctrl.goToVehicle')]"));

        ///////////////////Recommendation filter links///////////////////////
        this.stopNowRecommendationLink = element.all(by.css('[ng-class="{\'recommendation-launch-icon--last\': $last}"]')).get(0);
        this.serviceNowRecommendationLink = element.all(by.css('[ng-class="{\'recommendation-launch-icon--last\': $last}"]')).get(1);
        this.serviceSoonRecommendationLink = element.all(by.css('[ng-class="{\'recommendation-launch-icon--last\': $last}"]')).get(2);
        this.informationalRecommendationLink = element.all(by.css('[ng-class="{\'recommendation-launch-icon--last\': $last}"]')).get(3);
        this.noActionRecommendationLink = element.all(by.css('[ng-class="{\'recommendation-launch-icon--last\': $last}"]')).get(4);
        this.comingSoonRecommendationLink = element.all(by.css('[ng-class="{\'recommendation-launch-icon--last\': $last}"]')).get(5);
        this.inRepairRecommendationLink = element.all(by.css('[ng-class="{\'recommendation-launch-icon--last\': $last}"]')).get(6);


        ////////////////////////Filters///////////////////////
        this.fullScreenButton = element(by.cssContainingText("[role='button']", 'fullscreen'));
        this.fullScreenExitButton = element(by.cssContainingText("[role='button']", 'fullscreen_exit'));
        this.filtersDropdown = element(by.cssContainingText("[role='button']", 'filter_list'));
        this.filterVehicleInput = element(by.css('[type="text"]'));
        this.filterDealerInput = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(2);
        this.filterCustomerInput = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(3);
        this.filterVehicleGroupInput = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(4);
        this.manufacturerDropdown = element(by.name('makeFilter'));
        this.manufacturerOption = element.all(by.repeater('manufacturer in $ctrl.manufacturers'));
        this.factoryDropdown = element(by.model('$ctrl.factoryFilter'));
        this.factoryOption = element.all(by.repeater('factory in $ctrl.factories'));
        this.releaseStatusDropdown = element(by.name('stateFilter'));
        this.statusOption = element.all(by.repeater('state in $ctrl.releaseState'));
        this.inRepairFilter = element(by.css('.fhm-in-repair-btn'));
        this.vehicleClusterMenuText = element.all(by.css('.ng-binding.flex'));
        this.clearBtn = element(by.buttonText('Clear'));
        this.filterBtn = element(by.buttonText('Filter'));


        this.verifyAddFilterFields = function () {
            expect(this.filterVehicleInput.isPresent()).toBe(true, "The Vehicle field is not present in the Add Filter menu");
            expect(this.filterDealerInput.isPresent()).toBe(true, "The Dealer field is not present in the Add Filter menu");
            expect(this.filterCustomerInput.isPresent()).toBe(true, "The Customer field is not present in the Add Filter menu");
            expect(this.filterVehicleGroupInput.isPresent()).toBe(true, "The Vehicle Group field is not present in the Add Filter menu");
        };

        this.verifyRecommendations = function () {
            expect(this.comingSoonBtn.isDisplayed()).toBe(true, 'Coming Soon Filter Button is not Displayed');
            expect(this.stopNowBtn.isDisplayed()).toBe(true, 'Stop Now Filter Button is not Displayed');
            expect(this.inRepairBtn.isDisplayed()).toBe(true, 'In Repair Filter Button is not Displayed');
            expect(this.serviceNowBtn.isDisplayed()).toBe(true, 'Service Now Filter Button is not Displayed');
            expect(this.serviceSoonBtn.isDisplayed()).toBe(true, 'Service Soon Filter Button is not Displayed');
            expect(this.informationalBtn.isDisplayed()).toBe(true, 'Informational Filter Button is not Displayed');
            expect(this.noActionBtn.isDisplayed()).toBe(true, 'No Action Filter Button is not Displayed');
        };

        this.clickVehicleGroupInRepairCluster = function () {
            this.vehicleGroupInRepairCluster.click();
            expect(this.vehicleClusterMenu.isDisplayed()).toBe(true);
        };

        this.clickRecommendationButton = function (recommendation) {
            var str = recommendation.toLowerCase().replace(/ /g, "_");
            element(by.css('[translate="vehicle.dispositionsFactory.' + str + '_title"]')).click();

        };

        this.clickRecommendationLink = function (recommendation) {
            element(by.xpath("//div//td[div[span[contains(text(),'" + recommendation + "')]]]/button")).click();
        };

        this.offAllRecommendationLink = () => {
            this.statusRecommendation.getAttribute('aria-hidden')
                .then(result => {
                    for (var i = 0; i <= 6; i++) {
                        if (result[i] === 'false') {
                            this.allRecommendationNames.get(i).click();
                        }
                    }
                });
        };

        this.clickFilterButton = function () {
            this.filterBtn.click();
        };

        this.filterByVehicle = function (vehicle) {
            this.filterVehicleInput.click();
            this.filterVehicleInput.sendKeys(vehicle);
        };

        this.filterByDealer = function (dealer) {
            this.filterDealerInput.sendKeys(dealer);
            element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(0).click();
        };

        this.filterByCustomer = function (customer) {
            this.filterCustomerInput.sendKeys(customer);
            element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(1).click();
        };

        this.filterByVehicleGroup = function (vehicleGroup) {
            this.filterVehicleGroupInput.sendKeys(vehicleGroup);
            //element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(0).click();
        };

        this.filterByManufacturer = function () {
            this.manufacturerDropdown.click();
            this.manufacturerOption.get(1).click();
        };

        this.filterByFactory = function () {
            this.factoryDropdown.click();
            this.factoryOption.get(1).click();
        };

        this.filterByReleaseStatus = function () {
            this.releaseStatusDropdown.click();
            this.statusOption.get(1).click();
        };

        this.validateClearAllFilter = function () {
            expect(this.manufacturerChip.isPresent()).toBe(false, 'Manufacturer Chips did not clear');
            expect(this.factoryChip.isPresent()).toBe(false, 'Factory Chips did not clear');
            expect(this.statusChip.isPresent()).toBe(false, 'Status Chips did not clear');
        };

        this.verifyFleetHealthMap = function (header) {
            expect(this.fleetHealthMap.isDisplayed()).toBe(true, 'No Fleet Health Map was found');
        };

//This method checks that the number of vehicles changes upon chip filter clear.
        this.verifyNoOfVehicle = function () {
            expect(this.noActionNoOfVehicle.getText()).not.toContain('0 Vehicles 0% of fleet');
        };

//Might need to change this method after update from Vin Disco team
//on the class name for cummins button.
        this.verifyButtonColor = function (text) {
            var redButton = element(by.cssContainingText('[class="ng-scope md-default-theme material-icons redButton"]', text));
            if (text === 'domain') {
                this.dealersButton.click();
            }
            else if (text === 'satellite') {
                this.satelliteButton.click();
            }
            else {
                this.cumminsButton.click();
            }
            expect(redButton.isDisplayed()).toBe(true, 'The button did not turn red.');
        };
    }
;

module.exports = new Dashboard2();

