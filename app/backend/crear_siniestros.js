const { database } = require('./database/db'); // Importa la instancia de la base de datos

async function main() {
    try {
        const siniestrosCollection = database.collection("siniestros"); // Obtiene la colección "siniestros"

        const generarNumeroSiniestro = async () => {
            const ultimoSiniestro = await siniestrosCollection.findOne({}, { sort: { numeroSiniestro: -1 } });
            return ultimoSiniestro ? ultimoSiniestro.numeroSiniestro + 1 : 1;
        };

        const tiposDocumento = ["DNI", "LE", "Pasaporte", "CUIT"];
        const tiposVehiculo = ["Auto", "Moto", "Camioneta", "Camion", "Acoplado"];
        const marcas = ["Ford", "Chevrolet", "Toyota", "Honda", "BMW", "Mercedes-Benz", "Fiat", "Renault"];
        const modelosAuto = ["Focus", "Cruze", "Corolla", "Civic", "Serie 3", "Clase C", "Palio", "Sandero"];
        const modelosMoto = ["XR", "Ninja", "Titan", "YBR", "CB"];
        const modelosCamioneta = ["Ranger", "S10", "Hilux", "Amarok"];
        const tiposSiniestro = ["Cristales", "Cerrajería", "Daño parcial", "Destruccion Total", "Granizo", "Incendio", "Responsabilidad civil", "Robo"];
        const direccionesSiniestroBase = ["Av. Rivadavia 123", "Calle San Martín 456", "Av. Corrientes 789", "Calle Florida 1011", "Ruta 8 Km 30"];
        const nombresClienteBase = ["Juan Pérez", "María Gómez", "Carlos López", "Ana Rodríguez", "José Martínez"];
        const direccionesClienteBase = ["Calle Falsa 123", "Avenida Siempreviva 742", "Pasaje Secreto 99", "Boulevard de los Sueños 555", "Camino del Lago 200"];
        const telefonosBase = ["1144445555", "1166667777", "1122223333", "1188889999", "1111110000"];
        const mailsBase = ["juan@example.com", "maria@example.net", "carlos@example.org", "ana@example.co", "jose@example.ar"];
        const descripcionesBase = ["Colisión en la esquina.", "Robo de vehículo estacionado.", "Daños por granizo.", "Incendio accidental.", "Rotura de parabrisas."];

        for (let i = 0; i < 10; i++) {
            const numeroSiniestro = await generarNumeroSiniestro();
            const tipoDoc = tiposDocumento[Math.floor(Math.random() * tiposDocumento.length)];
            const tipoVeh = tiposVehiculo[Math.floor(Math.random() * tiposVehiculo.length)];
            const marcaVeh = marcas[Math.floor(Math.random() * marcas.length)];
            let modeloVeh;
            switch (tipoVeh) {
                case "Auto":
                    modeloVeh = modelosAuto[Math.floor(Math.random() * modelosAuto.length)];
                    break;
                case "Moto":
                    modeloVeh = modelosMoto[Math.floor(Math.random() * modelosMoto.length)];
                    break;
                case "Camioneta":
                    modeloVeh = modelosCamioneta[Math.floor(Math.random() * modelosCamioneta.length)];
                    break;
                default:
                    modeloVeh = "Genérico";
                    break;
            }
            const tipoSin = tiposSiniestro[Math.floor(Math.random() * tiposSiniestro.length)];

            const nuevoSiniestro = {
                numeroSiniestro: numeroSiniestro,
                numeroPoliza: Math.floor(Math.random() * 100000) + 1000,
                tipoDocumento: tipoDoc,
                documento: Math.floor(Math.random() * 90000000) + 10000000,
                cliente: nombresClienteBase[Math.floor(Math.random() * nombresClienteBase.length)].toUpperCase(),
                direccionCliente: direccionesClienteBase[Math.floor(Math.random() * direccionesClienteBase.length)].toUpperCase(),
                telefonoCliente: telefonosBase[Math.floor(Math.random() * telefonosBase.length)],
                mailCliente: mailsBase[Math.floor(Math.random() * mailsBase.length)],
                tipoVehiculo: tipoVeh,
                patente: Math.random().toString(36).substring(2, 8).toUpperCase(),
                marca: marcaVeh.toUpperCase(),
                modelo: modeloVeh.toUpperCase(),
                anioFabricacion: Math.floor(Math.random() * (2024 - 2000 + 1)) + 2000,
                numeroDeMotor: Math.random().toString(36).substring(2, 10).toUpperCase(),
                numeroDeChasis: Math.random().toString(36).substring(2, 12).toUpperCase(),
                tipoSiniestro: tipoSin,
                fechaSiniestro: new Date(), // Genera la fecha actual
                direccionSiniestro: direccionesSiniestroBase[Math.floor(Math.random() * direccionesSiniestroBase.length)].toUpperCase(),
                descripcionSiniestro: descripcionesBase[Math.floor(Math.random() * descripcionesBase.length)],
            };

            await siniestrosCollection.insertOne(nuevoSiniestro);
            console.log(`Siniestro ${numeroSiniestro} insertado.`);
        }

        console.log("Se insertaron 10 siniestros exitosamente.");

    } catch (e) {
        console.error("Error al insertar:", e);
    }
}

main().catch(console.error);