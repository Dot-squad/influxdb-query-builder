import {expect} from 'chai';
import {timestampIsBetween} from "../src/Condition";

describe("Temporal conditions", function() {
    it('time interval', function(){
        const firstJan = new Date(Date.UTC(2020, 0, 1));
        const firstFeb = new Date(Date.UTC(2020, 1, 1));
        const condition = timestampIsBetween(firstJan, firstFeb);
        expect(condition.get()).is.a('string');
        expect(condition.get().toLowerCase()).to.have.string('time >= 1577836800000ms',);
        expect(condition.get()).to.have.string('time < 1580515200000ms');
        expect(condition.get().toLowerCase()).to.have.string(' and ');
        const restOfCondition = condition.get().toLowerCase()
            .replace('time >= 1577836800000ms', '')
            .replace('time < 1580515200000ms', '')
            .replace(' and ', '');
        expect(restOfCondition).is.a('string');
        expect(restOfCondition).is.empty;
    })
});
