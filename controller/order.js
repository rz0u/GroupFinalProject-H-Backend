const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/Order");
const Product = require("../models/Product");
const buySnap = require("./snap/create");
const getStatusSnap = require("./snap/getStatus");
const ErrorHandler = require("../utils/ErrorHandler");

// Create New Order
const postOrder = catchAsyncErrors(async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.body.userId;

  try {
    const product = await Order.getProductId(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    const amount = 15000;
    const randomCode = Math.floor(new Date().getTime() / 1000);
    const billCode = `ID-PESANAN-${randomCode}`;

    const response = await buySnap({
      transaction_details: {
        order_id: billCode,
        gross_amount: amount,
      },
      credit_card: { secure: true },
    });

    const snapUrl = response.redirect_url;
    const token = response.token;

    const order = await Order.create({
      userId,
      productId,
      amount,
      snapUrl,
      token,
      billCode,
    });
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Check Status by Order ID
const checkStatusId = async (order_id) => {
  try {
    const response = await getStatusSnap(order_id);
    const statusCode = parseInt(response.status_code, 10);
    if (statusCode == 404) {
      return [false, "Payment Channel Belum Dipilih"];
    }

    //if success
    return [true, response.transaction_status];
  } catch (error) {
    return [false, error.message];
  }
};

// Check Order Routine
const checkOrder = async (order_id) => {
  try {
    let listTransaction;
    if (typeof order_id !== "undefined") {
      listTransaction = await Order.checkTransactionPerDay(order_id);
    } else {
      listTransaction = await Order.checkTransactionPerDay();
    }

    for (const element of listTransaction) {
      const [isProcess, status] = await checkStatusId(element.billCode);
      if (isProcess) {
        if (status == "settlement") {
          await Product.promote(element.productId);
        }
        await Order.updateStatusTransaction(element.billCode, status);
      }
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

// Notify Transaction
const notifyTransaction = catchAsyncErrors(async (req, res, next) => {
  try {
    const order_id = req.body.order_id || undefined;

    await checkOrder(order_id);
    return res.status(200).json({
      success: true,
      message: "success",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Last Day Order
const lastDayTransaction = catchAsyncErrors(async (req, res) => {
  const listTransaction = await Order.checkTransactionPerDay();
  res.json(listTransaction);
});

// Get All Order
const allTransaction = catchAsyncErrors(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  const listTransaction = await Order.allTransaction(limit, page);
  res.json(listTransaction);
});

module.exports = {
  postOrder,
  checkOrder,
  notifyTransaction,
  lastDayTransaction,
  allTransaction,
};
