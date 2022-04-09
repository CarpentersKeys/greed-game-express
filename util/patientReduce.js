import awaitDeepAny from './awaitDeepAny'
import filterForThenables from './filterForThenables'

const testArr = [
    function () {
        return new Promise(resolve => {
            setTimeout(resolve, 1000, 'first')
        })
    },
    function () {
        return new Promise(resolve => {
            setTimeout(resolve, 1000, 'second')
        })
    },
    function () {
        return new Promise(resolve => {
            setTimeout(resolve, 1000, 'third')
        })
    }
]

const reducer = (acc, curr) => {

    if(acc === []) return curr();
    return [...acc, curr()]

}

Promise.all(testArr.reduce(reducer, []))
.then()

patientReduce(testArr, reducer, [])

export default function patientReduce(array, callback, initialValue, thenableBehaviour) {
    /**
     * behaves like .reduce() except it will wait for promises to resolve before next iter
     * if no promises are found the iter is synchronous
     * callback should specify how to handle resolve/rejects
     * @param {*} array to reduce pseudo recursively
     * @param {*} callback operation to perform on each item
        * @param {*} previous the return value of the last recursion
        * @param {*} current the current item being reduced
        * @param {*} index the index in the array of current
        * @param {*} array the original array
    * @param {*} initialValue takes place of prev in callback on first recursion
    * @param {*} promiseBehaviour before returning, if promises are found on accumulator:
    *                'all': Promise.all(foundPromises);
    *                'race': Promise.race(foundPromises);
    *                'first': foundPromises[0];
    *                'last': foundPromises[foundPromises.length - 1];
    * @returns the final return value of callback
    */

    return reduceRecurcsively(array, callback, initialValue);

    function reduceRecurcsively(arr, cb, acc, i = 0) {

        if (i < 0) { throw new Error('index has been tampered with'); }

        if (i >= arr.length) { return acc; }

        const elem = arr[i];

        // just return the first element as the accumulator if no initial value is given
        if (acc === undefined && i === 0) { return reduceRecurcsively(arr, cb, elem, i + 1); }
        if (elem.then) {
            return elem
                .then(elemResolved => {
                    return cb(acc, elem, i, arr)
                })
                .then(next => { return reduceRecurcsively(arr, cb, next, i + 1); })
        }

        //check for thenables on the upcoming element (promises on the array) 
        //or the incoming accumulator (promises passed or inital value promises)
        const preThenables = filterForThenables([elem, acc])
        if (preThenables?.length > 0) {
            // if there's a thenable on 
            return Promise.all(preThenables)
                .then(() => {
                    const next = cb(acc, elem, i, arr);
                    const thenables = filterForThenables(next);
                    return { thenables, arr, cb, next, i }
                })
                .then(awaitAndOrReturn)
        } else {
            // invoke cb with the acc, current, index, and array elements
            // should allow for normal array.reduce() behaviour
            const next = cb(acc, elem, i, arr);
            // find anything with a .then() method on it
            const thenables = filterForThenables(next)
            return awaitAndOrReturn(thenables)
        }

    }

    // check for thenables, if none return, calling next recursion
    //  if thenables wait for them then pseudo recurse
    function awaitAndOrReturn({ thenables, arr, cb, next, i }) {
        // if no thenable, just call the next recursion
        if (!thenables?.length > 0) { return reduceRecurcsively(arr, cb, next, i + 1); }
        if (thenables?.length > 0) {
            console.log(thenables);
            // if there is a thenable wait for it to be fullfilled or rejected
            return metaThenable(thenables, thenableBehaviour)
                .then(() => {
                    return reduceRecurcsively(arr, cb, next, i + 1);
                    // call the next pseudo-recursion of reduce with the return value of cb
                });
        }
    }

    function metaThenable(thenables, thenableBehaviour) {
        /**
         * single thenable returns, 
         * @param {*} thenables array of thenables handled based on...
         * @param {*} thenableBehaviour a string, determines metathenable type
         * @returns an array of one or more thenables
         * defaults to packing all promises found into Promise.all()
         */
        // if there's one thenable just return it
        if (thenables.length === 1) { return thenables; }

        const allOrDefault =
            thenableBehaviour === 'all'
            || !(thenableBehaviour instanceof String)
            || !(typeof (thenableBehaviour) === 'string')
            || undefined;

        if (allOrDefault) { return Promise.all(thenables); }
        if (thenableBehaviour === 'race') { return Promise.race(thenables); }
        if (thenableBehaviour === 'first') { return thenables[0]; }
        if (thenableBehaviour === 'last') { return thenables(thenables.length - 1); }
        throw newError(`error occured in ${metaThenable}, params: ${arguments}`);
    }
}

