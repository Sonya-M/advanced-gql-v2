const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
type User {
  id: String
  username: String
  cratedAt: Int!
}

type Settings {
  user: User!
  theme: String!
}

input NewSettingsInput {
  user: ID!
  theme: String!
}

type Query {
  me: User!
  settings(user: ID!): Settings!
}

type Mutation {
  settings(input: NewSettingsInput!): Settings!
}
`

const resolvers = {
  Query: {
    me() {
      return {
        id: '123',
        username: 'coder',
        createdAt: 1590177290510,
      }
    },
    settings(_, { user }) {
      return {
        user,
        theme: 'dark'
      }
    },

  },

  Mutation: {
    settings(_, { input }) {
      return input;
    }
  },


  // create resolvers for any type that has relationships
  Settings: {
    user(settings) {
      // with real db, we'd be returning user with id == settings.userId
      return {
        id: settings.user,
        username: 'coder',
        createdAt: 1590177290510,
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`server at % ${url}`)
})
