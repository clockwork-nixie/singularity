'use strict';


class Ruleset {
    constructor() {
        this._prefix = '$';
        this._registry = {};

        this.parse = this.parse.bind(this);
        this.register = this.register.bind(this);
    }


    parse(sentence) {
        const words = (sentence || '').split(' ').filter(word => word.replace(' ', ''));
        const token = words.map(word => word.startsWith(this._prefix)? this._prefix: word).join(' ');
        const directive = this._registry[token];

        if (!directive) {
            throw Error(`Unknown directive: ${sentence}`);
        }
        console.log(`Parsed: ${sentence}`);
        return directive.routine.apply(null, directive.parameters.map(i => words[i].substr(1)));
    }


    register(pattern, routine) {
        const words = (pattern || '').split(' ').filter(word => word.replace(' ', ''));
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
            console.log(`Registered: ${pattern}`);
        }
    }
}


module.exports = new Ruleset();
