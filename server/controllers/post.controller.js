const createPostController = (postService, commentService) => {
  const getAllPosts = () => postService.getAllPosts();
  
  const getPost = (_, { id }) => postService.getPostById(id);
  
  const addPost = (_, { title, content }) => 
    postService.createPost({ title, content });

  const getPostComments = (post) => 
    commentService.getCommentsByPostId(post.id);

  return Object.freeze({
    getAllPosts,
    getPost,
    addPost,
    getPostComments
  });
};

export default createPostController;
