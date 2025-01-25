import { useQuery, useSubscription } from '@urql/preact'
import { useEffect } from 'preact/hooks'

const POST_QUERY = `
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      comments {
        id
        text
      }
    }
  }
`

const COMMENT_SUBSCRIPTION = `
  subscription OnNewComment($postId: ID!) {
    newComment(postId: $postId) {
      id
      text
    }
  }
`

export const PostDetail = ({ params }) => {
  const [result] = useQuery({
    query: POST_QUERY,
    variables: { id: params.id },
  })

  const [_, subscription] = useSubscription({
    query: COMMENT_SUBSCRIPTION,
    variables: { postId: params.id },
  })

  const { data, fetching, error } = result

  useEffect(() => {
    if (subscription.data) {
      // Handle new comment
      console.log('New comment:', subscription.data.newComment)
    }
  }, [subscription.data])

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const post = data.post

  return (
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">{post.title}</h1>
      <p class="text-gray-700">{post.content}</p>

      <div class="mt-6">
        <h2 class="text-xl font-semibold">Comments</h2>
        <div class="space-y-2 mt-3">
          {post.comments.map(comment => (
            <div
              key={comment.id}
              class="bg-gray-50 dark:bg-gray-700 p-3 rounded"
            >
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
