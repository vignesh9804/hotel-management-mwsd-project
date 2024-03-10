const express=require('express');
const cors=require('cors');
const {MongoClient} = require ('mongodb')
const bcrypt=require('bcrypt');


//create a objective  for express
const app=new express();
 app.use(express.json());
  app.use(cors());

  
// res & respond
app.get('/home',(req,res)=>{
    res.send("home page");
  })
  const client=new MongoClient('mongodb+srv://vignesh9804:vignesh7794@vignesh.uioowfw.mongodb.net/?retryWrites=true&w=majority')
  client.connect();
  const db = client.db('CVMS');
  const col =db.collection('register');
// insert the post the data
  app.post('/insert',async(req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password,10)
    console.log(req.body);
    col.insertOne(req.body);
    res.send("successfully received");
})
// show all code

app.get('/showall',async(req,res)=>{
  const result = await col.find().toArray();
  res.send(result);
})

app.post('/check',async (req,res)=>{
  console.log(req.body)
  var result = await col.findOne({"firstName":req.body.un})
  if(result != null){
    if( await bcrypt.compare(req.body.pw,result.password)) {
      res.send(result);
    }
    else{
      res.send("fail")
    }
  }
  
})
  app.listen(8081);
  console.log("server Runnging");