'use strict'
 var express = require('express');
 var app = express();
 var server = require('http').Server(app);
 var io = require('socket.io')(server);

 var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

 app.use(express.static('client'));

app.get('/hola-mundo',function(req,res){
    res.status(200).send('hola mundo');
});

var messages = [{
    id:1,
    text:'Bienvenido al chat privado',
    nickname:'Bot - julio'
}];

io.on('connection', (socket) =>{
    console.log('El nodo con IP: '+socket.handshake.address + 'se ha conectado...');
    socket.emit('messages',messages);

    socket.on('add-message',function(data){
        messages.push(data);

        io.sockets.emit('messages',messages);

    });




});

server.listen(port,ip);

console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;