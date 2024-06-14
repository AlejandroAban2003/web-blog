// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí podrías realizar la lógica para verificar si el usuario está autenticado
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/me'); // Endpoint para obtener información del usuario autenticado
        setCurrentUser(response.data.user); // Actualizamos el estado del usuario actual
      } catch (error) {
        console.error('Error fetching user:', error.message);
        setCurrentUser(null); // Si hay un error, establecemos currentUser a null
      } finally {
        setLoading(false); // Una vez que se complete la carga, establecemos loading a false
      }
    };

    fetchUser();
  }, []);

  // Función para iniciar sesión (puedes adaptarla según tu lógica de autenticación)
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout');
      setCurrentUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
      throw error;
    }
  };

  // Valor proporcionado por el contexto
  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser, // Puedes ajustar esto según tus necesidades de autenticación
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Renderizamos children solo cuando no estamos cargando */}
    </AuthContext.Provider>
  );
};
