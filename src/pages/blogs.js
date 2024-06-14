import React, { useState, useEffect } from "react";
import PostRepo from "@/infraestructure/implementation/httpRequest/axios/PostRepo";
import GetAllPostsUseCase from "@/application/usecases/postUseCase/GetAllPostUseCase";
import CreatePostUseCase from "@/application/usecases/postUseCase/CreatePostUseCase";
import Customfooter from "@/components/CustomFooter";
import {
  GridContainer,
  CenterContainer,
  Title,
  BlogPost,
  ImgStyled,
  Sidebar,
  SidebarPost,
  MainContent,
  PostImage,
  PostTitle,
  PostContent,
  PostDate,
  FormContainer,
  FormTitle,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton
} from "@/styles/blog.style";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    imageUrl: '',
    imageFile: null
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postRepo = new PostRepo();
      const getAllPostsUseCase = new GetAllPostsUseCase(postRepo);
      try {
        let allPosts = await getAllPostsUseCase.run();
        allPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postRepo = new PostRepo();
    const createPostUseCase = new CreatePostUseCase(postRepo);

    // Subir imagen al servidor local
    const formData = new FormData();
    formData.append('image', newPost.imageFile);

    try {
      const response = await fetch('http://localhost:3002/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error uploading image');
      }

      const imageData = await response.json();
      const imageUrl = imageData.imageUrl; // Obtener la URL de la imagen subida desde el servidor

      // Crear la publicación con la URL de la imagen
      const postData = {
        title: newPost.title,
        content: newPost.content,
        imageUrl: imageUrl,
        // Puedes necesitar enviar otros datos aquí, como el autor
      };

      const newPostCreated = await createPostUseCase.run(postData);
      setPosts([newPostCreated, ...posts]);
      setNewPost({ title: '', content: '', imageUrl: '', imageFile: null });
      setShowForm(false);
      window.location.reload(); // Recargar la página para mostrar la nueva publicación
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setNewPost((prevPost) => ({
        ...prevPost,
        imageFile: files[0]
      }));
    } else {
      setNewPost((prevPost) => ({
        ...prevPost,
        [name]: value
      }));
    }
  };

  const mainPost = posts[0];
  const sidebarPosts = posts.slice(1, 3);
  const remainingPosts = posts.slice(3);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ backgroundColor: "#000" }}>
      <div><SubmitButton onClick={toggleForm}>
          {showForm ? "Cancelar" : "Agregar Nueva Publicación"}
        </SubmitButton></div>
      <GridContainer>
        

        {showForm && (
          <FormContainer>
            <FormTitle>Agregar Nueva Publicación</FormTitle>
            <form onSubmit={handleSubmit}>
              <div>
                <FormLabel>
                  Título:
                  <FormInput
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleChange}
                  />
                </FormLabel>
              </div>
              <div>
                <FormLabel>
                  Contenido:
                  <FormTextarea
                    name="content"
                    value={newPost.content}
                    onChange={handleChange}
                  />
                </FormLabel>
              </div>
              <div>
                <FormLabel>
                  Subir Imagen:
                  <FormInput
                    type="file"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </FormLabel>
              </div>
              <SubmitButton type="submit">Agregar Publicación</SubmitButton>
            </form>
          </FormContainer>
        )}

        <CenterContainer>
          <Title>Todas las Publicaciones</Title>
          {mainPost && (
            <MainContent>
              <PostTitle>{mainPost.title}</PostTitle>
              <PostImage src={`http://localhost:3002${mainPost.imageUrl}`} alt={mainPost.title} />
              <PostContent>{mainPost.content}</PostContent>
              <PostDate>Creado en: {new Date(mainPost.createdAt).toLocaleString()}</PostDate>
            </MainContent>
          )}
          <Sidebar>
            {sidebarPosts.map((post) => (
              <SidebarPost key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <ImgStyled src={`http://localhost:3002${post.imageUrl}`} alt={post.title} />
                <PostContent>{post.content}</PostContent>
                <PostDate>Creado en: {new Date(post.createdAt).toLocaleString()}</PostDate>
              </SidebarPost>
            ))}
          </Sidebar>
          <div style={{ padding: "5px", marginBottom: "10px" }}>
            {remainingPosts.map((post) => (
              <BlogPost key={post.id}>
                <PostTitle>{post.title}</PostTitle>
                <ImgStyled src={`http://localhost:3002${post.imageUrl}`} alt={post.title} />
                <PostContent>{post.content}</PostContent>
                <PostDate>Creado en: {new Date(post.createdAt).toLocaleString()}</PostDate>
              </BlogPost>
            ))}
          </div>
        </CenterContainer>
      </GridContainer>
      <Customfooter />
    </div>
  );
};

export default Blogs;
