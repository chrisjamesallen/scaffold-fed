var express = require('express'),
	basicAuth = require('basic-auth-connect'),
	// cors = require('cors'),
	app = express();

// app.use(cors());
app.use(basicAuth('baecreative', 'b43syst3ms'));
app.use(express.static('app'));

// var corsOptions = {
//   origin: '*'
// };

app.listen(process.env.PORT || 3000, function() {
	console.log("Listening on port 3000");
});