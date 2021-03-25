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
    $.post("/api/posts", data, (postData, status, xhr) => {
        console.log(postData);
    })

})
