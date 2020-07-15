/**
 * This document contains the array related functions for the project.
 */

 /**
  * take in object T
  *  return array with properties of the object
  * takes the keys from the object
  * in our case the properties of the object (from student or course)
  */
export const getKeysFromObject = <T>(object: T): Array<keyof T> => Object.keys(object as any) as Array<keyof T>

/**
 * if T with array of properties is assignable to array of objects then pick K (the array) else never
 * return array with properties of T
 */
export type includeArrays<T> = Pick<T, {
    [K in keyof T]: T[K] extends Array<object> ? K : never}[keyof T]>;


    /**
     * same as incluce but inverted so it excludes the array instead of including it
     */

export type excludeArray<T> = Pick<T, {
    [K in keyof T]: T[K] extends Array<object> ? never : K}[keyof T]>;

    /**
     * 
     */

export type getKeysFromArray<T, K extends keyof includeArrays<T>> = T[K] extends Array<infer U> ? U : never;

/**
 * function to sort an array
 * takes in property and type
 * the sortorder is equal to the input "type", if it is ASC then it returns 1 which (positive) else -1 (negative) because we want to ascent or else descent
 * return a function that takes in a and b
 * if property of a is a string then  make the first letter an upopercase and extract it with slice
 * do the same with property of b
 * result checks if uppercase of a is less then uppercase of b if so return -1 else check if uppercase of a is bigger than uppercase of b if so return 1 else return 0
 * then return the result * the sortorder which gets you either 1 or -1
 * 
 * if property is not a string then you just compare the properties of a and b basically doing the same except without comparing strings
 */

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