const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

// init middle ware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "My First Api in mern app" }));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/client", require("./routes/client"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Data Coming from server ${PORT}`));
