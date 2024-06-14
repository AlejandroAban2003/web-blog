// src/infraestructure/implementation/httpRequest/axios/PostRepo.js

import axios from "axios";
import IPostRepo from "@/domain/repositories/IPostRepo";
import Post from "@/domain/entities/post";

class PostRepo extends IPostRepo {
  constructor() {
    super();
    this.url = "http://localhost:3000/api/posts"; // Ajusta la URL base según tu configuración de servidor
  }

  async getAll() {
    try {
      const response = await axios.get(this.url);
      const postsData = response.data; // Ajustado para la respuesta esperada
      if (!Array.isArray(postsData.posts)) {
        throw new Error("Invalid response format: `posts` should be an array");
      }
      const posts = postsData.posts.map((postData) => this.mapToPost(postData));
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      throw error;
    }
  }

  mapToPost(postData) {
    return new Post(
      postData._id,
      postData.user_id,
      postData.title,
      postData.content,
      postData.image_url,
      postData.createdAt
    );
  }

  async create(postData) {
    try {
      const response = await axios.post(this.url, postData); // Asegúrate de usar la URL base definida
      return this.mapToPost(response.data);
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw error;
    }
  }

}

export default PostRepo;
