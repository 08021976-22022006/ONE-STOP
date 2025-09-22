const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();

const authRoutes = require("./routes/auth"); 

const app = express();
app.use(express.json());
app.use(cors())

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("One-Stop Dashboard Backend Running 🚀");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected 🚀"))
.catch(err => console.error("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
