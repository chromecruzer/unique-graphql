const express = require('express');
const { buildSchema } = require('graphql');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { graphqlHTTP } = require('graphql-http');

// GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }

  type Subscription {
    messageSent: Message
  }

  type Message {
    content: String
  }
`);

// Root resolver
const root = {
  hello: () => 'Hello world!',
};

// Initialize an Express application
const app = express();

// Setup GraphQL endpoint
app.use('/graphql', (req, res) => graphqlHTTP({ schema, rootValue: root, graphiql: true })(req, res));

const server = createServer(app);

// Setup WebSocket server for GraphQL subscriptions
const wsServer = new WebSocketServer({
  server,
  path: '/graphql',
});

useServer({
  schema,
  execute: async (args) => args,
  subscribe: async (args) => {
    return {
      async *[Symbol.asyncIterator]() {
        while (true) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          yield { data: { messageSent: { content: 'Hello from subscription!' } } };
        }
      },
    };
  },
}, wsServer);

// Start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});
