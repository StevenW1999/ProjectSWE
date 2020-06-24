import * as Utils from '../utils/Fun';
import * as Types from '../types/Types';
import {omit} from '../utils/Omit';
import {pick} from '../utils/Pick';
import * as Array from '../utils/ArrayFunctions';

export const orderbyResult = function<R>(result: Array<R>) : Types.orderbyResult<R> {
    return {
        result: result
    }
}

export const Selectable = function<T>(object: Array<T>) : Types.Selectable<T> {
    return {
        object: object,
        select: function<K extends keyof T>(...selectedProps: Array<K>) : Types.Queryable<omit<T, K>, Pick<T, K>, Array.excludeArray<Pick<T,K>>> {

           let newResult = <any>([]);
           const objectLength = object.length;
           for(let i = 0; i < objectLength; i++){
               newResult[i] = {
                   ...pick<T,K>(selectedProps).f(object[i])
               }
               
               // Loop through properties that are an Array
               if((<any>object)[i][0]) {
                   newResult[i] = []
                   for(let g = 0; g < Object.keys((<any>object)[i]).length; g++) {
                       newResult[i][g] = {
                           ...pick<T,K>(selectedProps).f((<any>object)[i][g])
                       };
                   }
               }
           }
            
            const newObject = <any>([])
            object.forEach(element => { newObject.push(omit<T, K>(selectedProps).f(element)); });

            // Store the object and result in a Queryable
            return Queryable<omit<T, K>, Pick<T, K>, Array.excludeArray<Pick<T,K>>>(newObject, newResult);
        }
    }
}

export const Queryable = function<T, R, B>(object: Array<T>, result: Array<R>) : Types.Queryable<T, R, B> {
    return {
        object: object,
        result: result,
        select: function<K extends keyof T>(...selectedEntites: Array<K>) : Types.Queryable<omit<T, K>, R & Pick<T, K>, B & Array.excludeArray<Pick<T,K>>> {

            let newResult = <any>([]);
            const objectLength = object.length;
            for(let i = 0; i < objectLength; i++){
                newResult[i] = {
                    ...(<any>result)[i],
                    ...pick<T,K>(selectedEntites).f(object[i])
                }
                // For selectedEntites that are an Array
                if((<any>object)[i][0]) {
                    newResult[i] = []
                    for(let g = 0; g < Object.keys((<any>object)[i]).length; g++) {
                        newResult[i][g] = {
                            ...(<any>result)[i][g],
                            ...pick<T,K>(selectedEntites).f((<any>object)[i][g])
                        };
                    }
                }
            }

            const newObject = <any>([])
            object.forEach(element => { newObject.push(omit<T, K>(selectedEntites).f(element)); });

            // Store the object and result in the new Queryable
            return Queryable<omit<T, K>, R & Pick<T, K>, B & Array.excludeArray<T>>(newObject, newResult);
        },
        include: function<K extends keyof Array.includeArrays<T>, s, r, b>(
            entity: K,
            query: (selectable: Types.Selectable<Array.getKeysFromArray<T, K>>) => Types.Queryable<s, r, b> | Types.orderbyResult<r>
        ) : Types.Queryable<omit<T, K>, R & { [key in K]: Array<r> }, B> {

            const entityInArray: Array<K> = [];
            entityInArray.push(entity);
            const newObject = <any>([])
            object.forEach(element => { newObject.push(omit<T, K>(entityInArray).f(element)); });

            const keysFromEntity = <any>([])
            object.forEach(element => { keysFromEntity.push((<any>element)[entity]); })

            const selectableFromEntity: Types.Selectable<Array.getKeysFromArray<T, K>> = Selectable(keysFromEntity);

            const queryResult = query(selectableFromEntity).result;

            let newResult = <any>([]);
            const objectLength = object.length;
            for(let i = 0; i < objectLength; i++){
                newResult[i] = {
                    ...(<any>result)[i],
                    ...{ [entity]:(<any>queryResult)[i] } as {[key in K]: Array<r> }
                }
            }

            return Queryable<omit<T, K>, R & { [key in K]: Array<r> }, B>(newObject, newResult);
        },
        orderBy: function<H extends keyof B>(type: 'ASC' | 'DESC', entity: H): Types.orderbyResult<R> {
            const newResult = result as any
            let orderedNewResult: Array<R> = result;

            if(newResult[0][entity]){
                orderedNewResult = (<any>result).sort(Array.sortArray(entity,type));
            }
            else {
                const newResultLength = newResult.length
                for (let index = 0; index < newResultLength; index++) {
                    const element = newResult[index];
                    (<any>element).sort(Array.sortArray(entity,type))
                }
            }
            return orderbyResult(orderedNewResult)
        }
    }
}