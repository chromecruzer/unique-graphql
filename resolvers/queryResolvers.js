// server/resolvers/queryResolvers.js   
import { users } from "../_db.js";
export const queryResolvers = {  
    Query: {
      hello: () => 'world',
      users: () => users,
    user: (parent, { id }) => users.find(user => user.id === id)    
    },
  };
  