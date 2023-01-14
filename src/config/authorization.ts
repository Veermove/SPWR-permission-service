/* eslint-disable @typescript-eslint/no-namespace */
import type { DecodedIdToken } from "firebase-admin/auth";
import { useMemory } from "..";

export function configureAuthorization () : void {
    const { app } = useMemory();

    app.use(async (req, res, next) => {
        try {
            const
                { auth } = useMemory(),
                bearerToken = req.headers.authorization!,
                token = bearerToken.match(/Bearer (.*)/)![1];

            req.xauth =  await auth.verifyIdToken(token);
            return next();
        } catch (e) {
            res.status(401).send({ error: e });
        }
    });
}

declare global {

    namespace Express {
        interface Request {
            xauth: DecodedIdToken;
        }
    }

}
