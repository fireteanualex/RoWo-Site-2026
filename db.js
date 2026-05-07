const mysql = require("mysql2");

const db = mysql.createConnection({

host: "localhost",
user: "root",
password: "",
database: "quiz_db"

});

db.connect(err=>{

if(err){

console.log(err);

}else{

console.log("mysql conectat");

}

});

module.exports = db;