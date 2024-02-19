const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: "process.env.USER",
  database: "process.env.DATABASE",
  password: "process.env.PASSWORD",
  host: "localhost",
  connectionLimit: 10,
});

// dbConnection.execute("select", "test", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbConnection.promise();
