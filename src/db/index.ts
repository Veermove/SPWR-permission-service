import * as dbConfig from "../../dbconfig.json";
import pgPromise, { IDatabase, IInitOptions, IMain } from "pg-promise";
import { IExtensions, UsersRepository } from "./repos";
import { share } from "mem-box";

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

export default async function configureDatabase (): Promise<void> {

    // pg-promise initialization options:
    const initOptions: IInitOptions<IExtensions> = {

        // Extending the database protocol with our custom repositories;
        // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
        extend (obj: ExtendedProtocol, _dc: any) {
            // Database Context (dc) is mainly needed for extending multiple databases with different access API.

            // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
            // which should be as fast as possible.
            obj.users = new UsersRepository(obj, pgp);
        },
    };

    // Initializing the library:
    const pgp: IMain = pgPromise(initOptions);

    // Creating the database instance with extensions:
    const db: ExtendedProtocol = pgp(dbConfig);

    if (db.users.create() === undefined) {
        throw new Error("HUUUuUj");
        
    }
    share({ db });
}

declare global {
    interface Ctx {
        db: ExtendedProtocol;
    }
}


