const { Router } = require("express");
const userRouter = Router();
const {
  registerUser,
  activateUser,
  loginUser,
  loadUser,
  updateUserAddress,
  updateUserPassword,
  findUserId,
  findAllUsers,
  deleteUser,
  updateUser,
} = require("../controller/user");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

userRouter.post("/register", registerUser);
userRouter.post("/activation", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/getuser", loadUser);
userRouter.put("/update-user", isAuthenticated, updateUser);
userRouter.put("/update-address", isAuthenticated, updateUserAddress);
userRouter.put("/update-password", isAuthenticated, updateUserPassword);
userRouter.get("/find-user/:id", findUserId);
userRouter.get("/all-users", isAuthenticated, isAdmin("admin"), findAllUsers);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteUser
);

module.exports = userRouter;