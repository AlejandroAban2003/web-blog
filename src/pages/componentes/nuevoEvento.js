import React from 'react';
import Swal from 'sweetalert';
import axios from 'axios';

const AgregarEvento = () => {
  const handleAddEvent = () => {
    Swal({
      title: 'Agregar Evento',
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre del evento">
        <input type="date" id="fecha" class="swal2-input" placeholder="Fecha del evento">
        <input type="time" id="hora" class="swal2-input" placeholder="Hora del evento">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción del evento"></textarea>
        <input type="text" id="invitados" class="swal2-input" placeholder="Invitados (separados por coma)">
        <input type="number" id="costo" class="swal2-input" placeholder="Costo del evento">
        <input type="text" id="lugar" class="swal2-input" placeholder="Lugar del evento">
        <select id="estado" class="swal2-input">
          <option value="próximos">Próximos</option>
          <option value="en curso">En curso</option>
          <option value="concluidos">Concluidos</option>
          <option value="cancelados">Cancelados</option>
        </select>
        <input type="text" id="imagen" class="swal2-input" placeholder="URL de la imagen">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const fecha = Swal.getPopup().querySelector('#fecha').value;
        const hora = Swal.getPopup().querySelector('#hora').value;
        const descripcion = Swal.getPopup().querySelector('#descripcion').value;
        const invitados = Swal.getPopup().querySelector('#invitados').value;
        const costo = Swal.getPopup().querySelector('#costo').value;
        const lugar = Swal.getPopup().querySelector('#lugar').value;
        const estado = Swal.getPopup().querySelector('#estado').value;
        const imagen = Swal.getPopup().querySelector('#imagen').value;

        if (!nombre || !fecha || !hora || !descripcion || !costo || !lugar || !estado) {
          Swal.showValidationMessage(`Por favor complete todos los campos requeridos`);
        }
        return { nombre, fecha, hora, descripcion, invitados, costo, lugar, estado, imagen };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { nombre, fecha, hora, descripcion, invitados, costo, lugar, estado, imagen } = result.value;
        axios.post('http://localhost:3000/api/eventos', {
          nombre,
          fecha,
          hora,
          descripcion,
          invitados: invitados ? invitados.split(',') : [],
          costo,
          lugar,
          estado,
          imagen
        })
          .then((response) => {
            Swal.fire('Evento agregado', '', 'success');
          })
          .catch((error) => {
            Swal.fire('Error al agregar el evento', error.message, 'error');
          });
      }
    });
  };

  return (
    <button onClick={handleAddEvent}>Agregar Evento</button>
  );
};

export default AgregarEvento;
