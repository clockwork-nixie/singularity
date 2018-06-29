'use strict';

const { parse, register } = require('./src/ruleset');
const { addRoot, addTypeOf, find, isTypeOf } = require('./src/types');


register('$token is a concept', addRoot);
register('$subClass is a type of $superClass', addTypeOf);
register('is $type a type of $concept', isTypeOf);

console.log("");
  
parse('$animal is a concept');
parse('$cat is a type of $animal');
parse('$dog is a type of $animal');

console.log('');

console.log(find('dog')? "Found dog": "Could not find dog");
console.log(parse('is $dog a type of $animal')? "Yes": "Failure");
console.log(parse('is $cat a type of $dog')? "Failure": "No");
