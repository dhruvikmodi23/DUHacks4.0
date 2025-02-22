import { Router } from "express";
import { changePassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, viewProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secured routes 

router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/changePassword").post(verifyJWT, changePassword)
router.route("/getCurrentUser").post(verifyJWT, getCurrentUser)
router.route("/updateAccountDetails").post(verifyJWT, updateAccountDetails)
router.route("/view-profile").post(viewProfile)



export default router   