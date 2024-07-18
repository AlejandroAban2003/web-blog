import styled, { keyframes } from "styled-components";

export const GridContainer = styled.div`
  background: #000;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px;
  justify-content: center;
  align-items: start;
`;

export const Button = styled.button`
  padding: 10px 25px;
  background-color: #f27d16;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #d96511;
  }
`;
export const EditButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Container = styled.div`
  text-align: center;
  width: 65%;
  max-width: 1200px;
  margin: auto;
  background: #070A0E ;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeadCard = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background: #d96511;
  padding: 10px;
`;

export const Title = styled.h1`
  width: 80%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`;

export const EventCard = styled.div`
  width: 80%;
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-top: 40px;
`;

export const EventDetails = styled.div`
  margin-top: 20px;
  aling-items:center;
  border-radius: 5px;
  background: #DE7A2F  ;
  padding: 10px;
`;

export const EventTitle = styled.h2`
  width: 45%;
  background: #000;
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
  word-wrap: break-word;
  white-space: pre-wrap;
  margin-right: 20px;
  border-radius: 5px;
`;

export const EventImage = styled.img`
  width: 40%;
  max-height: 150px;
  border-radius: 10px;
  margin-left: 20px;
`;

export const EventInfo = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: #fff;

  strong {
    color: #D3D3D3;
  }
`;

export const Menu = styled.nav`
  background: #000;
  padding: 0 20px 0px 20px;
  display: flex;
  justify-content: space-between;
`;

export const MenuItem = styled.div`
  color: #fff;
  margin: 0 10px;
  
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 10px;
  position: relative;
  background: #333;
  border-radius: 10px;
  display: flex; /* Añadir flex para centrar */
  flex-direction: column; /* Colocar elementos en columna */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  color:#fff;
`;



export const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 3.5em;
  color: #fff;
`;

export const DateEvent = styled.div`
  background-color: #f27d16 !important; /* Color de fondo para fechas con eventos */
  color: white !important;
`
export const Asistentes = styled.div`
 align-items: center;
  display: flex;
  background: #333;
  justify-content: space-between; /* Distribuye el espacio entre elementos */
  padding: 10px; /* Añade un poco de espacio alrededor */
`

// Estilo para el contenedor del calendario y los eventos
export const CalendarContainer = styled.div`
  background: #000;
  color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const Highlight = styled.div`
  background: #ffeb3b;
  color: white;
`;

export const EventList = styled.div`
  margin-top: 20px;
`;

export const EventItem = styled.div`
  background: #333;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const EventTitleC = styled.h4`
  margin: 0;
  color: #ffeb3b;
`;

export const EventDescription = styled.p`
  margin: 0;
  color: white;
`;

export const TextForm = styled.p`
color:#000;
margin-left:25px;
margin-bottom:0;
direction: left;
`
export const InputForm = styled.input`
background: #f4f4d9;
margin:10px;
`
export const DivForm = styled.div`

margin:5px;
display: flex; /* Añadir flex para centrar */
  flex-direction: column; /* Colocar elementos en columna */
  justify-content: space-between; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
`


/* HTML: <div class="loader"></div> */
const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const Loader = styled.div`
  width: 50px;
  --b: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000 10%, #f27d16) content-box;
  -webkit-mask: 
    repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
    radial-gradient(farthest-side, #0000 calc(100% - var(--b) - 1px), #000 calc(100% - var(--b)));
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: ${rotate} 1s infinite steps(8);
`;