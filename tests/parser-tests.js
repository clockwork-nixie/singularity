'use strict';

const expect = require('chai').expect;
const Parser = require('../src/interactive/parser');

describe('parser', () => {
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

        it('should fail when called without a routine', () => {
            expect(() => instance.register("foo")).to.be.throw(/Routine must be a function./);
        });

        it('should fail when called with non-function as a routine', () => {
            expect(() => instance.register("foo", "bar")).to.be.throw(/Routine must be a function./);
        });

        it('should succeed for a single word', () => {
            instance.register("foo", routine);
        });

        it('should succeed for a single word', () => {
            instance.register("foo", routine);
        });
    });
});
