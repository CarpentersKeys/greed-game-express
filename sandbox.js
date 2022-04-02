import {accessComputedMember, computeMemberAccessString, emptyObjectsAndFlatten, filterForThenables, isObject } from "./util"

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

// // recursiveReplace(['one', 'two', 'three'], () => {
// //     if ('one') { return 111 }
// //     if ('two') { return 222 }
// //     if ('three') { return 333 }
// // })

// NEXT
function recursiveReplace(dataStructure, datumOperation) {

    // new data structure with the same shape as dataStructure
    const newStrct = JSON.parse(JSON.stringify(dataStructure));

    (function recur(data = dataStructure) {

        if (!hasChildren) {
            // at the position data is found on dataStructure
            // set newStrct to the return value of the callback of data
            newStrct[computeMemberAccessString(dataStructure, data)] = datumOperation(data);
            return
        }
    }());
}
