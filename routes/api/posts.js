// POSTS API
// Responsible for all the post operations
const express = require("express");

const app = express();
// create an express instance

// use body parser
// will be used for parsing the http request for tweets
const bodyParser = require("body-parser");
// relate this body parser to the express server
app.use(bodyParser.urlencoded({extended: false}));

// SCHEMAS
const User = require("../../schemas/UserSchema");
// in order to access User collections (table)

const router = express.Router();

// THERE IS NO VIEW 
// BECAUSE THIS ROUTER / SERVER DOES NOT SERVE HTML PAGE


//router.get("/", );

router.post("/", (request, response, next) => {

    // Send BAD REQUEST if the data is invalid
    if(!request.body.content){
        // Tweet is missing somehow
        console.error("content parameter not sent with request");
        return response.sendStatus(400);
    }

    return response.status(200).send("TWEETS API WORK:):):):)");
});


// Export this router object
module.exports = router;