var main = function () {
    //Here we can add a lot off selectors

    this.singIn = element(by.xpath('//div/a[@href="/login"]'));
    this.loginBtn = element(by.id('login-button'))

};

module.exports = new main();
