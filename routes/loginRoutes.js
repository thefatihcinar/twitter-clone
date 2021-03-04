const express = require("express");

const app = express();
// create express instance

// There is NO PORT HERE, because we are not going to create server
// There is NO MIDDLEWARE, because middleware redirects us here

const router = express.Router();


// Keep these because we will use pug
app.set("view engine", "pug");
// say that we want to use pug template engine
app.set("views", "views");
// means that our pug views is located in views folder

// We call this router because it handles only this route
router.get("/", (request, response, next) => {

  
    
    const OKAY = 200;
    response.status(OKAY).render("login");
});

// Export this router object
module.exports = router;