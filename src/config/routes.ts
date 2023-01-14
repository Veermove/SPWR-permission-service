/**
 * Routes configuration.
 *
 * @module pwrspotted-app
 * @license BSD-2-Clause
 * @copyright Mat. 2020
 */




import { useMemory } from "../index";
import { apiV1 } from "./env";

import { hello } from "../actions/hello";
import { createUser, isAdmin } from "../actions/user";
import { getUser } from "../actions/getUser";
import { setUser } from "../actions/setUser";




/**
 * Routes configuration.
 */
export default function configureRoutes (): void {

    const { app } = useMemory();

    // "hello world" route
    app.get(`${apiV1}/`, hello);


    // "create user" route
    app.post(`${apiV1}/user/create`, createUser);

    // "isAdmin user" route
    app.post(`${apiV1}/user/isAdmin`, isAdmin);

    // "get user by email"
    app.get(`${apiV1}/user/:email`, getUser);

    // "modify user" route
    app.post(`${apiV1}/user/modify`, setUser);

}
