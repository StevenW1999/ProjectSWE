/**
 * This document contains the type definitions
 * for the typesafe LINQ ORM.
 */

import * as Utils from '../utils/Fun';
import * as Array from '../utils/ArrayFunctions';
import {omit} from '../utils/Omit';

/**
 * A container for a set of items that can have its properties selected against.
 * @template T The specified type of the selectable set.
 */
export type Selectable<T> = {
    object: Array<T>,
    select: <K extends keyof T>(...entities: Array<K>) => Queryable<omit<T, K>, Pick<T, K>, Array.excludeArray<Pick<T,K>>>
}

/**
 * A container for a set of items that can be queried against by means of its properties.
 * @template T The specified type of the queryable set.
 */
export type Queryable<T, R, B> = {
    object: Array<T>,
    result: Array<R>,
    select: <K extends keyof T>(...selectedEntites: Array<K>) => Queryable<omit<T, K> , R & Pick<T, K>, B & Array.excludeArray<Pick<T,K>>>,
    include: <K extends keyof Array.includeArrays<T>, s, r, b>(
        entity: K,
        query: (selectable: Selectable<Array.getKeysFromArray<T, K>>) => Queryable<s, r, b> | orderbyResult<r>
    ) => Queryable<omit<T, K>, R & { [key in K]: Array<r> }, B>,
    orderBy: <H extends keyof B>(type: OrderType, entity: H) => orderbyResult<R>,
}

/**
 * The result for an order statement, a collection of entities of type R.
 * @template R The specified type of the result.
 */
export type orderbyResult<R> = {
    result: Array<R>
}

// Indicates whether results of an order command should be sorted in ascending or descending order
export type OrderType = 'ASC' | 'DESC';