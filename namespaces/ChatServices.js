module.exports = function(app, io) {
    var orders = io.of('/tasks');


    // Register events on socket connection
    orders.on('connection', function(socket){ 
        
        // sự kiện này dành cho 2 khi nhập token vào và đẩy sự kiện tới cho user 1. 
        socket.on('joinRoom', function(data){
            orders.to("demochat").emit('joinRoom', data);
        });

        // User 1 + 2 một trong 2 sẽ nhận khi 1 người đẩy lên sự kiện
        socket.on('newmessage', function(data){
            orders.to("demochat").emit('newmessage', data);
        });


        // User 1 + 2 sẽ jion vào socket khi mở app
        socket.on('join', function(roomId){
            socket.join("demo"+roomId);
        });

    });
}