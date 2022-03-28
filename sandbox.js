const obj = {
    promise: new Promise(resolve => {
        setTimeout(() => {
            resolve('thirty');
        }, 3000)

    })
}
Object.freeze(obj)

obj.promise