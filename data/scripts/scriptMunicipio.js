// URL del archivo JSON
const jsonUrl = './data/json/municipio.json';

// Selecciona el cuerpo de la tabla
const tablaCuerpo = document.getElementById('tablaDatos');

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
            fila.id = `registro${item.id}`;
            fila.innerHTML = `
                <td>${item.id}</td>
                <td>${item.id_departamento}</td>
                <td>${item.nombre_municipio}</td>
                <td>${item.codigo_municipio}</td>
                <td>${item.area}</td>

                <button onclick="editarPersona(registro${item.id},${item.id})" type="button" class="btn btn-warning" id="editar${item.id}" data-bs-toggle="modal" data-bs-target="#modalEditarRegistro">Editar</button>
                <button onclick="enviarIdBorrar(${item.id})" type="button" class="btn btn-danger" id="borrar${item.id}">Eliminar</button>

            `;
            tablaCuerpo.appendChild(fila);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));

// Función para borrar un registro

function enviarIdBorrar(item) {
    fetch('http://localhost:3000/submit', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: item.toString() })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    location.reload();
}


// Función para editar un registro
function editarPersona(registro, id) {

    idDepartamentoMod = registro.children[1].innerHTML;
    nombreMunicipioMod = registro.children[2].innerHTML;
    codigoMunicipioMod = registro.children[3].innerHTML;
    areaMunicipioMod = registro.children[4].innerHTML;

    idMod = document.getElementById('idMod').setAttribute('value', id);
    idDepartamentoMod = document.getElementById('idDepartamentoMod').setAttribute('value', idDepartamentoMod);
    nombreMunicipioMod = document.getElementById('nombreMunicipioMod').setAttribute('value', nombreMunicipioMod);
    codigoMunicipioMod = document.getElementById('codigoMunicipioMod').setAttribute('value', codigoMunicipioMod);
    areaMunicipioMod = document.getElementById('areaMunicipioMod').setAttribute('value', areaMunicipioMod);

}
