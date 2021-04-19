const express = require("express");

const path = require("path");

const app = express();
// create express instance

const middleware = require("./middleware");

const PORT = 8888;

const mongoose = require("./database");

const session = require("express-session");

app.set("view engine", "pug");
// say that we want to use pug template engine
app.set("views", "views");
// means that our pug views is located in views folder

// Serve public folder as static
app.use(express.static(path.join(__dirname, "public")));

// Setting Up Session
// First need Secret Key 
const SECRET_SENTENCE = "PROVE THEM WRONG";
app.use(session({ 
    secret: SECRET_SENTENCE,
    resave: true,
    saveUninitialized: false
}));

// ROUTES
// For different pages (routes), i will use these routers
const loginRoute = require('./routes/loginRoutes'); // get the router
const registerRoute = require('./routes/registerRoutes'); // get the router
const logoutRoute = require("./routes/logoutRoutes"); // get the router
// APIs
const postsAPIRoute = require("./routes/api/posts"); // get the router for api



// Use Body Parser
// to parse elements in Request Form
const bodyParser = require("body-parser");
// relate body parser with express server (router)
app.use(bodyParser.urlencoded({extended: false}));


// Use this router
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

// Using API Routers
app.use("/api/posts", postsAPIRoute);

const server = app.listen(process.env.PORT || PORT , () => {
    console.log("Server is working on PORT " + PORT);
});

app.get("/", middleware.requireLogin, (request, response, next) => {

    /*
        we have to pass user information to client as well
        client must know this user in order to RENDER
        because we use client side rendering
    */
    var payload = {
        pageTitle: "Home",
        pageHeading : "Welcome to Twitter, a Connected World",
        pageDescription : "This is where the World talks to each other.",
        userLoggedIn: request.session.user, // this is for PUG, we need user logged in in JS
        userLoggedInJS: JSON.stringify(request.session.user) // push it to the js
    };
    
    const OKAY = 200;
    //response.status(OKAY).send("Server is ON! :)");
    response.status(OKAY).render("home", payload);
});

