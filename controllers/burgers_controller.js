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
        // result.json({ id: result.insertID});
        result.redirect("/");
    });
});

router.put("/:id", function(request, result) {
    var condition = "id = " + request.params.id;
    console.log("condition", condition);
    burger.update({
        devoured: request.body.devoured
    }, condition, function() {
    //     if (result.changedRows == 0) {
    //     return result.status(404).end();
    // } else {
    //     result.status(200).end()
    // }
        result.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;