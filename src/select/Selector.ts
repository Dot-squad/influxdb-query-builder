export class Selector {
    selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    toString(): string {
        return this.selector;
    }
}

export function field(fieldName: string): Selector {
    return new Selector(`"${fieldName}"`);
}

export function fields(fieldNames: string[]): Selector {
    return new Selector(fieldNames.map(fieldName => `"${fieldName}"`).join(','))
}

export function all(): Selector {
    return new Selector("*");
}
