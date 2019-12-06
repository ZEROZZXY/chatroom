const webSocket = require('ws');

const server = new webSocket.Server({
    port: 5000,
    host: '10.31.162.41'
});

let users = {};

let count = 0;

server.on('connection', client => {
    count++;
    client.on('message', msg => {
        msg = JSON.parse(msg);
        client.username = msg.username;
        users[client.username] = client;
        boardCaster(msg, client);
    })
    client.on('close', () => {
        count--;
        for (var key in users) {
            if (client.username != undefined) {
                users[key].send(`${client.username};${count}`);
            }
        }
        // console.log(`用户${client.username}下线了`);
        delete users[client.username];
    })
})

function boardCaster(msg, client) {
    for (var key in users) {
        users[key].send(`${client.username};${msg.msg};${count};${msg.photo}`)
    }
}