import hasChildren from "../hasChildren";
import isObject from "../isObject";

/**
 * FUTURE:
 * refactor so accessSegmentArray is always a string to get ride of unnecessary .join call in checkCondition
 * 
 */

export default function computeMemberAccessString(dataStructure, conditionFn, logErrors = true) {
    /**
     * Traverse a complex object data structure (objects or arrays nested arbitrarily),
     * for the first element that meets a given condition,
     * return a string for accessing a member on the given dataStructure
     * 
     * Traversal is depth recursive and iterative across each layer
     * 
     * Traversal is breadth first, so first element found that meets the condition will be on highest order object
     * 
     * @param {*} dataStructure to traverse, objects or arrays nested arbitrarily
     * @param {function} condition FUTURE: make optional, default equivalence fn
     *      @param {data} data tested
     *      @param {string} accessString condition may need to check if it's been used before
     *      @returns {boolean} result of conditional test on data given
     * @param {bool -optional-} logErrors set to false to suppress
     * @returns {array} of member access segments
     */

    function checkCondition(data, accessSegmentsArray) {

        const accessString = accessSegmentsArray.join('.');
        return conditionFn(data, accessString);
    };


    const memberAccessSegmentsArray =

        /*main fn - recursive IIFE*/
        (function recur(data = dataStructure, segArr = []) {
            // console.log(data)
            // return that arr of member access segments
            if (checkCondition(data, segArr)) { return segArr; };


            if (Array.isArray(data)) {
                // try to satisfy the condition on this level
                const ind = data.findIndex((e, i) => {
                    return checkCondition(e, segArr.concat(i + ''));
                });
                if (ind !== -1) {
                    return Object.freeze(segArr.concat(ind + ''));
                };

                // if not, go deeper
                for (const datInd in data) {
                    const datum = data[datInd]
                    if (hasChildren(datum)) {
                        const recRes = recur(datum, segArr.concat(datInd + ''));
                        if (recRes) { return recRes; };
                    };
                };
            };


            if (isObject(data)) {
                // try to satisfy the condition on this level
                const entries = Object.entries(data);
                const ind =
                    entries
                        .findIndex(e => {
                            const k = e[0] // key
                            const v = e[1] // value
                            return checkCondition(v, segArr.concat(k + ''));
                        });
                const key = entries?.[ind]?.[0];
                if (key) {
                    return Object.freeze(segArr.concat(key + ''));
                };

                //if not, go deeper
                for (const datProp in data) {
                    const datum = data[datProp]
                    if (hasChildren(datum)) {
                        const recRes = recur(datum, segArr.concat(datProp + ''));
                        if (recRes) { return recRes; };
                    };
                };
            };
            // if nothing was found
            return undefined;
        }());


    if (memberAccessSegmentsArray) {
        return Object.freeze(memberAccessSegmentsArray.join('.').toString());
    };
    // nothing found that met the condition
    if (logErrors) {

        return console.error(`computeMemberAccessString: \ncondition: [${conditionFn.name}] not met on dataStructure: [${dataStructure}]`);
    }
};
/**
     * @returns @param {string -imut-} memberAccessString of '.' separated access segments
     * @example accessByString(dataStructure, memberAccessString = 'default.access.4.0')
     */