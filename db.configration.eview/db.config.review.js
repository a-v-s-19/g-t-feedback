const mysql=require("mysql");
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"reviewsystem"
});
db.connect(function(error){
    if(error) throw error;
    console.log("Database connected Successfully");
});
module.exports=db;