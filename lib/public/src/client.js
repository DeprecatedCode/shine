/**
 * Client Class: Constructor
 */
var fn = {}, cmd = {}, help = {}, Client = function (socket, opts) {
    this.socket = socket;

    opts && typeof opts === 'object' && Object.keys(opts).map(
        function (x) { this.opt[x] = opts[x]; }.bind(this)
    );
    
    socket.on('receive', function (data) {
        console.log("Message received: ", data);
    });
};

/**
 * Function: send 
 */
help.send = {
    line: '_class_.send({"something": "signed message"})',
    desc: 'send a message to a shine app'
};

fn.send = function (msg) {
    this.socket.emit('send', msg);
};

/**
 * Function: app 
 */
help.app = {
    line: 'var myApp = _class_.app("my-company.my-app")',
    desc: 'get a reference to a shine app'
};

fn.app = function (name) {
    return new Application(this, name);
};

/**
 * Command: ping 
 */
help.ping = {
    line: '_class_.ping',
    desc: 'provoke a response'
};

cmd.ping = function () {
    console.log('pinging shine');
    this.send({type: 'ping'}, function (response) {
        console.log(response);
    });
};

/**
 * Command: status 
 */
help.status = {
    line: '_class_.status',
    desc: 'current status of the shine client'
};

cmd.status = function () {
    return 'OK'; // @todo define valid statuses
};
