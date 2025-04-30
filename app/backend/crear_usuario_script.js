const prompt = require('prompt-sync')();
const bcrypt = require("bcryptjs")
const { database } = require('./database/db');
const usuarios = database.collection("usuarios");

async function crearNuevoUsuario() {
    const username = prompt('Ingrese el nombre de usuario: ');
    const password = prompt('Ingrese la contraseña: ');
    let role;

    while (!['Administrador', 'Tramitador', 'Consulta'].includes(role)) {
        role = prompt('Ingrese el rol (Administrador, Tramitador, Consulta): ');
        if (!['Administrador', 'Tramitador', 'Consulta'].includes(role)) {
            console.log('Rol inválido. Por favor, ingrese Administrador, Tramitador o Consulta.');
        }
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const nuevoUsuario = {
        username: username,
        password: hashedPassword,
        role: role
    };

    try {
        const result = await usuarios.insertOne(nuevoUsuario);
        console.log('\nUsuario creado exitosamente en la base de datos con el siguiente ID:', result.insertedId);
    } catch (error) {
        console.error('Error al insertar el usuario en la base de datos:', error);
    }
    // Aquí iría la lógica para conectar a tu base de datos e insertar el nuevoUsuario.
    // Como no tengo acceso a tu configuración de base de datos, te mostraré
    // cómo se verían los datos que deberías insertar.

    console.log('\nDatos del nuevo usuario a insertar en la base de datos:');
    console.log(nuevoUsuario);
    console.log('\n¡Usuario creado exitosamente! (Simulación)');
}

crearNuevoUsuario();