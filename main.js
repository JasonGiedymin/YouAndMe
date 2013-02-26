var one = require('./one.json');
var two = require('./two.json');

Object.prototype.equals = function(x, tree){
    if(tree === undefined) tree = [];

    var construct = function(that) {
        var path = "/root/";
        for(var i=0; i<tree.length; i++) {
            var field = tree[i];
            path += field + "/";
        }
        return path;
    };

    var compInfo = function(name, a, b) {
        console.error("[" + name +"] => [" + a + "] <--> [" + b + "]; {" + construct(b) + "}");
    };

    var prev = tree;
    for (var p in this) {
        prev.push(p);
        if(typeof(this[p]) !== typeof(x[p])) compInfo(p+" as Type", typeof(this[p]), typeof(x[p]));
        if((this[p]===null) !== (x[p]===null)) compInfo(p, this[p], x[p]);
        switch (typeof(this[p])) {
            case 'undefined':
                if (typeof(x[p]) != 'undefined') compInfo(p+" as Undefined", this[p], x[p]);
                break;
            case 'object':
                if(this[p]!==null && x[p]!==null &&
                    (this[p].constructor.toString() !== x[p].constructor.toString() ||
                        !this[p].equals(x[p], prev))) {
                    compInfo(p+" as Obj", this[p], x[p]);
                }
                break;
            case 'function':
                if (p != 'equals' && this[p].toString() != x[p].toString()) compInfo(p+" as f(x)", this[p], x[p], prev);
                break;
            default:
                if (this[p] !== x[p]) compInfo(p+" as field", this[p], x[p]);
        }
        prev.pop();
    }
    return true;
};

console.log('Started');

one.equals(two);
