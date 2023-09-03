const asyncHandler = require('express-async-handler')
const Safety = require('../models/safetyModel')
const User =require('../models/userModel')
// @desc Get safety
// @route GET /api/safety
// @access private
const getSafetys =asyncHandler( async(req,res)=>{
  const safety = await Safety.find()
    res.status(200).json(safety)
}
) 


// @desc set safety
// @route POST /api/safety
// @access private
const setSafety =asyncHandler(  async(req,res)=>{
    const data = req.body
    if (!data) {
        res.status(400)
        throw new Error('no data please fill the form')
    }
    const safety = await Safety.create(data)
    res.status(200).json(safety)
}
)
// @desc update safety
// @route PUT /api/safety/:id
// @access private
const updateSafety =asyncHandler( async(req,res)=>{
    const safety = await Safety.findById(req.params.id)
    if (!safety) {
         res.status(400)
         throw new Error ('Safety not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the safety user
    if (safety.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const updateSafety =await Safety.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updateSafety)
})

// @desc Get safety
// @route GET /api/safety
// @access private
const getSafety =asyncHandler( async(req,res)=>{
      const safety = await Safety.findById(req.params.id)
    res.status(200).json(safety)
}
)
// @desc  Delete safety
// @route DELETE /api/safety/:id
// @access private
const deleteSafety = asyncHandler( async(req,res)=>{
    const safety = await Safety.findById(req.params.id)

    // check for the safety
    if(!safety){
        res.status(400)
        throw new Error('Safety not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the safety user
    if (safety.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }
   await Safety.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id})
})
module.exports ={getSafetys,setSafety,updateSafety,deleteSafety,getSafety}