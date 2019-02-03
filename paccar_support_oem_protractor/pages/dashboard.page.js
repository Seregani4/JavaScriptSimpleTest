/**
 * Created by Cottomoeller on 4/20/2016.
 */
var DashboardPage = function(){

    this.pieChart = element(by.id('pieChart'));

    this.dsnField = element(by.name('dsn'));


    //Details
    this.detailsLink = element(by.id('device-details'));

    this.detailMap = element(by.css('[ng-if="$ctrl.mapUrl"]'))

    this.detailDsnVin = element.all((by.id('vin-detail')));

    this.detaildsn=element.all((by.id('vin-detail'))).get(1);

    this.detailVin=element.all((by.id('vin-detail'))).get(0);


};

module.exports = new DashboardPage();
