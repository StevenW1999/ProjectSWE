import * as Utils from '../utils/Fun';
import * as Array from '../utils/ArrayFunctions';
import {omit} from '../utils/Omit';

export type Selectable<T, B> = {
    object: Array<T>,
    select: <K extends keyof T>(...entities: Array<K>) => Queryable<omit<T, K>, Pick<T, K>, Array.excludeArray<Pick<T,K>>>
}

export type Queryable<T, R, B> = {
    object: Array<T>,
    result: Array<R>,
    select: <K extends keyof T>(...selectedEntites: Array<K>) => Queryable<omit<T, K> , R & Pick<T, K>, B & Array.excludeArray<Pick<T,K>>>,
    include: <K extends keyof Array.includeArrays<T>, s, r, b>(
        entity: K,
        query: (selectable: Selectable<Array.getKeysFromArray<T, K>, B>) => Queryable<s, r, b> | orderbyResult<r>
    ) => Queryable<omit<T, K>, R & { [key in K]: Array<r> }, B>,
    orderBy: <H extends keyof B>(type: 'ASC' | 'DESC', entity: H) => orderbyResult<R>,

}

export type orderbyResult<R> = {
    result: Array<R>
}