/**
 * Resource Class: Constructor
 */
var fn = {}, cmd = {}, help = {}, Resource = function (app, name) {
    this.$app = app;
    this.$name = name;
};

fn.put = function (value) {
    var message = {operation: 'put', resource: this.$serialize(), value: value};
    this.$app.send(message);
};

fn.get = function () {
    var message = {operation: 'get', resource: this.$serialize()};
    this.$app.send(message);
};

fn.$serialize = function () {
    return {name: this.$name};
};
