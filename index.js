const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Simple node server running');
});

const users = [
    { id: 1, name: 'Shabana', email: 'shabana@gmail.com' },
    { id: 2, name: 'Shabnoor', email: 'shabnoor@gmail.com' },
    { id: 5, name: 'Shabila', email: 'sabila@gmail.com' },
];

//username: dbuser1
//password: L7YhwBcPJIWIFQhD



const uri = "mongodb+srv://dbuser1:L7YhwBcPJIWIFQhD@cluster0.mktejfv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        const user = { name: 'Nahiya Mahi', email: 'nahi@gamil.com' }
        /* const result = await userCollection.insertOne(user);
        console.log(result); */

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });


        app.post('/users', async (req, res) => {
            console.log('Post Api called');
            const user = req.body;

            // users.push(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;

            res.send(user);
        })
    }
    finally {

    }
}

run().catch(error => console.log(error))
//or
// run.catch(console.dir);


// app.get('/users', (req, res) => {

//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(user => user.name.toLowerCase().indexOf(search) >= 0)
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// });

/* app.post('/users', (req, res) => {
    console.log('Post Api called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
}) */

app.listen(port, () => {
    console.log(`Simple node server running on port ${port}`);
});