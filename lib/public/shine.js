/**
 * Shine Client Library
 * @author Nate Ferrero
 */
define('shine', [], function() {

    /**
     * Application Class: Constructor
     */
    var Application = function (client, name) {
        this.$client = client;
        this.$name = name;
    };

    Application.prototype.resource = function (name) {
        return new Resource(this, name);
    };

    Application.prototype.as = function (actor) {
        return new Interface(this, actor);
    };

    /**
     * Resource Class: Constructor
     */
    var Resource = function (app, name) {
        this.$app = app;
        this.$name = name;
    };

    Resource.prototype.put = function () {
        console.log('TODO: PUT RESOURCE');
    };

    Resource.prototype.get = function () {
        console.log('TODO: GET RESOURCE');
    };

    /**
     * Interface Class: Constructor
     */
    var Interface = function (app, actor) {
        this.$app = app;
        this.$actor = actor;
    };

    Interface.prototype.resource = function(name) {
        return new Resource(this, name);
    };

    /**
     * Client Class: Constructor
     */
    var Client = function (socket, opts) {
        this.socket = socket;

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
         * Function: send 
         */
        help.usage.send = {
            line: 'shine.send({"something": "signed message"})',
            desc: 'send a message to a shine app'
        };
        fn.send = function (msg) {
            this.socket.emit('send', msg);
        };

        /**
         * Function: app 
         */
        help.usage.app = {
            line: 'var myApp = shine.app("my-company.my-app")',
            desc: 'get a reference to a shine app'
        };
        fn.app = function (name) {
            return new Application(this, name);
        };

        /**
         * Command: ping 
         */
        help.usage.ping = {
            line: 'shine.ping',
            desc: 'provoke a response'
        };
        cmd.ping = function () {
            console.log('pinging shine');
            this.send({type: 'ping'}, function (response) {
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
            console.log(['usage'/*, 'settings'*/].map(function (section) {
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
