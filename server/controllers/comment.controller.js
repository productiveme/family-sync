const createCommentController = (commentService, pubsub) => {
  const addComment = async (_, { postId, text }) => {
    const newComment = await commentService.addComment({ postId, text })
    pubsub.publish({
      topic: `POST_${postId}_NEW_COMMENT`,
      payload: {
        newComment,
      },
    })
    return newComment
  }

  const subscribeToNewComments = {
    subscribe: (_, { postId }, { pubsub }) => {
      return pubsub.subscribe({
        topic: `POST_${postId}_NEW_COMMENT`,
        onComplete: () => console.log('Subscription completed'),
        onError: error => console.error('Subscription error:', error),
      })
    },
  }

  return Object.freeze({
    addComment,
    subscribeToNewComments,
  })
}

export default createCommentController
