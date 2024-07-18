import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import AgregarEvento from '@/components/nuevoEvento/index';
import Customfooter from "@/components/CustomFooter";
import dynamic from 'next/dynamic';
import {
  GridContainer,  
  Container,
  Title,
  EventCard,
  EventDetails,
  EventTitle,  
  EventInfo,
  Menu,
  MenuItem,
  EventImage,
  Button,
  HeadCard,
  MapContainer,
  LoadingIcon,
  Asistentes
} from "@/styles/event.style";
import 'sweetalert2/src/sweetalert2.scss';

const MapComponent = dynamic(() => import('@/components/map'), { ssr: false });

function Evento() {
  const [eventos, setEventos] = useState([]);
  const [asistentes, setAsistentes] = useState({}); // Initialize the state

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/eventos');
      setEventos(response.data.eventos);
    } catch (error) {
      console.error("Error al obtener los eventos", error);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleAsistir = async (eventoId) => {
    try {
      await axios.post(`http://localhost:3000/api/eventos/${eventoId}/asistir`);
      setAsistentes(prev => ({ ...prev, [eventoId]: true })); // Update state to reflect attendance
      fetchEventos(); // Actualizar la lista de eventos después de asistir
    } catch (error) {
      console.error("Error al asistir al evento", error);
    }
  };

  return (
    <> 
      <Menu>
        <MenuItem>
          <AgregarEvento onEventAdded={fetchEventos} />
        </MenuItem>
        <MenuItem>
          <Link href="/gestionEvent">
            <Button>Gestionar Eventos</Button>
          </Link>
        </MenuItem>
      </Menu>
      <GridContainer> 
        <Container>
          <Title>Eventos</Title>
          {eventos.length > 0 ? (
            eventos.slice().reverse().map((evento) => (
              <EventCard key={evento._id}>
                <HeadCard>
                  <EventTitle>{evento.nombre}
                    <EventInfo>
                      {evento.descripcion}
                    </EventInfo>  
                  </EventTitle>
                 
                  {evento.imagen && <EventImage src={evento.imagen} alt={evento.nombre} />}
                </HeadCard>
                <EventDetails>
                  <MapContainer>      
                    {evento.lat && evento.lng ? (
                      <MapComponent lat={evento.lat} lng={evento.lng} />
                    ) : (
                      <LoadingIcon>Cargando Mapa...</LoadingIcon>
                    )}
                  </MapContainer> 
                  <EventInfo>
                    <strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString()} - {evento.hora}
                  </EventInfo>
                  
                  {evento.invitados && evento.invitados.length > 0 && (
                    <EventInfo>
                      <strong>Invitados:</strong> {evento.invitados.join(', ')}
                    </EventInfo>
                  )}
                  <EventInfo>
                    <strong>Costo:</strong> ${evento.costo}
                  </EventInfo>
                  <EventInfo>
                    <strong>Lugar:</strong> {evento.lugar}
                  </EventInfo>
                    
                  <EventInfo>
                    <strong>Estado:</strong> {evento.estado}
                  </EventInfo>
                </EventDetails>
                <Asistentes>
                  <Button onClick={() => handleAsistir(evento._id)}>
                    {asistentes[evento._id] ? "Asistirás a este evento" : "Asistir"}
                  </Button>
                  <EventInfo>
                    <strong>{evento.asistentes || 0}</strong> Asistentes
                  </EventInfo>
                </Asistentes>
              </EventCard> 
            ))
          ) : (    
            <p>No hay eventos disponibles</p>
          )}
        </Container>
      </GridContainer>
      <Customfooter />
    </>
  );
}

export default Evento;
