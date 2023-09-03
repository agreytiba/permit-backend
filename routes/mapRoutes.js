const  express = require('express')
const router =express.Router()
const { getMap, getMaps, setMap, updateMapdetails, deleteMap } = require("../controllers/mapControllers")
const {protect} = require("../middleware/authMiddleware")
//  post and get all maps method have the same root address("/")
router.route('/').get( protect,getMaps).post(protect,setMap)


// getMap, update,delet map details have the same root address
router.route('/:id').get(protect,getMap).delete(protect,deleteMap).put(protect,updateMapdetails)

module.exports = router