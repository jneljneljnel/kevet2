let mysql = require('mysql');


module.exports = (app) => {
	var connected = [
		{id:"1", connected:true, occupied:true, emergency:false, timeOccupied:12 },
		{id:"2", connected:true, occupied:false, emergency:false, timeOccupied:0 },
		{id:"3", connected:true, occupied:true, emergency:false, timeOccupied:100 }
	]
	var connected2 = {}
	
	app.get('/api/connected', (req, res) => {
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

}