'use strict';

const expect = require('chai').expect;
const Parser = require('../src/interactive/parser');

describe('ruleset', () => {
    let instance;

    beforeEach(() => instance = new Parser());
      
    describe('#register', () => {
        it('should be exported', () => {
            expect(instance.register).to.be.a('function');
        });

        it('should fail when called with no arguments', () => {
            expect(() => instance.register()).to.be.throw(/Cannot register empty pattern./);
        });

        it('should fail when called with whitespace pattern', () => {
            expect(() => instance.register(" \t\r\n")).to.be.throw(/Cannot register empty pattern./);
        });

        it('should fail when called with no routine', () => {
            expect(() => instance.register("foo")).to.be.throw(/Routine must be a function./);
        });

        it('should fail when called with non-function routine', () => {
            expect(() => instance.register("foo", "bar")).to.be.throw(/Routine must be a function./);
        });

        it('should succeed for a single word', () => {
            const routine = () => {};

            instance.register("foo", routine);

            const registration = instance._registry["foo"];
            
            expect(registration).to.not.be.undefined;
            expect(registration.parameters).to.be.an('array');
            expect(registration.parameters.length).to.equal(0);
            expect(registration.routine).to.equal(routine);
        });
    });
});
