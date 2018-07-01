'use strict';


class Concept {
    constructor(name) {
        if (!name) {
            throw Error('Name cannot be empty.');
        }
        if (!name.match(/^[A-Za-z](\+?[A-Za-z])*$/)) {
            throw Error('Name must be all letters with optional isolated internal space-surrogates (+).');
        }
        this.name = name;
        this.superclasses = null;
    }


    addSuperclass(superclass) {
        if (!this.superclasses) {
            this.superclasses = [superclass];         
        } else if (this.superclasses.every(s => s != superclass)) {
            this.superclasses.push(superclass);
        }
    }


    isTypeOf(candidate) {
        return candidate == this ||
          (this.superclasses && !this.superclasses.every(s => !s.isTypeOf(candidate)));
    }
}


module.exports = Concept;