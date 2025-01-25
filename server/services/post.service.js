const createPostService = (db) => {
  const getAllPosts = () => db.posts;
  
  const getPostById = (id) => 
    db.posts.find(post => post.id === id);
  
  const createPost = ({ title, content }) => {
    const post = {
      id: String(db.posts.length + 1),
      title,
      content
    };
    db.posts.push(post);
    return post;
  };

  return Object.freeze({
    getAllPosts,
    getPostById,
    createPost
  });
};

export default createPostService;
