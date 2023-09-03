const asyncHandler = require('express-async-handler')
const Work = require('../models/workModel')
const User =require('../models/userModel')
// @desc Get works
// @route GET /api/works
// @access private
const getWorks =asyncHandler( async(req,res)=>{
  const works = await Work.find()
    res.status(200).json(works)
}
) 


// @desc set works
// @route POST /api/works
// @access private
const setWork =asyncHandler(  async(req,res)=>{
    const data = req.body
    if (!data) {
        res.status(400)
        throw new Error('no data please fill the form')
    }
    const work = await Work.create(data)
    res.status(200).json(work)
}
)
// @desc update work
// @route PUT /api/works/:id
// @access private
const updateWork =asyncHandler( async(req,res)=>{
    const work = await Work.findById(req.params.id)
    if (!work) {
         res.status(400)
         throw new Error ('Work not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the work user
    if (work.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedWork =await Work.findByIdAndUpdate(req.params.id, req.body,{new: true,})
    res.status(200).json(updatedWork)
})


// @desc Get work
// @route GET /api/work
// @access private
const getWork =asyncHandler( async(req,res)=>{
  const work = await Work.findById(req.params.id)
    res.status(200).json(work)
}
)
// @desc  Delete work
// @route DELETE /api/works/:id
// @access private
const DeleteWork = asyncHandler( async(req,res)=>{
    const work = await Work.findById(req.params.id)

    // check for the work
    if(!work){
        res.status(400)
        throw new Error('Work not found')
    }
    const user  = await User.findById(req.user.id)
   
    // check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the  logged in user matche r the work user
    if (work.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }
    await work.remove()
    res.status(200).json({id: req.params.id})
})
module.exports ={getWorks,setWork,updateWork,DeleteWork,getWork}