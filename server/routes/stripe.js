import express from "express";
const router = express.Router();

import { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting, stripeSessionId, stripeSuccess } from "../controllers/stripe";

// Middleware
import { requireSignin } from "../middlewares";

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/payout-setting", requireSignin, payoutSetting);
router.post("/stripe-session-id", requireSignin, stripeSessionId);
// Order
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
