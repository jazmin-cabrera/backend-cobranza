const mongoose = require("mongoose");

const TarjetaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  producto: String,
  precioUnidad: Number,
  total: Number,

  abonos: [
    {
      fecha: {
        type: Date,
        default: Date.now
      },
      monto: Number
    }
  ],

  restante: Number
});

module.exports = mongoose.model("Tarjeta", TarjetaSchema);
