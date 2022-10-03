import express from "express";
// Controllers
import { register, login, googleLogin, updateProfile, deleteAccount, confirmAccount } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.post("/update_profile", updateProfile);
router.post("/delete_account", deleteAccount);
router.get("/confirmation/:token", confirmAccount);

module.exports = router;
