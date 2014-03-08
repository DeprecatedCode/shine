/**
 * Interface Class: Constructor
 */
var fn = {}, cmd = {}, help = {}, Interface = function (app, actor) {
    this.$app = app;
    this.$actor = actor;
};

/**
 * Function: resource
 */
fn.resource = function(name) {
    return new Resource(this, name);
};
