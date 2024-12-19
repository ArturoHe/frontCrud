// URL del archivo JSON
const jsonUrl = './data/json/departamentos.json';

// Selecciona el cuerpo de la tabla
const tablaCuerpo = document.getElementById('tablaDepartamentos');

// Función para poblar la tabla
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(item => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nombre_departamento}</td>
                <td>${item.codigo_departamento}</td>
            `;
            tablaCuerpo.appendChild(fila);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
