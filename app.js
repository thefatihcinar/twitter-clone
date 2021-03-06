const express = require("express");

const path = require("path");

const app = express();
// create express instance

const middleware = require("./middleware");

const PORT = 3003;

app.set("view engine", "pug");
// say that we want to use pug template engine
app.set("views", "views");
// means that our pug views is located in views folder

// Serve public folder as static
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
// For different pages (routes), i will use these routers
const loginRoute = require('./routes/loginRoutes'); // get the router
const registerRoute = require('./routes/registerRoutes'); // get the router

// Use Body Parser
// to parse elements in Request Form
const bodyParser = require("body-parser");
// relate body parser with express server (router)
app.use(bodyParser.urlencoded({extended: false}));


// Use this router
app.use("/login", loginRoute);
app.use("/register", registerRoute);



const server = app.listen(PORT, () => {
    console.log("Server is working on PORT " + PORT);
});

app.get("/", middleware.requireLogin, (request, response, next) => {

    var payload = {
        pageTitle: "Twitter Clone",
        pageHeading : "Welcome to Twitter, a Connected World",
        pageDescription : "This is where the World talks to each other."
    };
    
    const OKAY = 200;
    //response.status(OKAY).send("Server is ON! :)");
    response.status(OKAY).render("home", payload);
});

