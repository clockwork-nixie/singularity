'use strict';


Object.prototype.withClassShallowBinding = function() {
    const prototype = Object.getPrototypeOf(this);

    if (prototype) {
        for (let name of Object.getOwnPropertyNames(prototype)) {
            const property = this[name];

            if (typeof property === 'function' && property !== prototype.constructor) {
                this[name] = property.bind(this);
            }
        }
    }
    return this;
};