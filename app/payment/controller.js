const crypto = require('crypto');
const secret = process.env.PAYSTACK_SECRET_KEY;
const paymentRepo = require("./repository")



//webhook
exports.webhook = async (req,res,next)=>{
  try{
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
      const event = req.body;
      const customer = event.data.customer;

      switch(event.event ){
        case "charge.success":
          console.log("transaction was successful")
          console.log(customer)
          //this will usully get saved to a database
          break;
        default:
      }
    res.status(200).send();
    }
  }catch(err){
    res.status(500).json({
      status: false,
      error:err
    })
  }
};

exports.success = async (req,res)=>{
  res.render("success")
}
exports.cancel = async (req,res)=>{
  res.render("cancel")
}

exports.getpayform = (req,res)=>{
  res.render("pay")
}