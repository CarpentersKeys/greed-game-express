import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    try {
        const decoded = jwt.verify(req.cookies.tempToken, process.env.JWT_SECRET);
        req.name = decoded.name;
        next();
    } catch (error) {
        console.log('bad auth! \nerror', error)
    }
};