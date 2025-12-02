const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 1000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://user_Db:1nSpVQUc5DB5IzKL@simple-crud-server.a0arf8b.mongodb.net/?appName=simple-crud-server";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db('usersdb'); // using only one DB
    const usersCollection = database.collection('users');

    // GET all users
    app.get('/users', async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // POST a new user
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    // DELETE a user
    app.delete('/users/:id', async (req, res) => {  // added async
      const id = req.params.id;
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log("Pinged your deployment. Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Simple CRUD server running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
