
const errorHandler = async (err, req, res, next) =>{
    const statusCode = err.statusCode || 500
    // console.log("err", err)
    res.status(statusCode).json({
        success: false,
        message: err.message,
        error: err.details
    });
}
 
module.exports = {
    errorHandler
}

// all the errors come here return as response in the end
//src -> modules -> users->service, controller, routes
//global error handler at root label

/*
1)change routes method 
2)global authentication(token verify jwt + reddis)// middleware
3)fix global error handling
4)implementation of refresh token
*/