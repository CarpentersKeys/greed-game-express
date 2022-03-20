export function deepClone (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function flattenToObj(previousResults, ...newProps) {

    

    return {
        ...previousResults,
        ...newProps
    }
    // the idea is to pass arguments[0] (results object param) with any new additions
}


