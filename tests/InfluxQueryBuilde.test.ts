import {expect} from 'chai';
import {select} from "../src/InfluxQueryBuilder";
import {all, field, fields, sumOn} from "../src/Selector";
import {fieldValueOf, timestamp} from "../src/Condition";
import {DurationUnit} from "../src/time/DurationUnit";
import {withNone} from "../src/time/FillingMode";


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

describe("Complexe queries", function() {
    const firstJan = new Date(Date.UTC(2020, 0, 1));
    const complexQuery = select(
        sumOn(field('water')).as("water"),
        sumOn(field('fire')).as("fire")
    ).fromQuery(
        select(sumOn(field('temperature')).as('temp'))
            .from('consumption')
            .where(
                timestamp().isWhileOrAfter(firstJan).minus(4, DurationUnit.WEEK)
                    .and(fieldValueOf('sensor').is('ALPHA1'))
                    .and(fieldValueOf('type').is('thermic'))
                    .and(fieldValueOf('provider').is('Belg'))),
        select(sumOn(field('level')).as('level'))
            .from('consumptions')
            .where(
                timestamp().isWhileOrAfter(firstJan).minus(4, DurationUnit.WEEK)
                    .and(fieldValueOf('sensor').is('ALPHA1'))
                    .and(fieldValueOf('type').is('aquatic'))
                    .and(fieldValueOf('provider').is('Belg')))
            .groupByPeriodsOf(30, DurationUnit.MINUTE).fill(withNone())
    ).query();
    const expectedQuery = 'SELECT SUM("water") AS "water",SUM("fire") AS "fire" FROM ' +
        '(SELECT SUM("temperature") AS "temp" FROM consumptions ' +
        'WHERE time >= (1577836800000ms - 4week) AND "sensor" = \'ALPHA1\' AND "type" = \'aquatic\' AND "provider" = \'Belg\'),' +
        '(SELECT SUM("level") AS "level" FROM consumptions ' +
        'WHERE time >= (1577836800000ms - 4week) AND "sensor" = \'ALPHA1\' AND "type" = \'aquatic\' AND "provider" = \'Belg\')' +
        'GROUP BY time(30m) fill(none)`';
    expect(complexQuery).is.a("string");
    expect(complexQuery).is.string(expectedQuery);
});
