'use strict';

const parse = require('./src/interactive');


try { 
    parse('$animal is a concept');
    parse('$cat is a type of $animal');
    parse('$dog is a type of $animal');
    parse('$ocelot is a type of $cat');

    console.log('');

    console.log(parse('is $ocelot a type of $animal'));
    console.log(parse('is $ocelot a type of $dog'));
} catch (error) {
    console.error('');
    console.error(`Runtime error: ${error.message}`);
}
