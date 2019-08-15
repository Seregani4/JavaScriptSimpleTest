


this.screenshot = function (data, filename, png) {

    var fs = require('fs');

    browser.takeScreenshot().then(function(png) {
        writeScreenShot(png, 'exception.png');
    });

    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

}