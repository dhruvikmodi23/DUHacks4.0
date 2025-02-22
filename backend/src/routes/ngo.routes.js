import { Router } from "express";
import { changePassword, getCurrentUser, loginNgo, logoutNgo, refreshAccessToken, registerNgo, updateAccountDetails, viewProfile } from "../controllers/ngo.controller.js";
import { verifyJWTNGO } from "../middlewares/ngo.auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(registerNgo)

router.route("/login").post(loginNgo)

//secured routes 

router.route("/logout").post(verifyJWTNGO, logoutNgo)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/changePassword").post(verifyJWTNGO, changePassword)
router.route("/getCurrentUser").post(verifyJWTNGO, getCurrentUser)
router.route("/updateAccountDetails").post(verifyJWTNGO, updateAccountDetails)
router.route("/view-profile").post(viewProfile)



export default router   