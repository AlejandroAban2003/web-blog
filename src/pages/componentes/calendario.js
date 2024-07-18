import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Title, CalendarContainer, Highlight, EventList, EventItem, EventTitleC, EventDescription } from "@/styles/event.style";


const CalendarioEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    const response = await axios.get('http://localhost:3000/api/eventos');
    setEventos(response.data.eventos);
  };

  const eventosDelDia = eventos.filter(evento => {
    const eventoFecha = new Date(evento.fecha).toDateString();
    return eventoFecha === date.toDateString();
  });

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const eventoFecha = eventos.find(evento => new Date(evento.fecha).toDateString() === date.toDateString());
      return eventoFecha ? 'highlight' : null;
    }
  };

  return (
    <Container>
      <Title>Calendario de Eventos</Title>
      <CalendarContainer>
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={tileClassName}
        />
      </CalendarContainer>
      <EventList>
        <h3>Eventos del {date.toLocaleDateString()}:</h3>
        {eventosDelDia.length > 0 ? (
          eventosDelDia.map(evento => (
            <EventItem key={evento._id}>
              <EventTitleC>{evento.nombre}</EventTitleC>
              <EventDescription>{evento.descripcion}</EventDescription>
            </EventItem>
          ))
        ) : (
          <p>No hay eventos para esta fecha.</p>
        )}
      </EventList>
    </Container>
  );
};

export default CalendarioEventos;
