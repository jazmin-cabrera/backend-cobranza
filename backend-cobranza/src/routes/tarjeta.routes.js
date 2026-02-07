const express = require("express");
const Tarjeta = require("../models/Tarjeta");
const auth = require("../middleware/auth");

const router = express.Router();

// CREAR TARJETA
router.post("/", auth, async (req, res) => {
  try {
    const tarjeta = await Tarjeta.create({
      ...req.body,
      usuario: req.usuario.id // 👈 SOLO EL ID
    });

    res.json(tarjeta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear tarjeta" });
  }
});

// OBTENER TARJETAS DEL USUARIO
router.get("/", auth, async (req, res) => {
  try {
    const tarjetas = await Tarjeta.find({
      usuario: req.usuario.id // 👈 SOLO EL ID
    });

    res.json(tarjetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener tarjetas" });
  }
});

// AGREGAR ABONO
router.post("/:id/abono", auth, async (req, res) => {
  try {
    const { monto } = req.body;

    const tarjeta = await Tarjeta.findOne({
      _id: req.params.id,
      usuario: req.usuario.id // 👈 SOLO EL ID
    });

    if (!tarjeta) {
      return res.status(404).json({ msg: "Tarjeta no encontrada" });
    }

    if (tarjeta.restante - monto < 0) {
    return res.status(400).json({ msg: "El abono excede el total" });
    }


    tarjeta.abonos.push({ monto });
    tarjeta.restante -= monto;

    await tarjeta.save();

    res.json(tarjeta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al registrar abono" });
  }
});

// Ver detalle de una tarjeta
router.get("/:id", auth, async (req, res) => {
  try {
    const tarjeta = await Tarjeta.findOne({
      _id: req.params.id,
      usuario: req.usuario.id // 👈 AQUÍ ESTABA EL ERROR
    });

    if (!tarjeta) {
      return res.status(404).json({ msg: "Tarjeta no encontrada" });
    }

    res.json(tarjeta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener tarjeta" });
  }
});



module.exports = router;
