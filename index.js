const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const MongoObjectId = require('mongodb').ObjectId
const bodeParser = require('body-parser')


//** Mongo URI */
const uri = "mongodb+srv://heroMongo:heroMongo@cluster0.0evig.mongodb.net/heroDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//** Mother App */
const app = express()


//** Middle Ware */
const middleware = [
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
]
app.use(middleware)


//** Mongo User And Password */
const pass = 'heroMongo'

//** Root Route */
app.get('/', (req, res) => {
    res.send('Hello I am Beginner in Node JS')
})
app.get('/addProduct', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})





//** Mondo DB */
client.connect(err => {
    const productCollections = client.db("heroDB").collection("testPractice");


    //** GET --> Show All Product */
    app.get('/product', (req, res) => {
        productCollections.find({})
            .toArray((error, documents) => {
                res.send(documents)
            })

    })



    //** UPDATE --> Single Product Update */
    app.get('/product/:id', (req, res) => {
        productCollections.find()
    })



    //** POST --> Create Product */
    app.post('/addProduct', (req, res) => {
        const product = req.body
        console.log(product);
        productCollections.insertOne(product)
            .then(res => {
                console.log('Product Added');
            })
    })

    //** DELETE --> Product Delete */
    app.delete('/delete/:id', (req, res) => {
        console.log(req.params.id);
        productCollections.deleteOne({
            _id: MongoObjectId(req.params.id)
        })
            .then(res => {
                // res.deletedCount
                console.log('Product Delete', res);
            })
    })

    console.log('The Database Has Been Connected Successfully');
    // client.close();
});


app.listen(3300)