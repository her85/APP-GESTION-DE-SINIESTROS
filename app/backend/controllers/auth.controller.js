const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Importa bcryptjs
const { SECRET_KEY } = require("../config/config");
const { buscarUsuario } = require("../database/Usuario.model"); //ver de pasar por controller antes de model

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Datos de inicio de sesión:", req.body);
  try {
    const user = await buscarUsuario({ username });
    // Compara la contraseña ingresada con la contraseña hasheada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  
    // Genera el token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login exitoso", token, role: user.role  });
  } catch (error) {
    console.log(2);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { login };
