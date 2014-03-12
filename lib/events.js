/**
 * Shine Socket Events
 * @author Nate Ferrero
 */

module.exports = function (socket, cache) {

    socket.on('send', function(data) {

        var a, b, c;

        switch(data.operation) {
            case 'put':
                a = data.app.name;
                b = data.actor ? data.actor.name : 'user.@anonymous';
                c = data.resource.name;
                cache[a] || (cache[a] = {});
                cache[a][b] || (cache[a][b] = {});
                cache[a][b][c] = data.value;
                socket.emit('putSuccess', data);
                break;
            case 'get':
                a = data.app.name;
                b = data.actor ? data.actor.name : 'user.@anonymous';
                c = data.resource.name;
                if(a in cache && b in cache[a] && c in cache[a][b]) {
                    socket.emit('getSuccess', cache[a][b][c]);
                }
                else {
                    socket.emit('getFailure', data);
                }
                break;
            default:
                socket.emit('receive', data);
        }

        console.log('[shine] ', data);
    });

};
