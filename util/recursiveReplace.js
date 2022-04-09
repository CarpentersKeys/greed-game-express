// tries to be a generic operator that will allow promisees to settle before operating


export default function recursiveReplace(dataStructure, datumOperation) {

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