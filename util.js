export {hasChildren, accessComputedMember, computeMemberAccessString, emptyObjectsAndFlatten, deepClone, flattenToObj, patientReduce, filterForThenables, isObject}

function hasChildren(sth) {
    return !!(sth.length || Object.keys(sth).length)
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function flattenToObj(previousResults, ...newProps) { // pretty sure this is useless

    return {
        previousResults,
        newProps
    }
    // the idea is to pass results object param with any new additions
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
            const thenables = filterForThenables(next);
            return awaitAndOrReturn({ thenables, arr, cb, next, i });
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

//finds all thenables even on deeply nested objects or arrays
function filterForThenables(data) {

    const level = emptyObjectsAndFlatten(data);
    if (Array.isArray(level)) { return level.filter(e => e.then) }
    return undefined
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
        } else if (isObject(data)) {
            arr.push(Object.values(data))
        } else { return data }
        return arr;
    }



}

    function isObject(item) {
        if (typeof (item) !== 'object'
            || !(item instanceof Object)
            || item instanceof String
            || item instanceof Number
            || item.then) { return false }

        return true
    }

function computeMemberAccessString(dataStructure, condition) {

    const accessString = (function recur(data, cond, acc) {
        if (cond(data)) { return Object.freeze(acc); };

        // if Array,  
        if (Array.isArray(data)) {
            // try to satisfy the condition on this level
            const ind = data.findIndex(e => {
                return cond(e);
            });
            if (ind !== -1) {
                return Object.freeze([...acc, '' + ind]);
            };

            // if not, go deeper
            for (const datInd in data) {
                const datum = data[datInd]
                if (hasChildren(datum)) {
                    const result = recur(datum, cond, [...acc, '' + datInd]);
                    if (result) { return result; }
                };
            };
        };

        // if obj, values().find()
        if (isObject(data)) {
            const entries = Object.entries(data);
            const ind = entries
                .findIndex(e => {
                    return cond(e[1]);
                })
            if (!ind === -1) {
                acc.push(entries[ind][0]);
                return Object.freeze(acc);
            };

            //if not, go deeper
            for (const datProp in data) {
                datProp
                const datum = data[datProp]
                if (hasChildren(datum)) {
                    const result = recur(datum, cond, [...acc, '' + datProp]);
                    if (result) { return result; }
                };
            };
        };
        return;

    }(dataStructure, condition, []))

    if (accessString) { return accessString.join('.'); };
    return console.log(`condition: [${condition.name}] not met on dataStructure: [${dataStructure}]`);
};

function accessComputedMember(accessString, dataStructure) {
    return accessString
    .split('.')
    .reduce((prev, curr) => {
        if (prev) { return prev[curr]; };
        return prev;
    }, dataStructure || self)
}

//patientReduce refactor
function newPatRed (array, callbackFunction, initialValue, thenableBehaviour) {

    /**
     * check initial value and 
     */

}

/**questions:
 * when do I want to resolve promises?
 *      if I resolve at the beginning, I won't have time to run my cb logic
 *      resovle at the end means promises on the incoming arr would have to be resolved in the callback somehow 
 * is there a way to replace promises with their resolved values when it happens? custom promise.all?
 */

/**
 *  in my special case I need to pass functions that will result in objects that contain promises
 *  the functions are invoked inside the cb, their resulting objects will be referenced on the accumulator
 */