import {expect} from 'chai';
import {select} from "../src/InfluxQueryBuilder";
import {all, field, fields, sumOn} from "../src/Selector";


describe("Simple queries", function() {
    it('select all', function() {
        const selectStart = select(all());
        expect(selectStart.query()).to.be.a('string');
        expect(selectStart.query()).to.equals('SELECT *');
        expect(selectStart.isValid()).to.be.false;
    });
    it('select field', function () {
        const selectField = select(field('groField'));
        expect(selectField.query()).to.be.a('string');
        expect(selectField.query()).to.equals('SELECT "groField"');
        expect(selectField.isValid()).to.be.false;
    });
    it('select multiple fields', function () {
        const selectFields = select(fields('riri', 'fifi', 'loulou'));
        expect(selectFields.query()).to.be.a('string');
        expect(selectFields.query()).to.equals('SELECT "riri","fifi","loulou"');
        expect(selectFields.isValid()).to.be.false;
    });

    it('select all from measure', function () {
        const selectField = select(all()).from('myMeasure');
        expect(selectField.query()).to.be.a('string');
        expect(selectField.query()).to.equals('SELECT * FROM myMeasure');
        expect(selectField.isValid()).to.be.true;
    });
    it('select salami from sandwich', function () {
        const selectField = select(field('salami')).from('sandwich');
        expect(selectField.query()).to.be.a('string');
        expect(selectField.query()).to.equals('SELECT "salami" FROM sandwich');
        expect(selectField.isValid()).to.be.true;
    });
    it('select salami as peperoni from sandwich', function () {
        const selectField = select(field('salami').as('peperoni')).from('sandwich');
        expect(selectField.query()).to.be.a('string');
        expect(selectField.query()).to.equals('SELECT "salami" AS "peperoni" FROM sandwich');
        expect(selectField.isValid()).to.be.true;
    });
});

describe("Aggregation queries", function() {
    it("Sum on field", function() {
        const sumOnPotatoes = select(sumOn(field('potatoes'))).from('plate');
        expect(sumOnPotatoes.query()).to.be.a('string');
        expect(sumOnPotatoes.query()).to.equals('SELECT SUM("potatoes") FROM plate');
    });
    it("Alias on aggregation", function() {
        const sumAsSalamis = select(sumOn(field('salami')).as('salamis')).from('sandwich').query();
        expect(sumAsSalamis).to.be.a('string');
        expect(sumAsSalamis).to.equals('SELECT SUM("salami") AS "salamis" FROM sandwich');
    });
});
