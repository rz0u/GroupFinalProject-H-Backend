const { Router } = require("express");
const eventRouter = Router();
const {
  createEvent,
  getEventId,
  getAllEvent,
  updateEvent,
  deleteEvent,
  // sellerDelete,
} = require("../controller/event");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

eventRouter.post("/", isAuthenticated, createEvent);
eventRouter.get("/:id", isAuthenticated, getEventId);
eventRouter.get("/", isAuthenticated, getAllEvent);
eventRouter.put("/:id", isAuthenticated, updateEvent);
eventRouter.delete("/:id", isAuthenticated, isAdmin("admin"), deleteEvent);
// eventRouter.delete('/seller-delete/:id', isAuthenticated, sellerDelete);

module.exports = eventRouter;
