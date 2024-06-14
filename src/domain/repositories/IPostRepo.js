// src/domain/repositories/IPostRepo.js

class IPostRepo {
  async getAll() {
    throw new Error("getAll method not implemented");
  }

  async getOne(id) {
    throw new Error("getOne method not implemented");
  }

  async create(post) {
    throw new Error("create method not implemented");
  }

  async update(id, post) {
    throw new Error("update method not implemented");
  }

  async delete(id) {
    throw new Error("delete method not implemented");
  }

  async getAuthorDetails(user_id) {
    throw new Error("Method not implemented");
  }
}

export default IPostRepo;
