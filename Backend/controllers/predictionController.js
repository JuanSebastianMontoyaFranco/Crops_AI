const { spawn } = require('child_process');

exports.predict = async (req, res, next) => {
    const data = req.body;

    // Ejecutar el script de Python que carga el modelo y predice
    const pythonProcess = spawn('python', ['scripts/predict.py', // Asegúrate de que esta sea la ruta correcta al script
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]);

    let output = '';
    let errorOutput = '';

    // Capturar la salida estándar del script de Python
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    // Capturar la salida de errores (stderr)
    pythonProcess.stderr.on('data', (error) => {
        errorOutput += error.toString();
    });

    // Manejar el cierre del proceso y enviar la respuesta
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            // Si el código de salida no es 0, significa que hubo un error
            console.error(`Proceso de Python cerrado con código ${code}, error: ${errorOutput}`);
            return res.status(500).json({ error: 'Error al ejecutar el script de predicción', details: errorOutput });
        }

        // Enviar la respuesta solo si no hubo errores
        res.json({ crop: output.trim() });
    });
};
