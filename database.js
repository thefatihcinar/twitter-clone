// We would like to seperate logic from server
// Database Logic and Server Logic Must Be Different

const fs = require("fs");
/*
The require("mongoose") call below return a SINGLETON object
It means that the first time you call require("mangoose")
it is creating an instance of The Mangoose Class and returning it.
On subsequent calls, it will return THE SAME INSTANCE that was created
and returned to you the first time 
*/
const mongoose = require("mongoose"); //mongoose works on top of mongodb

// Configurations
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);


const adminPassword = fs.readFileSync("./PrivateData/mondodb_admin_key.txt").toString();

const connectionString = "mongodb+srv://admin:" + adminPassword +"@twittercluster.l5tqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


class Database
{
    constructor(){

        this.connect(); // connect to the database

    }

    connect(){
        // This method will connect this database instance to MongoDB database
        mongoose.connect(connectionString)
        .then(() => {
            console.log("Connection is succesful.");
        })
        .catch((error) => {
            console.log("Error Connecting to the Database");
            console.log(error);
        })
    }
}

module.exports = new Database(); 
// an instance of this database object will be exported