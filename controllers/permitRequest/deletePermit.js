const asyncHandler = require('express-async-handler');
const Request = require('../../models/requestModel');

// @route DELETE /api/permit/:id
// @access private
const DeletePermit = asyncHandler(async (req, res) => {
    try {
        const permit = await Request.findById(req.params.id);
        if (permit) {
            // Make sure the logged in user matches the permit user
            await Request.findByIdAndDelete(req.params.id);
            res.status(200).json({ id: req.params.id });
        } else {
            // If permit not found, send a 404 response
            res.status(404).json({ message: 'Permit not found' });
        }
    } catch (error) {
        // If any error occurs, send a 400 response
        res.status(400).json({ message: 'Request not found' });
    }
});

module.exports = DeletePermit;
