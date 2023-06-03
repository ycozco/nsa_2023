function mostrarContenidoArchivo(filename) {
    const url = `http://localhost:3000/priv/${filename}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.querySelector("#htmlCode").innerHTML = data.htmlText;
            } else {
                console.error("Error al obtener el contenido del archivo.");
            }
        });
}

function guardarArchivo(title, content) {
    const url = 'http://localhost:3000/';
    const data = {
        title: title,
        content: content
    };
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(url, request)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.querySelector("#message").innerHTML = "<p>Archivo guardado exitosamente.</p>";
                mostrarListadoArchivos();
            } else {
                document.querySelector("#message").innerHTML = "<p>Error al guardar el archivo.</p>";
            }
        });
}

function mostrarListadoArchivos() {
    const url = 'http://localhost:3000/priv';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let fileList = document.querySelector("#fileList");
                fileList.innerHTML = ""; // Limpiar el listado existente

                data.files.forEach((file, index) => {
                    let button = document.createElement("button");
                    button.textContent = file.replace('.md', ''); // Remover la extensión .md
                    button.addEventListener("click", () => {
                        mostrarContenidoArchivo(file);
                    });

                    let listItem = document.createElement("li");
                    listItem.textContent = (index + 1) + ". ";
                    listItem.appendChild(button);

                    fileList.appendChild(listItem);
                });
            } else {
                console.error("Error al obtener el listado de archivos.");
            }
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    document.querySelector('#markupForm').onsubmit = () => {
        guardarArchivo(title.value, content.value);
        return false;
    }

    mostrarListadoArchivos();
});
