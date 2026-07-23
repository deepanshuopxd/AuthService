const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success : false,
            data:{},
            message : "Something went wrong",
            err : "Email or password are missing"
        })
    }
    next();
}

const validateIsAdminRequest = (req,res,next) => {
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            success : false,
            message : "Something went wrong",
            err : "user ID not given"
        })
    }
    next();
}
module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}