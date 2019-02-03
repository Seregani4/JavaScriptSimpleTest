var SubscriptionsPage = function () {
  var moment = require('moment');
  var envURL = browser.params.environment.url;
  var navigation = require('../pages/navigation.page.js');

    //Title
    this.subscriptionsHeader = element(by.css('[class="page-header-title ng-binding"]'));
    this.subscriptionsTitle = element(by.css('[class="md-title ng-binding ng-scope"]'));
    this.textFromVinRows = element.all(by.xpath('//td[3]/span/a[@ng-href]'));
    //Banners
    this.dashboardBanner = element(by.css('[class="license-banner-card"]'));
    this.callserviceBanner = element(by.css('[class="text-message ng-binding ng-scope"]'));
    //headers
    this.subscriptionsListTableHeader = $('tr').$$('th');
    this.unitNumbercolumn = element(by.xpath('//*[@id="subscription-list-table"]/md-card/list-table/md-table-container/table/tbody/tr/td[2]/span'));
    this.vinColumn = element(by.xpath('//*[@id="subscription-list-table"]/md-card/list-table/md-table-container/table/tbody/tr[1]/td[3]/span'));
    this.subsStatusColumn = element(by.xpath('//*[@id="subscription-list-table"]/md-card/list-table/md-table-container/table/tbody/tr[1]/td[7]/span'));
    this.totalVehiclesPagination = element(by.xpath('//*[@id="subscription-list-table"]/md-card/list-pagination/div/md-table-pagination/div[2]/div'));
    //Buttons
    this.viewCartBtn = element(by.cssContainingText('[class="ng-scope md-default-theme material-icons"]','shopping_cart'));
    this.addToCartBtn = element.all(by.cssContainingText('[class="ng-scope md-default-theme material-icons"]','add_shopping_cart'));
    this.removeFromCartBtn = element(by.cssContainingText('[class="ng-scope md-default-theme material-icons"]','check'));
    this.dismissBannerBtn = element(by.css('[class="md-cancel md-button md-default-theme md-ink-ripple"]'));
    this.subscriptionBannerBtn = element(by.css('[class="md-raised md-primary md-button md-default-theme md-ink-ripple"]'));
    this.cartIttemsNumber = element(by.xpath("//span[@id = '$viewCartNumber']"));
    this.clearFilterBtn = element(by.xpath('//*[@id="subscription-list-table"]/md-card/list-toolbar/md-toolbar/div/div/button/md-icon'));
    this.searchBar = element(by.css('[class="ng-scope ng-isolate-scope md-default-theme md-autofocus"]'));
    this.searchResults = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    //Table
    this.allSubscriptionsRows = element.all(by.repeater('row in $ctrl.rows'));
    //Especial buttons
    this.modifyDateBtn = element(by.css('[class="md-raised md-primary md-button md-default-theme md-ink-ripple"]')); //button for change subscription date
    //Botton text
    this.filterRecommendation = element(by.css('[class="message-container ng-scope"]'));
    //Shopping Cart Elements
    this.checkoutBtn = element(by.cssContainingText('[class="md-raised md-primary md-button md-default-theme md-ink-ripple"]','Checkout'));
    this.showListBtn = element(by.cssContainingText('[class="shopping-cart-card-content-md-button md-button md-default-theme md-ink-ripple"]','Show List'));
    this.vinList = element.all(by.css('[class="subscription-list-left-vin-cell ng-binding ng-scope"]'));
    this.deleteButton = element(by.xpath("//md-icon[@ng-click = '$ctrl.goToRoute()']"));
    this.pageHeader2 = element(by.css('[class="md-title ng-scope"]'));
    this.pageHeader3 = element(by.css('[class="shopping-cart-card-content md-subhead ng-scope"]'));
    this.pageHeader4 = element(by.css('[class="bulk-subscription-duration"]'));
    this.numberOfVehicles = element(by.css('[class="subscription-renewal"]'));
    this.numberOfYears = element(by.xpath('//*[@id="subscription-confirmation-table"]/md-card/md-card-content/div[2]/div[1]/div[2]/div/h4[1]'));
    this.bulkSubscriptionBtn = element(by.xpath('//*[@id="subscription-confirmation-table"]/md-card/md-card-content/div[2]/div[2]/div/bulk-subscription-duration/div/md-input-container'));
    this.oneYearBulkBtn = element.all(by.css('[ng-repeat="item in $ctrl.input"]')).get(0);
    this.twoYearBulkBtn = element.all(by.css('[ng-repeat="item in $ctrl.input"]')).get(1);
    this.threeYearBulkBtn = element.all(by.css('[ng-repeat="item in $ctrl.input"]')).get(2);

    //Confirm Contact Information elements
    this.UCPHeader2 = element(by.xpath('//*[@id="subscription-contact-confirmation-table"]/md-card/md-toolbar/div/h2'));
    this.UCPinstruction = element(by.xpath('//*[@id="subscription-contact-confirmation-table"]/md-card/md-card-content/div/span'));
    this.saveAndContBtn = element(by.xpath('//*[@id="subscription-contact-confirmation-table"]/md-card/div/div[1]/button'));
    this.UCPCancelBtn = element(by.xpath('//*[@id="subscription-contact-confirmation-table"]/md-card/div/div[2]/button'));
    this.UCPFirstName = element(by.xpath('//*[@id="contact-edit-form"]/div/md-card/md-card-content/ng-transclude/form/div[1]/md-input-container[1]'));
    this.UCPfirstNameField = element(by.name("firstName"));
    this.UCPLastName = element(by.xpath('//*[@id="contact-edit-form"]/div/md-card/md-card-content/ng-transclude/form/div[1]/md-input-container[2]'));
    this.UCPLastNameField = element(by.name("lastName"));
    this.UCPEmailAddr = element(by.xpath('//*[@id="contact-edit-form"]/div/md-card/md-card-content/ng-transclude/form/div[2]/md-input-container'));
    this.UCPemailAddrField = element(by.name("email"));
    this.UCPPhone = element(by.xpath('//*[@id="contact-edit-form"]/div/md-card/md-card-content/ng-transclude/form/div[3]/md-input-container[1]'));
    this.UCPPhoneField = element(by.name("phone"));
    this.UCPExtension = element(by.xpath('//*[@id="contact-edit-form"]/div/md-card/md-card-content/ng-transclude/form/div[3]/md-input-container[2]'));
    this.UCPExtensionField = element(by.name("extension"));
    this.UCPrequiredFieldMessage = element.all(by.css('[class="md-input-message-animation ng-binding ng-scope"]'));
    //Order Summary elements
    this.submitBtn = element(by.xpath('//*[@id="order-summary-table"]//button'));
    this.OSPHeader2 = element(by.xpath('//*[@id="order-summary-table"]//h2'));
    this.OSPHeader3 = element(by.xpath('//*[@id="order-summary-table"]//div[1]/h3'));
    this.OSPCustomerName = element(by.xpath('//*[@id="order-summary-table"]//div[2]/div/div/div[1]/h4'));
    this.OSPContactName = element(by.xpath('//*[@id="order-summary-table"]//div[2]/div/div/div[2]/h4'));
    this.OSPEmail = element(by.xpath('//*[@id="order-summary-table"]//div[2]/div/div/div[3]/h4'));
    this.OSPPhone = element(by.xpath('//*[@id="order-summary-table"]//div[2]/div/div/div[4]/h4[1]'));
    this.OSPExtension = element(by.xpath('//*[@id="order-summary-table"]//div[2]/div/div/div[4]/h4[2]'));
    this.OSPHeader3SubsRenew = element(by.xpath('//*[@id="order-summary-table"]//div[3]/h3'));
    this.OSPNumberOfVehicles = element(by.xpath('//*[@id="order-summary-table"]//div[4]/div[1]/div/span'));
    this.OSPVehicleText = element(by.xpath('//*[@id="order-summary-table"]//div[4]/div[1]/div/h4[1]'));
    this.OSPSubsRenewalsText = element(by.xpath('//*[@id="order-summary-table"]//div[4]/div[1]/div/h4[2]'));
    this.OSPSubsTime = element(by.xpath('//*[@id="order-summary-table"]//div[4]/div[2]/div/div'));
    this.OSPSubsTimeText = element(by.xpath('//*[@id="order-summary-table"]//div[4]/div[2]/div/div/h4[1]'));
    this.OSPQtyVehicles = element(by.xpath('//*[@id="order-summary-table"]//div[4]/div[2]/div/div/h4[3]'));
    this.shoppingCartBreadcrumb = element(by.xpath('//*[@id="main-content"]/ui-view/subscription-order-summary/breadcrumb/div/ol/li[3]/span/a'));
    this.OSPExtensionNull = element(by.xpath('//*[@id="order-summary-table"]//div[2]/div/div/div[4]'));
    
    //Final Order Confirmation elements
    this.toastConfirmation = element(by.css('[role="alert"]'));
    this.orderSubmitedTitle = element(by.css('[class="md-title ng-scope"]')); 
    this.orderConfirmationH3 = element(by.css('[class="order-confirmation-card-content md-subhead ng-scope"]'));
    this.orderConfirmationH4   = element(by.css('[class="order-confirmation-message"]'));

    this.columns = {
        tableVinColumn: {value: 2, name: 'VIN'},
    };


    //Functions
    this.verifySubscriptionsElementsIsVisible = function() {
        //titles
        expect(this.subscriptionsTitle.getAttribute('innerHTML')).toContain('Subscriptions', 'Table tile is missing or wrong');
        expect(this.subscriptionsHeader.getText()).toContain('Subscriptions', 'Title is missing');
        //Banner
        expect(this.callserviceBanner.getText()).toContain('To restore and extend service on any of your vehicles please call in US/CAN to 1-(877)-244-4517 or dialing from Mexico 001-(882)-244-4517.','Banner is missing or different');
        //headers
        expect(this.subscriptionsListTableHeader.getText()).toContain('Unit Number', 'Unit Number column is missing or wrong');
        expect(this.subscriptionsListTableHeader.getText()).toContain('VIN', 'VIN column is missing or wrong');
        expect(this.subscriptionsListTableHeader.getText()).toContain('Year', 'Year column is missing or wrong');
        expect(this.subscriptionsListTableHeader.getText()).toContain('Make', 'Make column is missing or wrong');
        expect(this.subscriptionsListTableHeader.getText()).toContain('Model', 'Model column is missing or wrong');
        expect(this.subscriptionsListTableHeader.getText()).toContain('Subscription End', 'Subscription End column is missing or wrong');
        expect(this.subscriptionsListTableHeader.getText()).toContain('Subscription Status', 'Subscription Status column is missing or wrong');
        expect(this.subscriptionsListTableHeader.getText()).toContain('Description', 'Description column is missing or wrong');
        //recommendation
        expect(this.filterRecommendation.getText()).toContain('Recommend using filters to refine your search such as Expired, Expiring Now or Expiring Soon.', 'Recommendation is missing or wrong');
    };

    this.checkDashboardBannerVisible = function(){
      expect(this.dashboardBanner.isDisplayed()).toBe(true);
      expect(this.dashboardBanner.getText()).toContain('There are Vehicles with Remote Diagnostics subscriptions that have expired or are expiring soon. Renew now for continued service.','Dashboard Banner is missing or different');
      expect(this.dismissBannerBtn.isDisplayed()).toBe(true);
      expect(this.dismissBannerBtn.getText()).toContain('DISMISS', 'Wrong text in the Dismiss button');
      expect(this.subscriptionBannerBtn.isDisplayed()).toBe(true);
      expect(this.subscriptionBannerBtn.getText()).toContain('VIEW SUBSCRIPTIONS', 'Wrong text in the Subscriptions button');
    };

    this.checkDashboardBannerInvisible = function(){
      expect(this.dashboardBanner.isPresent()).toBeFalsy();
    };

    this.changeSubscriptionDates = function(expiration,vin){
      var format = "MM/DD/YYYY"
      switch(expiration){
        case 'Expiring Now':
          browser.get(envURL + '/#/nav/vehicle/adjustsubscriptiondates/' + vin);
          var subsStart = element.all(by.xpath("//input[@class='md-datepicker-input md-input']")).get(0);
          subsStart.clear()
          subsStart.sendKeys(moment().subtract(2,"years").format(format));
          var subsEnd = element.all(by.xpath("//input[@class='md-datepicker-input md-input']")).get(1);
          subsEnd.clear()
          subsEnd.sendKeys(moment().add(10,"days").format(format));
          browser.sleep(5000)
          this.modifyDateBtn.click();
          break;
        case 'Expiring Soon':
          browser.get(envURL + '/#/nav/vehicle/adjustsubscriptiondates/' + vin);
          var subsStart = element(by.name('subscriptionStart'));
          subsStart.sendKeys(moment().subtract(2,"years").format(format));
          var subsEnd = element(by.name('subscriptionEnd'));
          subsEnd.sendKeys(moment().add(30,"days").format(format));
          this.modifyDateBtn.click();
          break;
        case 'Expired':
          browser.get(envURL + '/#/nav/vehicle/adjustsubscriptiondates/' + vin);
          var subsStart = element(by.name('subscriptionStart'));
          subsStart.sendKeys(moment().subtract(2,"years").format(format));
          var subsEnd = element(by.name('subscriptionEnd'));
          subsEnd.sendKeys(moment().subtract(2,"days").format(format));
          this.modifyDateBtn.click();
          break;
        default:
          console.log("No expiring option was selectd");
      };
    };

    this.verifySubscriptionBtnIsVisible = function(){
      expect(this.viewCartBtn.isDisplayed()).toBe(true);
      expect(this.dismissBannerBtn.isDisplayed()).toBe(true);
    };

    var vehicleNumber =  element(by.css('[class="buttons"]'));
    var badgeNumber = element(by.id('subscription.common.menu.div.id'));
    //Compare badge number with the number of vehicles Expired, Expiring Soon and Now

    this.getVehicleNumber = function(){
      vehicleNumber.getText().then(function(vehicleText){
        vehicleVar = cropVehicleNumber(Number(vehicleText.replace(/\s/g,'').split('of')[1]));
          badgeNumber.getText().then(function(badgeText){
            badgeVar = badgeText.replace(/\s/g,'');
            // console.log(vehicleVar);
            // console.log(badgeVar);
            if (cropVehicleNumber(Number(vehicleText.replace(/\s/g,'').split('of')[1])) == ''){
              expect(badgeNumber.isDisplayed()).toBeFalsy();
            }
            else {
              expect(badgeVar).toEqual(vehicleVar,'Total of vehicle is different from the badge number');
            };
        });
      });
    };

    this.confirmSubscriptionProccess = function() {
      //toastMessage
      this.checkForToastAlert();
      //titles
      expect(this.orderSubmitedTitle.getAttribute("textContent")).toContain('Order Submitted');
      expect(this.orderConfirmationH3.getAttribute("textContent")).toContain('Thank you for your order!');
      expect(this.orderConfirmationH4.getAttribute("textContent")).toContain('Your order has been submitted and is currently being processed. You will receive an email confirmation when your order is completed. Subscription renewals will be reflected in the portal within 24-48 hours. Note, we may contact you if we need additional information to process your order. If you need assistance with your order, please call 877-244-4517.');
    };

    this.checkForToastAlert = function(){
      browser.sleep(1000);
      browser.ignoreSynchronization = true;
      expect(this.toastConfirmation.getText()).toContain('The order has been submitted.');
      browser.sleep(1000);
      browser.ignoreSynchronization = false;
    };

    this.verifyShoppingCartPageElements = function () {
      this.showListBtn.click();
      expect(this.pageHeader2.getAttribute("textContent")).toContain('Shopping Cart');
      expect(this.pageHeader3.getAttribute("textContent")).toContain('Subscription Renewal');
      expect(this.pageHeader4.getAttribute("textContent")).toContain('Bulk Subscription Duration');
      expect(this.checkoutBtn.isDisplayed()).toBe(true,"checkout Btn not displayed");
      expect(this.deleteButton.isDisplayed()).toBe(true,"delete button not displayed");
      expect(this.vinList.isPresent()).toBeTruthy();
      expect(this.bulkSubscriptionBtn.isDisplayed()).toBe(true,"Bulk Subscription button not displayed");
      expect(this.oneYearBulkBtn.getAttribute("textContent")).toContain("1 Year");
      expect(this.twoYearBulkBtn.getAttribute("textContent")).toContain("2 Years");
      expect(this.threeYearBulkBtn.getAttribute("textContent")).toContain("3 Years");
    };

    this.validateCartItemCount = function (count) {
      return  expect(this.cartIttemsNumber.getText()).toBe("( "+count+" )","Wrong items number in cart");

    };

    this.validateUserConfirmationPageElements = function(){
      expect(this.UCPHeader2.getAttribute("textContent")).toContain("Confirm Contact Information");
      expect(this.UCPinstruction.getAttribute("textContent")).toContain("Please confirm that the contact information on file for your account is accurate and up-to-date. Please make any updates, if applicable, and select Save and Continue if this information looks correct.");
      expect(this.saveAndContBtn.isPresent()).toBeTruthy();
      expect(this.UCPCancelBtn.isPresent()).toBeTruthy();
      expect(this.UCPFirstName.getAttribute("textContent")).toContain("FIRST NAME");
      expect(this.UCPLastName.getAttribute("textContent")).toContain("LAST NAME");
      expect(this.UCPEmailAddr.getAttribute("textContent")).toContain("EMAIL ADDRESS");
      expect(this.UCPPhone.getAttribute("textContent")).toContain("PHONE");
      expect(this.UCPExtension.getAttribute("textContent")).toContain("EXTENSION");
    };

    this.checkPrePopulatedFields = function(firstname,lastname,email,phone,extension){
      expect(this.UCPfirstNameField.getAttribute("value")).toContain(firstname);
      expect(this.UCPLastNameField.getAttribute("value")).toContain(lastname);
      expect(this.UCPemailAddrField.getAttribute("value")).toContain(email);
      expect(this.UCPPhoneField.getAttribute("value")).toContain(phone);
      expect(this.UCPExtensionField.getAttribute("value")).toContain(extension);
    };

    this.clearRequiredFields = function(){
      this.UCPfirstNameField.clear();
      this.UCPLastNameField.clear();
      this.UCPemailAddrField.clear();
      this.UCPPhoneField.clear();
      this.UCPExtensionField.clear();
      expect(this.UCPrequiredFieldMessage.get(0).getText()).toContain("First name is required");
      expect(this.UCPrequiredFieldMessage.get(1).getText()).toContain("Last name is required");
      expect(this.UCPrequiredFieldMessage.get(2).getText()).toContain("Email is required");
      expect(this.UCPrequiredFieldMessage.get(3).getText()).toContain("Phone is required");
    };

    this.stressFields = function(){
      this.UCPfirstNameField.sendKeys("+12345678987654321");
      this.UCPLastNameField.sendKeys("+12345678945613245678945612345678965432132654987654321");
      this.UCPemailAddrField.sendKeys("+stress");
      this.UCPPhoneField.sendKeys("+654654654");
      this.UCPExtensionField.clear();
      expect(this.UCPrequiredFieldMessage.get(0).getText()).toContain("Name cannot be longer than 15 characters");
      expect(this.UCPrequiredFieldMessage.get(1).getText()).toContain("Last name must be less than 45 characters");
      expect(this.UCPrequiredFieldMessage.get(2).getText()).toContain("The E-Mail address is not valid");
      expect(this.UCPrequiredFieldMessage.get(3).getText()).toContain("Phone number must consist of 10 numbers");
    };

    this.verifyOrderSummaryPageElements = function (customer,firstname,lastname,email,phone,extension,qty,subsTime) {
      expect(this.OSPCustomerName.getText()).toContain(customer);
      expect(this.OSPContactName.getText()).toContain(firstname + " " + lastname);
      expect(this.OSPEmail.getText()).toContain(email);
      expect(this.OSPPhone.getText()).toContain(phone);
      if (extension == ""){
        expect(this.OSPExtensionNull.getText()).toBe(phone);
      }else{
      expect(this.OSPExtension.getText()).toContain(extension);
      };
      expect(this.OSPHeader2.getAttribute('innerHTML')).toContain("Order Summary");
      expect(this.OSPHeader3.getText()).toContain("Customer Information");
      expect(this.OSPHeader3SubsRenew.getText()).toContain("Subscription Renewal");
      expect(this.OSPVehicleText.getText()).toContain("Vehicles");
      expect(this.OSPSubsRenewalsText.getText()).toContain("Subscription Renewal");
      expect(this.OSPSubsTimeText.getText()).toContain("Year Subscription");
      expect(this.OSPQtyVehicles.getText()).toContain(qty);
      expect(this.OSPSubsTime.getText()).toContain(subsTime);
      expect(this.submitBtn.isPresent()).toBeTruthy();

    };
    
    this.searchNClick = function(filter,index) {
      this.clearFilterBtn.click();
      this.searchBar.sendKeys(filter);
      switch(index){
        case index:     
          this.searchResults.get(index).click();
          break;
        default:
        this.searchResults.get(0).click();
    };
    };

    this.addVinToCart = function (vin) {
      this.clearFilterBtn.click();
      this.searchBar.sendKeys(vin);
      this.searchResults.get(0).click();
      this.addToCartBtn.get(0).click();
    };

    function cropVehicleNumber(number){
      var cropped = Number(number)
    if (number > 99){ //Badge 99+
      cropped = '99+';
    }
    else if (number == 0) { //Badge Hidden
      cropped = '';
    }
    return String(cropped);
    };

    this.selectBulkBtn = function (years){
      this.bulkSubscriptionBtn.click()
      if (years == 1){
        navigation.waitTillElementToBeClickable(this.oneYearBulkBtn);
        this.oneYearBulkBtn.click();
      }else if(years == 2){
        navigation.waitTillElementToBeClickable(this.twoYearBulkBtn);
        this.twoYearBulkBtn.click();
      }else if(years == 3){
        navigation.waitTillElementToBeClickable(this.threeYearBulkBtn);
        this.threeYearBulkBtn.click();
      } else {
        console.log("no valid Bulk time was selected");
      }
    };

    this.clickVehicleHyperlinkCellSearch = function (vin) {
        var this1 = this;
        this.allSubscriptionsRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(this1.columns.tableVinColumn.value).getText().then(function (name) {
                return name === vin;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vehicle was found by that vin: ' + vin);
            } else {
                filteredRows[0].element(by.linkText(vin)).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vin);
            }
        });
    };
    
    this.combination2Elements = function(array) {
      var elements = array;
      var results = [];
      for (let i = 0; i < elements.length - 1; i++) {
        for (let j = i + 1; j < elements.length; j++) {
          results.push([elements[i],elements[j]]);
          this.clearFilterBtn.click();
          this.searchBar.sendKeys(elements[i]);
          this.searchResults.get(1).click();
          this.searchBar.sendKeys(elements[j]);
          this.searchResults.get(1).click();
          expect(this.vinColumn.getText()).toContain("1 - 2 of 2", 'wrong amount of vehicles');
        };
      };
    };
  };

module.exports = new SubscriptionsPage();
