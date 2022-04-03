import { emptyObjectsAndFlatten, filterForThenables, isObject } from "./util"


// const prom1 = new Promise((resolve) => {
//     setTimeout(resolve, 0, '200')
// })
// const prom2 = new Promise((resolve) => {
//     setTimeout(resolve, 0, '300')
// })
// const prom3 = new Promise((resolve) => {
//     setTimeout(resolve, 0, '400')
// })

// const testArr = [
//     {
//         prom1,
//         prom2,
//         some: 'simple'
//     },
//     prom3
// ];

// const testObj = {
//     tell: [0, 'one', 2],
//     shout: 'four',
// };

// // typeFns


// function objArrOrPrim(data) {

//     if (Array.isArray(data)) { return 'array'; };
//     if (typeof (data) === 'string' || 'number') { return 'primitive'; };
//     if (data instanceof 'String' || 'Number') { return 'primitive'; };
//     if (isObject(data)) { return 'object'; };

//     console.log('unknown data type encountered, returning \'undefined\'\n', data)
//     return
// }

// // awaitTypes

// // const newArr = await awaitArr(testArr)
// async function awaitArr(array) {

//     return await Promise.all(array.map(async (item) => {
//         if (item.then) { return await (item); }
//         return item
//     }));
// }

// // const newObj = await awaitObj(testObj)
// async function awaitObj(object) {

//     const awaitedArr =
//         await Promise.all(
//             Object.entries(obj)
//                 .map(async entry => {

//                     let awaited
//                     if (entry[1].then) { awaited = await entry[1]; };

//                     Object.freeze(awaited);
//                     return [entry[0], awaited];
//                 })
//         )

//     return Object.fromEntries(awaitedArr);
// }

// // awaitComplexObj(arr)

// // awaits all thenables within a any object, array, primitive structure
// function awaitComplexObj(data) {

//     recursiveReplace(data, 'conditional await fn')

// }


function hasChildren(sth) {
    return Array.isArray(sth) || isObject(sth);
}

// const data = {
//     tim: 3,
//     bill: 0,
//     bie: [1]
// }

const data = [
    { one: 2, },
    {
        three: [4, 5],
        six: 7,
    }
]

const result = recursiveReplace(data, (e) => {
    return e * 10
})

result

// NEXT
function recursiveReplace(dataStructure, datumOperation) {

    Object.freeze(dataStructure);
    // new data structure with the same shape as dataStructure
    const newStrct = JSON.parse(JSON.stringify(dataStructure));
    const previousMemberAccessStrings = new Set()

    return (function recur(data = dataStructure) {
        if (data === undefined) { return; };

        // is a primitive, so just operate, assign to the new array and return
        if (!hasChildren(data)) {
            // at the position data is found on dataStructure
            // set newStrct to the return value of the callback of data

            // the conditional function for finding the same member access string on the original dataStructure
            const equalsData = e => { return e === data; };
            // get a memberAccessString from dataStrucutre that equals the current data and hasn't been used yet
            const memberAccessString = computeMemberAccessString(dataStructure, equalsData, previousMemberAccessStrings)
            // if we found a working access string, add it to the Set of previously used ones
            if (memberAccessString) {
                previousMemberAccessStrings.add(memberAccessString);
                // perform operation on the data
                const newDatum = datumOperation(data);
                // assign the new data to the new data structure
                newStrct[memberAccessString] = newDatum;
            };
            return;
        }
        // below implicitly has children. shoud be an object or array (maps etc unhandled)

        if (Array.isArray(data)) {
            data.forEach(e => {
                recur(e);
            });
        } else if
            (isObject(data)) {
            for (const prop in data) {
                recur(data[prop]);
            };
        };
        // some verification would be good, but how? check previousMemberAccessStrings maybe
        return newStrct;
    }());
}

function accessComputedMember(dataStructure, accessString) {
    return accessString
        .split('.')
        .reduce((prev, curr) => {
            return prev[curr]
        }, dataStructure)
}

// const cMASArr = [1, 2, 3, 4,
//     [5,
//         [7]
//     ]
// ]

// const cMASResult = computeMemberAccessString(cMASArr, (e) => {
//     e
//     return e === 7;
// }
// )

// cMASResult
// accessComputedMember(cMASArr, cMASResult)


/**
 * Traverse a complex object and return a member access string for the first element that meets a given condition
 * Traversal is depth recursive and iterative across each layer
 * Traversal is breadth first, so first element found that meets the condition will be on highest order object
 * 
 * @param {*} dataStructure the object to traverse, can be an array or object, either can be nested deeply
 * @param {function} condition FUTURE: make optional, default equivalence fn
 *      @param {data} data tested
*       @returns {boolean} result of conditional test on data given
 * @param {array -optional-} previousVals will be checked to prevent multiple returns of the same string
                            // FUTURE: refactor previousVals to condition
 * @returns {string} of '.' separate member access segments (dot notation)
 */

function computeMemberAccessString(dataStructure, condition, previousVals) {

    // convert array to a string on bracket notation
    const joinAccessSegments = (arr) => {
        if (!Array.isArray(arr) || arr === '' || arr.length < 2 || arr === []) { return arr }; // FUTURE clean this
        return arr.map(e => {
            return '[' + e + ']';
        })
            .join('')
    }

    // check data against condition and make sure value hasn't been used previoiusly 
    // FUTURE: refactor previousVals to condition
    const checkCondtion = (data, condition, accessString) => {
        joinAccessSegments(accessString);
        return !previousVals.has(accessString + '') && condition(data);
    }


    const memberAccessString =

        (function recur(data, cond, accessString = []) { // recursive IIFE

            // if the condition of data is met and that access string hasn't been included in previousVals
            const conditionMet = checkCondtion(data, cond, accessString);
            // return that accessString
            if (conditionMet) { return Object.freeze(accessString); };


            if (Array.isArray(data)) {
                // try to satisfy the condition on this level
                const ind = data.findIndex((e, i) => {
                    return checkCondtion(e,
                        cond,
                        accessString.concat(i + ''));
                });
                if (ind !== -1) {
                    return Object.freeze(accessString.concat(ind + ''));
                };

                // if not, go deeper
                for (const datInd in data) {
                    const datum = data[datInd]
                    if (hasChildren(datum)) {
                        return recur(datum, cond, accessString.concat(datInd + ''));
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
                            return checkCondtion(v, cond, accessString.concat(k + ''));
                        });
                const key = entries?.[ind]?.[0];
                if (key) {
                    return Object.freeze(accessString.concat(key + ''));
                };

                //if not, go deeper
                for (const datProp in data) {
                    const datum = data[datProp]
                    if (hasChildren(datum)) {
                        return recur(datum, cond, accessString.concat(datProp + ''));
                    };
                };
            };
            return;

        }(dataStructure, condition));

    if (memberAccessString) { return joinAccessSegments(memberAccessString) };
    return console.log(`condition: [${condition.name}] not met on dataStructure: [${dataStructure}]`);
};

// rename things called string that are arrays
// FUTURE: refactor previousVals to condition