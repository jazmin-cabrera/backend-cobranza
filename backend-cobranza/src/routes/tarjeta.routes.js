const express = require("express");
const Tarjeta = require("../models/Tarjeta");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const tarjeta = await Tarjeta.create({
    ...req.body,
    usuario: req.usuario
  });
  res.json(tarjeta);
});

router.get("/", auth, async (req, res) => {
  const tarjetas = await Tarjeta.find({ usuario: req.usuario });
  res.json(tarjetas);
});


router.post("/:id/abono", auth, async (req, res) => {
  const { monto } = req.body;

  const tarjeta = await Tarjeta.findOne({
    _id: req.params.id,
    usuario: req.usuario
  });

  if (!tarjeta) {
    return res.status(404).json({ msg: "Tarjeta no encontrada" });
  }

  tarjeta.abonos.push({
    monto
  });

  tarjeta.restante = tarjeta.restante - monto;

  await tarjeta.save();

  res.json(tarjeta);
});

module.exports = router;
