const asyncHandler = require('express-async-handler')
const Request = require('../../models/requestModel')

// @desc Get permit
// @route GET /api/permit
// @access private
const ReadOne = asyncHandler(async (req, res) => {
   
 try {
    const permit = await Request.findById(req.params.id) 
if (permit) {
    res.status(200).json(permit);
}
 res.status(400).json({message:"no permit"})
 } catch (error) {
    throw new Error(error)
 } 
}
) 

module.exports = ReadOne