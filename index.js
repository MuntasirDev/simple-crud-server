const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

    const userCollection = client.db('userdb').collection('users');
    app.post('.users', async(req,res)=>
    {
        const newUser=req.body;
        const result= await userCollection.insertOne(newUser);
        res.send(result);
    })

    const database = client.db('usersdb');
    const usersCollection = database.collection('users');

    // POST: Add user
    app.post('/users', async (req, res) => {
      console.log('data in the server', req.body);
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

  
    await client.db('admin').command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    // nothing here
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Simple Crud Server Running');
});


app.listen(port, () => {
  console.log(`Simple CRUD server running on port ${port}`);
});

