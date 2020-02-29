import {expect} from 'chai';
import {select} from "../src/InfluxQueryBuilder";
import {all, field} from "../src/select/Selector";


describe("Influx query builder", function() {
    it('select all', function() {
        const selectStartQuery = select(all()).query;
        expect(selectStartQuery).to.be.a('string');
        expect(selectStartQuery).to.equals('SELECT *');
    });
    it('select groField', function () {
        const selectFieldQuery = select(field('groField')).query;
        expect(selectFieldQuery).to.be.a('string');
        expect(selectFieldQuery).to.equals('SELECT "groField"');
    });

    it('select all from measure', function () {
        const selectFieldQuery = select(all()).from('myMeasure').query;
        expect(selectFieldQuery).to.be.a('string');
        expect(selectFieldQuery).to.equals('SELECT * FROM myMeasure');
    });
    it('select salami from sandwich', function () {
        const selectFieldQuery = select('salami').from('sandwich').query;
        expect(selectFieldQuery).to.be.a('string');
        expect(selectFieldQuery).to.equals('SELECT salami FROM sandwich');
    })
});
