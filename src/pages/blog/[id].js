import { useState, useEffect } from "react";
import axios from "axios";
import { Container, PostTitle, PostContent } from "@/styles/blog.style"; // Asegúrate de tener tus estilos definidos en `blog.style`

const Post = ({ post }) => {
  return (
    <Container>
      <h1>{post.title}</h1>
      <PostContent>{post.content}</PostContent>
    </Container>
  );
};

// Función para obtener los detalles de la publicación
export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
    const post = response.data;

    return {
      props: { post },
    };
  } catch (error) {
    console.error("Error al obtener la publicación:", error.message);
    return {
      props: { post: null },
    };
  }
}

export default Post;
