// src/application/usecases/postUseCase/GetAllPostsUseCase.js

import IPostRepo from "@/domain/repositories/IPostRepo";

class GetAllPostsUseCase {
  constructor(postRepo) {
    if (!(postRepo instanceof IPostRepo)) {
      throw new Error("postRepo must be instance of IPostRepo");
    }
    this.postRepo = postRepo;
  }

  async run() {
    try {
      const allPosts = await this.postRepo.getAll();
      return allPosts;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      throw error;
    }
  }
}

export default GetAllPostsUseCase;
