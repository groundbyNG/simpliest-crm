import express from 'express';
import User from '../../models/user';

const users = express.Router();
const jsonParser = express.json();

users.get("/", function(req, res){
        
    User.find({}, function(err, users){
 
        if(err) return console.log(err);
        res.send(users)
    });
});
 
users.get("/:id", function(req, res){
         
    const email = req.params.id;
    User.findOne({ email }, function(err, user){
          
        if(err) return res.send('Not found');
        res.send(user);
    });
});
    
users.post("/", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const { email, name } = req.body;
    const user = new User({ email, name, orders: [] });
        
    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});
     
users.delete("/:id", function(req, res){
         
    const email = req.params.id;
    User.findOneAndDelete({ email }, function(err, user){
                
        if(err) return console.log(err);
        res.send(user);
    });
});
    
users.put("/", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const { email, name } = req.body;
    User.findOne({ email }, (err, user) => {
        if(err) return console.log(err);
        
        user.name = name;
        
        user.save(function(err){
            if(err) return console.log(err);
            res.send(user);
        });
    });
});

export default users;