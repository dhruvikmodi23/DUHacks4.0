import { Router } from "express";
import { applyToEvent } from "../controllers/eventdocument.controller.js";
import { verifyJWTNGO } from "../middlewares/ngo.auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/applytoevent").post(applyToEvent)

//router.route("/getallevent").post(getallEvent)

//secured routes 

// router.route("/logout").post(verifyJWTNGO, logoutNgo)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/changePassword").post(verifyJWTNGO, changePassword)
// router.route("/getCurrentUser").post(verifyJWTNGO, getCurrentUser)
// router.route("/updateAccountDetails").post(verifyJWTNGO, updateAccountDetails)
// router.route("/view-profile").post(viewProfile)
// router.route("/getallngos").post(getAllNgos)



export default router   