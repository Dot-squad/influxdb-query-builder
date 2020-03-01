import {Selector} from "./Selector";
import {Condition} from "./Condition";
import {QueryStatusError} from "./exceptions/QueryStatusError";
import {DurationUnit} from "./time/DurationUnit";
import {FillingMode} from "./time/FillingMode";

/**
 * Builder for InfluxDB queries
 */
class InfluxQueryBuilder {
    private status: QueryStatus = QueryStatus.EMPTY;
    private _query: string;

    constructor(query: string, status?: QueryStatus) {
        this._query = query;
        this.status = status ? status : QueryStatus.EMPTY;
    }

    /**
     * Add the FROM clause to the query being build
     * @param measure: measure used in the FROM clause
     */
    from(measure: string): InfluxQueryBuilder {
        this.checkIfStatusIs(QueryStatus.SELECT);
        this._query += ` FROM ${measure}`;
        this.status = QueryStatus.FROM;
        return this;
    }

    fromQuery(...queries: InfluxQueryBuilder[]): InfluxQueryBuilder {
        const chainedClauses = queries.map(query => `(${query.query()})`).join(',');
        return this.from(chainedClauses);
    }

    where(condition: Condition | string): InfluxQueryBuilder {
        this.checkIfStatusIs(QueryStatus.FROM);
        this._query += ` WHERE ${condition.toString()}`;
        this.status = QueryStatus.WHERE;
        return this;
    }

    groupByPeriodsOf(duration: number, unit: DurationUnit): InfluxQueryBuilder {
        this.checkIfStatusIs(QueryStatus.FROM, QueryStatus.WHERE);
        this._query += ` GROUP BY ${duration}${unit}`;
        this.status = QueryStatus.GROUP;
        return this;
    }

    fill(filling: FillingMode): InfluxQueryBuilder {
        this.checkIfStatusIs(QueryStatus.GROUP);
        this._query += ` fill(${filling.toString()})`;
        return this;
    }

    private checkIfStatusIs(...expectedStatus: QueryStatus[]): void {
        if (expectedStatus.indexOf(this.status) == -1) {
            throw new QueryStatusError(this.status, QueryStatus.SELECT)
        }
    }

    query(): string {
        return this._query;
    }

    isValid(): boolean {
        return this.status >= QueryStatus.FROM;
    }
}

/**
 * Starting point of the query building. It initialize a new query builder with the proper
 * SELECT clause
 * @param selectors: content of the SELECT clause
 */
export function select(...selectors: Selector[]): InfluxQueryBuilder {
    const content: string = selectors.map(selector => selector.toString()).join(',');
    return new InfluxQueryBuilder(`SELECT ${content}`, QueryStatus.SELECT);
}

/**
 * Represents the current clause being built
 */
export enum QueryStatus{
    EMPTY = 0,
    SELECT = 1,
    FROM = 2,
    WHERE = 3,
    GROUP = 4
}
