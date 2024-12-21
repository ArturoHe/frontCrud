// URL del archivo JSON
const jsonUrl = './data/json/vehiculo.json';

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
                <td>${item.id_dueno}</td>
                <td>${item.expedido}</td>
                <td>${item.nombre}</td>
                <td>${item.marca}</td>
                <td>${item.tipo}</td>
                <td>${item.color}</td>
                <td>${item.placa}</td>
                <td>${item.anio_fabricacion}</td>
                <td>${item.numero_serie}</td>

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

    idDuenoMod = registro.children[1].innerHTML;
    expedidoMod = registro.children[2].innerHTML;
    nombreVehiculoMod = registro.children[3].innerHTML;
    marcaVehiculoMod = registro.children[4].innerHTML;
    tipoVehiculoMod = registro.children[5].innerHTML;
    colorVehiculoMod = registro.children[6].innerHTML;
    placaVehiculoMod = registro.children[7].innerHTML;
    anioVehiculoMod = registro.children[8].innerHTML;
    noSerievehiculoMod = registro.children[9].innerHTML;


    idMod = document.getElementById('idMod').setAttribute('value', id);
    idDuenoMod = document.getElementById('idDuenoMod').setAttribute('value', idDuenoMod);
    expedidoMod = document.getElementById('expedidoMod').setAttribute('value', expedidoMod);
    nombreVehiculoMod = document.getElementById('nombreVehiculoMod').setAttribute('value', nombreVehiculoMod);
    marcaVehiculoMod = document.getElementById('marcaVehiculoMod').setAttribute('value', marcaVehiculoMod);
    tipoVehiculoMod = document.getElementById('tipoVehiculoMod').setAttribute('value', tipoVehiculoMod);
    colorVehiculoMod = document.getElementById('colorVehiculoMod').setAttribute('value', colorVehiculoMod);
    placaVehiculoMod = document.getElementById('placaVehiculoMod').setAttribute('value', placaVehiculoMod);
    anioVehiculoMod = document.getElementById('anioVehiculoMod').setAttribute('value', anioVehiculoMod);
    noSerievehiculoMod = document.getElementById('noSerievehiculoMod').setAttribute('value', noSerievehiculoMod);
    

}
