const mongoose = require("mongoose");
const { enableDemoMode } = require("./demo");

const connectDB = async () => {
  if (process.env.DEMO_MODE === "true") {
    enableDemoMode();
    const store = require("../mock/store");
    await store.seed();
    console.log("DEMO_MODE enabled — using in-memory data");
    return;
  }

  let db = process.env.MONGO_URI;
  if (!db) {
    try {
      const config = require("config");
      db = config.get("mongoURI");
    } catch (e) {
      db = null;
    }
  }

  if (!db) {
    console.log("No MongoDB URI configured, falling back to DEMO_MODE");
    enableDemoMode();
    const store = require("../mock/store");
    await store.seed();
    return;
  }

  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("mongodb connected");
  } catch (error) {
    console.log("MongoDB unavailable, falling back to DEMO_MODE");
    enableDemoMode();
    const store = require("../mock/store");
    await store.seed();
  }
};

module.exports = connectDB;
