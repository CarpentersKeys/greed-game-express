import isObject from "./isObject";

// takes anything and flattens it recursively
//if it encounters objects they are stripped of their propert names and flattened
// maybe it should assign them to a const named after their property
// preserves promises so I can't JSON clone it
export default function emptyObjectsAndFlatten (data) {

    return Object.freeze(flattenrecur(data));

    function flattenrecur(data) {
        if (!data) { return }

        const level = arrayValsOrItem(data);
        if (!Array.isArray(level)) return level;

        return level.flat()
            .reduce((acc, cur) => {
                return acc.concat(flattenrecur(cur))
            }, []);

    }

    function arrayValsOrItem(data) {
        const arr = [];
        if (Array.isArray(data)) {
            arr.push(data);
        } else if (isObject(data)) {
            arr.push(Object.values(data))
        } else { return data }
        return arr;
    }
}