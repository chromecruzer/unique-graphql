// import express from 'express'
// import 'colors'
// import cors from 'cors'
// import { createSchema, createYoga } from 'graphql-yoga';
// // server/schema/index.js
// import { loadFilesSync } from '@graphql-tools/load-files';
// import { mergeTypeDefs } from '@graphql-tools/merge';

// const typesArray = loadFilesSync('./schema/typeDefs', { extensions: ['gql', 'graphql'] });
// export const typeDefs = mergeTypeDefs(typesArray);
// import { queryResolvers } from './resolvers/queryResolvers.js';
// import { mutationResolvers } from './resolvers/mutationResolvers.js';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import path from 'path'
// import { users } from './_db.js';
// const resolvers = {
//   ...queryResolvers,
//   ...mutationResolvers,
// };

// // Define your GraphQL schema
// const schema = createSchema({
//   typeDefs,
//   resolvers,
// });

// // Create a Yoga instance with the GraphQL schema
// const yoga = createYoga({
//   graphqlEndpoint: '/graphql',
//   schema,
//   graphiql: true,
// });

// // Initialize Express app
// const app = express();
// app.use(cors())


// // Resolve __dirname and __filename using import.meta.url 
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);
// const __dirname = path.resolve(); /// sarvas...// 

// // Serve static files from the React app
// const clientBuildPath = join(__dirname, 'client', 'dist');
// app.use(express.static(clientBuildPath)); 

// // Handle SPA routing, return index.html for all unknown routes 
// app.get('*', (req, res, next) => {
//   if (req.path.startsWith('/graphql') || req.path === '/restapi') { 
//     return next();
//   }
//    res.sendFile(join(clientBuildPath, 'index.html'));
//   //res.redirect('/graphql')
// });
// // Use Yoga as a middleware in Express
// app.use('/graphql', yoga);

// // Define other specific routes
// app.get('/restapi', (req, res) => {
//   // Handle /submit route
//   res.status(200).json({ users });
// });

// // DELETE endpoint to delete a user by ID
// app.delete('/restapi/:id', (req, res) => {
//   const { id } = req.params; // Get the id parameter from the request URL 

//   // Find the index of the user with the given id
//   const index = users.findIndex(user => user.id === id);

//   if (index !== -1) {
//     // User found, delete it from the array
//     users.splice(index, 1);
//     return res.json({ msg: `User with id ${id} deleted successfully` });
//   } else {
//     // User not found
//     return res.status(404).json({ msg: `User with id ${id} not found` });
//   }
// });

// //const HOST = '192.168.2.149'
// // Define a port and start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   //console.log(`Server is running on http://${HOST}:${PORT}/graphql`.america);
//   console.log(`Server is active on Port ${PORT}`)
// });

import express from 'express';
import 'colors';
import cors from 'cors';
import { createSchema, createYoga } from 'graphql-yoga';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import path, { join } from 'path';
import { users } from './_db.js';
import { queryResolvers } from './resolvers/queryResolvers.js';
import { mutationResolvers } from './resolvers/mutationResolvers.js';

// Load and merge type definitions
const typesArray = loadFilesSync('./schema/typeDefs', { extensions: ['gql', 'graphql'] });
const typeDefs = mergeTypeDefs(typesArray);

// Define resolvers
const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};

// Define your GraphQL schema
const schema = createSchema({
  typeDefs,
  resolvers,
});

// Create a Yoga instance with the GraphQL schema     
const yoga = createYoga({
  graphqlEndpoint: '/graphql',
  schema,
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});

// Initialize Express app
const app = express();
app.use(cors());

// Resolve __dirname using import.meta.url
const __dirname = path.resolve();

// Serve static files from the React app
const clientBuildPath = join(__dirname, 'client', 'dist');
app.use(express.static(clientBuildPath));

// Handle SPA routing, return index.html for all unknown routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/graphql') || req.path === '/restapi') {
    return next();
  }
  res.sendFile(join(clientBuildPath, 'index.html'));
});

// Use Yoga as a middleware in Express
app.use('/graphql', yoga);

// Define other specific routes
app.get('/restapi', (req, res) => {
  res.status(200).json({ users });
});

// DELETE endpoint to delete a user by ID
app.delete('/restapi/:id', (req, res) => {
  const { id } = req.params; // Get the id parameter from the request URL
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    return res.json({ msg: `User with id ${id} deleted successfully` });
  } else {
    return res.status(404).json({ msg: `User with id ${id} not found` });
  }
});

// Create WebSocket server instance from our Express server
const wsServer = new WebSocketServer({
  noServer: true,
  path: yoga.graphqlEndpoint,
});

// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params: msg.payload,
      });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

// Define a port and start the server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is active on port ${PORT}`);
});

// Handle upgrade requests to integrate WebSocket server with Express
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit('connection', ws, request);
  });
});
