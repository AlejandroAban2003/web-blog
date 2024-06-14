// src/application/usecases/postUseCase/CreatePostUseCase.js

import IPostRepo from "@/domain/repositories/IPostRepo"; // Importa la interfaz del repositorio de posts

class CreatePostUseCase {
  constructor(postRepo) {
    if (!(postRepo instanceof IPostRepo)) {
      throw new Error("postRepo must be an instance of IPostRepo");
    }
    this.postRepo = postRepo;
  }

  async run(title, content, authorId) {
    try {
      // Llama al método del repositorio para crear una nueva publicación
      const newPost = await this.postRepo.create(title, content, authorId);
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error.message);
      throw error;
    }
  }
}

export default CreatePostUseCase;
