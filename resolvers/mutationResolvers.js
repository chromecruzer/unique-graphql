// server/resolvers/mutationResolvers.js
import { users } from "../_db.js";
export const mutationResolvers = {
  Mutation: {
    createUser: (parent, { name, email }) => {
      const newUser = { id: String(users.length + 1), name, email };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, { id, name, email }) => {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        if (name) users[index].name = name;
        if (email) users[index].email = email;
        return users[index];
      }
      return null;
    },
    deleteUser: (parent, { id }) => {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        return deletedUser;
      }
      return null;
    }
  }
};
