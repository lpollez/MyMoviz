var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true // deprecated à terme
}

mongoose.connect('mongodb://test:test35@ds263109.mlab.com:63109/mymovizapp',
    options,
    function(err) { // cette fonction s'execute à la connexion (erreur ou pas)
      console.log(err);
    }
);
