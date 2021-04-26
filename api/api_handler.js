require('dotenv').config();
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const product = require('./product.js');

const resolvers = {
  Query: {
    productList: product.list,
    product: product.get,
  },
  Mutation: {
    productAdd: product.add,
    productUpdate: product.update,
    productDelete: product.delete,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

function installHandler(app) {
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { installHandler };
