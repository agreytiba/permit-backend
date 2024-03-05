const asyncHandler = require('express-async-handler')
const Request = require('../../models/requestModel');

// @desc Get permits
// @route GET /api/permit
// @access private
const GetToReview = asyncHandler(async (req, res) => {
  try {
    // Find permits where isReviewed is true
    const permits = await Request.find({isReviewed: false });

    if (permits.length > 0) {
      res.status(200).json(permits);
    } else {
      // If no permits with isReviewed true, send a 404 response
      res.status(404).json({ message: "No reviewed permits found" });
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = GetToReview;
