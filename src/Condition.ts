export class Condition {
    private condition: string;

    constructor(condition: string) {
        this.condition = condition;
    }

    lessThan(value: number): Condition{
        this.condition += ` < ${value}`;
        return this;
    }

    get(): string {
        return this.condition;
    }
}

export function timestampIs(condition: Condition) {
    return new Condition(`time${condition.get()}`);
}

export function timestampIsBetween(start: Date, end: Date): Condition {
    return new Condition(`time >= ${start.getTime()}ms AND time < ${end.getTime()}ms`);
}
