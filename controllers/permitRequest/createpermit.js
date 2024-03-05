const asyncHandler = require('express-async-handler')
const Request = require('../../models/requestModel')
// const User =require('../models/userModel')



// @desc set permit
// @route POST /api/permit
// @access private
const setPermit =asyncHandler(  async(req,res)=>{
    try {
    console.log(req.body)
        const data = req.body
        if (!data) {
            res.status(400)
            throw new Error('no data please fill the form')
        }
    const permit = await Request.create(data)
        if (permit) {
            res.status(200).json(permit)
        }
        res.status(400).json({message:`failed to create request permit`})
    }
    
    catch (error) {
    throw new Error(error)
 }
}
)



// review update





module.exports = setPermit