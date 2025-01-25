export const db = {
  posts: [
    { id: '1', title: 'First Post', content: 'Hello World!' },
    { id: '2', title: 'Second Post', content: 'GraphQL is awesome!' }
  ],
  comments: [
    { id: '1', text: 'Great post!', postId: '1' },
    { id: '2', text: 'Thanks for sharing', postId: '1' }
  ]
}
