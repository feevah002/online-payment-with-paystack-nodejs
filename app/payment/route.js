const router = require("express").Router();
const {
  pay,
  getpayform,
  webhook
} = require("./controller")
const {
  isUserLoggedIn,
  
} = require("../../middleware/index")
router.get("/pay", isUserLoggedIn, getpayform)
router.post("/webhook/url", webhook)

// router.post("/:uid/checkout", paycontroller.createCheckOut)
// router.post("/webhook", paycontroller.webhook)
// router.get("/success", paycontroller.success)
// router.get("/cancel", paycontroller.cancel)

module.exports = router