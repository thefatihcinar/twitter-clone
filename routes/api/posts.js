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


router.get("/", (request, response,next) => {
    /*
        This API, fetches all the tweets that are gonna be shown 
        to the user
        All the logic, followers, not-followers etc. will
        be implemented here.
    */
   /*
        All the tweet-fetching idea will be here!
   */

    Post.find()
    .populate("postedBy")
    .sort({"createdAt": -1}) // sort in descending manner, newest first
    .then((tweets) => {

        return response.status(200).send(tweets);

    })
    .catch((error) => {
        console.error(error);
        console.error("an error occurred while fetching tweets");
        return response.status(400);
    })
});

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

        newTweet.postedBy.password = ""; // forget the password
        
        response.status(201).send(newTweet);
        // 201 : CREATED
    })
    .catch( (error) => {
        console.error("error");
        console.error("tweet not added to the db");
        return response.sendStatus(400); // BAD REQUEST
    })

    
});


router.put("/:id/like", async (request, response, next) => {
    /*
        This API will handle PUT Requests to the Posts API
        It will specifically handle LIKES IN POSTS
    */

    // GET POST ID
    // Which tweet is this one?
    let tweetID = request.params.id;

    // GET USER ID
    // Who wants to like this tweet?
    let userID = request.session.user._id;
    
    // Figure Out: Whether this user has already liked this tweet or not
    let isLiked = request.session.user.likes && request.session.user.likes.includes(tweetID);
    /*
        checking whether the user HAS EVER LIKED ANY POST
        If the user has not liked any post, this tweet could not be liked
        Why check this? 
        To avoid reading null
        And we could have check tweet.likes but user.likes is easier.
    */
    /*
        based on isLiked situation, the API must decide whether
        to ADD_TO_SET or PULL_FROM_THE_SET
        i.e. add this like or remove this like
    */

    let option = isLiked ? "$pull" : "$addToSet";
    // if it is liked by this user, remove the like
    // if not liked by this user, add the like

    // USER SIDE - Insert the like
    request.session.user = 
        await User.findByIdAndUpdate(userID, {[option]: { likes: tweetID}}, {new: true})
        .catch( (error) => {
            console.log("an error occured while inserting like to the db");
            console.log(error);
            response.sendStatus(400);
        });
    /*
        SUPER IMPORTANT
        Session has OLD INFORMATION about user's likes. 
        It will not reflect liking operation recently.
        That is why we want new information from MongoDB about user
        and then UPDATE SESSION
    */
    
    // TWEET SIDE - Insert the like
    let tweet = await Post.findByIdAndUpdate(tweetID, {[option]: {likes: userID}} , {new: true})
    .catch((error) => {
        console.log("an error occured while inserting the like to the db");
        response.status(400);
    });


    response.status(200).send("put request processed by the api");
})


// Export this router object
module.exports = router;