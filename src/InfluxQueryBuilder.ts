import {Selector} from "./Selector";
import {Condition} from "./Condition";
import {QueryStatusError} from "./exceptions/QueryStatusError";

/**
 * Builder for InfluxDB queries
 */
class InfluxQueryBuilder {
    private status: QueryStatus = QueryStatus.EMPTY;
    query: string;

    constructor(query: string, status?: QueryStatus) {
        this.query = query;
        this.status = status ? status : QueryStatus.EMPTY;
    }

    /**
     * Add the FROM clause to the query being build
     * @param measure: measure used in the FROM clause
     */
    from(measure: string): InfluxQueryBuilder {
        this.checkIfStatusIs(QueryStatus.SELECT);
        this.query += ` FROM ${measure}`;
        this.status = QueryStatus.FROM;
        return this;
    }

    fromQuery(query: InfluxQueryBuilder): InfluxQueryBuilder {
        return this.from(`(${query.query})`)
    }

    whereTime(condition: Condition | string): InfluxQueryBuilder {
        this.checkIfStatusIs(QueryStatus.FROM);
        this.query += ` WHERE time ${condition.toString()}`;
        this.status = QueryStatus.WHERE;
        return this;
    }

    private checkIfStatusIs(expectedStatus: QueryStatus): void {
        if (expectedStatus != this.status) {
            throw new QueryStatusError(this.status, QueryStatus.SELECT)
        }
    }

    isValid(): boolean {
        return this.status >= QueryStatus.FROM;
    }
}

/**
 * Starting point of the query building. It initialize a new query builder with the proper
 * SELECT clause
 * @param selector: content of the SELECT clause
 */
export function select(selector: Selector): InfluxQueryBuilder {
    return new InfluxQueryBuilder(`SELECT ${selector.toString()}`, QueryStatus.SELECT);
}

/**
 * Represents the current clause being built
 */
export enum QueryStatus{
    EMPTY = 0,
    SELECT = 1,
    FROM = 2,
    WHERE = 3,
}
