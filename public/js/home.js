/*
    will use jQuery
    AJAX 
    request tweets from the API
*/

$(document).ready(() => {
    /*
        make the AJAX request when the document is READY
    */
    // get the tweets
    $.get('/api/posts', (tweets) => {
        // render these tweets
        renderTweets(tweets, $(".postsContainer"));

    })
})

function renderTweets(tweets, container){
    /*
        this function will render tweets that are coming from server
        to the front-end in a way that is desired
    */

    // First flush the container
    container.html(""); // make it empty

    // There might be NO TWEETS 

    if(tweets.length == 0){
        // no tweets
        const NO_TWEETS_TEXT = "nothing to show";
        container.append(`<span class = 'nothingToShow'>${NO_TWEETS_TEXT}</span>`);
        return;
    }

    // There are tweets
    // render tweets one by one

    tweets.forEach( tweet => {
        
        let renderedHTML = createTweetHTML(tweet);
        // get the HTML code
        container.append(renderedHTML);
        // append this to the container
    });
    return;


    
}