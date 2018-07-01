'use strict';

const Concept = require('./concept');


class Paradigm {
    constructor() {
        this._registry = {};
    }


    add(name) {
        if (this._registry[name]) {
            throw Error(`${name} is already defined.`)
        }
        return (this._registry[name] = new Concept(name));
    }
    
    
    addTypeOf(name, ancestorName) {
        const ancestor = this.find(ancestorName);
    
        if (!ancestor) {
            throw Error(`${ancestorName} is not registered.`)
        }
        const instance = this.find(name) || this.add(name);
        
        if (ancestor.isTypeOf(instance))
        {
            throw Error(`${ancestorName} is a type of ${name}: no loops allowed.`)
        }
        instance.addSuperclass(ancestor);
    }


    isTypeOf(name, candidateName) {
        const instance = this.find(name);
        const candidate = (name == candidateName)? instance: this.find(candidateName);              
        
        if (!instance) {
            throw Error(`${name} is not registered.`);
        }
        if (!candidate) {
            throw Error(`${candidateName} is not registered.`);
        }
        return instance.isTypeOf(candidate);
    }


    find(name) { 
        return this._registry[name || ''];
    }

    
    purge() {
        this._registry = {};
    }
}

module.exports = Paradigm;
