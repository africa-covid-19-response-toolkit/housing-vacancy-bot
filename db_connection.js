const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database:"HotelVacancy"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports=con;