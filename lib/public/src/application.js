/**
 * Application Class: Constructor
 */
var fn = {}, cmd = {}, help = {}, Application = function (client, name) {
    this.$client = client;
    this.$name = name;
};

/**
 * Function: resource
 */
help.resource = {
    line: '_class_.resource("resource-name")',
    desc: 'reference an application resource'
};

fn.resource = function (name) {
    return new Resource(this, name);
};

/**
 * Function: resource
 */
help.as = {
    line: '_class_.as(resource)',
    desc: 'interface to application as resource'
};

fn.as = function (actor) {
    return new Interface(this, actor);
};
