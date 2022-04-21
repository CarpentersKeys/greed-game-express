import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    try {
        const decoded = jwt.verify(req.cookies.tempToken, process.env.JWT_SECRET);
        req.name = decoded.name;
        next();
    } catch {
        console.log('req.body')
        res.status(500).send('bad auth!');
    }
};