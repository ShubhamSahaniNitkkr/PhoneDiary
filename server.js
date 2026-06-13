const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const { isDemoMode } = require("./config/demo");

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.get("/api/status", (req, res) =>
  res.json({ demoMode: isDemoMode(), message: "PhoneDiary API" })
);

app.get("/", (req, res) => res.json({ msg: "PhoneDiary API" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/client", require("./routes/client"));

if (process.env.SERVE_UI === "true") {
  app.use(express.static(path.join(__dirname, "ui/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ui/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (isDemoMode()) {
    console.log("Demo login: demo@demo.com / demo123");
  }
});
