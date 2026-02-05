const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  // Quitar "Bearer "
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guarda TODO el usuario, no solo el id
    req.usuario = decoded; // { id, email, ... }

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ msg: "Token inválido" });
  }
};
