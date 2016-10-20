exports = module.exports = function(io) {
    var clients = [];
    io.on('connection', function(socket) {
        socket.on('login', function(data) {
            var clientInfo = new Object();
            clientInfo.uid = data.uid;
            clientInfo.id = socket.id;
            clientInfo.socket = socket;
            clients.push(clientInfo);

            //console.log(clients);
        });

        socket.on('device mounted', function (data) {
            console.log(data);
        });

        socket.on('controll special user', function(data) {
            // 클라이언트 소켓 아이디를 통해서 그 소켓을 가진 클라이언트에만 메세지를 전송
            for (var i=0; i < clients.length; i++) {
                var client = clients[i];
                console.log('client.uid = '+ client.uid);
                if (client.uid == data.uid) {
                    console.log(data.msg);
                    client.socket.emit('message', data.msg);
                    //io.sockets.socket(client.id).emit('message', data.msg);
                    break;
                }
            }
        });


        socket.on('disconnect', function() {
            for (var i=0; i < clients.length; i++) {
                var client = clients[i];
                if (client.id == socket.id) {
                    clients.splice(i, 1);
                    console.log('user disconnected');
                    break;
                }
            }

        });
    });
}

