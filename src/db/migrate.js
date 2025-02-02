// cliente de migraciones 

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const migrationClient = postgres(process.env.CONNECTION_STRING, {
    max: 1
});

const db = drizzle(migrationClient);

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'src/db/migrations',
        })
        console.log('La migracion a sido exitosa!!');
        process.exit(0);

    }
    catch(error){
        console.error('Error corriendo la migracion',error);
        process.exit(1);
    }
}

main ();
