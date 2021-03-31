// This javascript file will be used for common things between pages

// Getting the text from tweeting area with jQuery
$("#tweetTextarea").keyup((event) => {

    let textarea = $(event.target); // where event happens
    let value = textarea.val().trim(); // read the value
    
    // When the user enters a tweet
    // Unless it is an empty tweet
    // Enable the tweet button

    let tweetButton = $("#tweetButton");
    
    // might be null
    if(tweetButton.length == 0){
        
        return console.error("tweet button not found");
    }
    
    // button works
    if(value == ""){
        // if the tweet is an empty tweet
        tweetButton.prop("disabled", true); 
        // keep the button disabled
        return;
    }

    // if the tweet is not empty
    // normal tweet
    // make the button enabled
    tweetButton.prop("disabled", false);
    return;

})

// Listening to the Tweet Button
$("#tweetButton").click((event) => {

    let theButton = $(event.target);

    // GET THE TEXT WHEN CLICKED

    let textarea = $("#tweetTextarea");
    let tweet = textarea.val().trim();

    // The tweet (i.e. data) for sending to the server
    let data = {
        content : tweet
    }

    // When clicked, SEND AN AJAX REQUEST TO THE SERVER
    $.post("/api/posts", data, (postTweet, status, xhr) => {
        // After the api respons to the add tweet
        // it will send post-tweet here
        
        let htmlCode = createTweetHTML(postTweet);
        // create html code for embedding the tweet
        
        $(".postsContainer").prepend(htmlCode);
        // add this html code to the posts container

        textarea.val("");
        // forget about the tweet in the tweet area

        theButton.prop("disabled", true);
        // disable the tweet button
    })

})

// Listening to the Like BUttons
$(document).on("click", ".likeButton", () => {
    /*
        this jQuery code listenes to the all like buttons on the page
    */

    alert("clicked to a like button");
    
})

function createTweetHTML(tweet){
    /*
        This function will create HTML code for this tweet
        i.e. Render this tweet
    */

    let postedBy = tweet.postedBy;

    let timestamp = timeDifference(new Date(), new Date(tweet.createdAt));
    // ... hours ago, ... minutes ago like this
    // add this to rendering

    // TWO TYPES OF RENDERING
    // 1. Verified Accounts
    // 2. Not Verified Accounts

    const isVerified = postedBy.verifiedAccount;

    // Source for verification icon
    let verificationSource = ""; // empty initially

    if(isVerified){
        // If this account is verified
        verificationSource = '/images/icons/verifiedAccount.png'
    }
    else{
        // If not verified, or null
        verificationSource = "";
    }

    return `<div class = 'post'>

                <div class = 'mainContentContainer'>
                    <div class = 'userImageContainer'>
                        <img src = '${postedBy.profilePicture}'>
                    </div>
                    <div class = 'postContentContainer'>
                        <div class = 'header'>
                            <a href = '/profile/${postedBy.username}' class = 'displayName'>${postedBy.name}</a>
                            <img src = '${verificationSource}' class = 'verificationBadge'> </img>
                            <span class = 'username'>@${postedBy.username}</span>
                            <span class = 'middle-point'>·</span>
                            <span class = 'date'>${timestamp}</span>
                        </div>
                        <div class = 'postBody'>
                            <span>${tweet.content}</span>
                        </div>
                        <div class = 'postFooter'>
                            <div class = 'postButtonContainer'>
                                <button>
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
                            <div class = 'postButtonContainer'>
                                <button>
                                    <i class='far fa-retweet'></i>
                                </button>
                            </div>
                            <div class = 'postButtonContainer'>
                                <button class = "likeButton">
                                    <i class='far fa-heart'></i>
                                </button>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>`;
    
    return tweet.content;
}