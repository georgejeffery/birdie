var express = require("express");
var _ = require("lodash");
var router = express.Router();

var option = "'class of worker'";
var sql = `SELECT ${option}, age from census_learn_sql LIMIT 0, 5`;
var countarray = [];
var age = 0;

router.get("/", function(req, res, next) {
  res.locals.connection.query(sql, function(error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
    } else {
      for (var i in results) {
        countarray.push(_.values(results[i])[0]);
        age += results[i].age;
      }
      console.log(results.first);
      console.log(age);
      console.log(results.length);
      ave_age = age / results.length;
      output = _.countBy(countarray);
      console.log(_.countBy(countarray));
      res.send(JSON.stringify({ average_age: ave_age, sorted: output }));
    }
  });
});

module.exports = router;
