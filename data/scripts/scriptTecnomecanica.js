// URL del archivo JSON
const jsonUrl = './data/json/tecnomecanica.json';

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
                <td>${item.fecha_revision}</td>
                <td>${item.fecha_vencimiento}</td>
                <td>${item.resultado}</td>
                <td>${item.valor}</td>
                <td>${item.centro_revision}</td>

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
    fechaEmisionTecnoMod = registro.children[2].innerHTML;
    fechaVencimientoTecnoMod = registro.children[3].innerHTML;
    resultadoTecnoMod = registro.children[4].innerHTML;
    valorTecnoMod = registro.children[5].innerHTML;
    cdaTecnoMod = registro.children[6].innerHTML;

    fechaEmisionTecnoMod = new Date(fechaEmisionTecnoMod).toISOString().split('T')[0];
    fechaVencimientoTecnoMod = new Date(fechaVencimientoTecnoMod).toISOString().split('T')[0];

    idMod = document.getElementById('idMod').setAttribute('value', id);
    idVehiculoMod = document.getElementById('idVehiculoMod').setAttribute('value', idVehiculoMod);
    fechaEmisionTecnoMod = document.getElementById('fechaEmisionTecnoMod').setAttribute('value', fechaEmisionTecnoMod);
    fechaVencimientoTecnoMod = document.getElementById('fechaVencimientoTecnoMod').setAttribute('value', fechaVencimientoTecnoMod);
    resultadoTecnoMod = document.getElementById('resultadoTecnoMod').setAttribute('value', resultadoTecnoMod);
    valorTecnoMod = document.getElementById('valorTecnoMod').setAttribute('value', valorTecnoMod);
    cdaTecnoMod = document.getElementById('cdaTecnoMod').setAttribute('value', cdaTecnoMod);
    


}
