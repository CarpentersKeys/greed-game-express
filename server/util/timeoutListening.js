export default function timeoutListening(eventEmitter, eventString, eventCallback, timeoutCallback, time) {

    return new Promise((resolve, reject) => {
        function eventCb(arg) {
            resolve(eventCallback(arg));
            clearTimeout(timer);
        };

        function timeoutCb(eventString, eventCb) {
            const err = new Error()
            err.code = 'ERR_SCRIPT_EXECUTION_TIMEOUT';
    reject(timeoutCallback(err));
    eventEmitter.removeListener(eventString, eventCb)
}

const timer = setTimeout(timeoutCb, time, eventString, eventCb);
eventEmitter.once(eventString, eventCb);
    })

};

// test
// timeoutListening(em, 'test', (arg) => `${arg}, help!`, () => 'got you!', 1000)
// .then((result) => console.log('result', result))
// .catch((result) => console.log('result', result))

// em.emit('test', 'egads');