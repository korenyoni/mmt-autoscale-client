const os = require('os');
var io = require('socket.io-client');
var https = require('https');

var publicIp = require('public-ip');

https.globalAgent.options.rejectUnauthorized = false;

publicIp.v4().then(ip => {
    publicIp = ip;
    socket = io.connect(process.env.HTTPS_SERVER, { agent: https.globalAgent });
    socket.on('connect', function(){
        console.log("connected to server");
    });
    socket.on('request-load-avg', function(data){
        socket.emit('load-average', {
            address: ip,
            load: os.loadavg()[0]
        });
    });
});
