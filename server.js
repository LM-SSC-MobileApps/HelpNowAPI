//this will set the database environemnt in the config.json file


var express = require('express');
// var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var https = require('https');
var fs = require('fs');
var formidable = require('formidable');
var http = require('http');
//note - only version 06.0 works - 0.7.0 does not read the port #
var proxy = require('express-http-proxy');
var app = express();

var environment = process.env.ENVIRONMENT || 'qas';
var port = process.env.PORT || 80;
var ssl_port = process.env.SSL_PORT || 443;
var enable_redirect = process.env.ENABLE_REDIRECT || true;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


//for creating the session availability
// app.use(
//     session({
//         secret: 'H3LbN0M_LM',
//         resave: false,
//         saveUninitialized: false,
//         cookie: { maxAge: 600000 }  //max cookie age is 60 minutes
//     })
// );

// Setup for authentication (must be after all body parsers, cookie parsers and session parsers)
var auth = require('./auth');
auth.setupAuthentication(environment, port, ssl_port, app);

// Setup for tomnod upload capability
var tomnod = require('./modules/tomnod');
tomnod.setupTomnod(app, fs, path, formidable);

var socialMedia = require('./modules/socialmedia');
//socialMedia.setupTwitter();
//socialMedia.getSocialMediaKeywords();
//socialMedia.searchTwitter('#HelpNow');

//the routes for the helpnow api
var accountRouter = require('./routes/account')(module.exports.isAPIAuthenticated);
var accountRoleRouter = require('./routes/accountrole')();
var addressRouter = require('./routes/address')();
var eventRouter = require('./routes/event')();
var eventLocationRouter = require('./routes/eventlocation')();
var eventTypeRouter = require('./routes/eventtype')();
var organizationRouter = require('./routes/organization')();
var organizationRegulationRouter = require('./routes/organizationregulation')();
var organizationTypeRouter = require('./routes/organizationtype')();
var requestStateRouter = require('./routes/requeststate')();
var resourceLocationRouter = require('./routes/resourcelocation')();
var resourceLocationTypeRouter = require('./routes/resourcelocationtype')();
var resourceLocationStatusRouter = require('./routes/resourcelocationstatus')();
var resourceLocationInventoryRouter = require('./routes/resourcelocationinventory')();
var resourceLocationTransportRouter = require('./routes/resourcelocationtransport')();
var resourceRequestRouter = require('./routes/resourcerequest')();
var resourceResponseRouter = require('./routes/resourceresponse')();
var resourceTypeRouter = require('./routes/resourcetype')();
var resourceSubtypeRouter = require('./routes/resourcesubtype')();
var transportTypeRouter = require('./routes/transporttype')();
var resourceTypeUnitOfMeasureRouter = require('./routes/resourcetypeunitofmeasure')();
var responseStateRouter = require('./routes/responsestate')();
var requestUrgencyRouter = require('./routes/requesturgency')();
var requestInviteRequestRouter = require('./routes/inviterequest')();
var blockageRouter = require('./routes/blockage')();
var blockageSourceRouter = require('./routes/blockagesource')();
var socialMediaRouter = require('./routes/socialmedia')();
var heatMapRouter = require('./routes/heatmap')();
var mapLayerRouter = require('./routes/maplayer')();
var mapLayerTypeRouter = require('./routes/maplayertype')();
var hashValuesRouter = require('./routes/hashvalues')();
var authRouter = require('./routes/authenticate')();


app.use('/account', accountRouter);
app.use('/accountrole', accountRoleRouter);
app.use('/address', addressRouter);
app.use('/event', eventRouter);
app.use('/eventlocation', eventLocationRouter);
app.use('/eventtype', eventTypeRouter);
app.use('/organization', organizationRouter);
app.use('/organizationregulation', organizationRegulationRouter);
app.use('/organizationtype', organizationTypeRouter);
app.use('/requeststate', requestStateRouter);
app.use('/resourcelocation', resourceLocationRouter);
app.use('/resourcelocationtype', resourceLocationTypeRouter);
app.use('/resourcelocationstatus', resourceLocationStatusRouter);
app.use('/resourcelocationinventory', resourceLocationInventoryRouter);
app.use('/resourcelocationtransport', resourceLocationTransportRouter);
app.use('/resourcerequest', resourceRequestRouter);
app.use('/resourceresponse', resourceResponseRouter);
app.use('/resourcetype', resourceTypeRouter);
app.use('/resourcesubtype', resourceSubtypeRouter);
app.use('/transporttype', transportTypeRouter);
app.use('/resourcetypeunitofmeasure', resourceTypeUnitOfMeasureRouter);
app.use('/responsestate', responseStateRouter);
app.use('/requesturgency', requestUrgencyRouter);
app.use('/inviterequest', requestInviteRequestRouter);
app.use('/blockage', blockageRouter);
app.use('/blockagesource', blockageSourceRouter);
app.use('/socialmedia', socialMediaRouter);
app.use('/heatmap', heatMapRouter);
app.use('/maplayer', mapLayerRouter);
app.use('/maplayertype', mapLayerTypeRouter);
app.use('/hashvalues', hashValuesRouter);
app.use('/authenticate', authRouter);

//set the express.static locations to serve up the static files
// app.use(express.static('views'));
// app.use(express.static('controllers'));
// app.use(express.static('style'));
// app.use(express.static('angular'));
// app.use(express.static('lib'));
// app.use(express.static('i18n'));
// app.use(express.static('fonts'));
// app.use(express.static('leaflet'));
// app.use('/', express.static( __dirname + '/'));



app.get('/', function (req, res) {
    if (req.protocol == "http" && enable_redirect == "true") {
        res.redirect('https://' + req.hostname + ":" + ssl_port + req.url);
    } else {
        res.sendFile(__dirname + '/app.html');
    }
});

app.listen(port, function(){
    console.log('Running on PORT:' + port);
});

https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
}, app).listen(ssl_port, function() {
    console.log('Running on PORT:' + ssl_port);
});



String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};


