const asyncHandler = require('express-async-handler')
const Permit = require('../models/permitModel')
const User =require('../models/userModel')
// @desc Get permit
// @route GET /api/permit
// @access private
const getPermits =asyncHandler( async(req,res)=>{
    const permits = await Permit.find()
      .populate('work')
      .populate('safety')
      .populate('risk')
      .exec();

    res.status(200).json(permits);
}
) 


// @desc set permit
// @route POST /api/permit
// @access private
const setPermit =asyncHandler(  async(req,res)=>{
 try {
    
    const data = req.body
    if (!data) {
        res.status(400)
        throw new Error('no data please fill the form')
    }
    const permit = await Permit.create(data)
    res.status(200).json(permit)} 
    catch (error) {
    throw new Error(error)
 }
}
)
// @desc update permit
// @route PUT /api/permit/:id
// @access private
const updatePermit =asyncHandler( async(req,res)=>{
    const permit = await Permit.findById(req.params.id)
    if (!permit) {
         res.status(400)
         throw new Error ('Permit not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the permit user
    if (permit.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatePermit =await Permit.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updatePermit)
})

// @desc Get permit
// @route GET /api/permit
// @access private
const getPermit =asyncHandler( async(req,res)=>{
      const permit = await Permit.findById(req.params.permitId)
      .populate('work')
      .populate('safety')
      .populate('risk');

    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }
}
)
// @desc  Delete permit
// @route DELETE /api/permit/:id
// @access private
const deletePermit = asyncHandler( async(req,res)=>{
    const permit = await Permit.findById(req.params.id)

    // check for the permit
    if(!permit){
        res.status(400)
        throw new Error('Permit not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the permit user
    if (permit.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }
   await Permit.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id})
})
module.exports ={getPermits,setPermit,updatePermit,deletePermit,getPermit}