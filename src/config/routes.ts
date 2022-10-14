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




/**
 * Routes configuration.
 */
export default function configureRoutes (): void {

    const { app } = useMemory();

    // "hello world" route
    app.get(`${apiV1}/`, hello);

}
