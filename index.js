const os = require('os');
var io = require('socket.io-client');
var https = require('https');

require('dotenv').config();

https.globalAgent.options.rejectUnauthorized = false;
socket = io.connect(process.env.HTTPS_SERVER, { agent: https.globalAgent });
socket.on('connect', function(){
    console.log("connected to server");
});
socket.on('request-load-avg', function(data){
    socket.emit('load-average', {
        id: socket.id,
        load: os.loadavg()[0]
    });
});
