import { Router } from "express";
import { getParticipantsByEventId, getallEvent, getmyEvent, postEvent } from "../controllers/event.controller.js";
import { verifyJWTNGO } from "../middlewares/ngo.auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/postevent").post(postEvent)

router.route("/getallevent").post(getallEvent)
router.route("/getmyevent").post(verifyJWTNGO,getmyEvent)
router.route("/getparticipants").post(verifyJWTNGO,getParticipantsByEventId)


//secured routes 

// router.route("/logout").post(verifyJWTNGO, logoutNgo)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/changePassword").post(verifyJWTNGO, changePassword)
// router.route("/getCurrentUser").post(verifyJWTNGO, getCurrentUser)
// router.route("/updateAccountDetails").post(verifyJWTNGO, updateAccountDetails)
// router.route("/view-profile").post(viewProfile)
// router.route("/getallngos").post(getAllNgos)



export default router   