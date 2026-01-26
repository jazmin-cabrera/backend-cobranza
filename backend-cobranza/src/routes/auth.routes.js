const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    nombre: req.body.nombre,
    email: req.body.email,
    password: hash
  });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: "No existe" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(400).json({ msg: "Contraseña mal" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
