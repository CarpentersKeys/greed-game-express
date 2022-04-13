import hasChildren from "./hasChildren";
import computeMemberAccessString from './member-access/computeMemberAccessString';
import setByAccessString from './member-access/setByAccessString'
import accessByString from './member-access/accessByString'
import deepClone from "./deepClone";

export default function awaitDeepAny(dataStructure) {
/**
 * @param {*} dataStructure any primitive, object or array, with any number of nested objects or arrays
 * @returns {promise} that resolves with a datastructure clone of the param with value of all thenables awaited
 */    // new data structure with the same shape as dataStructure

    if(typeof(dataStructure) !== 'object') {
        if(dataStructure.then) { 
            return dataStructure.then(data => { return data;})
        }
        return Promise.resolve(dataStructure);
    }


    const newStrct = deepClone(dataStructure);
    const initialItemkeys = getItemKeys(dataStructure);
    const previousMemberAccessStrings = new Set();

    function getItemKeys(item) {
        const newItemKeys = [];
        for (const key in item) {
            newItemKeys.push(key);
        };
        return newItemKeys;
    }

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

    const replaceAwaitedPassParams = (function curryIn(data = dataStructure) {

        return function replaceAwaitedPassParams(layer, index, layerAccess, itemKeys) {
            const key = itemKeys[index]
            const data = layer[key];

            const equalsCond = curryEqualsNovel(data);
            const accessString = computeMemberAccessString(dataStructure, equalsCond);
            previousMemberAccessStrings.add(accessString);

            return data
                .then(d => {
                    setByAccessString(newStrct, d, accessString);
                    return [layer, index + 1, layerAccess, itemKeys];
                });
        };

    }());


    return new Promise(resolve => {

        // [layer = , index = 0, layerAccess = []]
        (function recur(arr = [dataStructure, 0, [], initialItemkeys]) {
            const [layer, index, layerAccess, itemKeys] = arr;

            // the entire layer has been traversed, resolve the promise with the awaited data
            if (index >= itemKeys.length) {
                // base case, no further layers to traverse, resolve the promise
                if (layerAccess === [] || layerAccess.length < 1) {

                    return resolve(newStrct);
                }
                // call into the next layer
                const nextLayer = accessByString(dataStructure, layerAccess[0])
                const nextLayerAccess = layerAccess.slice(1)
                const nextItemKeys = getItemKeys(nextLayer);

                return recur([nextLayer, 0, nextLayerAccess, nextItemKeys]);
            }

            // there's still data to traverse on this layer
            const key = itemKeys[index];
            const data = layer[key];

            if (!hasChildren(data)) {

                if (!data?.then) {
                    return recur([layer, index + 1, layerAccess, itemKeys])
                };

                if (data.then || typeof(data) === 'function') {
                    return replaceAwaitedPassParams(layer, index, layerAccess, itemKeys)
                        .then(recur);
                };
            };

            if (hasChildren(data)) {
                const equalsCond = curryEqualsNovel(data);
                const accessString = computeMemberAccessString(dataStructure, equalsCond)
                previousMemberAccessStrings.add(accessString);
                const newLayerAccess = layerAccess.slice();

                accessString && newLayerAccess.push(accessString);

                return recur([layer, index + 1, newLayerAccess, itemKeys]);

            }



        }());

    })

}

// //testing
// const prom1 = new Promise(resolve => {
//     setTimeout(resolve, 100, 'resolved1')
// })
// const prom2 = new Promise(resolve => {
//     setTimeout(resolve, 200, 'resolved2')
// })
// const prom3 = new Promise(resolve => {
//     setTimeout(resolve, 300, 'resolved3')
// })

// // can't resolve the same promise value twice
// const promArr = [
//     prom1,
//     4,
//     {
//         notProm: "cola",
//         promse: prom2,
//         arr: ['cola', 2, prom3]
//     },
//     prom3
// ]

// //works
// // const promArr = [
// //     prom1,
// //     prom1
// // ]

// // const promArr = {

// // }

// // works
// // const promArr = [
// //     prom1,
// //     [
// //         prom2,
// //     ],
// //     prom3
// // ]

// //works
// // const promArr = [
// //     prom1,
// //     prom2,
// //     prom3
// // ]


// awaitDeepAny(promArr)
//     .then((sth) => {
//         console.log('awaitDeepAny call:',
//             // '\nprom1:', sth[0],
//             // '\nprom2:', sth[2].promse,
//             '\nresult:', sth
//         )
//     })

// // 