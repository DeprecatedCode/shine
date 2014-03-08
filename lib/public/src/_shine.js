/**
 * Shine Client Library
 * @author Nate Ferrero
 */
define('shine', [], function() {

    /**
     * Common Help Command
     */
    var helpCommand = function (name, help) {
        return function () {
            console.log(['shine.' + name + ' Help'].map(function (title) {
                var topics = Object.keys(help).sort();
                topics.map(function (topic) {
                    Object.keys(help[topic]).map(function (key) {
                        help[topic][key] = help[topic][key].replace(/_class_/g, name);
                    });
                });
                var pad = Math.max.apply(Math, topics.map(function (topic) {
                    return help[topic].line.length;
                }));
                var line = ' --' + title.replace(/./g, '-');
                return [line, '| ' + title + ' |', line].concat(topics.map(function (topic) {
                    var txt = help[topic].line;
                    while (txt.length < pad) { txt += ' '; }
                    return txt + '  # ' + help[topic].desc;
                })).join('\n');
            }).join('\n\n'));
        };
    };

    /** @class Application  application.js  **/
    /** @class Resource     resource.js     **/
    /** @class Interface    interface.js    **/
    /** @class Client       client.js       **/

    /**
     * Module Interface
     */
    return {client: function (socket, opts) {
        return new Client(socket, opts);
    }};

});
