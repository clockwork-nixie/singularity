'use strict';

const { parse, register } = require('./src/ruleset');
const { add, addTypeOf, find, isTypeOf } = require('./src/concept');


register('$token is a concept', add);
register('$subClass is a type of $superClass', addTypeOf);
register('is $type a type of $concept', isTypeOf);

console.log("");
  
parse('$animal is a concept');
parse('$cat is a type of $animal');
parse('$dog is a type of $animal');
parse('$ocelot is a type of $cat');

console.log('');

console.log(parse('is $ragdoll a type of $animal')? "Yes": "Failure");
console.log(parse('is $ocelot a type of $dog')? "Failure": "No");
