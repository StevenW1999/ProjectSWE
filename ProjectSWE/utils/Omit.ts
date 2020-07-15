/**
 * omit<T,K>
 * A utility function used to construct a type by omitting K from T
 */

import * as Utils from './Fun';
import * as Array from '../utils/ArrayFunctions';

/**
 * omit has 2 generic types T and Conditions (conditional type)
 * pick properties K which are keyof T from T. 
 * check  if K is assignable to conditions if so never else return k. 
 */

export type omit<T, Conditions extends keyof T> = Pick<T, {
    [K in keyof T]: K extends Conditions ? never : K}[keyof T]>


    /**
     * takes in keys which is an array of properties of T
     * returns function that omits K from T
     * check if k is equal to key if so map key to empty unit else map key to the key of the object
     * reduce results in res and objects in o and construct the omit type
     */

export const omit = <T, K extends keyof T>(keys: Array<keyof T>): Utils.Fun<T, omit<T, K>> => (
    Utils.fun(object =>
        Array.getKeysFromObject(object).map(key => (keys).some(k => k === key) ? {} : { [key]: object[key] })
        .reduce((res, o) => ({ ...res, ...o }), {}) as omit<T, K>
    )
);