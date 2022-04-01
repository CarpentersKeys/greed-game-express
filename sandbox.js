import { emptyObjectsAndFlatten, filterForThenables, isObject } from "./util"

const prom1 = new Promise((resolve) => {
    setTimeout(resolve, 0, '200')
})
const prom2 = new Promise((resolve) => {
    setTimeout(resolve, 0, '300')
})
const prom3 = new Promise((resolve) => {
    setTimeout(resolve, 0, '400')
})

const arr = [
    {
        prom1,
        prom2
    },
    prom3
]
const newarr = await awaitArr(arr)
newarr[1] + 'sth'



async function awaitArr(array) {

    return await Promise.all(array.map(async (item) => {
        if (item.then) { return await (item); }
        return item
    }));
}

const obj = {
    promone: prom1,
    promthree: prom3,
}

async function awaitObj(object) {

    const awaitedArr =
        await Promise.all(
            Object.entries(obj)
                .map(async entry => {

                    let awaited
                    if (entry[1].then) { awaited = await entry[1]; };

                    Object.freeze(awaited);
                    return [entry[0], awaited];
                })
        )

    return Object.fromEntries(awaitedArr);
}

function awaitThenables(data) {

    data

    (async function recur() {

        let newData;

        if (!data) { return; };
        if (Array.isArray(data)) { 
            newData = await awaitArr(data); 
            newData.map(datum => {
                return recur(datum)
            });
        };
        if (isObject) {
            newData = await awaitObj(data);
            for (const datum in newData) {
                return recur(datum);
            };
        };
        if (data.then) { newData = await data; };

        if (newData) {
            Object.freeze(newData);
            return newData;
        } else { return data; };
    }());

    // iterate through a complex object
    // test for array or object or single value
    //array: map over array awaiting each thenable and then assigning it's value to that index of new array

    //object: for...in an object, awaiting each thenable an assigning values to a new obj
    // val: await is thenable and assign to the new thing

}

let awaitTest = prom1
// awaitTest = awaitThenables(awaitTest)

var oarr = [1, 2, 3, 4, 5];


