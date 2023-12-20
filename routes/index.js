const { Router } = require("express");
const categoryRoutes = require("./categoryRoutes");
// const authRouter = require("./authRoutes");
// const dashboardRoutes = require("./dashboardRoutes");
// const preventAttackController = require("./preventAttackRoutes")

const router = Router();

// router.use("/", dashboardRoutes);
// router.use("/api/v1/auth", authRouter);
// router.use("/api/v1/attack", preventAttackController);
router.use("/api/v1/categories", categoryRoutes);

module.exports = router;