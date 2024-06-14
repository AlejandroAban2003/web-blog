import axios from "axios";
import ICommentRepo from "@/domain/repositories/ICommentRepo";
export default class CommentRepo extends ICommentRepo {
  constructor() {
    super();
    this.baseUrl = "http://localhost:3000/api/comments";
  }

  async create(postId, content, authorId) {
    try {
      const response = await axios.post(this.baseUrl, {
        postId,
        content,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error.message);
      throw error;
    }
  }
}
