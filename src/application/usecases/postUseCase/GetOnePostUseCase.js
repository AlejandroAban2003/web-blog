import IPostRepo from "@/domain/repositories/IPostRepo";

class GetOnePostUseCase {
  constructor(postRepo) {
    if (!(postRepo instanceof IPostRepo)) {
      throw new Error("postRepo must be instance of IPostRepo");
    }
    this.postRepo = postRepo;
  }

  async run(postId) {
    try {
      const post = await this.postRepo.getOne(postId);
      return post;
    } catch (error) {
      console.error("Error in GetOnePostUseCase:", error.message);
      throw error;
    }
  }
}

export default GetOnePostUseCase;
