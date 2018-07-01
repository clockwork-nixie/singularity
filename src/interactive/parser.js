'use strict';


class Parser {
    constructor() {
        this._prefix = '$';
        this._registry = {};
        this._separators = /[\s,]+/;
    }


    parse(sentence) {
        const words = (sentence || '').split(this._separators).filter(word => word);
        const token = words.map(word => word.startsWith(this._prefix)? this._prefix: word).join(' ');
        const directive = this._registry[token];

        if (!directive) {
            throw Error(`Unknown directive: ${sentence}`);
        }
        console.log(`>> ${sentence}`);
        
        return directive.routine.apply(null, directive.parameters.map(i => words[i].substr(1)));
    }


    register(pattern, routine) {
        const words = (pattern || '').split(this._separators).filter(word => word);
        const token = words.map(word => word.startsWith(this._prefix)? this._prefix: word).join(' ');
        const parameters = words.map((word, index) => word.startsWith(this._prefix)? index: null).filter(x => x !== null);

        if (!words.length) {
            throw Error('Cannot register empty pattern.');
        } else if (typeof routine !== 'function') {
            throw Error('Routine must be a function.');
        } else if (this._registry[token]) {
            throw Error(`A rule has already been defined for: ${pattern}`);
        } else {
            this._registry[token] = { parameters, routine };
            console.log(`## ${pattern}`);
        }
    }
}


module.exports = Parser;
