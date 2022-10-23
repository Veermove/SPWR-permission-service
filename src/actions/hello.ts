/**
 * 'Hello-world' action.
 *
 * @module pwrspotted-actions
 * @license BSD-2-Clause
 * @copyright Mat. 2020
 */




import type { RequestHandler } from "express";
import { useMemory } from "..";
import {
    name as applicationName,
    version,
} from "../../package.json";




/**
 * "Hello world".
 *
 * @function hello
 */
export const hello: RequestHandler = async (req, res, next) => {

    const { db } = useMemory();
    // await db.users.create();
    db.users.drop();
    // await db.users.create();
    const responseData = {
        message: "hello",
        app: applicationName,
        paNaMnie: "ziom",
        version,
        client: {
            ua: req.get("user-agent"),
            ip: req.ip,
            host: req.hostname,
            headers: req.headers,
        },
    };

    res.status(200).send(responseData);

    return next();

};
