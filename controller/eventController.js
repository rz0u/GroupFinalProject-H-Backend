const ErrorHandler = require("../utils/ErrorHandler");
const isAuthenticated = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Event = require("../models/Event");
// const User = require("../models/User");


  const createEvent = async (req, res)=> {
    try {
      const { name, description, startDate, finishDate, status, price, img, shopId, promotionDate } = req.body;
      const newEvent = await Event.create({ name, description, startDate, finishDate, status, price, img, shopId, promotionDate });
      res.status(201).json({
        message: 'Event successfully created',
        data: newEvent,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create event' });
    }
  }

  const getEvent = async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await Event.getById(eventId);
      if (!event) {
        res.status(404).json({ error: 'Event not found' });
        return;
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get event' });
    }
  }

  const updateEvent = async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const dataToUpdate = req.body;
      const updatedEvent = await Event.update(eventId, dataToUpdate);
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update event' });
    }
  }

  const deleteEvent = async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      await Event.delete(eventId);
      res.status(204).send(); // No content after successful deletion
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event' });
    }
  }

module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
}
