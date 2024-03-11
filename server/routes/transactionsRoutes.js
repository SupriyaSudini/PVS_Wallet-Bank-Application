const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

const stripe = require("stripe")(process.env.stripe_key);
const { uuid } = require('uuidv4');


// transfer money from one account to another
// this api is active means valid accounts and also sufficient amount in account to transfer

router.post("/transfer-funds", authMiddleware, async (req, res) => {
  try {
    // first save the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    // transaction from above is saved with sender and receiver
    // now increase the balance in receiver and decrease from sender

    // decrease the sender's balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });

    // increase the receiver's balance
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });

    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    res.send({
      message: "transaction failed",
      data: error.message,
      success: false,
    });
  }
});

// verify receiver's account number(userid)
router.post("/verify-account", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        message: "Account Verified",
        data: user,
        success: true,
      });
    } else {
      res.send({
        message: "Account Not Found",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.send({
      message: " Account Not Found",
      data: error.message,
      success: false,
    });
  }
});

// get all transactions by user
router.post(
  "/get-all-transactions-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const transactions = await Transaction.find({
        $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      }).sort({createdAt : -1}).populate("sender").populate("receiver");
      res.send({
        message: "transactions fetched",
        data: transactions,
        success: true,
      });
    } catch (error) {
      res.send({
        message: "transactions not fetched",
        data: error.message,
        success: false,
      });
    }
  }
);

//deposit funds using stripe
router.post("/deposit-funds", authMiddleware, async(req, res) => {
  try{
    const {token, amount} = req.body;
    // create a customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // create a charge 
    const charge = await stripe.charges.create(
      {
        amount: amount *100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "Deposited to PVS_Wallet"
      },
      {
        // we need idempotency key 
        idempotencyKey: uuid(), // every time unique - we need to pass as per the security of stripe
      }
    );

    // save the transaction
    if(charge.status === "succeeded"){
        const newTransaction = new Transaction({
          sender : req.body.userId,
          receiver: req.body.userId,
          amount: amount,
          type: "deposit",
          reference: "stripe deposit",
          status : "success",
        });
        await newTransaction.save();

        // increase the users' balance
        await User.findByIdAndUpdate(req.body.userId,{
          $inc : {balance : amount},
        });
        res.send({
          message: "Transaction Successful",
          data: newTransaction,
          success: true,
        })
      }
      else{
        res.send({
          message: "Transaction Failed",
          data: charge,
          success: false
        });
      }
  }catch(error){
     res.send({
      message: "Transaction Fail",
      data: error.message,
      success: false,
     })
  }
});



module.exports = router;
