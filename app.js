import express from 'express'
import 'colors'
import { createSchema, createYoga } from 'graphql-yoga';
// server/schema/index.js
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync('./schema/typeDefs', { extensions: ['gql', 'graphql'] });
export const typeDefs = mergeTypeDefs(typesArray);
import { queryResolvers } from './resolvers/queryResolvers.js';
import { mutationResolvers } from './resolvers/mutationResolvers.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { users } from './_db.js';
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
  graphiql: true,
});

// Initialize Express app
const app = express();


// Resolve __dirname and __filename using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app
const clientBuildPath = join(__dirname, './client/dist');
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
  // Handle /submit route
  res.status(200).json({ users });
});

// DELETE endpoint to delete a user by ID
app.delete('/restapi/:id', (req, res) => {
  const { id } = req.params; // Get the id parameter from the request URL

  // Find the index of the user with the given id
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    // User found, delete it from the array
    users.splice(index, 1);
    return res.json({ msg: `User with id ${id} deleted successfully` });
  } else {
    // User not found
    return res.status(404).json({ msg: `User with id ${id} not found` });
  }
});


// Define a port and start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`.america);
});