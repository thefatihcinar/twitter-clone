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

// Listening to the Like Buttons
$(document).on("click", ".likeButton", () => {
    /*
        this jQuery code listenes to the all like buttons on the page
    */

    let heartButton = $(event.target); // which like button is pressed ?
    let tweetID = getTweetIDFromElement(heartButton);

    if(tweetID === undefined) return;
    
    /*
        What will happen when like button clicked?
        Client will make a HTTP PUT REQUEST to the API
        and API will decide whether this user has liked 
        this post before or not
    */

    $.ajax({
        url: `api/posts/${tweetID}/like`,
        type: "PUT",
        success: (postData) => {

            // Update The Button to Show New Number of Likes
            heartButton.find("span").text(postData.likes.length || "");
            // if there is no like, do not display any text, such as text 0.

            let imageInsideHeartButton = heartButton.find("i");
            // Find image in like button, in order to change it when like is pressed
            
            /* Changing button color when Like Button is Pressed */

            // Check whether this user has liked this post or not
            let hasThisUserLikedThisPost = postData.likes.includes(userLoggedIn._id);

            if(hasThisUserLikedThisPost){
                // make the like button ACTIVE
                heartButton.addClass("active");

                // Remove class of image inside heart button
                imageInsideHeartButton.removeClass();
                // And RENDER FULL HEART ICON
                imageInsideHeartButton.addClass("fas");
                imageInsideHeartButton.addClass("fa-heart");
                
            }
            else{
                // make the like button DE-ACTIVE
                heartButton.removeClass("active");

                // Remove FULL HEART ICON from the image inside heart button
                imageInsideHeartButton.removeClass();
                // And RENDER EMPTY HEART ICON
                imageInsideHeartButton.addClass("far");
                imageInsideHeartButton.addClass("fa-heart");
                
            }
        }
    })
    
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

    /* 
        PROBLEM: Whenever the page loads, like and retweets buttons disappers
        we need to remember whether this user has liked this post or not before
        so get this information first
    */

    let likeButtonActiveClass = 
                tweet.likes.includes(userLoggedIn._id) ? "active" : "";
    /* NOW WE KNOW, inject this to html now */
    
    // Also render heart icons based on activity.
    let heartIconClass = "";
    if(likeButtonActiveClass){
        // if this user has liked the tweet
        // render full heart icon 
        heartIconClass = "fas fa-heart";
    }
    else{
        // if this user HAS NOT LIKED the tweet
        // render empty heart icon
        heartIconClass = "far fa-heart";
    }

    return `<div class = 'post' data-id = '${tweet._id}'>

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
                            <div class = 'postButtonContainer red'>
                                <button class = "likeButton ${likeButtonActiveClass}">
                                    <i class='${heartIconClass}'></i>
                                    <span>${tweet.likes.length || ""}</span>
                                </button>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>`;
    
}

function getTweetIDFromElement(element){
    /*
        this function will return the id of the tweet
        from an element
        will be used for retweet buttons, like buttons, click to a post
    */

    // If the clicked element is THE ROOT ELEMENT
    const isThisRootElement = element.hasClass("post"); 
    // if this element has the class post, this is the root element

    // get the root element, because only it has the tweet id data
    let rootElement = null;
    if(isThisRootElement){
        rootElement = element; // root element is this element
    }
    else{
        // root element is the closest element that has class post
        rootElement = element.closest(".post");
    }

    let tweetID = rootElement.data().id;

    if(tweetID === undefined){
        // if it does not have a tweet id
        alert("tweet id undefined");
    }

    return tweetID;

}