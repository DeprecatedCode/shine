var fs = require("fs");

var shine = fs.readFileSync(__dirname + '/_shine.js').toString();

var classTemplate = fs.readFileSync(__dirname + '/_class.js').toString();

shine = shine.replace(/ *\/\*\*\s+\@class\s+(\w+)\s+(\S+)\s+\*\*\//g, function (match, name, src) {
    var definition = '    ' + fs.readFileSync(__dirname + '/' + src).toString().trim()
        .replace(/\n/g, '\n    ');
    return '    ' + classTemplate
        .replace(/_class_/g, name)
        .replace(/ *_definition_/, definition)
        .replace(/\n/g, '\n    ');
});

fs.writeFileSync(__dirname + '/../shine.js', shine);

console.log('build complete');
