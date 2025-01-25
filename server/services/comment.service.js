const createCommentService = (db, pubSub) => {
  const getCommentsByPostId = postId =>
    db.comments.filter(comment => comment.postId === postId)

  const addComment = ({ postId, text }) => {
    const comment = {
      id: String(db.comments.length + 1),
      text,
      postId,
    }
    db.comments.push(comment)
    pubSub.publish(`POST_${postId}_NEW_COMMENT`, { newComment: comment })
    return comment
  }

  return Object.freeze({
    getCommentsByPostId,
    addComment,
  })
}

export default createCommentService
