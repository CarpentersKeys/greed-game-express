import { hasChildren, deepClone, emptyObjectsAndFlatten, filterForThenables, isObject } from "./util/util"

/** details
 * @function accessByString uses a @memberAccessString to return an element on a @dataStructure
 * found solution https://stackoverflow.com/a/45322101/17551270
 * @param {*} dataStructure complex object, can be arrays or objects nested deeply
 * @param {string} memberAccessString '.' separated segments used to iteratively traverse the @dataStructure
 * @param {bool -optional-} logErrors set to false to suppress
 * @returns the accessed member of the dataStructure, or undefined if it doesn't exist (log error)
 */
function accessByString(dataStructure, memberAccessString, logErrors = true) {
    if (typeof (memberAccessString) === 'number') { memberAccessString = memberAccessString + ''; };
    if (typeof (memberAccessString) !== 'string') { return logErrors && console.error('accessByString: memberAccess not coercable to a string'); };
    return memberAccessString
        .split('.')
        .reduce((prev, curr) => {
            curr
            prev
            return prev?.[curr]
        }, dataStructure) || logErrors && console.error('accessByString: member not found on dataStructure')
}

function setByAccessString(dataStructure, setWith, memberAccessString, logErrors = true) {
    if (typeof (memberAccessString) === 'number') { memberAccessString = memberAccessString + ''; };
    if (typeof (memberAccessString) !== 'string') { return logErrors && console.error('accessByString: memberAccess not coercable to a string'); };
    memberAccessString
        .split('.')
        .reduce((prev, curr, ind, arr) => {
            if (ind === arr.length - 1) { return prev[curr] = setWith; };
            return prev?.[curr]
        }, dataStructure) || logErrors && console.error('accessByString: member not found on dataStructure')
}

/** details
 * Traverse a complex object and return an array of access segments for the first element that meets a given condition
 * Traversal is depth recursive and iterative across each layer
 * Traversal is breadth first, so first element found that meets the condition will be on highest order object
 * 
 * @param {*} dataStructure the object to traverse, can be an array or object, either can be nested deeply
 * @param {function} condition FUTURE: make optional, default equivalence fn
 *      @param {data} data tested
 *      @param {string} accessString condition may need to check if it's been used before
 *      @returns {boolean} result of conditional test on data given
 * @param {bool -optional-} logErrors set to false to suppress
 * @returns {array} of member access segments
 */
function computeMemberAccessString(dataStructure, conditionFn, logErrors = true) {

    function checkCondition(data, accessSegmentsArray, locStr) {

        const accessString = accessSegmentsArray.join('.');
        return conditionFn(data, accessString, locStr);
    };


    const memberAccessSegmentsArray =

        /*main fn - recursive IIFE*/
        (function recur(data = dataStructure, segArr = []) {
            // return that arr of member access segments
            if (checkCondition(data, segArr)) { return segArr; };


            if (Array.isArray(data)) {
                // try to satisfy the condition on this level
                const ind = data.findIndex((e, i) => {
                    return checkCondition(e, segArr.concat(i + ''));
                });
                if (ind !== -1) {
                    return Object.freeze(segArr.concat(ind + ''));
                };

                // if not, go deeper
                for (const datInd in data) {
                    const datum = data[datInd]
                    if (hasChildren(datum)) {
                        const recRes = recur(datum, segArr.concat(datInd + ''));
                        if (recRes) { return recRes; };
                    };
                };
            };


            if (isObject(data)) {
                // try to satisfy the condition on this level
                const entries = Object.entries(data);
                const ind =
                    entries
                        .findIndex(e => {
                            const k = e[0] // key
                            const v = e[1] // value
                            return checkCondition(v, segArr.concat(k + ''));
                        });
                const key = entries?.[ind]?.[0];
                if (key) {
                    return Object.freeze(segArr.concat(key + ''));
                };

                //if not, go deeper
                for (const datProp in data) {
                    const datum = data[datProp]
                    if (hasChildren(datum)) {
                        const recRes = recur(datum, segArr.concat(datProp + ''));
                        if (recRes) { return recRes; };
                    };
                };
            };
            // if nothing was found
            return undefined;
        }());

    /**
     * @returns @param {string -imut-} memberAccessString of '.' separated access segments
     * @example accessByString(dataStructure, memberAccessString = 'default.access.4.0')
     */
    if (memberAccessSegmentsArray) {
        return Object.freeze(memberAccessSegmentsArray.join('.'));
    };
    // nothing found that met the condition
    if (logErrors) {
        return console.error(`computeMemberAccessString: \ncondition: [${conditionFn.name}] not met on dataStructure: [${dataStructure}]`);
    }
};

function curryEqualsNovel(target) {
    /** details * @curryingFunction -> @conditionalFunction
 * checking if two items are equal 
 * and that a third isn't found on @previousMemberAccessStrings
 * @param {*} target value to test
 * @param {array} @previousMemberAccessStrings if, when calling the curried function, 
 *                                             targets' accessString is found on this, return false
 * @returns {function} that returns true if both conditions pass, otherwise, false
 */
    // curry in the target
    return function equalsNovel(isLike, memberAccessString) {

        if (previousMemberAccessStrings.has(memberAccessString)) { return false; };
        return target === isLike;
    };
};


const prom1 = new Promise(resolve => {
    setTimeout(resolve, 100, 'resolved1')
})
const prom2 = new Promise(resolve => {
    setTimeout(resolve, 200, 'resolved2')
})
const prom3 = new Promise(resolve => {
    setTimeout(resolve, 300, 'resolved3')
})

const promArr = [
    prom1,
    4,
    {
        notProm: "cola",
        promse: prom2,
    },
    prom3
]

// IDEAS new promise that resolves on a recursive functions base case
// base case may be that every member has been accessed
// other cases are thenables and non thenables with no children and things with children
// if thenable .then(e =< same member access on clone = e).then(call recursive fn)
// returns a promise that resolves to a clone of the original data with thenalbes awaited


// cannot return things and take mulitple paths, 
// all steps forward must be recursive or the patience is broken

// send data structure, index, depth


const previousMemberAccessStrings = new Set();
awaitDeepAny(promArr)
    .then((sth) => {
        console.log('awaitDeepAny call:',
            '\nprom1:', sth[0],
            '\nprom2:', sth[2].promse,
            '\nresult:', sth
        )
    })

// 
/**
 * @param {*} dataStructure any primitive, object or array, with any number of nested objects or arrays
 * @returns {promise} that resolves with a datastructure clone of the param with value of all thenables awaited
 */
function awaitDeepAny(dataStructure) {

    // new data structure with the same shape as dataStructure
    const newStrct = JSON.parse(JSON.stringify(dataStructure));



    const replaceAwaitedPassParams = (function curryIn(data = dataStructure) {

        return function replaceAwaitedPassParams(layer, index, layerAccess = []) {
            const data = layer[index];

            const equalsCond = curryEqualsNovel(data);

            return data
                .then(d => {
                    setByAccessString(
                        newStrct,
                        d,
                        computeMemberAccessString(dataStructure, equalsCond)
                    );
                    return [layer, index + 1, layerAccess];
                })
        };

    }());

    // FOR TESTING
    let killswitch = 0;

    return new Promise(resolve => {

        // [layer = , index = 0, layerAccess = []]
        (function recur(arr = [dataStructure, 0, []]) {
            killswitch = killswitch + 1
            if (killswitch >= 8) {
                console.log('layer:', layer, '\nindex:', index, '\nlayerAccess:', layerAccess);
                return resolve(newStrct);
            }


        const [layer, index, layerAccess] = arr;

            // the entire layer has been traversed, resolve the promise with the awaited data
            if (index >= layer.length) {


        layer[index]

                // base case, no further layers to traverse, resolve the promise
                if (layerAccess === [] || layerAccess.length < 1) {
                    return resolve(newStrct);
                }

                // call into the next layer
                const nextLayer = layerAccess[layerAccess.length - 1]
                const newLayerAccess = layerAccess.slice(0, -1)

                return recur([nextLayer, 0, newLayerAccess]);
            }

            // there's still data to traverse on this layer
            const data = layer[index];

            if (!hasChildren(data)) {
                if (!data?.then) {
                    return recur([layer, index + 1, layerAccess])
                };

                if (data.then) {
                    return replaceAwaitedPassParams(layer, index, layerAccess)
                        .then(recur);
                };
            };

            if (hasChildren(data)) {
                // console.log('hasChildren(data) === true:',
                //     "\nindex:", index,
                //     "\nlayer:", layer
                // )

                if (data === dataStructure) {
                    console.log('data === dataStructure');
                }

                const equalsCond = curryEqualsNovel(data);
                const accessString = computeMemberAccessString(dataStructure, equalsCond)
                const newLayerAccess = layerAccess.slice();

                accessString && newLayerAccess.push(accessString);

                return recur([layer, index + 1, newLayerAccess]);

            }



        }());

    })

}

// const previousMemberAccessStrings = new Set()
// function equalsNovel(isLike, memberAccessString) {

//     memberAccessString
//     if (previousMemberAccessStrings.has(memberAccessString)) { return false; };
//     return 'cola' === isLike;
// };

// const accessString = computeMemberAccessString(promArr, equalsNovel)
// previousMemberAccessStrings.add(accessString);
// const accessString2 = computeMemberAccessString(promArr, equalsNovel)