'use strict';

require('../utilities/mixins');

const Paradigm = require('../registry/paradigm');
const Parser = require('./parser');

const parser = new Parser();


try {
    const paradigm = new Paradigm().withClassShallowBinding();

    parser.register('$token is a concept', paradigm.add);
    parser.register('$subClass is a type of $superClass', paradigm.addTypeOf);
    parser.register('is $type a type of $concept', paradigm.isTypeOf);

    console.log("");
} catch (error) {
    console.error('');
    console.error(`Runtime error: ${error.message}`);
}


module.exports = parser.parse.bind(parser);