const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const taskRoutes = require("./routes/tasks.routes");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoutes);
app.use((err, req, res) => {
  return res.json({
    message: err,
  });
});

app.listen(4000);
console.log("Server on port 4000");
