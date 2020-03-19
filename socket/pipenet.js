var path = require('path');
var net = require('net');
var pipeNet = {};

var isValidJSONString = async(str) => {
    try {
        await JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var server = net.createServer((socket) => {
    socket.on('data', async(data) => {
        let dataJson;
        data = data.toString('utf8');
        (isValidJSONString(data)) ? dataJson = JSON.parse(str): socket.end('JSON no es valido');
        if (dataJson.action) {
            switch (dataJson.action) {
                case 'send-to-screen':

                    break;
                case 'get-to-screen':

                    break;
                case 'send-to-bot':

                    break;
                case 'get-to-bot':

                    break;
            }
        }
    });
});

pipeNet.pipe = server;


module.exports = pipeNet;