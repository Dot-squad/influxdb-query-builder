import {Selector} from "./select/Selector";
import {Condition} from "./Condition";

class InfluxQueryBuilder {
    query: string;

    constructor(query: string) {
        this.query = query;
    }

    from(measure: string): InfluxQueryBuilder {
        this.query += ` FROM ${measure}`;
        return this;
    }

    where(condition: Condition): InfluxQueryBuilder {
        this.query += ` WHERE ${condition}`;
        return this;
    }

}

export function select(selector: Selector | string): InfluxQueryBuilder {
    return new InfluxQueryBuilder(`SELECT ${selector.toString()}`);
}
