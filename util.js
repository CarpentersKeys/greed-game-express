export { deepClone, flattenToObj, patientReduce}


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

function patientReduce(array, callback, initialValue) {

    function reduceRecurcsively(arr, cb, prev, i) {
        if (i < 0) { throw new Error('index has been tampered with'); }

        if (i >= arr.length) { return prev; }

        const elem = arr[i];

        // invoke cb with the previous, current, index, and array elements
        // should allow for normal array.reduce() behaviour
        const next = (cb(prev, elem, i, arr));
        // find anything with a .then() method on it
        const thenable =  findThenableAnywhere(next);

        if (thenable) { 

            // if there is a thenable wait for it to be fullfilled or rejected
            return thenable
                .then(() => {
                    return reduceRecurcsively(arr, cb, next, i + 1);
                // call the next pseudo-recursion of reduce with the return value of cb
                });
        } else {
            // if no thenable, just call the next recursion
            return reduceRecurcsively(arr, cb, next, i + 1);
        }
    }

    return reduceRecurcsively(array, callback, initialValue, 0);
}

function findThenableAnywhere(data) {
    
}