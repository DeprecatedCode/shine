/**
 * _class_ Class
 */
var _class_ = (function () {

    _definition_

    /**
     * Command: help 
     */
    help.help = {
        line: '_class_.help',
        desc: 'display this help text'
    };

    cmd.help = helpCommand('_class_', help);

    /**
     * Register Functions
     */
    Object.keys(fn).forEach(function (_fn) {
        _class_.prototype[_fn] = fn[_fn];
    });

    /**
     * Register Commands
     */
    Object.keys(cmd).forEach(function (_cmd) {
        _class_.prototype.__defineGetter__(_cmd, cmd[_cmd]);
    });
    
    return _class_;
}) ();
