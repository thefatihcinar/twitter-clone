
const express = require("express");

// make an instance of express
const app = express();

// Use Body Parser
// to parse elements in Request Form
const bodyParser = require("body-parser");
// relate body parser with express server (router)
app.use(bodyParser.urlencoded({extended: false}));


// No starting server here, because this is router not server

// Create router object
const router = express.Router();

// Use Pug
app.set("view engine", "pug");
app.set("views", "views"); // sources of pug files (views)


// HTTP Requests to twitter.com/register 
// redirected by server
// Server -> Router
router.get("/", (request, response, next) => {
    const OKAY = 200;
    response.status(OKAY).render("register"); // render register view

} );

router.post("/", (request, response, next) => {
    // This function will evaluate post requests to the server or router
    const OKAY = 200;

    let name = request.body.name.trim();
    let username = request.body.username.trim();
    let email = request.body.email.trim();
    let password = request.body.password;

    // Server-side validation
    // Make sure that none of them is empty
    // EMPTYNESS VALIDATION

    if(name && username && email && password){
        // there is no problem
        response.send("everything is cool for now");
    }
    else{
        // We do not want the user to lose information 
        // in register form
        // because we will ask the user to fill again
        // Keep all the values in the form 
        // i.e. SEND ALL DATA BACK TO FRONT-END
        let payload = request.body;
        payload.errorMessage = "Make sure each field has a valid value!"; 
        // render an error message
        response.status(OKAY).render("register", payload);
    }


    
});

module.exports = router; // export this router object