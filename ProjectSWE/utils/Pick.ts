/**
 * pick<T,K>
 * A utility function used to construct a type by picking only the properties K from T
 */

import * as Utils from './Fun';

export const pick = <T, K extends keyof T>(keys: Array<K>): Utils.Fun<T, Pick<T, K>> => (
    Utils.fun(object =>
        keys.map(key => key in object ? { [key]: object[key] } : {})
        .reduce((res, o) => ({ ...res, ...o }), {}) as Pick<T, K>
    )
);
