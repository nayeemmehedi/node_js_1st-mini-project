var express = require('express')
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId
var bodyParser = require('body-parser')
const assert = require('assert');
var cors = require('cors')

var app = express()




app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))


const uri = "mongodb+srv://nayeemmehedi0000:P6at5cTyxM7ybzLi@cluster0.teacx.mongodb.net/nayeemdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let pw = "P6at5cTyxM7ybzLi"
let userdb = "nayeemmehedi0000"

  let newList = [
      
    
    {
        id:01,
        name:'nayeem',
        age:25,
        form:'lohagora',
        homeTown:'narail'

    },
    {
        id:02,
        name:'reza',
        age:13,
        form:'laxmipasha',
        homeTown:'narail'

    },
    {
        id:03,
        name:'Boisak',
        age:20,
        form:'khulna',
        homeTown:'jomuna'

    },
    {
        id:04,
        name:'diman',
        age:21,
        form:'bandorban',
        homeTown:'sawtal'

    },

    
    
    
    ]



 


    // app.get('/nayeem/:id', function (req, res) {

    //     list = newList[req.params.id] 

       
    //     res.send(list)
    //   })
    






app.post('/postCall',(req,res)=>{
    console.log("data recived",req.body)
})




// database create 




app.get('/', function (req, res) {


    res.sendFile(__dirname+"/dbHtml.html")

  })



client.connect(err => {
  const collection = client.db("nayeemdb").collection("nayeemdb1");
  // perform actions on the collection object


  //read



  app.get("/products",(req,res)=>{

    collection.find({}).toArray((err,doc)=>{

        res.send(doc)
    })
    


  })







  //create 



      app.post("/nayeem1", function (req, res) {

        let product =req.body

        console.log(product)
          

        collection.insertOne(product)
          .then(function(result) {
            res.redirect('/')
          })    
        })





    //final patch update




          app.patch('/update1/:id',(req,res)=>{

              collection.updateOne(

                {

                  _id : ObjectId(req.params.id)
              
                },
                {

                  $set:{name :req.body.name, product:req.body.quantity}

                }
              )
              .then(result=>{
                res.send ((result.modifiedCount>0))
              })
          })








      
  //delete



        app.delete('/delete/:id',(req,res)=>{
          console.log(req.params.id)

          collection.deleteOne({ 
            
            _id : ObjectId(req.params.id)
          
            })
            .then(function(result) {

              res.send(result.deletedCount>0)
              
            })    
        
        })








  //update 



          app.get('/update/:id',(req,res)=>{

            collection.find({

              _id : ObjectId(req.params.id)
            
            })

              .toArray((err,doc)=>{
                res.send(doc[0])
              

            })

          })











});


//database finish




  
  app.listen(4000)