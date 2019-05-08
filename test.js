var mysql = require("mysql");
//Database connection
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
    port: "3306",
    user: "test-read",
    password: "xnxPp6QfZbCYkY8",
    database: "birdietest"
  });
  res.locals.connect();
  next();
});

app.use("/api/vi/people", people);
