
//import { bootstrap } from '../../../tests/app_test.js';
import { initORM } from './orm.db.js';
import {config_test} from './orm.config.js';

export async function initTestApp(port: number) {
  // this will create all the ORM services and cache them
  const { orm } = await initORM({
    // first, include the main config
    ...config_test,
    // no need for debug information, it would only pollute the logs
    debug: false,
    // we will use in-memory database, this way we can easily parallelize our tests
    dbName: ':memory:',
    // this will ensure the ORM discovers TS entities, with ts-node, ts-jest and vitest
    // it will be inferred automatically, but we are using vitest here
    // preferTs: true,
  });

  // create the schema so we can use the database
  await orm.schema.createSchema();

  //const { app } = await bootstrap(8081);

  //return app;
}