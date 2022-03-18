var someFun = (_result) => {
    if(_result) return [..._result, 3]
    return someFun([3])
}


var result = someFun(result)


result