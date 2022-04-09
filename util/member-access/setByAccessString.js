export default function setByAccessString(dataStructure, setWith, memberAccessString, logErrors = true) {
    if (typeof (memberAccessString) === 'number') { memberAccessString = memberAccessString + ''; };
    if (typeof (memberAccessString) !== 'string') { return logErrors && console.error('accessByString: memberAccess not coercable to a string'); };
    memberAccessString
        .split('.')
        .reduce((prev, curr, ind, arr) => {
            if (ind === arr.length - 1) { return prev[curr] = setWith; };
            return prev?.[curr]
        }, dataStructure) || logErrors && console.error('accessByString: member not found on dataStructure')
}