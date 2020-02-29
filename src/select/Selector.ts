class Selector {
    selector: string;

    protected constructor(selector: string) {
        this.selector = selector;
    }

    toString(): string {
        return this.selector;
    }
}

class Field extends Selector{

    protected constructor(selector: string) {
        super(selector);
    }

    static all(): Field {
        return new Field("*");
    }

    static field(fieldName: string): Field {
        return new Field(fieldName);
    }
}

class Aggregator extends Selector {
    static sumOn(field: Field) {
        return new Selector(`SUM(${field.toString()})`)
    }
}
