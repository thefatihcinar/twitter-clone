function timeDifference(current, previous){
    /*
        this function calculates relative time from a point in time
        till now
    */

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    let elapsed = current - previous;
    // elapsed time between current time and previous time
    // in terms of ms

    if(elapsed < msPerMinute){
        if (elapsed / 1000 < 30){
            // if only 30 seconds have elapsed
            return "just now";
        }
        else{
            return Math.round(elapsed/1000) + " seconds ago";
        }
    }
    else if(elapsed < msPerHour){

        return Math.round(elapsed/msPerMinute) + " minutes ago";
    }
    else if(elapsed < msPerDay){

        return Math.round(elapsed/msPerHour) + " hours ago";
    }
    else if(elapsed < msPerMonth){

        return Math.round(elapsed/msPerDay) + " days ago";
    }
    else if(elapsed < msPerYear){
        
        return Math.round(elapsed / msPerMonth) + " months ago";
    }
    else{
        
        return Math.round(elapsed / msPerYear) + " years ago";
    }

}