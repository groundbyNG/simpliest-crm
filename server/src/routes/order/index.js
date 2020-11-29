import express from 'express';
import User from '../../models/user';
import Order from '../../models/order';
import { ObjectId } from 'mongodb';

const order = express.Router();
const jsonParser = express.json();
 
order.get("/:id", function(req, res){
         
    const email = req.params.id;
    User.findOne({ email }, function(err, user){
          
        if(err) return res.send('User not found');
        res.send(user.orders);
    });
});

order.get("/order/:id", function(req, res){
         
    const _id = req.params.id;
    Order.findOne(ObjectId(_id), function(err, order){
        if(err) return res.send('Order not found');
        res.send(order);
    });
});

order.post("/:id", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
    
    const userId = req.params.id; 
       
    const { 
        productName,
        sku,
     } = req.body;

    User.findOne({email: userId}, function(err, user){
        if(err) return res.send('User not found');
        const newOrder = new Order({
            clientId: userId,
            productName,
            sku,
            date: new Date(),
        });
        user.orders.push(newOrder);
        newOrder.save(() => {
            user.save(function(err){
                if(err) {
                    console.log(err);
                    return res.send('Error to push new order');
                }
                res.send(newOrder);
            }); 
        });
      
    });
});

order.put("/:id", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);

    const _id = req.params.id; 
    const { 
        productName,
        sku,
     } = req.body;

     Order.findOne(ObjectId(_id), (err, order) => {
        if(err) return console.log(err);
        
        order.productName = productName;
        order.sku = sku;

        order.save(function(err){
            if(err) return console.log(err);

            User.findOne({email: order.clientId}, function(err, user){
                user.orders = user.orders.map(userOrder => {
                    if (userOrder._id.equals(_id)) {
                        userOrder.productName = productName;
                        userOrder.sku = sku;
                    }
                    return userOrder;
                })
                user.save(() => {
                    res.send(order);
                })
            })
        });

        
    });
});

order.delete("/:id", function(req, res){
         
    const _id = req.params.id;

    Order.findOneAndDelete( { _id: ObjectId(_id) }, function(err, order){

        if(err) return console.log(err);

        User.findOne({email: order.clientId}, function(err, user){
            user.orders = user.orders.filter(userOrder => !userOrder._id.equals(_id))
            user.save(() => {
                res.send(order);
            })
        })
    });
});

export default order;