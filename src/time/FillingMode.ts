export class FillingMode {
    filling: string;

    constructor(filling: string) {
        this.filling = filling;
    }

    toString(): string {
        return this.filling;
    }
}

/**
 *  Reports the results of linear interpolation for time intervals with no data
 */
export function withLinearInterpolation(): FillingMode {
    return new FillingMode('linear')
}

/**
 * Reports no timestamp and no value for time intervals with no data
 */
export function withNone(): FillingMode {
    return new FillingMode('none')
}

/**
 * Reports null for time intervals with no data but returns a timestamp. This is the same as the default behavior
 */
export function withNull(): FillingMode {
    return new FillingMode('null')
}

/**
 * Reports the value from the previous time interval for time intervals with no data
 */
export function withPrevious(): FillingMode {
    return new FillingMode('previous')
}
