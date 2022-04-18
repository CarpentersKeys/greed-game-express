import { Router } from "express";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post('/', (req, res) => {
    console.log(req.body.name);
    const name = req.body.name;

    const tempToken = jwt.sign({
        name
    }, process.env.JWT_SECRET)

    console.log('jwt.sign:', tempToken);
    res.cookie('tempToken', tempToken, {
        httpOnly: true,
        maxAge: 1000* 60 * 10
    }).send();
})

export default authRouter;