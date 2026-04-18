const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    // Basic Info for Listings
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      index: true, // Optimized for search
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide an image URL for the thumbnail"],
    },
    eventType: {
      type: String,
      required: true,
      enum: ["Online", "Offline", "Both"],
      default: "Both",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Detailed Description
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    topic: {
      type: String,
      required: true,
    },

    // Timings (Date + AM/PM)
    schedule: {
      eventDate: { type: Date, required: true },
      startTime: { type: Date, required: true }, // Store full ISO, format to AM/PM on frontend
      endTime: { type: Date, required: true },
    },

    // Detailed Speaker Information
    speakers: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        role: { type: String }, // e.g., "Senior Developer at Google"
        profileImage: { type: String }, // URL to speaker's photo
      },
    ],

    // Pricing
    pricing: {
      type: Number,
      min: 0, // Store in cents or decimals
    },

    // Venue & Address
    location: {
      venueName: { type: String }, // e.g., "Grand Ballroom" or "Zoom Link"
      address: { type: String }, // Physical address
      city: { type: String, default: "City" },
    },

    // Additional Information
    attendeeInfo: {
      dressCode: { type: String, default: "Casual" },
      ageRestriction: { type: Number, default: 0 }, // 0 for all ages
      additionalNotes: { type: String, default: "Be on time." },
    },
  },
  { timestamps: true },
);

// Text Index for Search Box (Title and Tags)
eventSchema.index({ title: "text", tags: "text" });

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
