/**
 * Interface Class: Constructor
 */
var fn = {}, cmd = {}, help = {}, Interface = function (app, actor) {
    this.$app = app;
    this.$actor = actor;
};

/**
 * Function: send
 */
fn.send = function (message) {
    message.actor = this.$actor.$serialize();
    this.$app.send(message);
};

/**
 * Function: resource
 */
fn.resource = function(name) {
    return new Resource(this, name);
};
