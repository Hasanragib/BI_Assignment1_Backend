const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const { initializeDatabase } = require("./db/db.connect.js");
const Events = require("./models/event.models.js");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

async function createEvents(newEvent) {
  try {
    const event = new Events(newEvent);
    const saveEvent = await event.save();
    console.log("Event Saved Successfully", saveEvent);
  } catch (error) {
    throw error;
  }
}

app.post("/events", async (req, res) => {
  try {
    const saveEvents = await createEvents(req.body);
    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add Event." });
  }
});

async function viewAllEvents() {
  try {
    const viewEvents = await Events.find();
    // console.log(viewEvents);
    return viewEvents;
  } catch (error) {
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const allEvents = await viewAllEvents();
    if (allEvents != 0) {
      res.json(allEvents);
    } else {
      res.status(404).json({ error: "Events are not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

async function viewByTopic(topicName) {
  try {
    const byTopic = await Events.findOne({ topic: topicName });
    // console.log(byTopic);
    return byTopic;
  } catch (error) {
    throw error;
  }
}

app.get("/events/:topicName", async (req, res) => {
  try {
    const byName = await viewByTopic(req.params.topicName);
    if (byName) {
      res.json(byName);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log("Server is listening", PORT);
});
