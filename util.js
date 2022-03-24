export { emptyObjectsAndFlatten, deepClone, flattenToObj, patientReduce, filterForThenables }


function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function flattenToObj(previousResults, ...newProps) {

    return {
        ...previousResults,
        ...newProps
    }
    // the idea is to pass arguments[0] (results object param) with any new additions
}

function patientReduce(array, callback, initialValue, thenableBehaviour) {
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

        // invoke cb with the accious, current, index, and array elements
        // should allow for normal array.reduce() behaviour
        const next = cb(acc, elem, i, arr);
        // find anything with a .then() method on it
        const thenables = filterForThenables(next);

        // if no thenable, just call the next recursion
        if (thenables?.length <= 0) { return reduceRecurcsively(arr, cb, next, i + 1); }
        if (thenables?.length > 0) {
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
            string === 'all'
            || !(string instanceof String)
            || !(typeof (string) === 'string')
            || undefined;

        if (allOrDefault) { return Promise.all(thenables); }
        if (thenableBehaviour === 'race') { return Promise.race(thenables); }
        if (thenableBehaviour === 'first') { return thenables[0]; }
        if (thenableBehaviour === 'last') { return thenables(thenables.length - 1); }
        throw newError(`error occured in ${metaThenable}, params: ${arguments}`);
    }
}

//finds all thenables even on deeply nested objects or arrays
function filterForThenables(data) {

    const level = emptyObjectsAndFlatten(data);
    if (Array.isArray(level)) { return level.filter(e => e.then) }
    return level;

}

// takes anything and flattens it recursively
//if it encounters objects they are stripped of their propert names and flattened
// maybe it should assign them to a const named after their property
// preserves promises so I can't JSON clone it
const emptyObjectsAndFlatten = (data) => {

    return Object.freeze(flattenrecur(data));

    function flattenrecur(data) {
        if (!data) { return }

        const level = arrayValsOrItem(data);
        if (!Array.isArray(level)) return level;

        return level.flat()
            .reduce((acc, cur) => {
                return acc.concat(flattenrecur(cur))
            }, []);

    }

    function arrayValsOrItem(data) {
        const arr = [];
        if (Array.isArray(data)) {
            arr.push(data);
        } else if (isobject(data)) {
            arr.push(object.values(data))
        } else { return data }
        return arr;
    }

    function isobject(item) {
        if (typeof (item) !== 'object'
            || !(item instanceof object)
            || item instanceof string
            || item instanceof number
            || item.then) { return false }

        return true
    }

}

const testSc = [1, 2, 3]

const testpat = patientReduce(testSc, (acc, curr, i) => {
    if (i > 1) { i = 0 }
    return acc.concat(curr * 5)
}, [])

testpat