const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success : false,
            message : "Something went wrong",
            err : "Email or password are missing"
        })
    }
    next();
}
module.exports = {
    validateUserAuth
}