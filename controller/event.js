const ErrorHandler = require("../utils/ErrorHandler");
const isAuthenticated = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Event = require("../models/Event");
const User = require("../models/User");


  const createEvent = async (req, res, next)=> {
    try {
      const { name, userId, description, startDate, finishDate, status, price, img, shopId, promotionDate } = req.body;
      const user = req.user.id;
      console.log("---------userId:", user);
      const newEvent = await Event.create({ name, userId: user, description, startDate, finishDate, status, price, img, shopId, promotionDate });
      res.status(201).json({
        message: 'Event successfully created',
        data: newEvent,
      });
    } catch (error) {
      // res.status(500).json({ error: 'Failed to create event' });
      return next(new ErrorHandler(error.message, 500));
    }
  }

  const getEventId = async (req, res, next) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await Event.get({ id: eventId });
      if (!event) {
        // res.status(404).json({ error: 'Event not found' });
        // return;
        return next(new ErrorHandler("Event not found", 400));
      }
      res.status(200).json(event);
    } catch (error) {
      // res.status(500).json({ error: 'Failed to get event' });
      return next(new ErrorHandler(error.message, 500));
    }
  }

  const getAllEvent = async (req, res, next) => {
    try {
      const events = await Event.getAll();
      console.log(events);
      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      // res.status(500).json({ error: 'Failed to get event' });
      return next(new ErrorHandler(error.message, 500));
    }
  }


  const updateEvent = async (req, res, next) => {
    try {
      const eventId = parseInt(req.params.id);
      const dataToUpdate = req.body;
      const updatedEvent = await Event.update(eventId, dataToUpdate);
      res.status(200).json(updatedEvent);
    } catch (error) {
      // res.status(500).json({ error: 'Failed to update event' });
      return next(new ErrorHandler(error.message, 500));
    }
  }

  const deleteEvent = async (req, res, next) => {
    try {
      const eventId = parseInt(req.params.id);
      await Event.delete(eventId);
      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      // res.status(500).json({ error: 'Failed to delete event' });
      return next(new ErrorHandler(error.message, 500));
    }
  }

  const sellerDelete = async (req, res, next) => {
    try {
      const eventId = parseInt(req.params.id);
      const userId = req.user.id; // Assuming the authenticated user's ID is available in req.user
      const userRole = req.user.role; // Assuming the authenticated user's role is available in req.user
  
      await Event.sellerDelete(eventId, userId, userRole);
  
      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  

module.exports = {
    createEvent,
    getEventId,
    getAllEvent,
    updateEvent,
    deleteEvent,
    sellerDelete,
}
