/**
 * Represents a condition inside the WHERE clause
 */
import {DurationUnit} from "./time/DurationUnit";

export class Condition {
    private condition: string;

    constructor(condition: string) {
        this.condition = condition;
    }

    isBeforeOrWhile(date: Date): Condition {
        this.condition += ` <= ${date.getTime()}ms`;
        return this;
    }

    isBefore(date: Date): Condition {
        this.condition += ` < ${date.getTime()}ms`;
        return this;
    }

    isWhileOrAfter(date: Date): Condition {
        this.condition += ` >= ${date.getTime()}ms`;
        return this;
    }

    isAfter(date: Date): Condition {
        this.condition += ` > ${date.getTime()}ms`;
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

    isGreaterThan(value: number): Condition{
        this.condition += ` > ${value}`;
        return this;
    }

    isGreaterOrEqualThan(value: number): Condition{
        this.condition += ` >= ${value}`;
        return this;
    }

    is(value: string): Condition {
        this.condition += ` = '${value}'`;
        return this;
    }

    minus(value: number, durationUnit?: DurationUnit): Condition {
        this.condition += ` - ${value}${durationUnit ? durationUnit : ''}`;
        return this;
    }

    and(condition: Condition) {
        this.condition += ` AND ${condition.toString()}`;
        return this
    }

    toString(): string {
        return this.condition;
    }
}

export function timestamp(): Condition {
    return new Condition('time');
}

export function timestampIsBetween(start: Date, end: Date): Condition {
    return new Condition(`time >= ${start.getTime()}ms AND time < ${end.getTime()}ms`);
}

export function fieldValueOf(fieldName: string): Condition {
    return new Condition(fieldName.trim())
}
