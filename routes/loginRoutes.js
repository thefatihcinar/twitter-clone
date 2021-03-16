const express = require("express");

const bcrypt = require("bcrypt");
// we'll use for password checking

const app = express();
// create express instance

// There is NO PORT HERE, because we are not going to create server
// There is NO MIDDLEWARE, because middleware redirects us here

// User Body Parser
// to parse elements in Login Form
const bodyParser = require("body-parser");
// relate the body parser with the express server
app.use(bodyParser.urlencoded({extended: false}));

const User = require("../schemas/UserSchema");
// in order to access User collection (table)

const router = express.Router();

const OKAY = 200;

// Keep these because we will use pug
app.set("view engine", "pug");
// say that we want to use pug template engine
app.set("views", "views");
// means that our pug views is located in views folder

// We call this router because it handles only this route
router.get("/", (request, response, next) => {

    var payload = {
        pageTitle : "Login"
    };
    
    
    response.status(OKAY).render("login", payload);
});

// Need to handle post request for login
router.post("/", async (request, response, next) => {

    var payload = request.body;
    // in order to send back to the client, 
    // to make the username entered if something wrong happens

    // Possiblity 1: GIVEN VALUES ARE VALID, PROPER
    if(request.body.logUsername && request.body.logPassword){
        // Check whether THIS USER EXISTS OR NOT
        var user = await User.findOne({
            $or:[
                {username: request.body.logUsername},
                {email: request.body.logUsername}]
        })
        .catch((error) => {
            // Something has gone wrong
            // This error is about SERVER, not user find or not
            console.log(error);
            payload.errorMessage = "Something went wrong.";

            // render login page again with username entered *
            response.status(OKAY).render("login", payload);

        });

        // Possibility 3: USER FOUND
        if(user != null){
            // PASSWORD CHECK
            // **EXTREMELY IMPORANT **
            // request.body.password IS NOT ENCRYPTED
            // but user.password IS ENCRYPTED 
            // so use library for this
            // COMPARISON: ENCRYPTED and NOT-ENCRYPTED
            var result = await bcrypt.compare(request.body.logPassword, user.password);
            // result is TRUE or FALSE

            // Possiblity 5: Username and Password ARE CORRECT
            if(result === true){
                // PASSWORD IS CORRECT
                // ** REMEMBER ** this user with sessions
                request.session.user = user;
                return response.redirect("/"); // show home page

            }
            else{
                // Possiblity 6: Username IS CORRECT, PASSWORD IS WRONG
                payload.errorMessage = "Password is incorrect.";
                // render login page with username entered with error message
                return response.status(OKAY).render("login", payload);

            }

        }
        // Possiblity 4: USER DOES NOT EXIST
        else{
            payload.errorMessage = "User does not exist.";
            // render login page with username entered with error message
            return response.status(OKAY).render("login", payload);
        }
    }
    // Possibility 2: GIVEN VALUES ARE NOT VALID, I.E. EMPTY
    else{

        payload.errorMessage = "Make sure each field has a valid value.";
        // render error message to page
        return response.status(OKAY).render("login", payload);
    }

});


// Export this router object
module.exports = router;