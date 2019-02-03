var AdminEmailLogsPage = function() {

    this.allLogRows = element.all(by.repeater('notificationlog in search.results.entities.data'));
    this.mostRecentLog = element.all(by.repeater('notificationlog in search.results.entities.data')).get(0);

    this.get = function() {
        browser.get('http://admin-portal-qa.connectedfleet.io/#/nav/emails/list');
        browser.sleep(1000);
    }

};

module.exports = new AdminEmailLogsPage();
