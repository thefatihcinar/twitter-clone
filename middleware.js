
exports.requireLogin = function(request, response, next){
    // This middleware checks whether there is a user associated or not

    console.log("Middleware working...");

    if(request.session && request.session.user){
        // if the request has Session information 
        // and if the request's session has user information
        return next(); // go to who calls you 

    }
    else{
        return response.redirect("/login");
    }

};