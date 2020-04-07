import { Pair } from "./Pair";
import { Unit } from "../types/Unit";
import { Func } from "../utils/Fun";

type ListType<T> = {
    Kind: "Cons",
    Head: T,
    Tail: List<T>
} | {
    Kind: "Empty"
}
type Comparer<T> = {
    ASC: () => Func<T, boolean>
    DESC: () => Func<T, boolean>
}
type Comparers = keyof Comparer<any>

const Comparer = <T>(comparer: T): Comparer<T> => ({
    ASC: () => Func<T, boolean>(x => x <= comparer),
    DESC: () => Func<T, boolean>(x => comparer <= x) 
})

type ListOperations<T> = {
    reduce: <U>(this: List<T>, f: (state: U, x: T) => U, accumulator: U) => U
    map: <U>(this: List<T>, f: (_: T) => U) => List<U>
    reverse: (this: List<T>) => List<T>
    concat: (this: List<T>, l: List<T>) => List<T>
    toArray: (this: List<T>) => T[]
    bind: <U>(this: List<T>, q: (x: T) => List<U>) => List<U>
    count: (this: List<T>) => number
    merge: (this: List<T>, list: List<T>, order: Comparers) => List<T>
}

export type List<T> = ListType<T> & ListOperations<T>

export const join_list = <T>(list: List<List<T>>): List<T> => {
    return list.reduce((s, x) => s.concat(x), Empty())
}

export const merge_list_types = <T, U>(list_pair: List<Pair<T, U>>): List<T & U> => {
    return list_pair.map<T & U>(p => ({ ...p.First, ...p.Second }))
}

export const createList = (n: number): List<Unit> => {
    return n == 0 ? Empty() : Cons({}, createList(n - 1))
}

export const ListFromArray = <T>(array: T[]): List<T> => {
    return array.reduce((s, x) => Cons(x, s) , Empty<T>())
}

const ListOperations = <T>(): ListOperations<T> => ({
    reduce: function <U>(this: List<T>, f: (state: U, x: T) => U, accumulator: U): U {
        return this.Kind == "Empty" ? accumulator : this.Tail.reduce(f, f(accumulator, this.Head))
    },
    map: function <U>(this: List<T>, f: (_: T) => U): List<U> {
        return this.reduce<List<U>>((s, x) => Cons(f(x), s), Empty<U>()).reverse()
    },
    reverse: function (this: List<T>): List<T> {
        return this.reduce((s, x) => Cons(x, s), Empty())
    },
    concat: function (this: List<T>, l: List<T>): List<T> {
        return this.reverse().reduce((s, x) => Cons(x, s), l)
    },
    toArray: function (this: List<T>): T[] {
        return this.reduce<T[]>((s, x) => s.concat([x]), [])
    },
    bind: function <U>(this: List<T>, q: (x: T) => List<U>): List<U> {
        return join_list(this.map(q))
    },
    count: function (this: List<T>): number {
        return this.reduce((s, x) => s + 1, 0)
    }, 
    merge: function (this: List<T>, list: List<T>, order: Comparers): List<T> {
        if (this.Kind == "Empty") {
            return list
        } else if (list.Kind == "Empty") {
            return this
        } else {
            if (Comparer(list.Head)[order]().f(this.Head)/*this.Head <= list.Head*/) {
                return Cons(this.Head, this.Tail.merge(list, order))
            } else {
                return Cons(list.Head, this.merge(list.Tail, order))
            }
        }
    },
})

export const Cons = <T>(head: T, tail: List<T>): List<T> => ({
    Kind: "Cons",
    Head: head,
    Tail: tail,
    ...ListOperations()
})

export const Empty = <T>(): List<T> => ({
    Kind: "Empty",
    ...ListOperations()
})