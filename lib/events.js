/**
 * Shine Socket Events
 * @author Nate Ferrero
 */
module.exports = function (socket) {
      
    socket.on('send', function(data) {
        console.log('[shine] ' + data.from + ' --> ' + data.to);
        socket.emit('receive', data);
    });

};
