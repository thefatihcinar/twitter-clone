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
const Post = require("../../schemas/PostSchema");
// in order to access Post collections (table)

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

    // i.e. data post
    let tweet = {
        content: request.body.content,
        postedBy: request.session.user,
        pinned: false
    };

    // Create new tweet
    Post.create(tweet)
    .then(async (newTweet) => {
        // Forward this new post (tweet) to the client
        // why?
        // it will render it 
        
        // We would like to add information about the user
        // in response, so get the info from User collection
        newTweet = await User.populate(newTweet, { path: "postedBy"});
        response.status(201).send(newTweet);
        // 201 : CREATED
    })
    .catch( (error) => {
        console.error("error");
        console.error("tweet not added to the db");
        return response.sendStatus(400); // BAD REQUEST
    })

    
});


// Export this router object
module.exports = router;