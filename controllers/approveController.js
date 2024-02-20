const asyncHandler = require("express-async-handler");
const Permit = require("../models/permitModel");
const User = require("../models/userModel");
// @desc Get permit
// @route GET /api/permit
// @access private
const getPermits = asyncHandler(async (req, res) => {
  const permits = await Permit.find({ permitStatus: "Reviewed" })
    .populate("work")
    .populate("safety")
    .populate("risk")
    .exec();

  res.status(200).json(permits);
});


// Generate a random 6-digit number
function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}
// @route PUT /api/permit/:id
// @access private
const updatePermit = asyncHandler(async (req, res) => {
  try {
    const permitId = req.params.id;
    const newStatus = req.body.permitStatus;
    const approvedBy = req.body.approvedBy;
    const approveTime = req.body.approveTime;
    const approveDate = req.body.approveDate;
    const failedReasons = req.body.failedReasons;
    // Find the permit by its ID
    const permit = await Permit.findById(permitId);

    if (!permit) {
      return res.status(404).json({ message: "Permit not found" });
    }
    // generate permit number
    const random6DigitNumber = generateRandomNumber();
    const permitNumber =`PR${random6DigitNumber}`
    // Update the permitStatus
      permit.permitStatus = newStatus;
    //   check if failReasons is not equal to null
    if (failedReasons) {
      permit.approve.push({ approvedBy, approveTime, approveDate,permitNumber, failedReasons });
    }
    // Add the approvedBy and approveTime objects to the review array
 
    permit.approve.push({ approvedBy, approveTime, approveDate, permitNumber });
    // Save the updated permit
    const newPermit = await permit.save();

    res.json(newPermit);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// @desc Get permit
// @route GET /api/permit
// @access private

// @desc  Delete permit
// @route DELETE /api/permit/:id
// @access private
const deletPermitApprove = asyncHandler(async (req, res) => {
  const permit = await Permit.findById(req.params.id);

  // check for the permit
  if (!permit) {
    res.status(400);
    throw new Error("Permit not found");
  }
  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the  logged in user matche r the permit user
  if (permit.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  await Permit.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = { getPermits, updatePermit, deletPermitApprove};
