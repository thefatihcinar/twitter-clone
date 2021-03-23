const express = require("express");

const app = express();
// create an express instance

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
// telling to use this body parser

const router = express.Router();

// There is going to be NO VIEWS, NO VIEW ENGINGE, NO HTML
// NO CSS 

router.get("/", (request, response, next) => {

    // First check whether THERE IS A SESSION THAT IS SET
    if(request.session){
        // IF SESSION HAS BEEN SET
        // destroy this session 
        request.session.destroy( () => {
            // after destroying
            // redirect the user to login
            response.redirect("/login");
        });
    }
});

module.exports = router;