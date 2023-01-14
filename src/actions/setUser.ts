import { RequestHandler } from "express";
import { useMemory } from "..";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { SPWRUser } from "../lib/User";

export const setUser: RequestHandler = async (req, res, next) => {

    const { db, logger } = useMemory(),
        { email, role } = req.body,
        user = { role };

    try {
        const
            requester = await getDoc(doc(db, "users", req.xauth.email!)),
            reqs = requester.data() as SPWRUser;

        logger.log(req.xauth.email!);
        logger.log(reqs);

        if (reqs.role !== 1) {
            res.status(401).send({ err: "User must be an admin to make this request. "});
        }

        await setDoc(doc(db, "users", email), user, { merge: true });

    } catch (e) {

        logger.info(e);
        res.status(500)
            .send("Failed to register user in permission service: " + e);
    }

    res.status(200).send();

    return next();
};
