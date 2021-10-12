const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
//app.set("view engine", "ejs")

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
  });
const User = mongoose.model('User', UserSchema);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.route('/getUser')
.get((req, res) => {
	User.find(function(err, users) {
		if (err)
			res.send(err)
		res.json(users);
	});
});
app.route('/addUser')
.post((req,res) => {
    mongoose.connect('mongodb://localhost:27017/reactdb');
    const user = new User({ 
        username: req.body.username,
        password: req.body.password
    });
    user.save()
	.then((result)=>{
	    res.send('Added username to Database!');
	});
});
app.route('/changeUser')
.post((req,res) => {
    mongoose.connect('mongodb://localhost:27017/reactdb');
    console.log(req.body);
    User.findOneAndUpdate({ username: req.body.currentusername}, {$set:{username: req.body.newusername}}, (err, result) => {
        if (!result) {
            return res.send('Could not find user!');
        }
        
        return res.send('Successfully updated user.') + result;
        });
});
app.route('/deleteUser')
.post((req,res) => {
    mongoose.connect('mongodb://localhost:27017/reactdb');
	User.findOneAndRemove({ username: req.body.username }, (err, removed) => {
        if (!removed) {
            return res.send('Could not find or delete user!');
        }
        
        return res.send('Successfully deleted user.');	
        });
});

async function getUsers(req,res) {
    mongoose.connect('mongodb://localhost:27017/reactdb');
    try {
        const results = await User.find({});
        console.log(results);
        res.json(results);
    } catch (err) {
        throw err;
    }
}
app.route('/getUsers')
.get((req,res) => {
  getUsers(req,res)
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
mongoose.connect('mongodb://localhost:27017/reactdb', {useNewUrlParser: true}, (err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    }
    else {
        console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
    }
});

module.exports = app;