const express = require("express");

const app = express();
// create express instance

const PORT = 3003;

app.set("view engine", "pug");
// say that we want to use pug template engine
app.set("views", "views");
// means that our pug views is located in views folder

const server = app.listen(PORT, () => {
    console.log("Server is working on PORT " + PORT);
});

app.get("/", (request, response, next) => {

    var payload = {
        pageTitle: "Twitter Clone",
        pageHeading : "Welcome to Twitter, a Connected World",
        pageDescription : "This is where the World talks to each other."
    };
    
    const OKAY = 200;
    //response.status(OKAY).send("Server is ON! :)");
    response.status(OKAY).render("home", payload);
});
