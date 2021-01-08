var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(request, result) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        result.render("index", hbsObject);
    });
});

router.post("/", function(request, result) {
    burger.create([
        "burger_name"
    ], [
        request.body.name
    ], function() {
        result.redirect("/");
    });
});

router.put("/:id", function(request, result) {
    var condition = "id = " + request.params.id;
    console.log("condition", condition);
    burger.update({
        devoured: request.body.devoured
    }, condition, function() {
        result.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;