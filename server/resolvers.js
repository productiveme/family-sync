const createResolvers = ({ postController, commentController }) => {
  return Object.freeze({
    Query: {
      posts: postController.getAllPosts,
      post: postController.getPost
    },

    Post: {
      comments: postController.getPostComments
    },

    Mutation: {
      addPost: postController.addPost,
      addComment: commentController.addComment
    },

    Subscription: {
      newComment: commentController.subscribeToNewComments
    }
  });
};

export default createResolvers;
