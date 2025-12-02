const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 1000;

app.use(cors());
app.use(express.json());

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
    const db = client.db('usersdb');
    const usersCollection = db.collection('users');

    // GET all users
    app.get('/users', async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // GET single user
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      res.send(user);
    });

    // POST new user
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });


    //update

    app.put ('/users/:id', async(req,res)=>{
        const id = req.params.id;
        const filter = {_id : new ObjectId(id)}
        const user = req.body;
        const upadateDoc = {
            $set: {
                name: user.name,
                email: user.email
            }
        }
        cosnoloe.log(user);
        const result = await usersCollection.updateOne(filter,upadateDoc,options);

    })

    // DELETE user
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    console.log("MongoDB Connected!");
  } catch (err) {
    console.log(err);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Simple CRUD server running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
