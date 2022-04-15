/** details
 * @function accessByString uses a @memberAccessString to return an element on a @dataStructure
 * found solution https://stackoverflow.com/a/45322101/17551270
 * @param {*} dataStructure complex object, can be arrays or objects nested deeply
 * @param {string} memberAccessString '.' separated segments used to iteratively traverse the @dataStructure
 * @param {bool -optional-} logErrors set to false to suppress
 * @returns the accessed member of the dataStructure, or undefined if it doesn't exist (log error)
 */
export default function accessByString(dataStructure, memberAccessString, logErrors = true) {
    if (typeof (memberAccessString) === 'number') { memberAccessString = memberAccessString + ''; };
    if (typeof (memberAccessString) !== 'string') { return logErrors && console.error('accessByString: memberAccess not coercable to a string'); };
    return memberAccessString
        .split('.')
        .reduce((prev, curr) => {
            return prev?.[curr]
        }, dataStructure) || logErrors && console.error('accessByString: member not found on dataStructure')
}

