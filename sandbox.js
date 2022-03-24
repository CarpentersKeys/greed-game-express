import { patientReduce } from "./util"

const testObj = {
    arr: [
        { two: 2 },
        { 
            sth: 'sth',
            promise: new Promise(() =>{}),
            banas: [
                'geaore',
                'joao',
                'limitlessRage',
                {function: function simon() {}}
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

