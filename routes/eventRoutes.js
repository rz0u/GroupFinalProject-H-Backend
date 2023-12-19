const { Router } = require("express");
const eventRouter = Router();
const {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController");
// const { isAuthenticated } = require("../middleware/auth");

// eventRouter.get("/", isAuthenticated, getEvent);
eventRouter.post('/', createEvent)
// eventRouter.put('/:id', isAuthenticated, updateEvent)
// eventRouter.delete('/:id', isAuthenticated, deleteEvent)

module.exports = eventRouter;


