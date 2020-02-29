/**
 * Represents the content of the SELECT clause
 */
export class Selector {
    selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    /**
     * Add an alias to the current selector
     * @param alias: name of the alias being used
     */
    as(alias: string): Selector {
        this.selector += ` AS "${alias}"`;
        return this;
    }

    /**
     * return the current selector
     */
    toString(): string {
        return this.selector;
    }
}

/**
 * Create a SELECT clause on an unique field
 * @param fieldName: name of the field
 */
export function field(fieldName: string): Selector {
    return new Selector(`"${fieldName}"`);
}

/**
 * Create a SELECT clause on multiple fields
 * @param fieldNames: names of the fields
 */
export function fields(...fieldNames: string[]): Selector {
    return new Selector(fieldNames.map(fieldName => `"${fieldName}"`).join(','));
}

/**
 * Create a SELECT clause with the start operator
 */
export function all(): Selector {
    return new Selector("*");
}

/**
 * Create a SELECT clause with the SUM aggregator
 * @param field: name of the field being summed
 */
export function sumOn(field: Selector): Selector {
    return new Selector(`SUM(${field.toString()})`);
}
