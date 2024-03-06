const asyncHandler = require('express-async-handler');
const Request = require('../../models/requestModel');

// @desc Delete a permit by ID
// @route DELETE /api/permit/:id
// @access private
const deletePermit = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Find the permit by ID and delete it
        const deletedPermit = await Request.findByIdAndDelete(id);

        if (!deletedPermit) {
            // If permit with given ID not found, return 404 Not Found
            return res.status(404).json({ message: 'Permit not found' });
        }

        // If permit is successfully deleted, return success response
        res.status(200).json({ message: 'Permit deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting permit:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = deletePermit;
