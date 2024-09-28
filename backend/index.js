const express = require("express");
const server = express();
const cors = require("cors");
const youtubedl = require("youtube-dl-exec"); // Versión original
const path = require("path");
const fs = require("fs");

server.use(cors());
const PORT = process.env.PORT || 4000;

server.get("/", (req, res) => {
    res.send("Hola mundo");
});

server.get("/download", (req, res) => {
    const videoURL = "https://youtu.be/krDWc30PAGg?si=pA-R1frO2Fc7thyh";

    const outputPath = path.resolve(__dirname, 'output'); // Carpeta para guardar el archivo
    const outputFilePath = path.join(outputPath, 'video.mp4'); // Nombre del archivo

    // Si la carpeta 'output' no existe, la creamos
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    // Descargar el video en formato mp4 usando youtube-dl
    youtubedl(videoURL, {
        output: outputFilePath,
        format: 'mp4',
    }).then(() => {
        // Enviar el archivo al cliente para descargar
        res.download(outputFilePath, 'video.mp4', (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err);
                res.status(500).send('Error al enviar el archivo');
            } else {
                console.log("Archivo enviado correctamente");
            }

            // Eliminar el archivo después de enviarlo
            fs.unlinkSync(outputFilePath);
        });
    }).catch((error) => {
        console.error("Error al descargar el video:", error);
        res.status(500).send("Error al descargar el video");
    });
});

server.listen(PORT, () => {
    console.log(`Server funcionando correctamente en puerto: ${PORT}`);
});
