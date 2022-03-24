import { patientReduce } from "./util"

const testObj = {
    arr: [
        { two: 2 },
        {
            sth: 'sth',
            promise: new Promise(() => { }),
            banas: [
                'geaore',
                'joao',
                'limitlessRage',
                { function: function simon() { } }
            ]
        },
    ],
    thing: 4,
    string: 'stringg'
}

Object.values(testObj)
testObj.items

const testArr = [
    [
        { two: 2 },
        { sth: 'sth' },
    ],
    4,
    'stringg'
]


const prom = new Promise(resolve => { setTimeout(resolve('3'), 2000); })

const testsched1 = [
    1, 2, prom, 4
]

const testsched2 = [
    1, 2, 3, 4
]

testsched1.filter(e => typeof (e) === 'function').length

const testCb = (prev, cur, i) => {
    console.log(`index2 ${i}`)
    return prev + cur;
}

// const works = patientReduce(testsched1, (prev, cur, i) => {

//     console.log(`index1 ${i}`)
//     return +prev + cur;

// }, 0)

// recurPatiently(curry(patientReduce, testsched2, testCb, 0), 3);
// recurPatiently(curry(add, 1, 2), 3);

function add (a, b) { return a + b}

function curry(func, ...args) {
    return function () {
        return func(...args);
    }
}

function recurPatiently(func, times) {

    const returns = [];

    function count() {
        var counter
        return (function () {
            return counter += 1;
        }());
    }

    (function rP() {
        
        const counter = count();

        if (!func) { return undefined; }
        if (counter > times) { return returns; }

        const result = func();
        if (result.then) {
            // return result
                // .then(result => {
                    // returns.push(result);
                    return rP(func, times - 1);
                // })
        } else {
            returns.push(result);
            return rP(func, times - 1);
        }
    }());

}

    function count() {
        var counter = 0;
        return (function () {
            return counter += 1;
        }());
    }
{    count()
    count()
    count()
    count()}
