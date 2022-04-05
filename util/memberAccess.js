function recursiveReplace(dataStructure, datumOperation) {

    Object.freeze(dataStructure); // does this freeze it outside?
    // new data structure with the same shape as dataStructure
    const newStrct = JSON.parse(JSON.stringify(dataStructure));
    const previousMemberAccessStrings = new Set()

    /** details
     * @curryingFunction -> @conditionalFunction
     * checking if two items are equal 
     * and that a third isn't found on @previousMemberAccessStrings
     * @param {*} target value to test
     * @param {array} @previousMemberAccessStrings if, when calling the curried function, 
     *                                             targets' accessString is found on this, return false
     * @returns {function} that returns true if both conditions pass, otherwise, false
     */
    const curryEquals = (target) => {
        // curry in the target
        return function equalsNovel(isLike, memberAccessString, locStr) {

            if (previousMemberAccessStrings.has(memberAccessString)) { return  false; };
            return target === isLike;
        }
    };

    return (function recur(data = dataStructure) {
        if (data === undefined) { return; };

        // is a primitive, so just operate, assign to the new array and return
        if (!hasChildren(data)) {
            // at the position data is found on dataStructure
            // set newStrct to the return value of the callback of data

            // curry in the data to test
            const equalsNovel = curryEquals(data);
            // get a memberAccessString from dataStrucutre that equals the current data and hasn't been used yet
            const memberAccessString = computeMemberAccessString(dataStructure, equalsNovel)
            // if we found a working access string, add it to the Set of previously used ones
            if (memberAccessString) {
                previousMemberAccessStrings.add(memberAccessString);
                // perform operation on the data
                const newDatum = datumOperation(data);
                typeof (memberAccessString)
                typeof (dataStructure)
                dataStructure[memberAccessString];
                // assign the new data to the new data structure
                setByAccessString(newStrct, newDatum, memberAccessString);
            };
            return;
        }
        // below implicitly has children. shoud be an object or array (maps etc unhandled)

        if (Array.isArray(data)) {
            data.forEach(e => {
                recur(e);
            });
        } else if
            (isObject(data)) {
            for (const prop in data) {
                recur(data[prop]);
            };
        };
        // some verification would be good, but how? check previousMemberAccessStrings maybe
        return newStrct;
    }());
}

/** details
 * @function accessByString uses a @memberAccessString to return an element on a @dataStructure
 * found solution https://stackoverflow.com/a/45322101/17551270
 * @param {*} dataStructure complex object, can be arrays or objects nested deeply
 * @param {string} memberAccessString '.' separated segments used to iteratively traverse the @dataStructure
 * @param {bool -optional-} logErrors set to false to suppress
 * @returns the accessed member of the dataStructure, or undefined if it doesn't exist (log error)
 */
function accessByString(dataStructure, memberAccessString, logErrors = true) {
    if (typeof (memberAccessString) === 'number') { memberAccessString = memberAccessString + ''; };
    if (typeof (memberAccessString) !== 'string') { return logErrors && console.error('accessByString: memberAccess not coercable to a string'); };
    return memberAccessString
        .split('.')
        .reduce((prev, curr, ind, arr) => {
            if (ind === arr.length - 1) { return prev; };
            return prev?.[curr]
        }, dataStructure) || logErrors && console.error('accessByString: member not found on dataStructure')
}

function setByAccessString(dataStructure, setWith, memberAccessString, logErrors = true) {
    if (typeof (memberAccessString) === 'number') { memberAccessString = memberAccessString + ''; };
    if (typeof (memberAccessString) !== 'string') { return logErrors && console.error('accessByString: memberAccess not coercable to a string'); };
    memberAccessString
        .split('.')
        .reduce((prev, curr, ind, arr) => {
            if (ind === arr.length - 1) { return prev[curr] = setWith; };
            return prev?.[curr]
        }, dataStructure) || logErrors && console.error('accessByString: member not found on dataStructure')
}

/** details
 * Traverse a complex object and return an array of access segments for the first element that meets a given condition
 * Traversal is depth recursive and iterative across each layer
 * Traversal is breadth first, so first element found that meets the condition will be on highest order object
 * 
 * @param {*} dataStructure the object to traverse, can be an array or object, either can be nested deeply
 * @param {function} condition FUTURE: make optional, default equivalence fn
 *      @param {data} data tested
 *      @param {string} accessString condition may need to check if it's been used before
 *      @returns {boolean} result of conditional test on data given
 * @param {bool -optional-} logErrors set to false to suppress
 * @returns {array} of member access segments
 */
function computeMemberAccessString(dataStructure, conditionFn, logErrors = true) {

    function checkCondition(data, accessSegmentsArray, locStr) {

        const accessString = accessSegmentsArray.join('.');
        return conditionFn(data, accessString, locStr);
    };


    const memberAccessSegmentsArray =

        /*main fn - recursive IIFE*/
        (function recur(data = dataStructure, segArr = []) {
            // return that arr of member access segments
            if (checkCondition(data, segArr, 'single')) { return segArr; };


            if (Array.isArray(data)) {
                // try to satisfy the condition on this level
                const ind = data.findIndex((e, i) => {
                    return checkCondition(e, segArr.concat(i + ''), 'array');
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
                            return checkCondition(v, segArr.concat(k + ''), 'obj');
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

    /**
     * @returns @param {string -imut-} memberAccessString of '.' separated access segments
     * @example accessByString(dataStructure, memberAccessString = 'default.access.4.0')
     */
    if (memberAccessSegmentsArray) {
        return Object.freeze(memberAccessSegmentsArray.join('.'));
    };
    // nothing found that met the condition
    if (logErrors) {
        return console.error(`computeMemberAccessString: \ncondition: [${conditionFn.name}] not met on dataStructure: [${dataStructure}]`);
    }
};
