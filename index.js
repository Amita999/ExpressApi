const express = require('express');
const app =  express();
app.use(express.json());
const Joi = require('@hapi/joi');
let port =  process.env.PORT||4500;
//Static Data 
let user = [{
    id:1,
    name:'Seema',
},
{id:2,
    name:'Amita'},
    {
        id:3,
        name :'Mohit'
    }
]

//routes
app.get('/',(req,res) =>{
    res.send('Hi this is my first Api');
})

app.get('/user/:id',(req,res) =>{
    let id = req.params.id;
    res.send(id);
})

app.get('/reqUser/:id',(req,res) =>{
    let id = user.find(data =>data.id === parseInt(req.params.id));
    //console.log(id);
    if(!id){return res.status(404).send({message:'Invalid id'})}
    res.send(id);
})
 

app.post('/newUser',(req,res) =>{
    let Schema = Joi.object().keys({
        name:Joi.string().min(4).max(10).required()
    });
    let {error} = Schema.validate(req.body);
    // let {error}= result;
   // console.log(result);
   if(error){return res.send(error.details[0].message)}
    let data = { 
        id:user.length +1,
        name:req.body.name
    }
    user.push(data);
    res.send(user);
});




app.listen(port,() =>{console.log('Server started');});