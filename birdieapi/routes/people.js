const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/:query", function(req, res, next) {
  let countarray = [];
  let agehash = {};
  let output = {};
  let option = `\`` + `${decodeURI(req.params.query)}` + `\``;
  let sql = `SELECT ${option} from census_learn_sql`;
  let p = new Promise((resolve, reject) => {
    res.locals.connection.query(sql, function(error, results, fields) {
      if (error) {
        // res.send(JSON.stringify({ status: 500, error: error, response: null }));
        reject(JSON.stringify({ status: 500, error: error, response: null }));
      } else {
        for (let i in results) {
          countarray.push(_.values(results[i])[0]);
        }
        let intoutput = _.countBy(countarray);
        var values = Object.values(intoutput);
        var keys = Object.keys(intoutput);
        // Sort the keys in descending order
        values.sort(function(a, b) {
          return b - a;
        });
        // Iterate through the array of keys and access the corresponding object properties
        for (var i = 0; i < values.length; i++) {
          output[keys[i]] = values[i];
        }
        let list = _.uniq(countarray);
        let out = 0;
        for (let x in list) {
          let section = '"' + `${list[x]}` + '"';
          q = `SELECT AVG(age) as ${section} FROM census_learn_sql WHERE ${option} = ${section}`;
          //console.log(x);
          res.locals.connection.query(q, function(error, result, fields) {
            if (error) {
              // console.log(error);
              reject(
                JSON.stringify({ status: 500, error: error, response: null })
              );
            } else {
              name = _.keys(result[0])[0];
              out = _.values(_.values(result)[0])[0];
              // console.log(name, out);
              agehash[name] = out;
              if (x == list.length - 1) {
                resolve(
                  JSON.stringify({ average_age: agehash, sorted: output })
                );
              }
            }
          });
        }
      }
    });
  });

  p.then(response => {
    res.send(response);
  }).catch(err => {
    res.send(err);
  });
});

module.exports = router;
