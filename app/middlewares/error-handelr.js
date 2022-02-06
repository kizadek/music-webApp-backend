
const {CustomApiError} = require("../services/errors/custom-error")
exports.errorHandleMiddleware = (err,req,res,next) =>{
      if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({
                success: false,
                massage:`${err.message}`
        })
      }
        console.log(`ERROR:${err}`)
     return res.status(500).json({
            success: false,
            msg: "sorry Something went wrong with the server, please try again"
        })
}