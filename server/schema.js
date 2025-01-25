export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    postId: ID!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    addPost(title: String!, content: String!): Post!
    addComment(postId: ID!, text: String!): Comment!
  }

  type Subscription {
    newComment(postId: ID!): Comment!
  }
`
