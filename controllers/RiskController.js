const asyncHandler = require('express-async-handler')
const Risk = require('../models/controlRiskModel')
const User =require('../models/userModel')
// @desc Get risk
// @route GET /api/risk
// @access private
const getControlRisks =asyncHandler( async(req,res)=>{
  const risk = await Risk.find()
    res.status(200).json(risk)
}
) 


// @desc set risk
// @route POST /api/risk
// @access private
const setControlRisk =asyncHandler(  async(req,res)=>{
    const data = req.body

    if (data) {
        
        const risk = await Risk.create(data)
    res.status(200).json(risk)
    }
    res.status(400)
    throw new Error('no data please fill the form')
}
)
// @desc update risk
// @route PUT /api/risk/:id
// @access private
const updateControlRisk =asyncHandler( async(req,res)=>{
    const risk = await Risk.findById(req.params.id)
    if (!risk) {
         res.status(400)
         throw new Error ('Risk not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the risk user
    if (risk.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedRisk =await Risk.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updatedRisk)
})

// @desc Get risk
// @route GET /api/risk
// @access private
const getControlRisk =asyncHandler( async(req,res)=>{
      const risk = await Risk.findById(req.params.id)
    res.status(200).json(risk)
}
)
// @desc  Delete risk
// @route DELETE /api/risk/:id
// @access private
const deleteControlRisk = asyncHandler( async(req,res)=>{
    const risk = await Risk.findById(req.params.id)

    // check for the risk
    if(!risk){
        res.status(400)
        throw new Error('Risk not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the risk user
    if (risk.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }
   await Risk.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id})
})
module.exports ={getControlRisks,setControlRisk,updateControlRisk,deleteControlRisk,getControlRisk}