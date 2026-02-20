import { Router } from "express";
import { UserClassController } from "../controller/UserController";
import { login, logout, resendOtp, verifyOtp, googleLogin } from "../controller/UserController";
import { authenticateToken } from "../middleware/JwtParsing";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/add", UserClassController.addUser.bind(UserClassController));
router.get("/all", authenticateToken, UserClassController.getUsers.bind(UserClassController));
router.get("/get/:id", UserClassController.getUserById.bind(UserClassController));
router.put("/update/:id", authenticateToken, UserClassController.updateUser.bind(UserClassController));
router.patch("/toggle/disabled/:id", authenticateToken, UserClassController.toggleUserDisabled.bind(UserClassController));
router.delete("/delete/:id", authenticateToken, UserClassController.deleteUser.bind(UserClassController));
router.post('/login', login);
router.post("/google", googleLogin);
router.post('/resend-otp', resendOtp);
router.patch("/change-password/:id", authenticateToken, UserClassController.changePassword);
router.post("/verify-otp", verifyOtp);
router.post('/forgot-password', UserClassController.forgotPassword);
router.post('/reset-password', UserClassController.resetPassword);
router.post("/logout", logout);
router.post('/users/:id/profile-pic', upload.single('file'), UserClassController.uploadProfilePic);
router.put("/:id/twostepv", authenticateToken, UserClassController.toggleTwoStepv);




export default router;
