const asyncHandler = require('express-async-handler')
const Request = require('../../models/requestModel')

// @desc Get permit
// @route GET /api/permit
// @access private
const getPermits =asyncHandler( async(req,res)=>{
 try {
     const permits = await Request.find()
     
      
if (permits) {
    res.status(200).json(permits);
}
 res.status(400).json({message:"no permit"})
 } catch (error) {
    throw new Error(error)
 } 
}
) 

module.exports = getPermits