import { em } from '../index.mjs'

export default function onError() {

    em.on('error', (err) => {
        console.log('error EventEmitter(em), gameRouter.post:', err);
        return res.status(500).send({ matchFound: false, errorMessage: err });
    });
};