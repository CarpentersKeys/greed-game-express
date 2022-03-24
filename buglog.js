
/**
 * 001
 * fixed bug that prevented patient reduce from handling return values with no thenables
 */

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