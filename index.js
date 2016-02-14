

var express = require('express'),
    path = require("path"),
    views = path.join(__dirname, "views"),
    bodyParser = require("body-parser"),
    app = express();

app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));


app.get("/search", function (req, res) {
    var search = path.join(views, 'search.html');
    res.sendFile(search);
});


app.get("/stockinfo", function (req, res) {
    var stockinfo = path.join(views, 'stockinfo.html');
    res.sendFile(stockinfo);
});


app.get("/advanced", function (req, res) {
    var advanced = path.join(views, 'advanced.html');
    res.sendFile(advanced);
});




// start the server
app.listen(3000, function () {
    console.log("Go to localhost:3000/");
});