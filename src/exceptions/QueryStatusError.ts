import {QueryStatus} from "../InfluxQueryBuilder";

export class QueryStatusError extends Error {

    constructor(actualStatus: QueryStatus, expectedStatus: QueryStatus) {
        if(actualStatus == expectedStatus) {
            throw new Error('Expected and actual status should be different for throwing QueryStatusError');
        }
        super(`Error while building query. Current query should be in ${expectedStatus} clause instead of ${actualStatus}`);
    }
}
