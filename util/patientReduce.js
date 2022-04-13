import awaitDeepAny from './awaitDeepAny';
export { patientReduce };

function patientReduce(array, callback, initialValue) {
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


    return new Promise((resolve, reject)  => {

        (function reduceRecurcsively(arr = array, cb = callback, acc = initialValue, i = 0) {

            if (i < 0) { throw new Error('index has been tampered with'); }

            if (i >= arr.length) { return resolve(acc); }

            const elem = arr[i];

            // just return the first element as the accumulator if no initial value is given
            if (acc === undefined && i === 0) { return reduceRecurcsively(arr, cb, elem, i + 1); }

            // FUTURE: convert these lambdas to named fns
            return awaitDeepAny(elem)
                .then(elem => { return cb(acc, elem, i, arr); })
                .then(awaitDeepAny)
                .then((nxtAcc) => { return reduceRecurcsively(arr, cb, nxtAcc, i + 1); })
                .catch(result => reject(result));
        }());
    })
}


// test
// function startRoundStage(args) {
//     return Promise.resolve(args);
// };
// function selectTimeStage(args) {
//     return Promise.resolve(args);
// };
// function runTimeStage(args) {
//     return Promise.resolve(args);
// };
// function winRoundStage(args) {
//     return Promise.resolve(args);
// };
        
//     const ROUND_SCHEDULE = [
//         startRoundStage,
//         selectTimeStage,
//         runTimeStage,
//         winRoundStage
//     ];

// const what = patientReduce(ROUND_SCHEDULE, (acc, e, ind, arr) => {
//     return acc.concat(e(arr[ind].name));
// }, [])
// what