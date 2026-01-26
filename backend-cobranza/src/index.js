require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

const app = express();

connectDB();
app.get("/", (req, res) => {
  res.send("Backend de cobranza funcionando 🚀");
});


app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
  console.log("Servidor corriendo");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tarjetas", require("./routes/tarjeta.routes"));
