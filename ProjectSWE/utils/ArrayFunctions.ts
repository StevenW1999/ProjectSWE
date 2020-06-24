/**
 * This document contains the array related functions for the project.
 */

export const getKeysFromObject = <T>(object: T): Array<keyof T> => Object.keys(object as any) as Array<keyof T>

export type includeArrays<T> = Pick<T, {
    [K in keyof T]: T[K] extends Array<object> ? K : never
}[keyof T]>;

export type excludeArray<T> = Pick<T, {
    [K in keyof T]: T[K] extends Array<object> ? never : K
}[keyof T]>;

export type getKeysFromArray<T, K extends keyof includeArrays<T>> = T[K] extends Array<infer U> ? U : never;

export function sortArray(property: any, type: any) {
    var sortOrder = type === 'ASC' ? 1 : -1;
    return function (a: any ,b: any) {
        if(a[property] === String) {
            const uppercaseFirst = a[property].charAt(0).toUpperCase() + a[property].slice(1);
            const uppercaseSecond = b[property].charAt(0).toUpperCase() + b[property].slice(1);
            var res = (uppercaseFirst < uppercaseSecond) ? -1 : (uppercaseFirst > uppercaseSecond) ? 1 : 0;
            return res * sortOrder;
        }
        else {
            var res = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return res * sortOrder;
        }
    }
}