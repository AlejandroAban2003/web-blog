import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Button,
  GridContainer,
  Container,
  Title,
  Menu,
} from "@/styles/event.style";
import AgregarEvento from '@/components/nuevoEvento/index';
import CalendarioEventos from '@/pages/componentes/calendario';
import { MenuItem } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GestionEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    const response = await axios.get('http://localhost:3000/api/eventos');
    setEventos(response.data.eventos);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/eventos/${id}`);
    fetchEventos();
    Swal.fire('Evento eliminado', '', 'success');
  };

  const handleEdit = (evento) => {
    setEventToEdit(evento);
  };

  const handleEditComplete = () => {
    setEventToEdit(null);
    fetchEventos();
  };

  return (
    <>
      <Menu>
        <MenuItem>
          <AgregarEvento onEventAdded={fetchEventos} eventToEdit={eventToEdit} onEditComplete={handleEditComplete} />
        </MenuItem>
        <MenuItem>
          <Button onClick={() => setShowCalendar(prev => !prev)}>Mostrar Calendario</Button>
        </MenuItem>
      </Menu>
      <GridContainer>
        <Container>
          {showCalendar && <CalendarioEventos />}
          <Title>Gestión de Eventos</Title>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Invitados</TableCell>
                  <TableCell>Costo</TableCell>
                  <TableCell>Lugar</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos.map(evento => (
                  <TableRow key={evento._id}>
                    <TableCell>{evento.nombre}</TableCell>
                    <TableCell>{evento.fecha}</TableCell>
                    <TableCell>{evento.hora}</TableCell>
                    <TableCell>{evento.descripcion}</TableCell>
                    <TableCell>{evento.invitados.join(', ')}</TableCell>
                    <TableCell>{evento.costo}</TableCell>
                    <TableCell>{evento.lugar}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(evento)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(evento._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </GridContainer>
    </>
  );
};

export default GestionEventos;
