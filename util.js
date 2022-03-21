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
        if (i < 0) throw new Error('index has been tampered with')

        if (i >= arr.length) return prev
        if (arr[i].then) {
            // if there's a promise in the array wait for it
            return arr[i]
                .then(result => {
                    const next = (cb(prev, result, i, arr));
                    reduceRecurcsively(arr, cb, next, i + 1);
                });

        } else {
            // if no promise, handle as usual
            const next = cb(prev, array[i], i, arr)
            return reduceRecurcsively(arr, cb, next, i + 1)

        }
    }

    return reduceRecurcsively(array, callback, initialValue, 0)
}