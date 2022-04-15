
/**
 * 001
 * fixed bug that prevented patient reduce from handling return values with no thenables
 */

import { ReactionUserManager } from "discord.js";

// wont reach the block if thenables is undefined
if (thenables?.length <= 0) { /* handle sync */ }

// fix, note we can't omit the ? because it will error
if (!thenables?.length > 0) { /* handle sync */ }

/**
 * 002
 * fixed bug that prevents patientReduce from handling promises passed directly to it
 * (as opposed to promises returned by it)
 */
//fix, added an if early on that short circuits if the current element has .then() 
if (elem.then) {
    /* return */ elem
        .then(next => { return recur(arr, cb, next, i + 1); })
}

/**
 * 003
 * fixed bug that caused computeMemberAccessString to give up early when searching for data that satisfied the conditional function
 * in a recursive fn if there are multiple entry points to recur() you cannot directly return recur(). you must check if it returns the desired result, otherwise, if it fails, your fn will return 'early' without trying the next case
 */
function badRecur() {
    if (baseCase) { return 'sth' }
    // if baseCase isn't reached on the second call, and both first and second cases need to be checked, barRecur() will return undefined (the result of firstCase.badRecur)
    if (firstCase) { return badRecur() }
    if (secondCase) { return badRecur() }
}
// fix, just add another check to see if your call produced the desired output
function goodRecur() {
    if (baseCase) { return 'sth' }
    if (firstCase) {
        const result = goodRecur()
        // doesn't return if undefined
        if (result) { return goodRecur() }
    }
    if (secondCase) { 
        return goodRecur() 
    }
}
// would be nice if there was a cleaner structure or conditional return method