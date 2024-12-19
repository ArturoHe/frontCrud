// URL del archivo JSON
const jsonUrl = './data/json/personas.json';

// Selecciona el cuerpo de la tabla
const tablaCuerpo = document.getElementById('tablaPersonas');

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
                <td>${item.cedula}</td>
                <td>${item.p_Nombre}</td>
                <td>${item.s_Nombre}</td>
                <td>${item.p_Apellido}</td>
                <td>${item.s_Apellido}</td>
                <td>${item.fecha_nacimiento}</td>
                <td>${item.sexo}</td>
                <td>${item.telefono}</td>
                <td>${item.correo}</td>
                <td>${item.estado_civil}</td>

                <button type="button" class="btn btn-warning" id="editar">Editar</button>
                <button type="button" class="btn btn-danger" id="borrar">Eliminar</button>

            `;
            tablaCuerpo.appendChild(fila);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));
