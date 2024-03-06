const asyncHandler = require('express-async-handler');
const Request = require('../../models/requestModel');

// @desc Get permits to approve
// @route GET /api/permit
// @access private
const GetToApprove = asyncHandler(async (req, res) => {
  try {
    // Find permits where isReviewed is true but not yet approved
    const permits = await Request.find({
      isReviewed: true,
      isApproved: false
    });

    if (permits.length > 0) {
      // Return permits if found
      res.status(200).json(permits);
    } else {
      // If no permits found, send a 404 response
      res.status(404).json({ message: "No reviewed permits to approve found" });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in GetToApprove:", error);
    // Send an internal server error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = GetToApprove;
