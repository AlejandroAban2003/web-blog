import React, { useState } from "react";
import CreateCommentUseCase from "@/application/usecases/commentUseCase/createCommentUserCase";
import CommentRepo from "@/infraestructure/implementation/httpRequest/axios/CommentRepo";

const CommentForm = ({ postId, userId }) => {
  const [content, setContent] = useState("");

  const handleCreateComment = async () => {
    try {
      const commentRepo = new CommentRepo();
      const createCommentUseCase = new CreateCommentUseCase(commentRepo);
      const newComment = await createCommentUseCase.run(postId, content);
      console.log("Comment created successfully:", newComment);
      // Aquí podrías actualizar el estado de los comentarios en tu componente padre
    } catch (error) {
      console.error("Error creating comment:", error.message);
      // Manejar el error, mostrar mensaje al usuario, etc.
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu comentario..."
      />
      <button onClick={handleCreateComment}>Enviar comentario</button>
    </div>
  );
};

export default CommentForm;
