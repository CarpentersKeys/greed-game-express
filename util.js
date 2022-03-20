export { deepClone, flattenToObj, patientArrayPolyfill }

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function flattenToObj(previousResults, ...newProps) {

    return {
        ...previousResults,
        ...newProps
    }
    // the idea is to pass arguments[0] (results object param) with any new additions
}

function patientArrayPolyfill() {
    if (Array.prototype.patientReducer) { return }

    Array.prototype.patientArray = function () {

    }
}