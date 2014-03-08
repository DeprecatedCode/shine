/**
 * Application Class: Constructor
 */
var fn = {}, cmd = {}, help = {}, Application = function (client, name) {
    this.$client = client;
    this.$name = name;
};

fn.resource = function (name) {
    return new Resource(this, name);
};

fn.as = function (actor) {
    return new Interface(this, actor);
};
