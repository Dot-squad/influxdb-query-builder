import {Selector} from "./Selector";
import {Field} from "./Field";

class Aggregator extends Selector {
    static sumOn(field: Field) {
        return new Selector(`SUM(${field.toString()})`)
    }
}
