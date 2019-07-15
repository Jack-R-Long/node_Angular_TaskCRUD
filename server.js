// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
//mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.json());
// MiddleWare: Session and Flash 
var session = require('express-session');
app.use(session({
	secret: 'cam_god',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
const flash = require('express-flash');
app.use(flash());
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// // Get sockets
// const server = app.listen(8000);
// const io = require('socket.io')(server);
// var counter = 0;

// io.on('connection', function (socket) { //2
// 	  //Insert SOCKETS 
// });

// Mongoose Schema users 
var TaskSchema = new mongoose.Schema({
	title: {type: String, required: [true, "Must have title"], minlength: [2, "Title must be longer than 2 characters"]},
	description: {type: String, default:null, minlength: 2},
	completed: {type: Boolean, required: [true, "Must indicate status"], default: false }
}, {timestamps: true})
mongoose.model('Task', TaskSchema); // We are setting this Schema in our Models as 'Task'
var Task = mongoose.model('Task') // We are retrieving this Schema from our Models, named 'User'

// // ...delete all records of the User Model
// User.deleteMany({}, function(err){
// 	// This code will run when the DB has attempted to remove all matching records to {}
//    })

// root route to render the index.ejs view
app.get('/tasks', function(req, res) {
	Task.find({}, function(err, Tasks_array) {
		if (err) {
			console.log("Error finding Tasks")
			res.json({message: "Error", error: err})
		}else {
			console.log(Tasks_array)
			res.json({message: "Success", data: Tasks_array})
		}
	})
})
// show person 
app.get('/tasks/:id', (req, res)=> {
	Task.findOne({_id: req.params.id}, (err, task_arr)=> {
		if (err) {
			console.log("Error finding task")
			res.json({message: "Error", error: err})
		}else {
			console.log(task_arr)
			res.json({message: "Success", data: task_arr})
		}
	})
})
// create new task
app.post('/tasks', (req, res)=> {
	console.log(req.body)
	Task.create(req.body, (err, new_person_arr)=> {
		if (err) {
			console.log("Error creating person")
			res.json({message: "Error", error: err})	
		}else {
			console.log(new_person_arr)
			res.json({message: "Success", data: new_person_arr})
		}
	})
})
// PUT updated task by id 
app.put('/tasks/:id', (req,res)=> {
	Task.findByIdAndUpdate(req.params.id, req.body, (err, new_task_arr)=>{
		if (err) {
			console.log("Error updating task by ID")
			res.json({message: "Error", error: err})	
		} else {
			console.log(new_task_arr)
			res.json({message: "Success", data: new_task_arr})
		}
	})
})
// DELETE task by id 
app.delete('/tasks/:id', (req,res)=> {
	Task.findByIdAndDelete(req.params.id, (err)=>{
		if (err) {
			console.log("Error deleting task by ID")
			res.json({message: "Error", error: err})	
		} else {
			res.json({message: "Success : deleted task!"})
		}
	})
})
// // delete new people 
// app.get('/remove/:name', (req, res)=> {
// 	People.deleteOne({name: req.params.name}, (err) => {
// 		if (err) {
// 			console.log("Error deleting person")
// 			res.json({message: "Error", error: err})	
// 		}else {
// 			res.json({message: "Success"})
// 		}
// 	})
// })


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(request, response){
	response.send("404")
});

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});