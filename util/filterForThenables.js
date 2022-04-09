import emptyObjectsAndFlatten from "./emptyObjectsAndFlatten";

//finds all thenables even on deeply nested objects or arrays
export default function filterForThenables(data) {

    const level = emptyObjectsAndFlatten(data);
    if (Array.isArray(level)) { return level.filter(e => e.then) }
    return undefined
}
 


