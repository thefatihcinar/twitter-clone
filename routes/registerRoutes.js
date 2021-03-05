
const express = require("express");

// make an instance of express
const app = express();

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

module.exports = router; // export this router object