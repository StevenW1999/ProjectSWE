/**
 * omit<T,K>
 * A utility function used to construct a type by omitting K from T
 */

import * as Utils from './Fun';
import * as Array from '../utils/ArrayFunctions';

export type omit<T, Conditions extends keyof T> = Pick<T, {
    [K in keyof T]: K extends Conditions ? never : K
}[keyof T]>

export const omit = <T, K extends keyof T>(keys: Array<keyof T>): Utils.Fun<T, omit<T, K>> => (
    Utils.fun(object =>
        Array.getKeysFromObject(object).map(key => (keys).some(k => k === key) ? {} : { [key]: object[key] })
        .reduce((res, o) => ({ ...res, ...o }), {}) as omit<T, K>
    )
);