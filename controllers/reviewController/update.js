const asyncHandler = require('express-async-handler');
const Request = require('../../models/requestModel');

const AddReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
   const reviewedBy = req.body.reviewedBy;
    const reviewTime = req.body.reviewTime;
    const reviewDate = req.body.reviewDate;
    const failedReasons = req.body.failedReasons;
   
    try {
        // Find the permit by ID
        const permit = await Request.findById(id);

        if (!permit) {
            return res.status(404).json({ message: 'Permit not found' });
        }

        if (permit.isReviewed) {
            return res.status(400).json({ message: 'Permit is already reviewed' });
        }

       if (failedReasons) {
        permit.review.push({ reviewedBy, reviewTime, reviewDate, failedReasons });
        permit.permitStatus = 'Failed';
        permit.isApproved = true;

        // Save the updated permit
        const updatedPermit = await permit.save();

        res.status(200).json(updatedPermit);
      
    }

        // Update permit status and set isReviewed to true
        permit.permitStatus = 'Reviewed';
        permit.isReviewed = true;

  permit.review.push({ reviewedBy, reviewTime, reviewDate});

        // Save the updated permit
        const updatedPermit = await permit.save();

        res.status(200).json(updatedPermit);
    } catch (error) {
        console.error('Error adding data to review array:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = AddReview;
