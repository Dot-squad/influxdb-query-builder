import {expect} from 'chai';
import {timestamp, timestampIsBetween} from "../src/Condition";

describe("Temporal conditions", function() {
    it('time interval', function () {
        const firstJan = new Date(Date.UTC(2020, 0, 1));
        const firstFeb = new Date(Date.UTC(2020, 1, 1));
        const condition = timestampIsBetween(firstJan, firstFeb).toString().toLowerCase();
        expect(condition).is.a('string');
        expect(condition).to.have.string('time >= 1577836800000ms',);
        expect(condition).to.have.string('time < 1580515200000ms');
        expect(condition).to.have.string(' and ');

        const restOfCondition = condition.toString().toLowerCase()
            .replace('time >= 1577836800000ms', '')
            .replace('time < 1580515200000ms', '')
            .replace(' and ', '');
        expect(restOfCondition).is.a('string');
        expect(restOfCondition).is.empty;
    });

    it('timestamp less than', function () {
        const firstJan = new Date(Date.UTC(2020, 0, 1));
        const condition = timestamp().isBeforeThan(firstJan).toString().toLowerCase();
        expect(condition).is.a('string');
        expect(condition).to.have.string('time < 1577836800000ms',);
    });
});
