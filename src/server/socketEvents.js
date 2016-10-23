var moment = require('moment');

exports = module.exports = function(io) {
    var clients = [];
    var coffeeItems = [
        {id:0, count:0},{id:1, count:0},
        {id:2, count:0},{id:3, count:0},
        {id:4, count:0}
    ];
    io.on('connection', function(socket) {
        socket.on('login', function(data) {
            var clientInfo = new Object();
            clientInfo.uid = data.uid;
            clientInfo.id = socket.id;
            clientInfo.socket = socket;
            clients.push(clientInfo);

            socket.join('device');
        });

        socket.conn.on('heartbeat', function() {
            let client = clients.find((json)=>{return json.id === this.id})
            let now_date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss").toString()

            if(client === undefined){
                //force discinnect 현재 동작안해서 주석처리.
                //socket.broadcast.to(this.id).emit('force disconnect');
                //this.emit('force disconnect');
                socket.disconnect()
                console.log("["+now_date+"] "+this.id + " force disconnect");
            }else{
                console.log("["+now_date+"] "+client.uid);
            }

        });

        socket.on('device mounted', function (data) {
            console.log(data);
        });

        socket.on('all change template', function(data){
            socket.broadcast.emit('change template', data)
        });

        socket.on('all change thema', function(){
            socket.broadcast.emit('change thema' )
        });

        socket.on('vote coffee item', function(data){
            console.log(data)
            socket.broadcast.emit('vote coffee item', data )
        })

        socket.on('controll special user', function(data) {
            // 클라이언트 소켓 아이디를 통해서 그 소켓을 가진 클라이언트에만 메세지를 전송
            for (var i=0; i < clients.length; i++) {
                var client = clients[i];
                console.log('client.uid = '+ client.uid);
                if (client.uid == data.uid) {
                    console.log(data.msg);
                    client.socket.emit('message', data.msg);
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

