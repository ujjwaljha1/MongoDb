# 📚 MongoDB Beginner to Advanced Guide

![MongoDB Logo](https://www.mongodb.com/assets/images/global/leaf.png)

Welcome to the MongoDB repository! This guide will take you from the basics of MongoDB to advanced functionalities, complete with code examples, explanations, and visual aids.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Basic CRUD Operations](#basic-crud-operations)
4. [Advanced CRUD Operations](#advanced-crud-operations)
5. [Indexes](#indexes)
6. [Aggregation](#aggregation)
7. [Transactions](#transactions)
8. [Additional Resources](#additional-resources)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction

MongoDB is a powerful, flexible, and scalable NoSQL database. It is document-oriented and stores data in JSON-like BSON format.

![MongoDB Sticker](https://media.giphy.com/media/KzJkzjggfGN5Py6nkT/giphy.gif)

## Getting Started

### Installation

1. **Install MongoDB**:
    - [Download MongoDB](https://www.mongodb.com/try/download/community)
    - Follow the installation instructions for your operating system.

2. **Start MongoDB**:
    ```bash
    mongod
    ```

3. **Install MongoDB Shell (mongosh)**:
    - [Download mongosh](https://www.mongodb.com/try/download/shell)

4. **Connect to MongoDB**:
    ```bash
    mongosh
    ```

### Connecting with Node.js

To connect MongoDB with a Node.js application, use the `mongodb` package.

1. **Install the package**:
    ```bash
    npm install mongodb
    ```

2. **Create a connection**:
    ```javascript
    const { MongoClient } = require('mongodb');
    const uri = "your_mongodb_connection_string";
    const client = new MongoClient(uri);

    async function run() {
        try {
            await client.connect();
            console.log("Connected to MongoDB");
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
    ```

![MongoDB Connection](https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif)

## Basic CRUD Operations

CRUD stands for Create, Read, Update, and Delete.

### Create (Insert)

**Inserting a Document**:
```javascript
const db = client.db('database_name');
const collection = db.collection('collection_name');

const doc = { name: "Alice", age: 25, city: "Wonderland" };
const result = await collection.insertOne(doc);
console.log(`New document created with _id: ${result.insertedId}`);
```

![Insert Operation](https://media.giphy.com/media/26tknCqiJrBQG6bxC/giphy.gif)

### Read (Find)

**Finding a Document**:
```javascript
const query = { name: "Alice" };
const options = {
  projection: { _id: 0, name: 1, age: 1, city: 1 },
};

const result = await collection.findOne(query, options);
console.log(result);
```

### Update

**Updating a Document**:
```javascript
const filter = { name: "Alice" };
const updateDoc = {
  $set: {
    age: 26,
  },
};

const result = await collection.updateOne(filter, updateDoc);
console.log(`Matched ${result.matchedCount} document and modified ${result.modifiedCount} document.`);
```

### Delete

**Deleting a Document**:
```javascript
const query = { name: "Alice" };
const result = await collection.deleteOne(query);
console.log(`Deleted ${result.deletedCount} document.`);
```

## Advanced CRUD Operations

### Insert Many

**Inserting Multiple Documents**:
```javascript
const docs = [
  { name: "Bob", age: 30, city: "Builderland" },
  { name: "Charlie", age: 35, city: "Chocolate Factory" }
];

const result = await collection.insertMany(docs);
console.log(`${result.insertedCount} documents were inserted`);
```

### Find with Filters

**Using Filters and Projection**:
```javascript
const query = { age: { $gt: 20 } }; // Find all documents where age > 20
const options = {
  projection: { _id: 0, name: 1, city: 1 },
};

const cursor = collection.find(query, options);
await cursor.forEach(console.dir);
```

### Update Many

**Updating Multiple Documents**:
```javascript
const filter = { age: { $gt: 25 } };
const updateDoc = {
  $set: { status: "active" },
};

const result = await collection.updateMany(filter, updateDoc);
console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`);
```

### Delete Many

**Deleting Multiple Documents**:
```javascript
const query = { status: "inactive" };
const result = await collection.deleteMany(query);
console.log(`Deleted ${result.deletedCount} documents.`);
```

## Indexes

Indexes improve the efficiency of search queries.

### Creating an Index

**Create a Single Field Index**:
```javascript
const result = await collection.createIndex({ age: 1 });
console.log(`Index created: ${result}`);
```

### Creating a Compound Index

**Create a Compound Index**:
```javascript
const result = await collection.createIndex({ age: 1, city: -1 });
console.log(`Compound index created: ${result}`);
```

![Indexing](https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif)

## Aggregation

Aggregation operations process data records and return computed results.

### Basic Aggregation

**Simple Aggregation Pipeline**:
```javascript
const pipeline = [
  { $match: { status: "active" } },
  { $group: { _id: "$city", total: { $sum: 1 } } }
];

const aggCursor = collection.aggregate(pipeline);
await aggCursor.forEach(console.dir);
```

### Advanced Aggregation

**Using Lookup and Unwind**:
```javascript
const pipeline = [
  { $lookup: {
    from: "orders",
    localField: "customer_id",
    foreignField: "customer_id",
    as: "order_details"
  }},
  { $unwind: "$order_details" }
];

const aggCursor = collection.aggregate(pipeline);
await aggCursor.forEach(console.dir);
```

## Transactions

Transactions allow multiple operations to be executed in an all-or-nothing manner.

### Starting a Transaction

**Using Transactions**:
```javascript
const session = client.startSession();

try {
  session.startTransaction();

  const usersCollection = client.db('test').collection('users');
  const ordersCollection = client.db('test').collection('orders');

  await usersCollection.insertOne({ name: "Dave", age: 29 }, { session });
  await ordersCollection.insertOne({ product: "Book", quantity: 1 }, { session });

  await session.commitTransaction();
  console.log("Transaction committed");
} catch (error) {
  await session.abortTransaction();
  console.error("Transaction aborted due to an error:", error);
} finally {
  session.endSession();
}
```

![Transactions](https://media.giphy.com/media/l0Exk8EUzSLsrErEQ/giphy.gif)

## Additional Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Community Forum](https://community.mongodb.com/)

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

![Thank You](https://media.giphy.com/media/3o7TKuXisTQ3n1QzTG/giphy.gif)

