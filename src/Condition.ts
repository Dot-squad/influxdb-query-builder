/**
 * Represents a condition inside the WHERE clause
 */
export class Condition {
    private condition: string;

    constructor(condition: string) {
        this.condition = condition;
    }

    isBeforeThan(date: Date): Condition {
        this.condition += ` < ${date.getTime()}ms`;
        return this;
    }

    isEquals(value: number): Condition {
        this.condition += ` = ${value}`;
        return this;
    }

    isLessThan(value: number): Condition{
        this.condition += ` < ${value}`;
        return this;
    }

    isLessOrEqualThan(value: number): Condition{
        this.condition += ` <= ${value}`;
        return this;
    }

    toString(): string {
        return this.condition;
    }
}

export function timestamp() {
    return new Condition('time');
}

export function timestampIsBetween(start: Date, end: Date): Condition {
    return new Condition(`time >= ${start.getTime()}ms AND time < ${end.getTime()}ms`);
}
