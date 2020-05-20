export type Fun<a,b> = {
    f : (_:a) => b
    then : <c>(g:Fun<b,c>) => Fun<a,c>
}

export let fun = <a,b>(f : (_:a) => b) : Fun<a,b> => ({
    f : f,
    then : function<c>(this:Fun<a,b>, g:Fun<b,c>) : Fun<a,c> {
        return then(this, g)
    }
});


export const then = <a,b,c>(f:Fun<a,b>, g:Fun<b,c>) : Fun<a,c> => fun<a,c>(a => g.f(f.f(a)))

export type Unit = {}

export let Unit : Unit = {}


export const pick = <T, K extends keyof T>(keys: Array<K>): Fun<T, Pick<T, K>> => (
    fun(object =>
        keys.map(key => key in object ? { [key]: object[key] } : {})
        .reduce((res, o) => ({ ...res, ...o }), {}) as Pick<T, K>
    )
);

export type omit<T, Conditions extends keyof T> = Pick<T, {
    [K in keyof T]: K extends Conditions ? never : K
}[keyof T]>
