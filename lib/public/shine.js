/**
 * Shine Client Library
 * @author Nate Ferrero
 */
define('shine', [], function() {
    
    /**
     * Client Class: Constructor
     */
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
    
    /**
     * Client Class: Functions and Commands
     */
    (function (fn, cmd, help) {

        /**
         * Setting: id
         */
        help.settings.id = {
            line: 'shine.id = "nate"',
            desc: 'global name to identify with'
        };

        /**
         * Setting: maxHosts
         */
        help.settings.maxHosts = {
            line: 'shine.opt.maxHosts = 10',
            desc: 'max number of hosts to connect to at a time'
        };

        /**
         * Function: host 
         */
        help.usage.host = {
            line: 'shine.host("snapplab.com:8081")',
            desc: 'discover a new host'
        };
        fn.host = function (host) {
            if (typeof host !== 'string' || !/^[a-z0-9\-\.]+(\:\d{1,5})?$/.test(host)) {
                throw new Error("Invalid host host format: '" + host + "'");
            }
            this._hosts.push(host);
        };

        /**
         * Function: send 
         */
        help.usage.send = {
            line: 'shine.send("john", {"custom": "data"})',
            desc: 'send data to a user'
        };
        fn.send = function (to, msg) {
            if (!this.id) {
                throw new Error("Client.send(to, msg): Client.id must be set");
            }
            if (!to || !msg) {
                throw new Error("Client.send(to, msg): not enough arguments");
            }
            this.socket.emit('send', {from: this.id, to: to, msg: msg});
        };

        /**
         * Command: hosts 
         */
        help.usage.hosts = {
            line: 'shine.hosts',
            desc: 'show currently connected hosts'
        };
        cmd.hosts = function () {
            var hosts = this._hosts.slice(0, this.opt.maxHosts);
            hosts.unshift(window.location.host);
            return hosts;
        };

        /**
         * Command: ping 
         */
        help.usage.ping = {
            line: 'shine.ping',
            desc: 'provoke a response from all hosts'
        };
        cmd.ping = function () {
            console.log('pinging ' + (1 + this._hosts.length) + ' hosts');
            this.send(this.id, {type: 'ping'}, function (response) {
                console.log(response);
            });
        };

        /**
         * Command: help 
         */
        help.usage.help = {
            line: 'shine.help',
            desc: 'display this help text'
        };
        cmd.help = function () {
            var titles = {usage: 'Usage', settings: 'Settings'};
            console.log(['usage', 'settings'].map(function (section) {
                var topics = Object.keys(help[section]).sort();
                var pad = Math.max.apply(Math, topics.map(function (topic) {
                    return help[section][topic].line.length;
                }));
                return ['[' + titles[section] + ']'].concat(topics.map(function (topic) {
                    var txt = help[section][topic].line;
                    while (txt.length < pad) { txt += ' '; }
                    return txt + '  # ' + help[section][topic].desc;
                })).join('\n');
            }).join('\n\n'));
        };

        /**
         * Command: status 
         */
        help.usage.status = {
            line: 'shine.status',
            desc: 'current status of the shine client'
        };
        cmd.status = function () {
            return 'OK'; // @todo define valid statuses
        };
        
    }) (Client.prototype, Client._commands = {},
        Client._help = {usage: {}, settings: {}});
    
    /**
     * Register Commands
     */
    Object.keys(Client._commands).forEach(function (cmd) {
        Client.prototype.__defineGetter__(cmd, Client._commands[cmd]);
    });
    
    /**
     * Module Interface
     */
    return {client: function (socket, opts) {
        return new Client(socket, opts);
    }};

});
