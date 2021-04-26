const { getDb, getNextSequence } = require('./db.js');

async function get(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  return product;
}

async function list() {
  const db = getDb();
  const products = await db.collection('products').find({}).toArray();
  console.log(products);
  return products;
}

async function add(_, { product }) {
  console.log('add product');
  const db = getDb();
  const newProduct = { ...product };
  newProduct.id = await getNextSequence('products');
  console.log(newProduct.id);
  const result = await db.collection('products').insertOne(newProduct);
  const savedProduct = await db.collection('products')
    .findOne({ _id: result.insertedId });
  return savedProduct;
}

async function update(_, { id, changes }) {
  const db = getDb();
  await db.collection('products').updateOne({ id }, { $set: changes });
  const savedProduct = await db.collection('products').findOne({ id });
  return savedProduct;
}

async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  if (!product) return false;
  const result = await db.collection('products').removeOne({ id });
  return result.deletedCount === 1;
}

module.exports = {
  list, add, get, update, delete: remove,
};
