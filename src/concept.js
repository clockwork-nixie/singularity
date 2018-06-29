'use strict';


class Concept {
    constructor(name, parent) {
        if (!name) {
            throw Error('Name cannot be empty.');
        }
        this.name = name;
        this.parent = parent || null;
    }
}


let _registry = {};


class Concepts {
    static add(name) {
        if (_registry[name]) {
            throw Error(`${name} is already defined.`)
        }
        return (_registry[name] = new Concept(name));
    }
    
    
    static addTypeOf(name, parentName) {
        const parent = _registry[parentName];
    
        if (!parent) {
            throw Error(`${parentName} is not defined.`)
        }
        const instance = Concepts.find(name) || Concepts.add(name)

        if (instance.parent) {
            throw Error(`${name} already has ${instance.parent.name} as a parent.`);
        }
        instance.parent = parent;
    }


    static isTypeOf(name, ancestorName) {
        const ancestor = Concepts.find(ancestorName);
        const instance = Concepts.find(name);

        if (!ancestor) {
            throw Error(`${ancestorName} is not a registered type.`);
        }
        
        if (!instance) {
            throw Error(`${name} is not a registered type.`);
        }
        let isSuccess = false;

        for (let current = instance; current; current = current.parent) {
            if (current === ancestor) {
                isSuccess = true;
                break;
            }
        }
        return isSuccess;
    }


    static find(name) { 
        return _registry[name || ''];
    }

    
    static purge() {
        registry = {};
    }
}

module.exports = Concepts;
