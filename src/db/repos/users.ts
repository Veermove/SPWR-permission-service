import { IDatabase, IMain } from "pg-promise";
import { useMemory } from "../..";
import { users as sql } from "../sql";

export class UsersRepository {

    constructor (private db: IDatabase<any>, private pgp: IMain) {
    }

    async create (): Promise<null> {
        return this.db.none(sql.create);
    }

    // Drops the table;
    async drop (): Promise<null> {
        // const { logger } =  useMemory();
        // logger.log("XDDDDDD");
        return this.db.none(sql.drop);
    }
}
