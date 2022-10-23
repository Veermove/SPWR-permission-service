import { QueryFile, IQueryFileOptions } from "pg-promise";
import joinPath from "path";
import { useMemory } from "../..";
// import { useMemory } from "../../index";
// import { useMemory } from "../index";

export const users = {
    create: sql("users/create.sql"),
    // empty: sql('users/empty.sql'),
    drop: sql("users/drop.sql"),
    // add: sql('users/add.sql')
};



///////////////////////////////////////////////
// Helper for linking to external query files;
function sql (file: string): QueryFile {

    const fullPath: string = joinPath.join(__dirname, file); // generating full path;

    const options: IQueryFileOptions = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true,

        // See also property 'params' for two-step template formatting
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    // const { logger } = useMemory(); !TODO Find out why useMemory is not a function
    if (qf.error) {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        
        // logger.error(qf.error); !TODO
    }

    return qf;

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
