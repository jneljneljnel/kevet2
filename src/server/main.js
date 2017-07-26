let mysql = require('mysql');
let express = require('express');
let app = express();
let parser = require('body-parser');
let client = require('twilio')(
	'ACd42beff2e015d822cfdbfc2003d89dca',
	'9f9146e35f08ca5a6578e3e864c9b2a4'
);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysql',
  database : 'kevet'
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

app.listen(process.env.PORT || 3001, ()=> {
	console.log('running on 3001')
});
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));


//api
require('./api/connected.js')(app);


app.post('/blink', (req, res) => {
  console.log("post recieved", req.body.hello);
  if(req.body.id){
    var newClient = Object.create(client).init(req.body.id);
    console.log("client created");
    newClient.posts ++
    listeners.push(newClient);
  }
  res.send('blink\n');
 }
);

app.post('/connect', (req, res) => {
  console.log("post recieved");
  let pword =req.body.pword
  let id =req.body.id 
  if(pword = 'kevet'){
    console.log("client connected");
  	var query = connection.query('INSERT INTO connections SET id = '+ id,  function(err, result) {
		if (err) {
	      res.send(err)
	    }
	    else {
		  res.send('success');
	    }  
	})
  }
 }
);


app.get('/api/connected2', (req, res) => {
	console.log('getting all connected devices');
	var query = connection.query('SELECT * FROM connections',  function(err, result) {
		if (err) {
	      res.send(err)
	    }
	    else {
		    res.send(result);
	    }  
	})
})


app.post('/locked', (req, res) => {
	console.log('door locked');
	let pword = req.body.pword
  	let id = req.body.id 
  	if(pword == 'kevet'){
		var query = connection.query('UPDATE connections SET occupied = 1 where id=' + id,  function(err, result) {
			if (err) {
		      res.send(err)
		    }
		    else {
			    res.send('success');
		    }  
		}) 		
  	}
})


app.post('/open', (req, res) => {
	console.log('door open');
	let pword = req.body.pword
  	let id = req.body.id 
  	if(pword == 'kevet'){
		var query = connection.query('UPDATE connections SET occupied = 0 where id=' + id,  function(err, result) {
			if (err) {
		      res.send(err)
		    }
		    else {
			    res.send('success');
		    }  
		}) 		
  	}
})


app.post('/emergency', (req, res) => {
	console.log('emergency');
	let pword = req.body.pword
  	let id = req.body.id 
  	if(pword == 'kevet'){
		var query = connection.query('UPDATE connections SET emergency = 1 where id=' + id,  function(err, result) {
			if (err) {
		      res.send(err)
		    }
		    else {
			    res.send('success');
		    }  
		})
		client.messages.create({
			from: '+14159497500',
			to: '+13128898486',
			body:'dispatch emergency units to unit number '+id
		}, function(err , msg) { 
			if(err)
			console.log(err); 
		}) 		
  	}
})

app.get('/api/emergency', (req, res) => {
	console.log('getting emergency stalls');
	var query = connection.query('SELECT * FROM connections where emergency = 1',  function(err, result) {
		if (err) {
	      res.send(err)
	    }
	    else {
		    res.send(result);
	    }  
	})
})