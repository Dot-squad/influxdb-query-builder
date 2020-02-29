class InfluxQueryBuilder {
    query: string;

    private constructor(query: string) {
        this.query = query;
    }

    static select(selector: Selector): InfluxQueryBuilder {
        return new InfluxQueryBuilder(`SELECT ${selector.toString()}`);
    }

    from(measure: Measure): InfluxQueryBuilder {
        this.query += ` FROM ${measure}`;
        return this;
    }

    where(condition: Condition): InfluxQueryBuilder {
        this.query += ` WHERE ${condition}`;
        return this;
    }

}
