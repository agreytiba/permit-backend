 const asyncHandler = require('express-async-handler')
const Request = require('../../models/requestModel');

const AddReview = asyncHandler(async (req, res) => {
const { id } = req.params;
    const { data } = req.body;

    try {
        // Find the permit by ID
        const permit = await Request.findById(id);

        if (permit) {
              permit.review.push(data);

        // Save the updated permit
        const updatedPermit = await permit.save();

        res.status(200).json(updatedPermit);
        }

        // Add data to the review array
      
    } catch (error) {
        console.error('Error adding data to review array:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
    
module.exports = AddReview;