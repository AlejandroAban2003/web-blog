// src/domain/entities/Post.js

class Post {
  constructor(id, userId, title, content, imageUrl, createdAt) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
  }
}

export default Post;
