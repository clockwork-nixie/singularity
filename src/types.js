'use strict';


class Types {
    constructor() {
        this._registry = {};
        this.addRoot = this.addRoot.bind(this);
        this.addTypeOf = this.addTypeOf.bind(this);
        this.find = this.find.bind(this);
        this.isTypeOf = this.isTypeOf.bind(this);
    }


    addRoot(name) {
        if (this._registry[name]) {
            throw Error(`${name} is already defined.`)
        }
        return (this._registry[name] = { name });
    }
    
    
    addTypeOf(child, parent) {
        if (this._registry[child]) {
            throw Error(`${child} is already defined.`)
        }
        const ancestor = this._registry[parent];
    
        if (!ancestor) {
            throw Error(`${parent} is not defined.`)
        }
        return this._registry[child] = { 
            name: child,
            parent: ancestor
        };
    }


    isTypeOf(child, parent) {
        const ancestor = this.find(parent);
        const descendant = this.find(child);

        if (!ancestor) {
            throw Error(`${parent} is not a registered type.`);
        }
        
        if (!descendant) {
            throw Error(`${child} is not a registered type.`);
        }
        let isSuccess = false;

        for (let current = descendant; current; current = current.parent) {
            if (current === ancestor) {
                isSuccess = true;
                break;
            }
        }
        return isSuccess;
    }


    find(name) { return this._registry[name || '']; }
}

module.exports = new Types();
