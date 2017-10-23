var path = require('path');
var qs = require('querystring');
var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var request = require('request');
var config = require('./server-config');

var app = express();
app.set('port', 5000);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

function createJWT(profile) {
    var payload = {
      sub: profile.email,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}

app.post('/auth/google', function(req, res) {
    console.log('req',req.body);
    var accessTokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
    var peopleApiUrl = 'https://www.googleapis.com/oauth2/v2/userinfo?fields=email%2Cfamily_name%2Cgender%2Cgiven_name%2Chd%2Cid%2Clink%2Clocale%2Cname%2Cpicture%2Cverified_email';
     var token_request='code='+req.body.code+
          '&client_id='+req.body.clientId+
          '&client_secret='+config.GOOGLE_SECRET+
          '&redirect_uri='+req.body.redirectUri+
          '&grant_type=authorization_code';
      var request_length = token_request.length;
    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { body: token_request, headers: {'Content-type':'application/x-www-form-urlencoded'} }, function(err, response, token) {
      var accessToken = JSON.parse(token).access_token;
      var headers = { Authorization: 'Bearer ' + accessToken };
  
      // Step 2. Retrieve profile information about the current user.
      request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
        if(profile.error) {
          return res.status(500).send({message: profile.error.message});
        }
        var token = createJWT({"name":profile});
        res.send({ token: token });
      });
    });
});

app.listen(app.get('port'), app.get('host'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});