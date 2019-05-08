var express = require("express");
var _ = require("lodash");
var router = express.Router();

var option = "`class of worker`";
var sql = `SELECT ${option}, age from census_learn_sql`;

router.get("/:query", function(req, res, next) {
  var countarray = [];
  var age = 0;

  var option = `\`` + `${decodeURI(req.params.query)}` + `\``;
  var sql = `SELECT ${option}, age from census_learn_sql`;
  res.locals.connection.query(sql, function(error, results, fields) {
    if (error) {
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
    } else {
      for (var i in results) {
        countarray.push(_.values(results[i])[0]);
        age += results[i].age;
      }
      var ave_age = age / results.length;
      var output = _.countBy(countarray);
      var list = _.uniq(countarray);
      var bb = {};
      var out = 0;
      for (var x in list) {
        var section = '"' + `${list[x]}` + '"';
        q = `SELECT AVG(age) as ${section} FROM census_learn_sql WHERE ${option} = ${section}`;
        //console.log(x);
        res.locals.connection.query(q, function(error, result, fields) {
          if (error) {
            console.log(error);
          } else {
            name = _.keys(result[0])[0];
            out = _.values(_.values(result)[0])[0];
            console.log(name, out);
            bb[name] = out;
          }
        });
      }
      res.send(JSON.stringify({ average_age: bb, sorted: output }));
    }
  });
});

module.exports = router;
