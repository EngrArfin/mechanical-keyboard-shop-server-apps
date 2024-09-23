require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  await client.connect(); // Ensure connection to MongoDB
  try {
    const db = client.db("MechanicalKeyboard"); // todos
    const taskCollection = db.collection("keyboards"); // tasks

    app.get("/keyboards", async (req, res) => {
      let query = {};
      if (req.query.priority) {
        query.priority = req.query.priority;
      }
      const cursor = taskCollection.find(query);
      const tasks = await cursor.toArray();
      res.send({ status: true, data: tasks });
    });

    app.post("/keyboard", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    app.get("/keyboard/:id", async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.findOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.delete("/keyboard/:id", async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });

    app.put("/keyboard/:id", async (req, res) => {
      const id = req.params.id;
      const task = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          isCompleted: task.isCompleted,
          title: task.title,
          description: task.description,
          priority: task.priority,
        },
      };
      const options = { upsert: true };
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.json(result);
    });
  } finally {
    // You can add some code here to close the client connection if needed
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to the Mechanical Keyboard Project!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
