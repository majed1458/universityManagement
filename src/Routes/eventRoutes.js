const express = require("express");
const router = express.Router();
const EventController = require("../Controlers/eventControler");
const { GererEvent ,logged} = require("../helpers/roleAccess");
const {createEventValidation} = require("../validation/eventValidation");

router.post(
  "/create",
  logged,
  GererEvent,
  createEventValidation(),
  EventController.CreateEvent
);
router.get("/getAll", EventController.GetAllEvents);
router.get("/getOne/:_id", EventController.GetOneEvent);
router.put("/update/:_id",logged,GererEvent, EventController.UpdateEvent);

router.delete("/delete/:_id",logged,GererEvent, EventController.DeleteEvent);

module.exports = router;
