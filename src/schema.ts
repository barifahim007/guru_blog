export const typeDefs = `#graphql
    type Query {
    mydata: [User]
    myPost: [Post]

  }

  type Mutation {
    
    singup(
        name: String!,
        email: String!,
        password: String!
        bio: String
    ): AuthPayload,

    singin (
        email: String!
        password: String!
    ):AuthPayload


  }

  type AuthPayload {
    userError: String
    token: String
  }


    type Post {
        id: ID!
        title: String!
        content: String!
        author: User
        createdAt: String!
        published: Boolean
    }

    type User {
        id: ID! 
        name: String!
        email: String!
        createdAt: String!
        posts: [Post]

    }

    type Profile {

        id: ID!
        bio: String!
        createdAt: String!
        userId: String!
        user: User!
        

    }

`;
