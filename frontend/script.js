const button = document.getElementById('button');
const url = document.getElementById('url');

button.addEventListener('click', () => {
    fetch("http://localhost:4000/download", {
        method: "GET"
    })
    .then((response) => {
        // Aquí verificamos si la respuesta es correcta
        if (!response.ok) {
            throw new Error("Error al descargar el video");
        }
        return response.blob(); // Convertimos la respuesta a un blob (archivo binario)
    })
    .then((blob) => {
        // Creamos una URL para el blob
        const downloadUrl = window.URL.createObjectURL(blob);
        
        // Creamos un enlace temporal
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'video.mp4'; // Nombre del archivo que queremos que tenga
        document.body.appendChild(link);
        link.click(); 
        link.remove(); 
    })
    .catch((err) => {
        console.error("Error:", err);
    });

    console.log("Click hecho en botón");
});
