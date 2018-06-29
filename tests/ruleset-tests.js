'use strict';

const expect = require('chai').expect;
const ruleset = require('../src/ruleset');

describe('ruleset', () => {
    beforeEach(() => ruleset._registry = {});
      
    describe('#register', () => {
        it('should be exported', () => {
            expect(ruleset.register).to.be.a('function');
        });

        it('should fail when called with no arguments', () => {
            expect(() => ruleset.register()).to.be.throw(/Cannot register empty pattern./);
        });

        it('should fail when called with whitespace pattern', () => {
            expect(() => ruleset.register(" ")).to.be.throw(/Cannot register empty pattern./);
        });

        it('should fail when called with no routine', () => {
            expect(() => ruleset.register("foo")).to.be.throw(/Routine must be a function./);
        });

        it('should fail when called with non-function routine', () => {
            expect(() => ruleset.register("foo", "bar")).to.be.throw(/Routine must be a function./);
        });

        it('should succeed for a single word', () => {
            const routine = () => {};

            expect(() => ruleset.register("foo", routine)).to.be.ok;
            console.log(JSON.stringify(ruleset._registry));
            expect(ruleset._registry["foo"]).to.not.be.undefined;
            expect(ruleset._registry["foo"].routine).to.not.equal(routine);
        });
    });
});
