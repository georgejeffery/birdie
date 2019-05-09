var express = require("express");
var _ = require("lodash");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.locals.connection.query(`describe census_learn_sql`, function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
    } else {
      var output = [];
      console.log(results);
      for (var i in results) {
        output.push(_.values(results[i])[0]);
      }
      res.send(JSON.stringify({ output }));
    }
  });
});

module.exports = router;
