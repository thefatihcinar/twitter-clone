
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


    let name = request.body.name.trim();
    let username = request.body.username.trim();
    let email = request.body.email.trim();
    let password = request.body.password;

    
    console.log("Name: " + name);
    console.log("username: " + username);
    console.log("email: " + email);
    console.log("password: " + password);



    console.log(request.body);

    const OKAY = 200;
    response.send(request.body);
});

module.exports = router; // export this router object