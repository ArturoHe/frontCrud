// URL del archivo JSON
const jsonUrl = './data/json/soat.json';

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
                <td>${item.id_vehiculo}</td>
                <td>${item.fecha_emision}</td>
                <td>${item.fecha_vencimiento}</td>
                <td>${item.aseguradora}</td>
                <td>${item.valor}</td>

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

    idVehiculoMod = registro.children[1].innerHTML;
    fechaEmisionSoat = registro.children[2].innerHTML;
    fechaVencimientoSoat = registro.children[3].innerHTML;
    aseguradoraSoatMod = registro.children[4].innerHTML;
    valorSoatMod = registro.children[5].innerHTML;

    fechaEmisionSoat = new Date(fechaEmisionSoat).toISOString().split('T')[0];
    fechaVencimientoSoat = new Date(fechaVencimientoSoat).toISOString().split('T')[0];

    idMod = document.getElementById('idMod').setAttribute('value', id);
    idVehiculoMod = document.getElementById('idVehiculoMod').setAttribute('value', idVehiculoMod);
    fechaEmisionSoatMod = document.getElementById('fechaEmisionSoatMod').setAttribute('value', fechaEmisionSoat);
    fechaVencimientoSoatMod = document.getElementById('fechaVencimientoSoatMod').setAttribute('value', fechaVencimientoSoat);
    aseguradoraSoatMod = document.getElementById('aseguradoraSoatMod').setAttribute('value', aseguradoraSoatMod);
    valorSoatMod = document.getElementById('valorSoatMod').setAttribute('value', valorSoatMod);

}
