import ICommentRepo from "@/domain/repositories/ICommentRepo"; // Importa la interfaz del repositorio de comentarios

class CreateCommentUseCase {
  constructor(commentRepo) {
    if (!(commentRepo instanceof ICommentRepo)) {
      throw new Error("commentRepo must be an instance of ICommentRepo");
    }
    this.commentRepo = commentRepo;
  }

  async run(postId, content, authorId) {
    try {
      // Llama al método del repositorio para crear un nuevo comentario
      const newComment = await this.commentRepo.create(postId, content);
      return newComment;
    } catch (error) {
      console.error("Error creating comment:", error.message);
      throw error;
    }
  }
}

export default CreateCommentUseCase;
