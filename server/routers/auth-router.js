import { Router } from "express";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post('/', (req, res) => {
    const name = req.body.name;

    const tempToken = jwt.sign({
        name
    }, process.env.JWT_SECRET)

    res.cookie('tempToken', tempToken, {
        httpOnly: true,
        maxAge: 1000* 60 * 10
    }).send({name});
})

export default authRouter;