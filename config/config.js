const ENABLE_CRON = process.env.ENABLE_CRON || "false";
const MIDTRANS_URL = process.env.MIDTRANS_URL || "";
const MIDTRANS_URL_POST = process.env.MIDTRANS_URL_POST || "";
const MIDTRANS_SECRET_KEY = process.env.MIDTRANS_SECRET_KEY;
const INTERVAL_INQUIRY = process.env.INTERVAL_INQUIRY || "* * * * *";

module.exports = {
  ENABLE_CRON,
  MIDTRANS_URL,
  MIDTRANS_URL_POST,
  MIDTRANS_SECRET_KEY,
  INTERVAL_INQUIRY,
};
