export default function isObject(item) {
    if (typeof (item) !== 'object'
        || !(item instanceof Object)
        || item instanceof String
        || item instanceof Number
        || item.then) { return false }

    return true
};