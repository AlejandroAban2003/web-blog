import React from 'react';
import styled from "@emotion/styled";

export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const UserProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const UserName = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
`;

export const UserBio = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const UserProfile = () => {
  // Datos estáticos
  const user = {
    name: "Juan Pérez",
    bio: "Desarrollador de software apasionado por el diseño y la intuición.",
    imageUrl: "https://via.placeholder.com/100" // URL de imagen de ejemplo
  };

  return (
    <UserProfileContainer>
      <UserProfileImage src={user.imageUrl} alt={`${user.name}'s profile picture`} />
      <UserName>{user.name}</UserName>
      <UserBio>{user.bio}</UserBio>
    </UserProfileContainer>
  );
};

export default UserProfile;
