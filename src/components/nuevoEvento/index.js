import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomModal from '@/components/CustomModal';
import { Button, TextForm, MapContainer, Loader, InputForm, DivForm} from "@/styles/event.style";
import Swal from 'sweetalert2';

const AgregarEvento = ({ onEventAdded, eventToEdit, onEditComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    descripcion: '',
    invitados: '',
    costo: 0,
    lugar: '',
    imagen: '',
    estado: 'próximos',
    lat: 40.712776,
    lng: -74.005974
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData(eventToEdit);
      setShowModal(true);
    }
  }, [eventToEdit]);

  const handleShowModal = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setFormData(prevData => ({
        ...prevData,
        lat: latitude,
        lng: longitude
      }));
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nombre: '',
      fecha: '',
      hora: '',
      descripcion: '',
      invitados: '',
      costo: 0,
      lugar: '',
      imagen: '',
      estado: 'próximos',
      lat: 40.712776,
      lng: -74.005974
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    const { nombre, fecha, hora, descripcion, invitados, costo, lugar, lat, lng, imagen, estado } = formData;
  
    if (!nombre || !fecha || !hora || !descripcion || !lugar) {
      Swal.fire('Por favor complete todos los campos requeridos', '', 'error');
      return;
    }
  
    // Adjusting the date to avoid timezone issues
    const adjustedDate = new Date(fecha);
    adjustedDate.setHours(12); // Set to noon to avoid UTC issues
  
    const apiCall = eventToEdit
      ? axios.put(`http://localhost:3000/api/eventos/${eventToEdit._id}`, {
          ...formData,
          fecha: adjustedDate.toISOString()
        })
      : axios.post('http://localhost:3000/api/eventos', {
          nombre,
          fecha: adjustedDate.toISOString(),
          hora,
          descripcion,
          invitados: invitados.split(',').map(inv => inv.trim()),
          costo,
          lugar,
          estado,
          lat,
          lng,
          imagen,
        });
  
    apiCall
      .then(() => {
        Swal.fire('Evento guardado con éxito', '', 'success');
        handleCloseModal();
        onEventAdded();
        if (eventToEdit) onEditComplete();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error al guardar el evento', error.response?.data?.message || error.message, 'error');
      });
  };
  
  
  

  return (
    <>
      <Button onClick={handleShowModal}>{eventToEdit ? 'Editar Evento' : 'Agregar Evento'}</Button>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
      >
        <DivForm>
          <TextForm>nombre</TextForm>
          <InputForm type="text" name="nombre" className="form-control" placeholder="Nombre del evento" value={formData.nombre} onChange={handleChange} />
          <TextForm>Fecha</TextForm>
          <InputForm type="date" name="fecha" className="form-control" placeholder="Fecha del evento" value={formData.fecha} onChange={handleChange} />
          <TextForm>Hora</TextForm>
          <InputForm type="time" name="hora" className="form-control" placeholder="Hora del evento" value={formData.hora} onChange={handleChange} />
          <TextForm>Descripción</TextForm>
          <textarea name="descripcion" className="form-control" placeholder="Descripción del evento" value={formData.descripcion} onChange={handleChange}></textarea>
          <TextForm>Invitados</TextForm>
          <InputForm type="text" name="invitados" className="form-control" placeholder="Invitados (separados por coma)" value={formData.invitados} onChange={handleChange} />
          <TextForm>Costp</TextForm>
          <InputForm type="number" name="costo" className="form-control" placeholder="Costo del evento" value={formData.costo} onChange={handleChange} />
          <TextForm>Lugar</TextForm>
          <InputForm type="text" name="lugar" className="form-control" placeholder="Lugar del evento" value={formData.lugar} onChange={handleChange} />
          <MapContainer>
            <Loader></Loader>
            Cargando Mapa...
          </MapContainer>
                     
          <TextForm>Imagen</TextForm>
          <InputForm type="text" name="imagen" className="form-control" placeholder="URL de la imagen" value={formData.imagen} onChange={handleChange} />
          <TextForm>Estado del Evento</TextForm>
          <InputForm type="text" name="estado" className="form-control" placeholder="Estado del evento" value={formData.estado} onChange={handleChange} />
        </DivForm>
      </CustomModal>
    </>
  );
};

export default AgregarEvento;
