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
        console.log(tweets)
    })
})