/**
 * Shine Client Library
 * @author Nate Ferrero
 */
define('shine', [], function() {
    
    var Client = function (socket, opts) {
        this.socket = socket;
        this.opt = {
            maxHosts: 10
        };
        this._hosts = [];
        opts && typeof opts === 'object' && Object.keys(opts).map(
            function (x) { this.opt[x] = opts[x]; }.bind(this)
        );
        
        socket.on('receive', function (data) {
            console.log("Message received: ", data);
        });
    };
    
    Client.prototype.host = function (host) {
        if (typeof host !== 'string' || !/^[a-z0-9\-\.]+(\:\d{1,5})?$/.test(host)) {
            throw new Error("Invalid host host format: '" + host + "'");
        }
        this._hosts.push(host);
    };
    
    Client.prototype.send = function (to, msg) {
        if (!this.id) {
            throw new Error("Client.send(to, msg): Client.id must be set");
        }
        if (!to || !msg) {
            throw new Error("Client.send(to, msg): not enough arguments");
        }
        this.socket.emit('send', {from: this.id, to: to, msg: msg});
    };

    Client.prototype.__defineGetter__('hosts', function () {
        var hosts = this._hosts.slice(0, this.opt.maxHosts);
        hosts.unshift(window.location.host);
        return hosts;
    });

    Client.prototype.__defineGetter__('ping', function () {
        console.log('pinging ' + (1 + this._hosts.length) + ' hosts');
        this.send(this.id, {type: 'ping'}, function (response) {
            console.log(response);
        });
    });

    Client.prototype.__defineGetter__('help', function () {
        console.log([
            '[Usage]',
            'shine.hosts                         # show currently connected hosts',
            'shine.host("snapplab.com:8081")     # discover a new host',
            'shine.ping                          # provoke a response from all hosts',
            '',
            '[Settings]',
            'shine.id = "nate"                   # global name to identify with',
            'shine.opt.maxHosts = 10             # max number of hosts to connect to at a time'
        ].join('\n'));
    });
    
    Client.prototype.__defineGetter__('status', function () {
        return 'OK';
    });
    
    return {client: function (socket, opts) {
        return new Client(socket, opts);
    }};

});
