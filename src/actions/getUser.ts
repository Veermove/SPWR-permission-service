import { RequestHandler } from "express";
import { useMemory } from "..";
import { doc, getDoc } from "firebase/firestore";
import { SPWRUser } from "../lib/User";

export const getUser: RequestHandler = async (req, res, next) => {

    const
        { db, logger } = useMemory(),
        email = req.params.email;

    try {

        const
            resp = await getDoc(doc(db, "users", email.toLowerCase())),
            ret = resp.data() as SPWRUser;

        ret["email"] = email;
        logger.log(ret, email.toLowerCase());
        res.status(200).send({ user: ret });

    } catch (e) {

        res.status(500)
            .send("Failed to find user in permission service: " + e);
    }

    return next();
};
