// URL del archivo JSON
const jsonUrl = './data/json/vivienda.json';

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
                <td>${item.id_municipio}</td>
                <td>${item.barrio}</td>
                <td>${item.direccion}</td>
                <td>${item.estrato}</td>
                <td>${item.pisos}</td>
                <td>${item.tipo_vivienda}</td>
                <td>${item.descripcion}</td>


                <button onclick="editarRegistro(registro${item.id},${item.id})" type="button" class="btn btn-warning" id="editar${item.id}" data-bs-toggle="modal" data-bs-target="#modalEditarRegistro">Editar</button>
                <button onclick="borrarRegistro(${item.id})" type="button" class="btn btn-danger" id="borrar${item.id}">Eliminar</button>

            `;
            tablaCuerpo.appendChild(fila);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));

// Función para borrar un registro

function borrarRegistro(item) {
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
function editarRegistro(registro, id) {

    idMunicipioMod = registro.children[1].innerHTML;
    barrioMod = registro.children[2].innerHTML;
    direccionMod = registro.children[3].innerHTML;
    estratoMod = registro.children[4].innerHTML;
    numeroDePisosMod = registro.children[5].innerHTML;
    tipoDeViviendaMod = registro.children[6].innerHTML;
    descripcionMod = registro.children[7].innerHTML;

    idMod = document.getElementById('idMod').setAttribute('value', id);
    document.getElementById('idMunicipioMod').setAttribute('value', idMunicipioMod);
    document.getElementById('barrioMod').setAttribute('value', barrioMod);
    document.getElementById('direccionMod').setAttribute('value', direccionMod);
    document.getElementById('estratoMod').setAttribute('value', estratoMod);
    document.getElementById('numeroDePisosMod').setAttribute('value', numeroDePisosMod);
    document.getElementById('tipoDeViviendaMod').setAttribute('value', tipoDeViviendaMod);
    document.getElementById('descripcionMod').setAttribute('value', descripcionMod);


}
