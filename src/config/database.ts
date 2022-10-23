/**
 * Catch all (*) configuration.
 *
 * @module pwrspotted-app
 * @license BSD-2-Clause
 * @copyright Tym. 2022
 */
import { useMemory } from "..";
import configureDatabase from "../db";

export default async function connectDatabase () {
    const { logger } = useMemory();
    logger.log("Connecting to database...");
    await configureDatabase().then(() => logger.log("Connected!")); 
} 
