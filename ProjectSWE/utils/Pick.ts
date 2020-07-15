/**
 * pick<T,K>
 * A utility function used to construct a type by picking only the properties K from T
 */

import * as Utils from './Fun';
/**
 * has 2 generic types, T and K which extends the keys of T
 * takes in keys as input which is an array of generic K's 
 * returns a function that checks if there is a key in the object taken as input and maps the key parameter to the key of the object else it returns an empty unit
 * then reduces the results in res and the object in o (constucts the type)
 */
export const pick = <T, K extends keyof T>(keys: Array<K>): Utils.Fun<T, Pick<T, K>> => (
    Utils.fun(object =>
        keys.map(key => key in object ? { [key]: object[key] } : {})
        .reduce((res, o) => ({ ...res, ...o }), {}) as Pick<T, K>
    )
);
