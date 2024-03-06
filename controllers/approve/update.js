const asyncHandler = require('express-async-handler');
const Request = require('../../models/requestModel');

const AddApprove = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const approvedBy = req.body.approvedBy;
    const approvedTime = req.body.approvedTime;
    const approvedDate = req.body.approvedDate;
    const failedReasons = req.body.failedReasons;
   
    try {
        // Find the permit by ID
        const permit = await Request.findById(id);

        if (!permit) {
            return res.status(404).json({ message: 'Permit not found' });
        }

        if (permit.isApproved) {
            return res.status(400).json({ message: 'Permit is already reviewed' });
        }

  if (failedReasons) {
        permit.approve.push({ approvedBy, approvedTime, approvedDate, failedReasons });
        permit.permitStatus = 'Failed';
        permit.isApproved = true;

        // Save the updated permit
        const updatedPermit = await permit.save();

        res.status(200).json(updatedPermit);
      
    }
        // Update permit status and set isReviewed to true
        permit.permitStatus = 'Approved';
        permit.isApproved = true;
        // Add the approvedBy and approvedTime objects to the review array
        permit.approve.push({ approvedBy, approvedTime, approvedDate});

        // Save the updated permit
        const updatedPermit = await permit.save();

        res.status(200).json(updatedPermit);
    } catch (error) {
        console.error('Error adding data to review array:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = AddApprove;
