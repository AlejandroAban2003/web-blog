import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import Customfooter from "@/components/CustomFooter";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  background-color: #f27d16;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ProfileBio = styled.p`
  color: #000;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span`
  color: #000;
`;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const loading = () => {
    return (
      <Container>
        <ProfileContainer>
          <Skeleton variant="circular" width={200} height={200} />
          <Skeleton variant="text" width={150} height={30} />
          <Skeleton variant="text" width={300} height={20} />
          <Skeleton variant="text" width={400} height={20} />
        </ProfileContainer>
      </Container>
    );
  };

  if (isLoading) return loading();

  return (
    <div style={{width:"100%",backgroundColor:"#000"}}>
    <Container>
      <ProfileContainer>
        <ProfileImage src="/img/fotoPerfil.jpg" alt="Profile Picture" />
        <ProfileName>Alejandro Aban Dzul</ProfileName>
        <ProfileBio>Desarrollador de software </ProfileBio>
        <ProfileDetails>
          <div>
            <DetailLabel>Correo:</DetailLabel> <DetailValue>abanalejandro90@gmail.com</DetailValue>
          </div>
          <div>
            <DetailLabel>Teléfono:</DetailLabel> <DetailValue>(123) 456-7890</DetailValue>
          </div>
        </ProfileDetails>
        <ProfileDetails>
          <div>
            <DetailLabel>Ubicación:</DetailLabel> <DetailValue>Mérida, Yucatán, México</DetailValue>
          </div>
          <div>
            <DetailLabel>Fecha de nacimiento:</DetailLabel> <DetailValue>09 de abril del 2003</DetailValue>
          </div>
        </ProfileDetails>
      </ProfileContainer>
    </Container>      <Customfooter /></div>
  );
};

export default Home;
