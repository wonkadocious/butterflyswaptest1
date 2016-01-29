 express = require('express');
 app = express();

var indexPage = '/realindex.html'; 

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

var utils = require('cloud/myUtils.js');

app.get('/', function(req, res) {
    console.log('intercepted GET for butterflyswap');
    res.redirect(indexPage);
});

app.post('/', function(req, res) {
    console.log('intercepted POST (fb) for butterflyswap');
    res.redirect(indexPage);
});

// this is necessary to register for Facebook RTU
app.get('/fbrtu', function(req, res) {
var q = req.query;
console.log('ButterflySwap test intercepted GET for for fbrtu, req query: ' + q['hub.challenge']);
    res.send(q['hub.challenge']);
});

app.post('/fbrtu', function(req, res) {
  var Purchases = Parse.Object.extend('Purchases');
  var myPurchase = new Purchases();

    console.log('intercepted POST for FB RTU, req body data user_id WTF');    
    res.status(200).end();
});

app.listen();
